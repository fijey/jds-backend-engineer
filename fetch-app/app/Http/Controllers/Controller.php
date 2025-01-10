<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use OpenApi\Annotations as OA;

/**
 * 
 * @OA\Server(
 *     url="http://localhost:8000"
 * )
 * 
 */
class Controller extends BaseController 
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

     /**
     * @OA\Get(
     *     path="/api/data",
     *     summary="Get all products",
     *     tags={"Products"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="data", type="array", @OA\Items(type="object"))
     *         )
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/data-admin",
     *     summary="Get aggregated product data (Admin only)",
     *     tags={"Products"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/private-claims",
     *     summary="Show the Private Claims data",
     *     tags={"privateclaims"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="data", type="array", @OA\Items(type="object"))
     *         )
     *     )
     * )
     */
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
