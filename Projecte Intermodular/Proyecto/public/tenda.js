function promocioDelDia(){
    const productes = [
        {
            id: 1,
            nom: "Entrepa de pernil salat",
            preu: 3.50,
            imatge: "Images/bocatajamon.jpg"
        },
        {
            id: 2,
            nom: "Entrepa de butifarra",
            preu: 4.50,
            imatge: "Images/bocadillo_butifarra.jpg"
        },
        {
            id: 3,
            nom: "Refresc",
            preu: 2.00,
            imatge: "Images/cocacola.jpg"
        },
        {
            id: 4,
            nom: "Suc Natural",
            preu: 2.50,
            imatge: "Images/zumo-de-naranja.jpg"
        },
        {
            id: 5,
            nom: "Pastís de Xocolata",
            preu: 3.00,
            imatge: "Images/pastel.jpg"
        },
        {
            id: 6,
            nom: "Iogurt Natural",
            preu: 1.50,
            imatge: "Images/iogurt.jpg"
        }
    ];

    const fecha = new Date();
    const hora = fecha.getHours();

    const productes_final = [];

    if(hora <= 4){
        for (let i = 0; i < productes.length; i += 2){
            productes_final.push(productes[i]);
        }
    } else {
        for (let i = 1; i < productes.length; i += 2){
            productes_final.push(productes[i]);
        }
    }

    return productes_final;
}

function mostrarRecomanacio(){
    const productes = promocioDelDia();
    const contenedor = document.querySelector(".llistat_ofertes");

    if (!contenedor) return; // Evitar error si no existeix

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
        preu.className = "preu";

        const btn = document.createElement("button");
        btn.textContent = "Afegir al carret";
        btn.className = "btn_comprar";
        btn.onclick = (e) => {
            e.preventDefault();
            afegirProductoAlCarret(article);
            mostrarFeedbackBoton(btn);
        };

        article.appendChild(imatge);
        article.appendChild(nom);
        article.appendChild(preu);
        article.appendChild(btn);

        contenedor.appendChild(article);
    });
}






// Gestiona carret (localStorage) quan es prem "Afegir al carret"
const STORAGE_KEY = 'carret';

// Obtenir el carret del localStorage
function obtenerCarret() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

// Guardar el carret al localStorage
function guardarCarret(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// Parsejar el preu del text
function parsarPreu(text) {
    if (!text) return 0;
    const cleaned = text.replace(/\s/g, '').replace(',', '.').replace(/[^\d.-]/g, '');
    return parseFloat(cleaned) || 0;
}

// Crear un ID únic per a cada producte
function crearId(productEl) {
    const dataId = productEl.dataset.id;
    if (dataId) return dataId;
    const name = (productEl.querySelector('h4')?.innerText || 'producte').toLowerCase();
    const slug = name.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return slug;
}

// Obtenir dades del producte des del DOM
function obtenerDatosProducto(productEl) {
    return {
        id: crearId(productEl),
        name: productEl.querySelector('h4')?.innerText?.trim() || 'Sense nom',
        price: parsarPreu(productEl.querySelector('.preu')?.innerText || ''),
        image: productEl.querySelector('img')?.getAttribute('src') || ''
    };
}

// Afegir producte al carret
function afegirProductoAlCarret(productEl) {
    const product = obtenerDatosProducto(productEl);
    const cart = obtenerCarret();

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    guardarCarret(cart);
}

// Mostrar feedback visual al botó
function mostrarFeedbackBoton(btn) {
    const original = btn.innerText;
    btn.innerText = 'Afegit';
    setTimeout(() => btn.innerText = original, 900);
}

// Inicialitzar els listeners del carret
function inicializarCarretListeners() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn_comprar');
        if (!btn) return;

        const productEl = btn.closest('.producte');
        if (!productEl) return;

        afegirProductoAlCarret(productEl);
        mostrarFeedbackBoton(btn);
    });
}

// Executar quan el DOM està carregat
document.addEventListener("DOMContentLoaded", () =>{
    inicializarCarretListeners()
    mostrarRecomanacio()
});

// Buscador de productes

document.addEventListener('keyup', e => {
<<<<<<< Updated upstream
    // Comprovar si s'està escrivint en algun dels buscadors
    if (!e.target.matches('#buscador') && !e.target.matches('#buscador-sidepanel')) {
        return;
    }

    // Elements
    const buscador = document.getElementById('buscador');
    const buscadorSidepanel = document.getElementById('buscador-sidepanel');
    const seccioRecomenats = document.querySelector('.tenda_intro');
    const titolOferta = document.querySelector('.oferta');

    // Text del buscador
    const target = e.target;
    const cerca = target.value.toLowerCase().trim();

    if (target.id === 'buscador' && buscadorSidepanel) {
        buscadorSidepanel.value = cerca;
    } else if (target.id === 'buscador-sidepanel' && buscador) {
        buscador.value = cerca;
    }

    // FILTRAR PRODUCTES
    document.querySelectorAll('.producte, .producte_oferta').forEach(producte => {
        let nomProducteElement;

        if (producte.classList.contains('producte')) {
            nomProducteElement = producte.querySelector('h4');
        } else if (producte.classList.contains('producte_oferta')) {
            nomProducteElement = producte.querySelector('.producte_oferta_nom');
        }

        if (!nomProducteElement) {
            producte.classList.add('filtro');
            return;
        }

        const producteCercaText = nomProducteElement.textContent.toLowerCase().trim();

        // Mostrar o amagar segons coincidència
        if (cerca === "" || producteCercaText.includes(cerca)) {
            producte.classList.remove('filtro');
        } else {
            producte.classList.add('filtro');
        }
    });

    // AMAGAR CATEGORIES BUIDES
    document.querySelectorAll('.categoria').forEach(categoria => {
        const productesVisibles = categoria.querySelectorAll('.producte:not(.filtro)').length;

        const categoriaHeader = categoria.querySelector('.categoria_header');
        const categoriaProductes = categoria.querySelector('.categoria_productes');

        if (productesVisibles === 0 && cerca !== "") {
            categoria.classList.add('filtro');
            if (categoriaHeader) categoriaHeader.classList.add('filtro');
            if (categoriaProductes) categoriaProductes.classList.add('filtro');
        } else {
            categoria.classList.remove('filtro');
            if (categoriaHeader) categoriaHeader.classList.remove('filtro');
            if (categoriaProductes) categoriaProductes.classList.remove('filtro');
        }
    });

    // CONTROLAR TÍTOL (LA NOSTRA OFERTA)
    if (titolOferta) {
        const categoriesVisibles = document.querySelectorAll('.categoria:not(.filtro)').length;

        if (cerca !== "" && categoriesVisibles === 0) {
            titolOferta.classList.add('filtro');
        } else {
            titolOferta.classList.remove('filtro');
        }
    }

    // AMAGAR/MOSTRAR SECCIÓ RECOMANATS
    if (seccioRecomenats) {
        if (cerca !== "") {
            seccioRecomenats.classList.add('filtro');
        } else {
            seccioRecomenats.classList.remove('filtro');
=======

    // Buscadors
    const buscador = document.getElementById('.buscador');
    const buscadorSidepanel = document.getElementById('.buscador-sidepanel');

    const seccioRecomenats = document.querySelector('.tenda_intro');
    const titolOferta = document.querySelector('.oferta');

    // matches per buscar una coincidencia dintre d'una cadena de text
    if (e.target.matches('#buscador') || e.target.matches('#buscador-sidepanel')) {

        const target = e.target;
        const cerca = target.value.toLowerCase().trim();

        if (target.id === 'buscador' && buscadorSidepanel) {
            buscadorSidepanel.value = cerca;
        } else if (target.id === 'buscador-sidepanel' && buscador) {
            buscador.value = cerca;
        }

        // Agafar tots els productes de la pagina
        document.querySelectorAll('.producte, .producte_oferta').forEach(producte => {
            let nomProducteElement; // Canviat el nom de la variable per evitar confusió amb el text

            if (producte.classList.contains('producte')) {
                //Seleccionar el titol del producte
                nomProducteElement = producte.querySelector('h4');
            } else if (producte.classList.contains('producte_oferta')) {
                //Seleccionar l'element amb la classe producte_oferta
                nomProducteElement = producte.querySelector('.producte_oferta_nom');
            }

            // Si no es troba ningun element, saltem el producte
            if (!nomProducteElement) {
                producte.classList.add('filtro');
                return;
            }

            const producteCercaText = nomProducteElement.textContent.toLocaleLowerCase().trim(); // Només el text

            if (producteCercaText.includes(cerca)) {
                producte.classList.remove('filtro'); // Mostra el producte
            } else {
                titolOferta.classList.add('filtro');
                producte.classList.add('filtro'); // Amaga el producte
            }

            if (cerca === "") {
                producte.classList.remove('filtro');
            }
        });

        // Amagar les categorias si no hi ha ningun producte que coincideixi
        document.querySelectorAll('.categoria').forEach(categoria => {
            let producteVisible = categoria.querySelectorAll('.producte:not(.filtro)').length;

            const categoriaHeader = document.querySelector('.categoria_header');
            const categoriaProducte = document.querySelector('.categoria_productes');

            if (producteVisible === 0 && cerca !== "") {
                categoria.classList.add('filtro');
                if (categoriaHeader) {
                    categoriaHeader.classList.add('filtro');
                }
                if (categoriaProducte) {
                    categoriaProducte.classList.add('filtro');
                }
            } else {
                categoria.classList.remove('filtro');
                categoriaHeader.classList.remove('filtro');
                categoriaProducte.classList.remove('filtro');
            }
        });

        if (seccioRecomenats) {
            if (cerca !== "") {
                // Si es cerca amagar
                seccioRecomenats.classList.add('filtro');
            } else {
                // Si la cerca es buida tornar a mostra
                seccioRecomenats.classList.remove('filtro');
            }
>>>>>>> Stashed changes
        }
    }
});