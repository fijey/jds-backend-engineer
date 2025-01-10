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



$router->group(['prefix' => 'api'], function () use ($router) {
    $router->group(['middleware' => ['jwt']], function () use ($router) {
        $router->get('/data', 'Controller@index');
    
    });
    
    $router->group(['middleware' => ['jwt.admin']], function () use ($router) {
        $router->get('/data-admin', 'Controller@index_admin');
    });
    
    $router->group(['middleware' => ['jwt.admin', 'jwt']], function () use ($router) {
        $router->get('/private-claims', 'Controller@private_claims');
    });
    $router->get('documentation', ['uses' => 'SwaggerController@view']);
    $router->get('docs', ['uses' => 'SwaggerController@docs']);
});

