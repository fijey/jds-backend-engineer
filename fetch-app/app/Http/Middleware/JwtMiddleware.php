<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class JwtMiddleware
{
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken(); // Ambil token dari header Authorization

        if (!$token) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

        try {
            $secretKey = env('JWT_SECRET'); // Pastikan ini sama dengan di Node.js
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));

            // Simpan data token ke dalam request
            $request->attributes->add(['decodedToken' => (array)$decoded]);
        } catch (Exception $e) {
            return response()->json(['error' => 'Invalid token: ' . $e->getMessage()], 401);
        }

        return $next($request);
    }
}
