const CLAVE_TEMA = 'tema-usuario';
const CLASE_TEMA_OSCURO = 'dark-mode'; // La clase que activa el tema oscuro

// Aplica o elimina la clase 'dark-mode' en el <body>
// para cambiar los colores mediante CSS.
function aplicarTema(tema) {
    if (tema === CLASE_TEMA_OSCURO) {
        document.body.classList.add(CLASE_TEMA_OSCURO);
    } else {
        document.body.classList.remove(CLASE_TEMA_OSCURO);
    }
}

// Muestra el icono (sol o luna) correcto según el tema actual.
function actualizarIconos(tema) {
    const todosLosIconos = document.querySelectorAll('.icono-tema');
    // esModoOscuro será true si el tema actual es 'dark-mode'
    const esModoOscuro = tema === CLASE_TEMA_OSCURO;

    todosLosIconos.forEach(icono => {
        if (esModoOscuro) {
            // Modo Oscuro: se ve el Sol (para cambiar a Claro)
            if (icono.classList.contains('icono-sol')) {
                icono.style.display = 'block';
            } else if (icono.classList.contains('icono-luna')) {
                icono.style.display = 'none';
            }
        }
        else {
            // Modo Claro: se ve la Luna (para cambiar a Oscuro)
            if (icono.classList.contains('icono-luna')) {
                icono.style.display = 'block';
            } else if (icono.classList.contains('icono-sol')) {
                icono.style.display = 'none';
            }
        }
    });
}

// Alterna el tema (claro/oscuro), lo aplica y guarda la preferencia en localStorage.
function alternarTema() {
    // Comprueba si el body tiene la clase 'dark-mode'
    const esModoOscuroActual = document.body.classList.contains(CLASE_TEMA_OSCURO);

    // Si es oscuro, pasa a claro (''). Si es claro, pasa a oscuro ('dark-mode').
    let nuevoTema = esModoOscuroActual ? '' : CLASE_TEMA_OSCURO;

    aplicarTema(nuevoTema);
    actualizarIconos(nuevoTema);
    localStorage.setItem(CLAVE_TEMA, nuevoTema);
}

// Configura el evento de clic en los botones y carga el tema al iniciar la página.
document.addEventListener('DOMContentLoaded', () => {
    // 1. Añade el listener a todos los botones con la clase 'boton-tema'
    const botonesTema = document.querySelectorAll('.boton-tema');
    botonesTema.forEach(boto => {
        boto.addEventListener('click', alternarTema);
    });

    // 2. Carga la preferencia guardada o la del sistema operativo
    const temaGuardado = localStorage.getItem(CLAVE_TEMA);
    const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let temaInicial = ''; // El tema CLARO es el por defecto (clase vacía)

    if (temaGuardado) {
        temaInicial = temaGuardado;
    } else if (preferenciaSistema) {
        // Si el sistema prefiere DARK, iniciamos en modo oscuro
        temaInicial = CLASE_TEMA_OSCURO;
    }
    // Si no hay guardado y el sistema prefiere CLARO, queda temaInicial = ''.

    aplicarTema(temaInicial);
    actualizarIconos(temaInicial);
});