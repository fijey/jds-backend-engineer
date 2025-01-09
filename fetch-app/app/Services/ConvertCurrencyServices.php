<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

class ConvertCurrencyServices
{
    protected $apiUrl = 'https://api.apilayer.com/currency_data/';
    protected $cacheKey = 'usd_to_idr_rate';
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => $this->apiUrl,
            'timeout' => 10.0,
        ]);

        $this->apiKey = env('APILAYER_API_KEY');
    }

    public function getUsdToIdrRate()
    {
        if (Cache::has($this->cacheKey)) {
            return Cache::get($this->cacheKey);
        }

        try {
            $response = $this->client->get('convert', [
                'query' => [
                    'from' => 'USD',
                    'to' => 'IDR',
                    'amount' => 1,
                ],
                'headers' => [
                    'apikey' => $this->apiKey,
                ],
            ]);

            if ($response->getStatusCode() !== 200) {
                throw new \Exception('Failed to fetch exchange rate');
            }

            $data = json_decode($response->getBody()->getContents(), true);

            if (!isset($data['result'])) {
                throw new \Exception('Exchange rate data not found');
            }

            $rate = $data['result'];

            Cache::put($this->cacheKey, $rate, 3600);

            return $rate;
        } catch (\Exception $e) {
            throw new \Exception('Error fetching exchange rate: ' . $e->getMessage());
        }
    }
}
