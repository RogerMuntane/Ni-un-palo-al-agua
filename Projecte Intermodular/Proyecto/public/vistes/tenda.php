<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/main.css">
    <script src="tenda.js" defer></script>
    <script src="script.js" defer></script>
    <script src="scriptTemas.js" defer></script>
</head>

<body>
    <!-- HEADER -->
    <header class="header-tenda">

        <!-- Logo -->
        <a href="inici.html" class="logo-link">
            <img src="Images/logo.png" alt="Ni Un Palo Al Agua" class="logo" draggable="false">
        </a>

        <!-- Barra Buscadora -->
        <div class="buscador buscador-header">
            <input type="text" placeholder="Buscar Producte" id="buscador">
            <button>&#128269;</button>
        </div>

        <!-- Nav -->
        <ul class="nav-header">
            <li>
                <button class="boto-rodo boton-tema" aria-label="Canviar tema">
                    <img src="Images/luna.png" alt="Mode Fosc" class="icones-nav icono-tema icono-luna" draggable="false">
                    <img src="Images/sun.png" alt="Mode Clar" class="icones-nav icono-tema icono-sol" draggable="false" style="display: none;">
                </button>
            </li>

            <li>
                <button class="boto-rodo boto-rodo-nav" onclick="location.href='login.php';">
                    <img src="Images/perfil.png" alt="Perfil" class="icone-perfil icones-nav" draggable="false">
                </button>
            </li>

            <li><a href="contacte.html">Contacte</a></li>
            <li><a href="carreto.html">&#128722;Carretó</a></li>
            <li><a href="tenda.php">Tenda Online</a></li>
        </ul>

        <!-- Menu Hamburguesa -->
        <span class="burger-header" onclick="desplegarBurger()">&#9776;</span>

        <!-- Sidepanel -->
        <div id="sidepanel" class="sidepanel">
            <!-- Mode Fosc -->
            <button class="boto-rodo boton-tema lluna-sidepanel" aria-label="Canviar tema">
                <img src="Images/luna.png" alt="Mode Fosc" class="icones-nav icono-tema icono-luna" draggable="false">
                <img src="Images/sun.png" alt="Mode Clar" class="icones-nav icono-tema icono-sol" draggable="false" style="display: none;">
            </button>
            <!-- Perfil -->
            <button class="boto-rodo perfil-sidepanel" onclick="location.href='login.php'">
                <img src="Images/perfil.png" alt="Pefil" class="icones-nav" draggable="false">
            </button>
            <!-- Boto de Tancament -->
            <a href="javascript:void(0)" class="boto-tancar-sidepanel" onclick="tancarSidepanel()">×</a>
            <br>
            <!-- Barra Buscadora Sidepanel -->
            <div class="buscador buscador-sidepanel">
                <input type="text" placeholder="Buscar Producte" id="buscador-sidepanel">
                <button>&#128269;</button>
            </div>
            <!-- Links -->
            <a href="inici.html">Inici</a>
            <a href="tenda.php">Tenda Online</a>
            <a href="carreto.html">&#128722;Carretó</a>
            <a href="contacte.html">Contacte</a>


        </div>

        <!-- Logo -->
        <div id="overlaySidepanel" class="overlay-sidepanel" onclick="tancarSidepanel()"></div>

    </header>








    <!-- Banner -->
    <section class="tenda_banner">
        <div class="tenda_banner_content">
            <h1>Benvingut a la nostra Tenda</h1>
            <p>Descobreix els millors productes de la nostra cantina</p>
        </div>
    </section>

    <!-- Text Introductori -->
    <section class="tenda_intro">
        <div class="tenda_intro_content">
            <h2>Productes recomanats</h2>
            <p>A la nostra cantina trobaràs una gran varietat de productes elaborats amb ingredients de qualitat.
                Des de bocadillos fins a begudes refrescants, tot pensat perquè gaudeixis d'una experiència gastronòmica
                completa.</p>
        </div>

        <div class="llistat_ofertes"></div>
    </section>

    <!-- Categories de Menjar -->
    <section class="tenda_categories">
        <?php
        require_once __DIR__ . '/php/carregar_productes.php';
        ?>


    </section>


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