const CLAVE_TEMA = 'tema-usuario';
const CLASE_TEMA_OSCURO = 'dark-mode';

function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

function aplicarTema(tema) {
    if (tema === CLASE_TEMA_OSCURO) {
        document.body.classList.add(CLASE_TEMA_OSCURO);
    } else {
        document.body.classList.remove(CLASE_TEMA_OSCURO);
    }
}

function actualizarIconos(tema) {
    const todosLosIconos = document.querySelectorAll('.icono-tema');
    const esModoOscuro = tema === CLASE_TEMA_OSCURO;

    todosLosIconos.forEach(icono => {
        if (esModoOscuro) {
            if (icono.classList.contains('icono-sol')) {
                icono.style.display = 'block';
            } else if (icono.classList.contains('icono-luna')) {
                icono.style.display = 'none';
            }
        } else {
            if (icono.classList.contains('icono-luna')) {
                icono.style.display = 'block';
            } else if (icono.classList.contains('icono-sol')) {
                icono.style.display = 'none';
            }
        }
    });
}

function alternarTema() {
    const esModoOscuroActual = document.body.classList.contains(CLASE_TEMA_OSCURO);
    let nuevoTema = esModoOscuroActual ? '' : CLASE_TEMA_OSCURO;

    aplicarTema(nuevoTema);
    actualizarIconos(nuevoTema);
    setCookie(CLAVE_TEMA, nuevoTema);
}

document.addEventListener('DOMContentLoaded', () => {
    const botonesTema = document.querySelectorAll('.boton-tema');
    botonesTema.forEach(boto => {
        boto.addEventListener('click', alternarTema);
    });

    let temaInicial;
    const temaCookie = getCookie(CLAVE_TEMA);

    if (temaCookie !== null) {
        //Si hi ha cookie guardada, usar-la
        temaInicial = temaCookie;
    } else {
        //Primera vegada: usar preferència del sistema
        const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
        temaInicial = preferenciaSistema ? CLASE_TEMA_OSCURO : '';
        setCookie(CLAVE_TEMA, temaInicial); //Guardar preferència inicial
    }

    aplicarTema(temaInicial);
    actualizarIconos(temaInicial);
});