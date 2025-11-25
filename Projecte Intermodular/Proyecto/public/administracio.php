<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Historial de Tiquets</title>
    <link rel="stylesheet" href="css/main.css" />
    <script src="script.js" defer></script>
    <script src="historial.js" defer></script>
</head>

<body>

    <?php
    $valor = $_POST['usuari'];
    echo "<script>const usuariPHP = " . json_encode($valor) . ";</script>";
    ?>

    <!-- HEADER -->
    <header>

        <!-- Logo -->
        <a href="inici.html" class="logo-link">
            <img src="Images/logo.png" alt="Ni Un Palo Al Agua" class="logo" draggable="false" usemap="#logo-map">
        </a>

        <!-- Nav -->
        <ul class="nav-header">
            <li>
                <button class="boto-rodo" onclick="modeFosc()">
                    <img src="Images/luna.png" alt="Mode Fosc" class="icone-mode-fosc icones-nav" draggable="false">
                </button>
            </li>
            <li>
                <button class="boto-rodo" onclick="location.href='login.php';">
                    <img src="Images/perfil.png" alt="Perfil" class="icone-perfil icones-nav" draggable="false">
                </button>
            </li>
            <li><a href="contacte.html">Contacte</a></li>
            <li><a href="carreto.html">&#128722;Carretó</a></li>
            <li><a href="tenda.html">Tenda Online</a></li>
        </ul>

        <span class="burger-header" onclick="desplegarBurger()">&#9776;</span>

        <div id="sidepanel" class="sidepanel">
            <button class="boto-rodo lluna-sidepanel" onclick="modeFosc()">
                <img src="Images/luna.png" alt="Mode Fosc" class="icones-nav icone-mode-fosc" draggable="false">
            </button>
            <button class="boto-rodo perfil-sidepanel" onclick="modeFosc()">
                <img src="Images/perfil.png" alt="Mode Fosc" class="icones-nav" draggable="false">
            </button>
            <a href="javascript:void(0)" class="boto-tancar-sidepanel" onclick="tancarSidepanel()">×</a>
            <br>
            <a href="inici.html">Inici</a>
            <a href="tenda.html">Tenda Online</a>
            <a href="carreto.html">&#128722;Carretó</a>
            <a href="contacte.html">Contacte</a>
        </div>

        <div id="overlaySidepanel" class="overlay-sidepanel" onclick="tancarSidepanel()"></div>

    </header>

    <!-- CONTINGUT PRINCIPAL -->
    <div class="historial-container">
        <h1 class="historial-titol">Historial de Tiquets</h1>

        <div class="filtres-container">
            <button class="btn-afegir" onclick="afegirTiquet()">+ Afegir Tiquet</button>
            <input type="text" id="cerca" class="input-cerca" placeholder="Cerca per producte...">
        </div>

        <div id="tiquets-llista" class="tiquets-llista">
            <!-- Els tiquets es carregaran aquí dinàmicament -->
        </div>

        <div class="totals-container">
            <h3>Total General: <span id="total-general">0.00</span> €</h3>
        </div>
    </div>

    <!-- Modal per editar/afegir tiquet -->
    <div id="modal-tiquet" class="modal" aria-hidden="true" role="dialog" aria-labelledby="modal-titol">
        <div class="modal-content" role="document">
            <button class="tancar-modal" aria-label="Tancar" onclick="tancarModal()">&times;</button>
            <h2 id="modal-titol">Editar Tiquet</h2>

            <form id="form-tiquet">
                <div class="form-grup">
                    <label for="data">Data:</label>
                    <input type="date" id="data" required>
                </div>

                <h3>Productes</h3>
                <div class="product-list-scroll">
                    <ul id="llista-productes">
                        <!-- Los productos se añadirán aquí -->
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
            <img src="../public/Images/mini-logo.png" alt="Logo">
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