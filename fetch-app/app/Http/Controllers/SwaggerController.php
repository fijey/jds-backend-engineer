<?php

namespace App\Http\Controllers;

use OpenApi\Generator;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Fetch App API",
 *     description="API Documentation for Fetch App"
 * )
 * @OA\Server(
 *     url="http://localhost:8000/api"
 * )
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
class SwaggerController extends Controller
{
    public function docs()
    {
        $openapi = Generator::scan([
            base_path('app/Http/Controllers'),
            base_path('app/Services')
        ]);
        return response()->json(json_decode($openapi->toJson()));
    }
    public function view()
    {
        return view('swagger');
    }
}