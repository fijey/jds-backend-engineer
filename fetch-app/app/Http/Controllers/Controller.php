<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController 
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        try {
            $products = $this->productService->getAllProducts();
            
            return response()->json([
                'status' => 'success', 
                'data' => $products
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function index_admin() {
        try {
            $aggregatedProducts = $this->productService->getAggregatedProducts();
            
            return response()->json([
                'status' => 'success', 
                'data' => $aggregatedProducts
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function private_claims(Request $request) {
        try {
            $privateClaims = $request->attributes->get('decodedToken');

            return response()->json([
                'status' => 'private claims', 
                'data' => $privateClaims
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
