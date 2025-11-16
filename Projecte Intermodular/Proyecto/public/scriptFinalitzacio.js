document.addEventListener('DOMContentLoaded', () => {
    // Control per el camp email
    const email = document.getElementById('email');
    const errorEmail = document.getElementById('email-error');
    const formulari = document.getElementById('tiquet');

    // Control per la part d'adreça
    const adreca = document.getElementById('adreca');
    let errorAdreca = document.getElementById('adreca-error');

    // Longitud maxima de caracters
    const MAX_LENGTH = 256;

    // Expresió regular per validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function emailValid(email) {
        return emailRegex.test(email);
    }

    // Regex per validar adreça (lletres, espais, guions, apòstrofs)
    // const adrecaRegex = /^[\p{L}\s'-]+$/u;
    const symbolsRegex = /[!@$%^&*()_+={}\[\]|\\<>\?~]/;

    function adrecaValid(stringAdreca) {
        stringAdreca = stringAdreca.trim();
        if (stringAdreca.length === 0)
            return true;
        if (stringAdreca.length < 5)
            return false;
        if (symbolsRegex.test(stringAdreca))
            return false;
        return true;
    }

    // Funcions per mostrar/ocultar errors (EMAIL)
    function mostrarErrorEmail() {
        email.classList.add('error');
        errorEmail.style.display = 'block';
        setTimeout(() => errorEmail.classList.add('show'), 10);
    }

    function ocultarErrorEmail() {
        email.classList.remove('error');
        errorEmail.classList.remove('show');
        setTimeout(() => errorEmail.style.display = 'none', 300);
    }

    // Funcions per mostrar/ocultar errors (ADREÇA)
    function mostrarErrorAdreca() {
        adreca.classList.add('error');
        errorAdreca.style.display = 'block';
        setTimeout(() => errorAdreca.classList.add('show'), 10);
    }

    function ocultarErrorAdreca() {
        adreca.classList.remove('error');
        errorAdreca.classList.remove('show');
        setTimeout(() => errorAdreca.style.display = 'none', 300);
    }

    // Per validar quan s'envia el formulari
    formulari.addEventListener('submit', function(event) {
        let formulariCorrecte = true;

        const stringEmail = email.value.trim();
        if (stringEmail.length > MAX_LENGTH) {
            formulariCorrecte = false;
            mostrarErrorEmail();
        } else if (!emailValid(stringEmail)) {
            formulariCorrecte = false;
            mostrarErrorEmail();
        } else {
            ocultarErrorEmail();
        }

        const stringAdreca = adreca.value.trim();
        if (stringAdreca.length > MAX_LENGTH) {
            formulariCorrecte = false;
            mostrarErrorAdreca();
        } else if (!adrecaValid(stringAdreca)) {
            formulariCorrecte = false;
            mostrarErrorAdreca();
        } else {
            ocultarErrorAdreca();
        }

        if (!formulariCorrecte) {
            event.preventDefault();
        }
    });

    // Validar email en temps real
    email.addEventListener('input', function() {

        if (email.value.length > MAX_LENGTH) {
            email.value = email.value.substring(0, MAX_LENGTH);
        }

        const stringEmail = email.value.trim();

        if (emailValid(stringEmail) || stringEmail.length === 0) {
            ocultarErrorEmail();
        } else {
            mostrarErrorEmail();
        }
    });

    email.addEventListener('blur', function() {
        const stringEmail = email.value.trim();

        if (stringEmail.length > 0 && !emailValid(stringEmail)) {
            mostrarErrorEmail();
        }
    });

    // Validar adreça en temps real
    adreca.addEventListener('input', function() {

        if (adreca.value.length > MAX_LENGTH) {
            adreca.value = adreca.value.substring(0, MAX_LENGTH);
        }

        const stringAdreca = adreca.value.trim();

        if (adrecaValid(stringAdreca) || stringAdreca.length === 0) {
            ocultarErrorAdreca();
        } else {
            mostrarErrorAdreca();
        }
    });

    adreca.addEventListener('blur', function() {
        const stringAdreca = adreca.value.trim();

        if (stringAdreca.length > 0 && !adrecaValid(stringAdreca)) {
            mostrarErrorAdreca();
        }
    });
});

// Control per el camp intolerancies



// Control per el camp telefon



// Control per el camp extra
