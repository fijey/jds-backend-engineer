<?php

namespace App\Services;

use GuzzleHttp\Client;
use Exception;

class ProductService
{
    private $client;
    private $baseUrl;
    private $currencyConverterService;

    public function __construct()
    {
        $this->client = new Client();
        $this->baseUrl = env('API_BASE_URL', 'https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product');
        $this->currencyConverterService = new ConvertCurrencyServices();
    }

    public function getAllProducts()
    {
        try {
            $response = $this->client->get($this->baseUrl);
            $data = json_decode($response->getBody(), true);

            $rate = $this->currencyConverterService->getUsdToIdrRate();

            return array_map(function ($product) use ($rate) {
                $product['priceIdr'] = number_format($product['price'] * $rate, 2, ',', '.');
                return $product;
            }, $data);

        } catch (Exception $e) {
            throw new Exception('Error fetching products: ' . $e->getMessage());
        }
    }

    public function getAggregatedProducts()
    {
        try {
            $response = $this->client->get($this->baseUrl);
            $products = json_decode($response->getBody(), true);
            $rate = $this->currencyConverterService->getUsdToIdrRate();

            // Sort products by price (USD) first
            usort($products, function($a, $b) {
                return (float)$a['price'] - (float)$b['price'];
            });

            // Add IDR price to all products first
            $products = array_map(function ($product) use ($rate) {
                $product['priceIdr'] = number_format($product['price'] * $rate, 2, ',', '.');
                return $product;
            }, $products);

            $aggregated = [
                'by_department' => $this->aggregateByKey($products, 'department'),
                'by_product' => $this->aggregateByKey($products, 'product'),
                'by_price' => $this->aggregateByPrice($products)
            ];

            return $aggregated;
        } catch (\Exception $e) {
            throw new \Exception('Error aggregating products: ' . $e->getMessage());
        }
    }

    private function aggregateByKey($products, $key)
    {
        $result = [];
        foreach ($products as $product) {
            $keyValue = $product[$key];
            if (!isset($result[$keyValue])) {
                $result[$keyValue] = [];
            }
            $result[$keyValue][] = $product;
        }
        return $result;
    }

    private function aggregateByPrice($products)
    {
        $ranges = [];
        foreach ($products as $product) {
            $price = (float)str_replace(['.',','], ['','.'], $product['priceIdr']);
            $range = floor($price/5000000) * 5000000;
            $rangeKey = sprintf("IDR %s - %s", 
                number_format($range, 0, ',', '.'),
                number_format($range + 5000000, 0, ',', '.')
            );
            
            if (!isset($ranges[$rangeKey])) {
                $ranges[$rangeKey] = [];
            }
            $ranges[$rangeKey][] = $product;
        }
        return $ranges;
    }
}