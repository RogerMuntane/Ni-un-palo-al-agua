<?php

function carregarProductes()
{
    $jsonPath = __DIR__ . '/../json/productes_tenda.json';

    if (!file_exists($jsonPath)) {
        error_log("Fitxer no trobat: " . $jsonPath);
        echo json_encode(["succes" => false, "error" => "Error en carregar"]);
        return null;
    }

    $jsonData = file_get_contents($jsonPath);
    $data = json_decode($jsonData, true);

    if ($data === null) {
        error_log("Error al parsejar JSON: " . json_last_error_msg());
        return null;
    }

    return $data['categories'];
}

function renderProducte($producte)
{
    $preuFormatat = number_format($producte['preu'], 2, '.', '');
    echo "
        <div class='producte'>
            <img src='{$producte['imatge']}' alt='{$producte['alt']}'>
            <h4>{$producte['nom']}</h4>
            <p class='preu'>{$preuFormatat}€</p>
            <button class='btn_comprar'>Afegir al carret</button>
        </div>";
}

function renderCategoria($categoria)
{
    echo "
    <div class='categoria'>
        <div class='categoria_header'>
            <h3>{$categoria['nom']}</h3>
        </div>
        <div class='categoria_productes'>";

    foreach ($categoria['productes'] as $producte) {
        renderProducte($producte);
    }

    echo "
        </div>
    </div>";
}

function renderTenda()
{
    $categories = carregarProductes();

    if ($categories === null) {
        echo "<p>Error en carregar els productes</p>";
        return;
    }

    echo "<section class='tenda_categories'>
            <h1>La nostra oferta</h1>";

    foreach ($categories as $categoria) {
        renderCategoria($categoria);
    }

    echo "</section>";
}


renderTenda();
