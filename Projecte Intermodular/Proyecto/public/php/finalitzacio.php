<?php

$path = __DIR__ . "/../json/productes.json";

$email = $_POST["email"];

$carret = json_decode($_POST["local_storage_data"] ?? "{}", true);

if (empty($carret)) {
    die("Error: Carretó Buit");
}

if (file_exists($path)) {
    $jsonData = json_decode(file_get_contents($path), true) ?? [];
} else {
    $jsonData = [];
}

// Usar email como clave, actualizar en lugar de duplicar
$jsonData[$email] = [
    'carret' => $carret,
    'ultima_actualizacion' => date('Y-m-d H:i:s'),
    'historial' => isset($jsonData[$email]['historial']) ?
        array_merge($jsonData[$email]['historial'], [$carret]) :
        [$carret]
];

file_put_contents($path, json_encode($jsonData, JSON_PRETTY_PRINT));
echo "Datos guardados correctamente.";
