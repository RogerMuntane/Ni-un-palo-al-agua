<?php
session_start();

//Verifica si l'usuari esta identificat
if (!isset($_SESSION['usuari'])) {
    header("Location: login.php");
    exit();
}

$usuari = $_SESSION['usuari'];

//Carrega les dates del JSON
$path = __DIR__ . "/../json/productes.json";
$dadesUsuari = [];
$historial = [];
$totalGeneral = 0;

if (file_exists($path)) {
    $productes = json_decode(file_get_contents($path), true);

    //Verifica si el usuari ja hi es al JSON
    if (isset($productes[$usuari])) {
        $dadesUsuari = $productes[$usuari];

        //Obte l'historial dels tiquets
        if (isset($dadesUsuari['historial']) && is_array($dadesUsuari['historial'])) {
            $historial = $dadesUsuari['historial'];

            //Calcula el total de tots els tiquets
            foreach ($historial as $tiquet) {
                foreach ($tiquet as $producte) {
                    $totalGeneral += $producte['price'] * $producte['quantity'];
                }
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Historial de Tiquets</title>
    <link rel="stylesheet" href="../css/main.css" />
    <script src="../javascripts/header.js" defer></script>
    <script src="../javascripts/historial.js" defer></script>
    <script src="../javascripts/scriptTemas.js" defer></script>
</head>

<body>

    <script>
        const usuariPHP = <?php echo json_encode($usuari); ?>;
    </script>

    <!-- HEADER -->
    <header>

        <!-- Logo -->
        <a href="inici.html" class="logo-link">
            <img src="../Images/logo.png" alt="Ni Un Palo Al Agua" class="logo" draggable="false" usemap="#logo-map">
        </a>

        <!-- Nav -->
        <ul class="nav-header">
            <li>
                <button class="boto-rodo boton-tema boto-rodo-nav" aria-label="Canviar tema">
                    <img src="../Images/luna.png" alt="Mode Fosc" class="icones-nav icono-tema icono-luna"
                        draggable="false">
                    <img src="../Images/sun.png" alt="Mode Clar" class="icones-nav icono-tema icono-sol" draggable="false"
                        style="display: none;">
                </button>
            </li>
            <li><a href="contacte.html">Contacte</a></li>
            <li><a href="tcarreto.html">&#128722;Carretó</a></li>
            <li><a href="tenda.php">Tenda Online</a></li>
        </ul>

        <span class="burger-header" onclick="desplegarBurger()">&#9776;</span>

        <div id="sidepanel" class="sidepanel">
            <button class="boto-rodo boton-tema lluna-sidepanel boto-rodo-nav" aria-label="Canviar tema">
                <img src="../Images/luna.png" alt="Mode Fosc" class="icones-nav icono-tema icono-luna" draggable="false">
                <img src="../Images/sun.png" alt="Mode Clar" class="icones-nav icono-tema icono-sol" draggable="false" style="display: none;">
            </button>
            <a href="javascript:void(0)" class="boto-tancar-sidepanel" onclick="tancarSidepanel()">×</a>
            <br>
            <a href="inici.html">Inici</a>
            <a href="tenda.php">Tenda Online</a>
            <a href="carreto.html">&#128722;Carretó</a>
            <a href="contacte.html">Contacte</a>
        </div>

        <div id="overlaySidepanel" class="overlay-sidepanel" onclick="tancarSidepanel()"></div>

    </header>

    <!-- CONTINGUT PRINCIPAL -->
    <div class="historial-container">
        <h1 class="historial-titol">Historial de Tiquets - <?php echo htmlspecialchars($usuari); ?></h1>

        <div class="filtres-container">
            <button class="btn-afegir" onclick="afegirTiquet()">+ Afegir Tiquet</button>
            <input type="text" id="cerca" class="input-cerca" placeholder="Cerca per producte...">
        </div>

        <div id="tiquets-llista" class="tiquets-llista">
            <?php if (empty($historial)): ?>
                <p class="missatge-buit">No hi ha tiquets disponibles.</p>
            <?php else: ?>
                <?php foreach ($historial as $index => $tiquet): ?>
                    <?php
                    $totalTiquet = 0;
                    foreach ($tiquet as $producte) {
                        $totalTiquet += $producte['price'] * $producte['quantity'];
                    }
                    ?>
                    <div class="tiquet-card">
                        <div class="tiquet-header">
                            <h3>Tiquet #<?php echo $index + 1; ?></h3>
                            <span class="tiquet-data"><?php echo isset($dadesUsuari['ultima_actualizacion']) ? htmlspecialchars($dadesUsuari['ultima_actualizacion']) : 'Data desconeguda'; ?></span>
                        </div>
                        <div class="tiquet-productes">
                            <table class="taula-productes">
                                <thead>
                                    <tr>
                                        <th>Producte</th>
                                        <th class="alineat-centre">Quantitat</th>
                                        <th class="alineat-dreta">Preu</th>
                                        <th class="alineat-dreta">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($tiquet as $producte): ?>
                                        <tr>
                                            <td>
                                                <div class="producte-info">
                                                    <?php if (isset($producte['image'])): ?>
                                                        <img src="<?php echo htmlspecialchars($producte['image']); ?>"
                                                            alt="<?php echo htmlspecialchars($producte['name']); ?>"
                                                            onerror="this.src='../Images/default.png'">
                                                    <?php endif; ?>
                                                    <span><?php echo htmlspecialchars($producte['name']); ?></span>
                                                </div>
                                            </td>
                                            <td class="alineat-centre"><?php echo $producte['quantity']; ?></td>
                                            <td class="alineat-dreta"><?php echo number_format($producte['price'], 2); ?> €</td>
                                            <td class="alineat-dreta"><?php echo number_format($producte['price'] * $producte['quantity'], 2); ?> €</td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                        <div class="tiquet-total">
                            Total: <?php echo number_format($totalTiquet, 2); ?> €
                        </div>
                        <div class="tiquet-accions">
                            <button class="btn-editar" onclick="editarTiquet(<?php echo $index; ?>)">Editar</button>
                            <button class="btn-eliminar" onclick="eliminarTiquet(<?php echo $index; ?>)">Eliminar</button>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>

        <div class="totals-container">
            <h3>Total General: <span id="total-general"><?php echo number_format($totalGeneral, 2); ?></span> €</h3>
        </div>
    </div>

    <!-- Modal per editar/afegir tiquet -->
    <div id="modal-tiquet" class="modal" role="dialog">
        <div class="modal-content" role="document">
            <button class="tancar-modal" onclick="tancarModal()">&times;</button>
            <h2 id="modal-titol">Editar Tiquet</h2>

            <form id="form-tiquet">
                <div class="form-grup">
                    <label for="data">Data:</label>
                    <input type="date" id="data" required>
                </div>

                <h3>Productes</h3>
                <div class="product-list-scroll">
                    <ul id="llista-productes">
                        <!-- Els productes s'afegeixen aquí -->
                    </ul>
                </div>

                <div style="margin-top:10px;">
                    <button type="button" class="btn-afegir" onclick="afegirProducteForm()">+ Afegir producte</button>
                </div>

                <div class="botons-modal">
                    <button type="submit" class="btn-guardar">Guardar</button>
                    <button type="button" class="btn-cancelar" onclick="tancarModal()">Cancel·lar</button>
                </div>
            </form>
        </div>
    </div>

    <footer>
        <div class="footer_imatge">
            <img src="../Images/mini-logo.png" alt="Logo">
        </div>

        <div class="footer_informacio">
            <p> <span>Autors:</span> <br>
                Xarvier Ruiz <br>
                Adria Salas <br>
                Roger Muntané <br>
            </p>
        </div>

        <div class="footer_direccio">
            <p>Riera de Cirera, 57, 08304 Mataró, Barcelona</p>
        </div>

        <div class="footer_condicions">
            <a href="condicionslegals.html">Condicions legals</a>
        </div>

        <div class="footer_copyright">
            <p>© 2025 Ni un palo al agua. All Rights Reserved</p>
        </div>
    </footer>

</body>

</html>