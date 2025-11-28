const STORAGE_KEY = "carret";

function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length));
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

//Tambe es guarda al local storage, pero no s'utilitza perque al principi haviem plantejat fer-ho en fetch, pero al final ho hem canviat per fer-ho en ajax
function obtenir_localSorage() {
    try {
        const data = getCookie(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error llegint cookie:', error);
        return [];
    }
}

function guardarCarret(carret) {
    try {
        setCookie(STORAGE_KEY, JSON.stringify(carret));
    } catch (error) {
        console.error('Error guardant cookie:', error);
    }
}

function posar_ofertes() {
    const productes = obtenir_localSorage();
    const contenidor = document.querySelector(".carret_list");

    if (productes.length > 0) {
        contenidor.innerHTML = '';

        productes.forEach(producte => {
            // Crear l'article complet
            const article = document.createElement("article");
            article.className = "carret_item producte";
            article.dataset.id = producte.id;

            // Imatge
            const imatge = document.createElement("img");
            imatge.src = producte.image;
            imatge.alt = producte.name;

            // Contenidor de detalls
            const detall = document.createElement("div");
            detall.className = "carret_detall";

            // Títol
            const h4 = document.createElement("h4");
            h4.textContent = producte.name;

            // Preu
            const paragraf = document.createElement("p");
            paragraf.textContent = producte.price + "€";
            paragraf.className = "preu";

            // Controls
            const controls = document.createElement("div");
            controls.className = "carret_controls";

            const btnMinus = document.createElement("button");
            btnMinus.className = "btn_minus";
            btnMinus.textContent = "−";
            btnMinus.onclick = () => modificarQuantitat(producte.id, -1);

            const qty = document.createElement("span");
            qty.className = "carret_qty";
            qty.textContent = producte.quantity;

            const btnPlus = document.createElement("button");
            btnPlus.className = "btn_plus";
            btnPlus.textContent = "+";
            btnPlus.onclick = () => modificarQuantitat(producte.id, 1);

            const btnRemove = document.createElement("button");
            btnRemove.className = "btn_remove";
            btnRemove.textContent = "🗑️ Eliminar";
            btnRemove.onclick = () => eliminarProducte(producte.id);

            // Muntar estructura
            controls.appendChild(btnMinus);
            controls.appendChild(qty);
            controls.appendChild(btnPlus);
            controls.appendChild(btnRemove);

            detall.appendChild(h4);
            detall.appendChild(paragraf);
            detall.appendChild(controls);

            article.appendChild(imatge);
            article.appendChild(detall);

            contenidor.appendChild(article);
        });

        actualitzarResum();

    } else {
        contenidor.innerHTML = "<h4>No hi ha elements al carreto</h4>";
        actualitzarResum();
    }
}

function modificarQuantitat(id, delta) {
    let cart = obtenir_localSorage();
    const item = cart.find(p => p.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== id);
        }
        guardarCarret(cart);
        posar_ofertes();
    }
}

function eliminarProducte(id) {
    let cart = obtenir_localSorage();
    cart = cart.filter(p => p.id !== id);
    guardarCarret(cart);
    posar_ofertes();
}

function buidarCarret() {
    if (confirm('Estàs segur que vols buidar el carret?')) {
        deleteCookie(STORAGE_KEY);
        posar_ofertes();
        actualitzarResum();
    }
}

function actualitzarResum() {
    const productes = obtenir_localSorage();
    const subtotal = productes.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    let envio = 0;
    let total = 0;
    if (subtotal != 0) {
        envio = 5.00;
        total = subtotal + envio;
    }

    document.querySelector('.carret_resum .resum_row:nth-child(1) .resum_valor').textContent = subtotal.toFixed(2) + '€';
    document.querySelector('.carret_resum .resum_row:nth-child(2) .resum_valor').textContent = envio.toFixed(2) + '€';
    document.querySelector('.carret_resum .total_valor').textContent = total.toFixed(2) + '€';
}

addEventListener("DOMContentLoaded", posar_ofertes);