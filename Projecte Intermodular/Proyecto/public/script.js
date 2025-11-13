
//Funcions que obren i tancen el sidepanel

function desplegarBurger() {
    document.getElementById("sidepanel").classList.add("active");
    document.getElementById("overlaySidepanel").classList.add("active");
}

function tancarSidepanel() {
    document.getElementById("sidepanel").classList.remove("active");
    document.getElementById("overlaySidepanel").classList.remove("active");
}


//Fució que adjusta la barra buscadora per a que utilitzi el mayor espai possible

function ajustarBuscador() {
    const buscador = document.querySelector(".buscador-header");
    if (!buscador) return; //evita errors si no existeix

    let width = window.innerWidth;

    if (width > 1240) {
        width = 1240; //limita la mida màxima
    }

    const input = buscador.querySelector("input");
    const enFocus = document.activeElement === input; //comprova si el buscador té focus

    const defecteWidth = "220px";

    if (width > 1024) {
        buscador.style.width = enFocus
            ? width * 0.787 - 545.09 + "px" //funció que adjusta correctamenta el buscador segons la mida
            : defecteWidth;
    } else {
        buscador.style.width = enFocus
            ? width * 0.946 - 318.7 + "px"  //funció que la adjusta per tablets
            : defecteWidth;
    }


}

// executa en carregar i en canviar la mida
window.addEventListener("load", ajustarBuscador);
window.addEventListener("resize", ajustarBuscador);

// també quan fas focus o surts del focus
document.addEventListener("focusin", ajustarBuscador);
document.addEventListener("focusout", ajustarBuscador);