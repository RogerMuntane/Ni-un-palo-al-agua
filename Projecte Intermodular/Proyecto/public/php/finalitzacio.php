<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compra Realitzada amb Èxit</title>
    <link rel="stylesheet" href="../css/main.css">
</head>

<body class="purchase-success">
    <?php
    $carret = json_decode($_POST["carret_data"] ?? "{}", true);
    $total = json_decode($_POST["total_data"]);
    ?>

    <!-- Si el carretó esta buit-->

    <?php if (empty($carret)): ?>

        <div class="container">
            <div class="success-header">
                <div class="checkmark">
                    <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>

                    <!-- Dibuixa un cercle i un signe de exclamació amb svg
                     fa un cercle amb el centre a (12,12) i amb radi 10
                     fa una linea amb les coordenades donades
                     i fa un punt fent una linea amb la mateixa y i x inicial i final
                     -->
                </div>
                <h1>El Teu Carret Està Buit</h1>
                <p>No pots procedir amb la compra</p>
            </div>

            <div class="ticket">
                <div class="ticket-header">
                    <h2>NO HI HA PRODUCTES</h2>
                </div>

                <div class="ticket-info">
                    <div class="info-row">
                        <span class="info-label">Motiu:</span>
                        <span>Carret sense articles</span>
                    </div>
                </div>

                <div class="ticket-footer">
                    <div class="item info-buit">
                        El teu carret està buit. Afegeix productes per continuar.
                    </div>
                </div>

                <div class="ticket-footer">
                    <p>Explora els nostres productes i afegeix-los al carret</p>
                    <button class="btn-print" onclick="location.href='../vistes/tenda.php';">Tornar a la Botiga</button>
                </div>
            </div>
        </div>

        <!-- Si el carretó no esta buit-->

    <?php else: ?>

        <?php
        $path = __DIR__ . "/../json/productes.json";

        $email = $_POST["email"];

        if (file_exists($path)) {
            $jsonData = json_decode(file_get_contents($path), true) ?? [];
            echo json_encode(["succes" => false, "error" => "Error en carregar"]);
        } else {
            $jsonData = [];
        }

        // Usar email como clave, actualizar en lugar de duplicar
        $jsonData[$email] = [
            'carret' => $carret,
            'total' => $total,
            'ultima_actualizacion' => date('Y-m-d H:i:s'),
            'historial' => isset($jsonData[$email]['historial']) ?
                array_merge($jsonData[$email]['historial'], [$carret]) :
                [$carret]
        ];

        file_put_contents($path, json_encode($jsonData, JSON_PRETTY_PRINT));
        ?>



        <div class="container">
            <div class="success-header">
                <div class="checkmark">
                    <svg viewBox="0 0 52 52">
                        <path d="M14 27l8 8 16-16" />
                    </svg>
                    <!-- Dibuixa un tick amb svg
                     M14 27 indica la posició inicial del llapís
                     l8 8 indica una linea 8 cap avall i 8 cap a la dreta
                     l16 -16 la l s'omiteix perque ja es implicita,
                     aixo crea una linea 16 cap a dalt i 16 cap a la dreta
                     -->
                </div>
                <h1>¡Compra Realitzada amb Éxit!</h1>
                <p>La teva comanda ha sigut processada correctament</p>
            </div>

            <div class="ticket">
                <div class="ticket-header">
                    <h2>TICKET DE COMPRA</h2>
                </div>

                <div class="ticket-info">
                    <div class="info-row">
                        <span class="info-label">Data:</span>
                        <span class="fecha"><?php echo date('Y-m-d') ?></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Hora:</span>
                        <span class="hora"><?php echo date('H:i:s') ?></span>
                    </div>
                </div>

                <div class="items">
                    <?php
                    foreach ($carret as $producte) {
                        echo '
                            <div class="item">
                                <span class="item-name">' . $producte["name"] . '</span>
                                <span class="item-qty">x' . $producte["quantity"] . '</span>
                                <span class="item-price">' . number_format($producte["price"], 2) . '€</span>
                            </div>
                        ';
                    }
                    ?>
                </div>

                <div class="totals">
                    <div class="total-row">
                        <span>Subtotal:</span>
                        <span><?php echo number_format($total - 5, 2); ?>€</span>
                    </div>
                    <div class="total-row">
                        <span>Enviament:</span>
                        <span>5,00€</span>
                    </div>
                    <div class="total-row final">
                        <span>TOTAL:</span>
                        <span> <?php echo number_format($total, 2); ?>€</span>
                    </div>
                </div>

                <div class="ticket-footer">
                    <p>¡Gràcies per la teva compra!</p>
                    <button class="btn-print" onclick="location.href='../vistes/inici.html';">Tornar al Inici</button>
                </div>
            </div>
        </div>
    <?php endif; ?>
</body>

</html>