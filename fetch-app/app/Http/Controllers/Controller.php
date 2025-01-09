<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Laravel\Lumen\Routing\Controller as BaseController;
use App\Services\ConvertCurrencyServices;
class Controller extends BaseController
{
    private $client;
    private $baseUrl = 'https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product';
    protected $currencyConverterService;
    public function __construct()
    {
        $this->client = new Client();
        $this->currencyConverterService = new ConvertCurrencyServices();
    }

    public function index()
    {
        try {
            $response = $this->client->get($this->baseUrl);
            $data = json_decode($response->getBody(), true);

            $rate = $this->currencyConverterService->getUsdToIdrRate();

            $products = array_map(function ($product) use ($rate) {
                $product['price_idr'] = number_format($product['price'] * $rate, 2, ',', '.');
                return $product;
            }, $data);

            return response()->json([
                'status' => 'success',
                'data' => $products
            ], 200);

        } catch (RequestException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch data: ' . $e->getMessage()
            ], 500);
        }
    }
}
