document.addEventListener('DOMContentLoaded', () => {

    // Elements dels camps
    const contacte = document.getElementById('contacte');
    const nom = document.getElementById('nom');
    const correu = document.getElementById('correu');
    const telefon = document.getElementById('telefon');
    const enviar = contacte.querySelector('button[type="submit"]');

    // Missatge error
    const errorNom = document.getElementById('nom-error');
    const errorCorreu = document.getElementById('correu-error');
    const errorTelefon = document.getElementById('telefon-error');

    // Expresions Regulars i constants
    const MAX_LENGTH = 256;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const symbolsRegex = /[!@$%^&*()_+={}\[\]|\\<>\?~]/;
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

    // Funcions per ensenyar/ocultar errors

    function mostrarError(entrada, error) {
        entrada.classList.add('error');
        error.style.display = 'block';
        setTimeout(() => error.classList.add('show'), 10);
    }

    function ocultarError(entrada, error) {
        entrada.classList.remove('error');
        error.classList.remove('show');
        setTimeout(() => error.style.display = 'none', 300);
    }

    // Si es correcte enviar sino no es pot enviar el formulari
    function validarEstatFormulari() {
        const nomEsValid = nomValid(nom.value);
        const correuEsValid = correuValid(correu.value);
        const telefonEsValid = telefonValid(telefon.value);

        if (nomEsValid && correuEsValid && telefonEsValid) {
            enviar.disabled = false;
        } else {
            enviar.disabled = true;
        }
    }

    contacte.addEventListener('submit', function(event) {
        let formulariCorrecte = true;

        const stringNom = nom.value.trim();
        if (stringNom.length > MAX_LENGTH || !nomValid(stringNom)) {
            formulariCorrecte = false;
            mostrarError(nom, errorNom);
        } else {
            ocultarError(nom, errorNom);
        }

        const stringCorreu = correu.value.trim();
        if (stringCorreu.length > MAX_LENGTH || !correuValid(stringCorreu)) {
            formulariCorrecte = false;
            mostrarError(correu, errorCorreu);
        } else {
            ocultarError(correu, errorCorreu);
        }

        const stringTelefon = telefon.value.trim();
        if (stringTelefon.length > MAX_LENGTH || !telefonValid(stringTelefon)) {
            formulariCorrecte = false;
            mostrarError(telefon, errorTelefon);
        } else {
            ocultarError(telefon, errorTelefon);
        }

        // PArem l'enviament si alguna cosa ha fallat
        if (!formulariCorrecte) {
            event.preventDefault();
        }
    });

    // Funció per controlar la longitud del text
    function controlarLongitud(inputElement) {
        if (inputElement.value.length > MAX_LENGTH) {
            inputElement.value = inputElement.value.substring(0, MAX_LENGTH);
        }
    }

    // Validacions en temps real

    nom.addEventListener('input', () => {
        controlarLongitud(nom);
        const stringNom = nom.value;
        if (nomValid(stringNom) || stringNom.trim().length === 0) {
            ocultarError(nom, errorNom);
        } else {
            mostrarError(nom, errorNom);
        }
        validarEstatFormulari();
    });

    correu.addEventListener('input', () => {
        controlarLongitud(correu);
        const stringCorreu = correu.value;
        if (correuValid(stringCorreu) || stringCorreu.trim().length === 0) {
            ocultarError(correu, errorCorreu);
        } else {
            mostrarError(correu, errorCorreu);
        }
        validarEstatFormulari();
    });

    telefon.addEventListener('input', () => {
        controlarLongitud(telefon);
        const stringTelefon = telefon.value;
        if (telefonValid(stringTelefon) || stringTelefon.trim().length === 0) {
            ocultarError(telefon, errorTelefon);
        } else {
            mostrarError(telefon, errorTelefon);
        }
        validarEstatFormulari();
    });

    nom.addEventListener('blur', () => {
        const stringNom = nom.value.trim();
        if (stringNom.length > 0 && !nomValid(stringNom)) {
            mostrarError(nom, errorNom);
        }
    });

    correu.addEventListener('blur', () => {
        const stringCorreu = correu.value.trim();
        if (stringCorreu.length > 0 && !correuValid(stringCorreu)) {
            mostrarError(correu, errorCorreu);
        }
    });

    telefon.addEventListener('blur', () => {
        const stringTelefon = telefon.value.trim();
        if (stringTelefon.length > 0 && !telefonValid(stringTelefon)) {
            mostrarError(telefon, errorTelefon);
        }
    });

    validarEstatFormulari();

});