<?php
session_start();
header('Content-Type: application/json');

// Verificar autenticación
if (!isset($_SESSION['usuari'])) {
    die(json_encode(['success' => false, 'error' => 'No autenticat']));
}

$input = json_decode(file_get_contents('php://input'), true);
$usuari = $_SESSION['usuari'];
$accio = $input['accio'];
$path = __DIR__ . "/../json/productes.json";

//Carrega les dades
if (file_exists($path)) {
    $data = json_decode(file_get_contents($path), true);
} else {
    $data = [];
}

//Inicialitza l'usuari si no existeix
if (!isset($data[$usuari])) {
    $data[$usuari] = [
        'carret' => [],
        'total' => 0,
        'ultima_actualizacion' => date('Y-m-d H:i:s'),
        'historial' => []
    ];
}

//Switch segons l'accio en el tiquet
switch ($accio) {

    case 'obtenir':
        //Obtindre un tiquet especific
        $index = $input['index'];

        if (!isset($data[$usuari]['historial'][$index])) {
            die(json_encode(['success' => false, 'error' => 'Tiquet no trobat']));
        }

        echo json_encode([
            'success' => true,
            'productes' => $data[$usuari]['historial'][$index]
        ]);
        break;

    case 'afegir':
        //Afegeix un nou tiquet
        $productes = $input['productes'];

        $data[$usuari]['historial'][] = $productes;
        $data[$usuari]['ultima_actualizacion'] = date('Y-m-d H:i:s');

        if (file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT))) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al guardar']);
        }
        break;

    case 'editar':
        //Edita un tiquet ja creat
        $index = $input['index'];
        $productes = $input['productes'];

        if (!isset($data[$usuari]['historial'][$index])) {
            die(json_encode(['success' => false, 'error' => 'Tiquet no trobat']));
        }

        $data[$usuari]['historial'][$index] = $productes;
        $data[$usuari]['ultima_actualizacion'] = date('Y-m-d H:i:s');

        if (file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT))) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al guardar']);
        }
        break;

    case 'eliminar':
        //Elimina un tiquet
        $index = $input['index'];

        if (!isset($data[$usuari]['historial'][$index])) {
            die(json_encode(['success' => false, 'error' => 'Tiquet no trobat']));
        }

        array_splice($data[$usuari]['historial'], $index, 1);
        $data[$usuari]['ultima_actualizacion'] = date('Y-m-d H:i:s');

        if (file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT))) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al eliminar']);
        }
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Acció no vàlida']);
        break;
}
