function promocioDelDia() {
    const productes = [
        {
            id: 1,
            nom: "Barreta energetica",
            preu: 3.50,
            imatge: "../Images/barreta.jpg"
        },
        {
            id: 2,
            nom: "Entrepa de butifarra",
            preu: 4.50,
            imatge: "../Images/bocadillo_butifarra.jpg"
        },
        {
            id: 3,
            nom: "Refresc",
            preu: 2.00,
            imatge: "../Images/cocacola.jpg"
        },
        {
            id: 4,
            nom: "Suc Natural",
            preu: 2.50,
            imatge: "../Images/zumo-de-naranja.jpg"
        },
        {
            id: 5,
            nom: "Pastís de Xocolata",
            preu: 3.00,
            imatge: "../Images/pastel.jpg"
        },
        {
            id: 6,
            nom: "Iogurt Natural",
            preu: 1.50,
            imatge: "../Images/iogurt.jpg"
        }
    ];

    const fecha = new Date();
    const dia = fecha.getDay();

    const productes_final = [];

    if ((dia % 2) == 0) {
        for (let i = 0; i < productes.length; i += 2) {
            productes_final.push(productes[i]);
        }
    } else {
        for (let i = 1; i < productes.length; i += 2) {
            productes_final.push(productes[i]);
        }
    }

    return productes_final;
}

function mostrarpromocio() {
    const productes = promocioDelDia();
    const contenedor = document.querySelector(".llistat_ofertes");

    contenedor.innerHTML = '';

    productes.forEach(producte => {
        const article = document.createElement("article");
        article.className = "producte_oferta";
        article.dataset.id = producte.id;

        const imatge = document.createElement("img");
        imatge.src = producte.imatge;
        imatge.alt = producte.nom;
        imatge.className = "producte_oferta_imatge";

        const nom = document.createElement("h4");
        nom.textContent = producte.nom;
        nom.className = "producte_oferta_nom";

        const preu = document.createElement("p");
        preu.textContent = producte.preu.toFixed(2) + "€";
        preu.className = "producte_oferta_preu";

        const btn = document.createElement("button");
        btn.textContent = "Anar a tenda online";
        btn.className = "btn_comprar_oferta";
        btn.onclick = () => location.href = "../vistes/tenda.php";

        article.appendChild(imatge);
        article.appendChild(nom);
        article.appendChild(preu);
        article.appendChild(btn);

        contenedor.appendChild(article);
    });
}

document.addEventListener("DOMContentLoaded", mostrarpromocio);

// ==========================================
// CARRUSEL
// ==========================================
let slideActual = 0;
const totalSlides = 3;
const wrapper = document.getElementById('carruselWrapper');
const indicadors = document.querySelectorAll('.indicador');

let intervalCarrusel;

function canviarSlide(index) {
    slideActual = index;
    actualitzarCarrusel();
    reiniciarInterval();
}

function actualitzarCarrusel() {
    wrapper.style.transform = `translateX(-${slideActual * 100}%)`;

    indicadors.forEach((ind, i) => {
        ind.classList.toggle('actiu', i === slideActual);
    });
}

function reiniciarInterval() {
    clearInterval(intervalCarrusel);
    intervalCarrusel = setInterval(() => {
        slideActual = (slideActual + 1) % totalSlides;
        actualitzarCarrusel();
    }, 20000);
}

// Inicia el interval per primera vegada
reiniciarInterval();

// Per als botons inferiors i swipe
let posicio_inicial = 0;
let posicio_final = 0;

wrapper.addEventListener('touchstart', (e) => {
    posicio_inicial = e.changedTouches[0].screenX;
});

wrapper.addEventListener('touchend', (e) => {
    posicio_final = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (posicio_final < posicio_inicial - 50) {
        slideActual = (slideActual + 1) % totalSlides;
        actualitzarCarrusel();
        reiniciarInterval(); // ✅ CORREGIT - abans era setInterval()
    }
    if (posicio_final > posicio_inicial + 50) {
        slideActual = (slideActual - 1 + totalSlides) % totalSlides;
        actualitzarCarrusel();
        reiniciarInterval(); // ✅ CORREGIT - abans era setInterval()
    }
}