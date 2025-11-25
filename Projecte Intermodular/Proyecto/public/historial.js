// historial.js
// Suport per a múltiples productes per tiquet


let tiquets = [
    {
        id: 1,
        data: "2025-01-15",
        productes: [
            { nom: "Caiac Inflable", quantitat: 2, preu: 149.99 },
            { nom: "Rem de Fusta", quantitat: 1, preu: 29.50 }
        ]
    },
    {
        id: 2,
        data: "2025-02-10",
        productes: [
            { nom: "Salvavides Adult", quantitat: 3, preu: 45.00 }
        ]
    },
    {
        id: 3,
        data: "2025-03-05",
        productes: [
            { nom: "Kit Reparació", quantitat: 1, preu: 15.99 }
        ]
    }
];

let tiquetEditantId = null;

// DOMContentLoaded: configurar tot
document.addEventListener('DOMContentLoaded', function () {
    carregarTiquets();
    configurarCerca();

    // Establir event listener del formulari
    const form = document.getElementById('form-tiquet');
    form.addEventListener('submit', gestionarSubmitForm);

    // Tancar modal amb ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') tancarModal();
    });

    // Tancar modal fent clic fora
    window.addEventListener('click', function (event) {
        const modal = document.getElementById('modal-tiquet');
        if (event.target === modal) tancarModal();
    });
});

// Carregar i mostrar tots els tiquets (opcional filtre per producte)
function carregarTiquets(filtre = '') {
    const llista = document.getElementById('tiquets-llista');
    llista.innerHTML = '';

    const tiquetsFiltrats = filtre
        ? tiquets.filter(t => t.productes.some(p => p.nom.toLowerCase().includes(filtre.toLowerCase())))
        : tiquets;

    if (tiquetsFiltrats.length === 0) {
        llista.innerHTML = '<p style="text-align: center; color: #432818; font-size: 1.2rem;">No s\'han trobat tiquets</p>';
        actualitzarTotalGeneral();
        return;
    }

    tiquetsFiltrats.forEach(tiquet => {
        const tiquetElement = crearTiquetCard(tiquet);
        llista.appendChild(tiquetElement);
    });

    actualitzarTotalGeneral();
}

// Crear una targeta de tiquet amb llista de productes i total
function crearTiquetCard(tiquet) {
    const card = document.createElement('div');
    card.className = 'tiquet-card';
    card.dataset.id = tiquet.id;

    const dataFormatada = formatarData(tiquet.data);

    const llistaProductes = tiquet.productes.map(p =>
        `
        <div class="detall-item">
            <span class="etiqueta">${escapeHtml(p.nom)}</span>
            <span class="valor">${p.quantitat} × ${p.preu.toFixed(2)} €</span>
        </div>
        `
    ).join('');

    const totalTiquet = tiquet.productes.reduce((s, p) => s + p.quantitat * p.preu, 0).toFixed(2);

    card.innerHTML = `
        <div class="tiquet-header">
            <h3>Tiquet #${tiquet.id}</h3>
            <span class="tiquet-data">${dataFormatada}</span>
        </div>

        <div class="tiquet-detalls">
            ${llistaProductes}
        </div>

        <div class="tiquet-total">
            <span class="total-text">Total: ${totalTiquet} €</span>
        </div>

        <div class="tiquet-botons">
            <button class="btn-editar" onclick="editarTiquet(${tiquet.id})">✏️ Editar</button>
            <button class="btn-eliminar" onclick="eliminarTiquet(${tiquet.id})">🗑️ Eliminar</button>
        </div>
    `;

    return card;
}

// Formatjar data per visualitzar (ca-ES)
function formatarData(data) {
    if (!data) return '';
    const opcions = { year: 'numeric', month: 'long', day: 'numeric' };
    // Forçar a data ISO per evitar offsets
    return new Date(data + 'T00:00:00').toLocaleDateString('ca-ES', opcions);
}

// Configurar cerca de productes
function configurarCerca() {
    const inputCerca = document.getElementById('cerca');
    inputCerca.addEventListener('input', function (e) {
        carregarTiquets(e.target.value.trim());
    });
}

// Afegir nou tiquet -> obre modal en blanc
function afegirTiquet() {
    tiquetEditantId = null;
    document.getElementById('modal-titol').textContent = 'Afegir Nou Tiquet';

    // posar data d'avui
    const avui = new Date().toISOString().split('T')[0];
    document.getElementById('data').value = avui;

    // netejar llista de productes al formulari
    document.getElementById('llista-productes').innerHTML = '';

    // crear un producte per defecte per facilitar l'entrada
    afegirProducteForm();

    obrirModal();
}

// Editar tiquet existent -> carregar productes al modal
function editarTiquet(id) {
    const tiquet = tiquets.find(t => t.id === id);
    if (!tiquet) return;

    tiquetEditantId = id;
    document.getElementById('modal-titol').textContent = 'Editar Tiquet';
    document.getElementById('data').value = tiquet.data || '';

    // netejar i afegir productes
    const llista = document.getElementById('llista-productes');
    llista.innerHTML = '';
    tiquet.productes.forEach(p => afegirProducteForm(p));

    obrirModal();
}

// Eliminar tiquet
function eliminarTiquet(id) {
    if (confirm('Estàs segur que vols eliminar aquest tiquet?')) {
        tiquets = tiquets.filter(t => t.id !== id);
        carregarTiquets();
        mostrarNotificacio('Tiquet eliminat correctament', 'success');
    }
}

// Obrir modal
function obrirModal() {
    const modal = document.getElementById('modal-tiquet');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

// Tancar modal
function tancarModal() {
    const modal = document.getElementById('modal-tiquet');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    tiquetEditantId = null;
}

// Afegir un grup de producte dins el formulari (pot rebre un producte per defecte)
function afegirProducteForm(producte = { nom: '', quantitat: 1, preu: 0 }) {
    const container = document.getElementById('llista-productes');

    const div = document.createElement('div');
    div.className = 'producte-grup';

    // Creem elements (nom, quantitat, preu, eliminar)
    const inputNom = document.createElement('input');
    inputNom.type = 'text';
    inputNom.className = 'prod-nom';
    inputNom.placeholder = 'Nom producte';
    inputNom.value = producte.nom;

    const inputQuant = document.createElement('input');
    inputQuant.type = 'number';
    inputQuant.className = 'prod-quantitat';
    inputQuant.min = '1';
    inputQuant.value = producte.quantitat;

    const inputPreu = document.createElement('input');
    inputPreu.type = 'number';
    inputPreu.className = 'prod-preu';
    inputPreu.step = '0.01';
    inputPreu.min = '0';
    inputPreu.value = producte.preu;

    const btnEliminar = document.createElement('button');
    btnEliminar.type = 'button';
    btnEliminar.className = 'prod-eliminar';
    btnEliminar.textContent = '✖';
    btnEliminar.title = 'Eliminar aquest producte';
    btnEliminar.addEventListener('click', () => div.remove());

    // Labels visuals petits (opcionals, s'hauran de tractar en CSS)
    const wrapNom = document.createElement('div');
    const wrapQuant = document.createElement('div');
    const wrapPreu = document.createElement('div');

    wrapNom.appendChild(inputNom);
    wrapQuant.appendChild(inputQuant);
    wrapPreu.appendChild(inputPreu);

    // Afegir a div amb l'ordre visual (SASS utilitza grid per situar-los)
    div.appendChild(inputNom);
    div.appendChild(inputQuant);
    div.appendChild(inputPreu);
    div.appendChild(btnEliminar);

    container.appendChild(div);

    // Retornar div si necessites referència
    return div;
}

// Gestionar submit del formulari (crear o actualitzar tiquet)
function gestionarSubmitForm(e) {
    e.preventDefault();

    const data = document.getElementById('data').value;

    const productes = Array.from(document.querySelectorAll('.producte-grup')).map(div => {
        const nom = (div.querySelector('.prod-nom') || {}).value || '';
        const quant = parseInt((div.querySelector('.prod-quantitat') || {}).value || '0', 10);
        const preu = parseFloat((div.querySelector('.prod-preu') || {}).value || '0');
        return { nom: nom.trim(), quantitat: isNaN(quant) ? 0 : quant, preu: isNaN(preu) ? 0 : preu };
    }).filter(p => p.nom.length > 0 && p.quantitat > 0);

    if (productes.length === 0) {
        alert('El tiquet ha de tenir almenys 1 producte amb nom i quantitat > 0.');
        return;
    }

    if (tiquetEditantId) {
        // Actualitza
        const index = tiquets.findIndex(t => t.id === tiquetEditantId);
        if (index !== -1) {
            tiquets[index].data = data;
            tiquets[index].productes = productes;
            mostrarNotificacio('Tiquet actualitzat correctament', 'success');
        }
    } else {
        // Nou tiquet
        const nouId = tiquets.length > 0 ? Math.max(...tiquets.map(t => t.id)) + 1 : 1;
        tiquets.push({
            id: nouId,
            data,
            productes
        });
        mostrarNotificacio('Tiquet afegit correctament', 'success');
    }

    carregarTiquets();
    tancarModal();
}

// Actualitzar total general
function actualitzarTotalGeneral() {
    const total = tiquets.reduce((sum, t) => {
        const subtotal = t.productes.reduce((s, p) => s + (p.quantitat * p.preu), 0);
        return sum + subtotal;
    }, 0);

    document.getElementById('total-general').textContent = total.toFixed(2);
}

// Mostrar notificació (placeholder)
function mostrarNotificacio(missatge, tipus) {
    // Pots millorar-ho per toast UI. Ara només log i alert opcional.
    console.log(`${tipus.toUpperCase()}: ${missatge}`);
}

// Escape HTML bàsic per evitar injectar HTML des de dades
function escapeHtml(string) {
    if (!string) return '';
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;' })[s];
    });
}
