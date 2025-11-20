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

    function mostrarError(inputElement, errorElement) {
        inputElement.classList.add('error');
        errorElement.style.display = 'block';
        setTimeout(() => errorElement.classList.add('show'), 10);
    }

    function ocultarError(inputElement, errorElement) {
        inputElement.classList.remove('error');
        errorElement.classList.remove('show');
        setTimeout(() => errorElement.style.display = 'none', 300);
    }

    function validarEstatFormulari() {
        if (emailValid(email.value)) {
            enviar.disabled = false;
        } else {
            enviar.disabled = true;
        }
    }

    formulari.addEventListener('submit', function(event) {
        let formulariCorrecte = true;

        const stringEmail = email.value.trim();
        if (stringEmail.length > MAX_LENGTH || !emailValid(stringEmail)) {
            formulariCorrecte = false;
            mostrarError(email, errorEmail);
        } else {
            ocultarError(email, errorEmail);
        }

        if (!formulariCorrecte) {
            event.preventDefault();
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
        } else {
            mostrarError(email, errorEmail);
        }

        validarEstatFormulari();
    });

    email.addEventListener('blur', () => {
        const stringEmail = email.value.trim();
        if (stringEmail.length > 0 && !emailValid(stringEmail)) {
            mostrarError(email, errorEmail);
        }
    });

    validarEstatFormulari();
});