<?php

return [
    'api' => [
        'title' => 'Fetch App API Documentation',
        'version' => '1.0.0',
        'description' => 'API documentation for the Fetch App service'
    ],
    'routes' => [
        'docs' => '/api/documentation',
        'json' => '/api/documentation.json',
    ],
    'paths' => [
        'docs' => storage_path('api-docs'),
        'annotations' => [
            base_path('app'),
        ],
    ],
];