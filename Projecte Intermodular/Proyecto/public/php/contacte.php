<?php

$path = __DIR__ . "/../json/contacte.json";

$usuari = $_POST["nom"];
$correu = $_POST["correu"];
$telefon = $_POST["telefon"];

if (file_exists($path)) {
    $contactes = json_decode(file_get_contents($path), true) ?? [];
} else {
    $contactes = [];
}

$existeix = false;
foreach ($contactes as $contacte) {
    if ($contacte["nom"] == $usuari) {
        $existeix = true;
        break;
    }
}

if (!$existeix) {
    $contactes[] = [
        "nom" => $usuari,
        "correu" => $correu,
        "telefon" => $telefon
    ];

    file_put_contents($path, json_encode($contactes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

header("Location: /../public/inici.html");
