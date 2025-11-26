document.addEventListener('DOMContentLoaded', () => {
    const formulari = document.getElementById('login');
    const email = document.getElementById('email');
    const enviar = formulari.querySelector('button[type="submit"]');

    const errorEmail = document.getElementById('email-error');

    const MAX_LENGTH = 256;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function emailValid(stringEmail) {
        return emailRegex.test(stringEmail.trim());
    }

    function mostrarError(inputElement, errorElement, missatge = null) {
        if (missatge) {
            errorElement.textContent = missatge;
        }
        if (inputElement) {
            inputElement.classList.add('error');
        }
        errorElement.style.display = 'block';
        setTimeout(() => errorElement.classList.add('show'), 10);
    }

    function ocultarError(inputElement, errorElement) {
        if (inputElement) {
            inputElement.classList.remove('error');
        }
        errorElement.classList.remove('show');
    }

    formulari.addEventListener('submit', function(event) {
        event.preventDefault();

        let formulariCorrecte = true;
        const stringEmail = email.value.trim();

        ocultarError(email, errorEmail);

        if (stringEmail.length === 0) {
            formulariCorrecte = false;
            mostrarError(email, errorEmail, "L'email és obligatori");
        } else if (stringEmail.length > MAX_LENGTH || !emailValid(stringEmail)) {
            formulariCorrecte = false;
            mostrarError(email, errorEmail, "El format de l'email no és vàlid");
        }

        if (formulariCorrecte) {
            formulari.submit();
        }
    });

    function controlarLongitud(inputElement) {
        if (inputElement.value.length > MAX_LENGTH) {
            inputElement.value = inputElement.value.substring(0, MAX_LENGTH);
        }
    }

    email.addEventListener('input', () => {
        controlarLongitud(email);
        const stringEmail = email.value.trim();

        if (emailValid(stringEmail) || stringEmail.length === 0) {
            ocultarError(email, errorEmail);
        }

    });

    email.addEventListener('blur', () => {
        const stringEmail = email.value.trim();

        if (stringEmail.length === 0) {
            mostrarError(email, errorEmail, "L'email és obligatori");
        } else if (stringEmail.length > 0 && !emailValid(stringEmail)) {
            mostrarError(email, errorEmail, "El format de l'email no és vàlid");
        } else {
            ocultarError(email, errorEmail);
        }
    });
});