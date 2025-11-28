const CLAVE_TEMA = 'tema-usuario';
const CLASE_TEMA_OSCURO = 'dark-mode';

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
    localStorage.setItem(CLAVE_TEMA, nuevoTema);
}

document.addEventListener('DOMContentLoaded', () => {
    const botonesTema = document.querySelectorAll('.boton-tema');
    botonesTema.forEach(boto => {
        boto.addEventListener('click', alternarTema);
    });

    let temaInicial;

    if (localStorage.getItem(CLAVE_TEMA) !== null) {
        // Si hay algo guardado (incluso si es ''), úsalo
        temaInicial = localStorage.getItem(CLAVE_TEMA);
    } else {
        // Solo la primera vez, usa la preferencia del sistema
        const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
        temaInicial = preferenciaSistema ? CLASE_TEMA_OSCURO : '';
        // Guarda la preferencia inicial
        localStorage.setItem(CLAVE_TEMA, temaInicial);
    }

    aplicarTema(temaInicial);
    actualizarIconos(temaInicial);
});