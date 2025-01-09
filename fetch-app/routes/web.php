<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('/test-connection', function () {
    try {
        $client = new \MongoDB\Client(env('MONGODB_URI'));
        $database = $client->selectDatabase(env('MONGODB_DATABASE', 'jds'));
        $result = $database->command(['ping' => 1]);
        
        return response()->json([
            'message' => 'Successfully connected to MongoDB',
            'status' => $result->toArray()[0]
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to connect to MongoDB',
            'error' => $e->getMessage()
        ], 500);
    }
});
