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


$router->group(['middleware' => ['jwt']], function () use ($router) {
    // Protected routes go here
    $router->get('/test-connection', function () {
        return response()->json([
            'message' => 'API is working'
        ]);
    });

    $router->get('/data', 'Controller@index');

});
