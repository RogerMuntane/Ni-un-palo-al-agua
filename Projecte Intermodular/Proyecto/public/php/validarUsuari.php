<?php
session_start();

$path = __DIR__ . "/../json/login.json";

$usuari = $_POST["email"];
$contrasenya = $_POST["password"];

if (file_exists($path)) {
    $infoJson = json_decode(file_get_contents($path), true) ?? [];
} else {
    $infoJson = [];
}

$es_correcte = false;
$usuari_trobat = false;

foreach ($infoJson as $dades => $sessio) {
    if ($usuari == $sessio["usuari"]) {
        $usuari_trobat = true;
        if ($contrasenya == $sessio["contrasenya"]) {
            $_SESSION['usuari'] = $usuari;
            echo "Sessió iniciada correctament";
            header("Location: ../administracio.php");
            exit();
        } else {
            $_SESSION['error'] = "Contrasenya incorrecta";
            header("Location: ../login.php");
            exit();
        }
        break;
    }
}

//Si no troba l'usuari l'afegeix
if (!$usuari_trobat) {
    $usuari_afegit = [
        "usuari" => $usuari,
        "contrasenya" => $contrasenya,
    ];
    $infoJson[] = $usuari_afegit;
    file_put_contents($path, json_encode($infoJson, JSON_PRETTY_PRINT));

    $_SESSION['usuari'] = $usuari;
    echo "Usuari registrat correctament";
    header("Location: ../administracio.php");
    exit();
}
