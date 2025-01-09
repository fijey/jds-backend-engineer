<?php

return [
    'default' => env('DB_CONNECTION', 'mongodb'),
    'connections' => [
        'mongodb' => [
            'driver' => 'mongodb',
            'dsn' => env('MONGODB_URI'),
            'database' => env('MONGODB_DATABASE', 'jds'),
        ],
    ],
];