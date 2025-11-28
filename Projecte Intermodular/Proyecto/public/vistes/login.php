<!DOCTYPE html>
<html lang="ca">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/main.css">
    <script src="../javascripts/scriptLogin.js" defer></script>
</head>

<body class="pagina-login">

    <div class="login-camps">
        <span></span>
        <span></span>
        <span></span>
        <span></span>

        <h2>Login</h2>

        <?php
        session_start();
        if (isset($_SESSION['error'])) {
            echo "<div class='error-message'>";
            echo "<strong>Error:</strong> " . htmlspecialchars($_SESSION['error']);
            echo "</div>";
            unset($_SESSION['error']);
        }
        ?>
        <form method="post" action="../php/validarUsuari.php" id="login" novalidate>
            <div class="camps-texts">
                <input type="email" name="email" id="email" required placeholder=" ">
                <label for="email">Email</label>
                <small class="error-msg" id="email-error">El format de l'email no és vàlid</small>
            </div>
            <div class="camps-texts">
                <input type="password" name="password" id="password" required placeholder=" ">
                <label for="password">Contrasenya</label>
                <small class="error-msg" id="password-error">La contrasenya és obligatòria</small>
            </div>
            <small class="error-msg" id="form-buit">Els camps no poden estar buits</small>
            <button type="submit" class="button-login">
                <span>Entrar</span>
            </button>


        </form>
    </div>


    <!-- <?php
            session_start();
            if (isset($_SESSION['error'])) {
                echo "<div style='color: red; padding: 10px; background: #ffe6e6;'>";
                echo "Error: " . htmlspecialchars($_SESSION['error']);
                echo "</div>";
                unset($_SESSION['error']); // Netejar després de mostrar
            }
            ?> -->
</body>

</html>