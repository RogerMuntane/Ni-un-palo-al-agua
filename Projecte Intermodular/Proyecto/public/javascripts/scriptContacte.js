document.addEventListener('DOMContentLoaded', () => {

    // Elements dels camps
    const contacte = document.getElementById('contacte');
    const nom = document.getElementById('nom');
    const correu = document.getElementById('correu');
    const telefon = document.getElementById('telefon');

    // Missatge error
    const errorNom = document.getElementById('nom-error');
    const errorCorreu = document.getElementById('correu-error');
    const errorTelefon = document.getElementById('telefon-error');

    // Expresions Regulars i constants
    const MAX_LENGTH = 256;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const symbolsRegex = /[!@$%^&*()_+={}\[\]|\\<>\?~0-9]/;
    const telefonRegex = /^\d{9}$/;

    // Funciones de validacions
    function nomValid(stringNom) {
        stringNom = stringNom.trim();
        if (stringNom.length === 0)
            return false;
        if (symbolsRegex.test(stringNom))
            return false;
        return true;
    }

    function correuValid(stringCorreu) {
        stringCorreu = stringCorreu.trim();
        if (stringCorreu.length === 0)
            return false;
        return emailRegex.test(stringCorreu);
    }

    function telefonValid(stringTelefon) {
        stringTelefon = stringTelefon.trim();
        return telefonRegex.test(stringTelefon);
    }

    // Funcions per ensenyar els errors i ocultarlos
    function mostrarError(entrada, error, missatge = null) {
        if (missatge) {
            error.textContent = missatge;
        }
        entrada.classList.add('error');
        error.style.display = 'block';
        setTimeout(() => error.classList.add('show'), 10);
    }

    function ocultarError(entrada, error) {
        entrada.classList.remove('error');
        error.classList.remove('show');
    }

    // Validació quan es fa submit
    contacte.addEventListener('submit', function(event) {
        event.preventDefault();

        let formulariCorrecte = true;

        // Ocultar tots els errors abans de validar
        ocultarError(nom, errorNom);
        ocultarError(correu, errorCorreu);
        ocultarError(telefon, errorTelefon);

        const stringNom = nom.value.trim();
        if (stringNom.length === 0) {
            formulariCorrecte = false;
            mostrarError(nom, errorNom, "El nom és obligatori");
        } else if (stringNom.length > MAX_LENGTH || !nomValid(stringNom)) {
            formulariCorrecte = false;
            mostrarError(nom, errorNom, "El nom no pot contenir símbols o números");
        }

        const stringCorreu = correu.value.trim();
        if (stringCorreu.length === 0) {
            formulariCorrecte = false;
            mostrarError(correu, errorCorreu, "El correu és obligatori");
        } else if (stringCorreu.length > MAX_LENGTH || !correuValid(stringCorreu)) {
            formulariCorrecte = false;
            mostrarError(correu, errorCorreu, "El format del correu no és vàlid");
        }

        const stringTelefon = telefon.value.trim();
        if (stringTelefon.length === 0) {
            formulariCorrecte = false;
            mostrarError(telefon, errorTelefon, "El telèfon és obligatori");
        } else if (stringTelefon.length > MAX_LENGTH || !telefonValid(stringTelefon)) {
            formulariCorrecte = false;
            mostrarError(telefon, errorTelefon, "El telèfon ha de tenir 9 dígits");
        }

        // Enviar el formulari si tot és correcte
        if (formulariCorrecte) {
            contacte.submit();
        }
    });

    // Funcio per parar el text si supera la longitud maxima
    function controlarLongitud(inputElement) {
        if (inputElement.value.length > MAX_LENGTH) {
            inputElement.value = inputElement.value.substring(0, MAX_LENGTH);
        }
    }

    // Funcio per eliminar símbols i números del nom mentre s'escriu
    function eliminarSimbolsNom(inputElement) {
        inputElement.value = inputElement.value.replace(/[!@$%^&*()_+={}\[\]|\\<>\?~0-9]/g, '');
    }

    nom.addEventListener('input', () => {
        eliminarSimbolsNom(nom);
        controlarLongitud(nom);
        const stringNom = nom.value.trim();
        if (nomValid(stringNom) || stringNom.length === 0) {
            ocultarError(nom, errorNom);
        }
    });

    nom.addEventListener('blur', () => {
        const stringNom = nom.value.trim();
        if (stringNom.length === 0) {
            mostrarError(nom, errorNom, "El nom és obligatori");
        } else if (!nomValid(stringNom)) {
            mostrarError(nom, errorNom, "El nom no pot contenir símbols o números");
        } else {
            ocultarError(nom, errorNom);
        }
    });

    correu.addEventListener('input', () => {
        controlarLongitud(correu);
        const stringCorreu = correu.value.trim();
        if (correuValid(stringCorreu) || stringCorreu.length === 0) {
            ocultarError(correu, errorCorreu);
        }
    });

    correu.addEventListener('blur', () => {
        const stringCorreu = correu.value.trim();
        if (stringCorreu.length === 0) {
            mostrarError(correu, errorCorreu, "El correu és obligatori");
        } else if (!correuValid(stringCorreu)) {
            mostrarError(correu, errorCorreu, "El format del correu no és vàlid");
        } else {
            ocultarError(correu, errorCorreu);
        }
    });

    telefon.addEventListener('input', () => {
        controlarLongitud(telefon);
        const stringTelefon = telefon.value.trim();
        if (telefonValid(stringTelefon) || stringTelefon.length === 0) {
            ocultarError(telefon, errorTelefon);
        }
    });

    telefon.addEventListener('blur', () => {
        const stringTelefon = telefon.value.trim();
        if (stringTelefon.length === 0) {
            mostrarError(telefon, errorTelefon, "El telèfon és obligatori");
        } else if (!telefonValid(stringTelefon)) {
            mostrarError(telefon, errorTelefon, "El telèfon ha de tenir 9 dígits");
        } else {
            ocultarError(telefon, errorTelefon);
        }
    });
});