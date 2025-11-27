<?php

$path = __DIR__ . "/../json/login.json";

$usuari = $_POST["email"];
$contrasenya = $_POST["password"];

if (file_exists($path)) {
    $infoJson = json_decode(file_get_contents($path), true) ?? [];
    echo json_encode(["succes" => false, "error" => "Error en carregar"]);
} else {
    $infoJson = [];
}

$es_correcte = false;
$usuari_trobat = false;

foreach ($infoJson as $dades => $sessio) {
    if ($usuari == $sessio["usuari"]) {
        $usuari_trobat = true;
        if ($contrasenya == $sessio["contrasenya"]) {
            echo "Sessió iniciada correctament";
            header("Location: /../public/administracio.php");
            $es_correcte = true;
        } else {
            session_start();
            $_SESSION['error'] = "Contrasenya incorrecta";
            header("Location: /../public/login.php");
            exit();
        }
        break;
    }
}

// Si no hem trobat l'usuari, l'afegim
if (!$usuari_trobat) {
    $usuari_afegit = [
        "usuari" => $usuari,
        "contrasenya" => $contrasenya,
    ];
    $infoJson[] = $usuari_afegit;
    echo "Usuari registrat correctament";
    header("Location: /../public/administracio.php");
}

file_put_contents($path, json_encode($infoJson, JSON_PRETTY_PRINT));

$ch = curl_init("pagina2.php");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, ['dato' => $valor]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$resposta = curl_exec($ch);
unset($ch);

echo $resposta;
