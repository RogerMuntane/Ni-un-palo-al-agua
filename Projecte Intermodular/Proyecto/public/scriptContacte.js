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
    const symbolsRegex = /[!@$%^&*()_+={}\[\]|\\<>\?~]/;
    const telefonRegex = /^\d{9}$/;

    // Funciones de validacions
    function nomValid(stringNom) {
        stringNom =  nom.trim();
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

    // Funcions per ensenayar els errors i ocultarlos
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

    // Validació quan es fa submit
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

    // Funcio per para el text si supera la longitud maxima
    function controlarLongitud(inputElement) {
        if (inputElement.value.length > MAX_LENGTH) {
            inputElement.value = inputElement.value.substring(0, MAX_LENGTH);
        }
    }

    nom.addEventListener('input', () => {
        controlarLongitud(nom);
        const stringNom = nom.value.trim();
        if (nomValid(stringNom) || stringNom.length === 0) {
            ocultarError(nom, errorNom);
        } else {
            mostrarError(nom, errorNom);
        }
    });
    nom.addEventListener('blur', () => {
        const stringNom = nom.value.trim();
        if (stringNom.length === 0 || !nomValid(stringNom)) {
            if (stringNom.length > 0) { // Només mostra error si s'ha escrit quelcom invàlid
                mostrarError(nom, errorNom);
            }
        }
    });

    correu.addEventListener('input', () => {
        controlarLongitud(correu);
        const stringCorreu = correu.value.trim();
        if (correuValid(stringCorreu) || stringCorreu.length === 0) {
            ocultarError(correu, errorCorreu);
        } else {
            mostrarError(correu, errorCorreu);
        }
    });
    correu.addEventListener('blur', () => {
        const stringCorreu = correu.value.trim();
        if (stringCorreu.length > 0 && !correuValid(stringCorreu)) {
            mostrarError(correu, errorCorreu);
        }
    });

    telefon.addEventListener('input', () => {
        controlarLongitud(telefon);
        const stringTelefon = telefon.value.trim();
        if (telefonValid(stringTelefon) || stringTelefon.length === 0) {
            ocultarError(telefon, errorTelefon);
        } else {
            mostrarError(telefon, errorTelefon);
        }
    });
    telefon.addEventListener('blur', () => {
        const stringTelefon = telefon.value.trim();
        if (stringTelefon.length > 0 && !telefonValid(stringTelefon)) {
            mostrarError(telefon, errorTelefon);
        }
    });
});