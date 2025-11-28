//Variable global per al usuari rebuda de PHP
const usuariActual = usuariPHP;
let tiquetEditantIndex = null;

//Llista de imatges per escollir al editar un producte
const imatgesDisponibles = [
    { nom: 'Entrepa de butifarra', url: '../Images/bocadillo_butifarra.jpg' },
    { nom: 'Entrepa mixt', url: '../Images/bocadillo_mixt.jpg' },
    { nom: 'Entrepa de pernil', url: '../Images/bocatajamon.jpg' },
    { nom: 'Suc natural', url: '../Images/zumo-de-naranja.jpg' },
    { nom: 'Iogurt', url: '../Images/iogurt.jpg' },
    { nom: 'Per defecte', url: '../Images/default.png' }
];

//Funcio per afegir un tiquet al historial
function afegirTiquet() {
    tiquetEditantIndex = null;
    document.getElementById('modal-titol').textContent = 'Afegir Tiquet';
    document.getElementById('form-tiquet').reset();
    document.getElementById('llista-productes').innerHTML = '';
    document.getElementById('data').valueAsDate = new Date();

    //Crea el form per defecte
    afegirProducteForm();

    document.getElementById('modal-tiquet').style.display = 'block';
}

//Funcio per tancar el modal
function tancarModal() {
    document.getElementById('modal-tiquet').style.display = 'none';
    tiquetEditantIndex = null;
}

//Funcio que crea el selector d'imatges
function crearSelectorImatges(imatgeActual = '../Images/default.png') {
    let opcions = '';
    imatgesDisponibles.forEach(img => {
        const selected = img.url === imatgeActual ? 'selected' : '';
        opcions += `<option value="${img.url}" ${selected}>${img.nom}</option>`;
    });

    return `
        <div class="selector-imatge">
            <label>Imatge del producte:</label>
            <select class="imatge-select producte-imatge-select" onchange="canviarImatge(this)">
                ${opcions}
                <option value="custom">🖼️ URL personalitzada...</option>
            </select>
            <input type="text" class="imatge-custom producte-imatge-custom" placeholder="Enganxa l'URL de la imatge aquí" value="${imatgeActual}">
            <div class="preview-imatge">
                <img src="${imatgeActual}" alt="Preview">
            </div>
        </div>
    `;
}

//Funcio que canvia la imatge quan es seleccionada
function canviarImatge(select) {

    //Agafa el ancestre 'li' mes proxim
    const li = select.closest('li');
    const customInput = li.querySelector('.producte-imatge-custom');
    const preview = li.querySelector('.preview-imatge img');

    if (select.value === 'custom') {
        customInput.classList.add('visible');
        customInput.focus();
    } else {
        customInput.classList.remove('visible');
        customInput.value = select.value;
        preview.src = select.value;
    }
}

//Funcio que actualitza la preview de la imatge quan es fica una url personalitzada
function actualitzarPreview(input) {
    const li = input.closest('li');
    const preview = li.querySelector('.preview-imatge img');
    const url = input.value.trim();

    if (url) {
        preview.src = url;
        preview.onerror = function () {
            this.src = '../Images/default.png';
        };
    }
}

//Funcio per afegir un producte en el modal (producte null per defecte)
function afegirProducteForm(producte = null) {
    const llista = document.getElementById('llista-productes');
    const li = document.createElement('li');
    li.className = 'producte-item';

    const nom = producte ? producte.name : '';
    const preu = producte ? producte.price : '';
    const quantitat = producte ? producte.quantity : 1;
    const imatge = producte && producte.image ? producte.image : '../Images/default.png';

    li.innerHTML = `
        <div class="producte-grid">
            <div class="camp-producte">
                <label>Nom del producte:</label>
                <input type="text" placeholder="Nom del producte" class="producte-nom" required value="${nom}">
            </div>
            <div class="camps-preu-quantitat">
                <div class="camp-producte">
                    <label>Preu (€):</label>
                    <input type="number" placeholder="Preu" class="producte-preu" step="0.01" min="0" required value="${preu}">
                </div>
                <div class="camp-producte">
                    <label>Quantitat:</label>
                    <input type="number" placeholder="Quantitat" class="producte-quantitat" min="1" value="${quantitat}" required>
                </div>
            </div>
            ${crearSelectorImatges(imatge)}
            <button type="button" class="boto-eliminar-producte" onclick="eliminarProducteForm(this)">
                🗑️ Eliminar producte
            </button>
        </div>
    `;

    llista.appendChild(li);

    //Event listener que actualitza el preview de la imatge personalitzada
    const customInput = li.querySelector('.producte-imatge-custom');
    if (customInput) {
        customInput.addEventListener('input', function () {
            actualitzarPreview(this);
        });

        //Si la imatge no hi es a la llista mostra el costum input
        const estaEnLlista = imatgesDisponibles.some(img => img.url === imatge);
        if (!estaEnLlista && imatge !== '../Images/default.png') {
            const select = li.querySelector('.producte-imatge-select');
            select.value = 'custom';
            customInput.classList.add('visible');
            customInput.value = imatge;
        }
    }
}

//Funcio per eliminar un producte en el modal
function eliminarProducteForm(button) {
    const li = button.closest('li');
    const llista = document.getElementById('llista-productes');

    //Si només hi ha un producte no permet eliminar-lo
    if (llista.children.length === 1) {
        alert('Has de mantenir almenys un producte al tiquet');
        return;
    }

    li.remove();
}

//Funcio per editar un tiquet existent
function editarTiquet(index) {
    tiquetEditantIndex = index;

    //Carrega les dades del tiquet desde el servidor
    fetch('../php/gestionarTiquets.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accio: 'obtenir',
            usuari: usuariActual,
            index: index
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('modal-titol').textContent = 'Editar Tiquet #' + (index + 1);
                document.getElementById('form-tiquet').reset();
                document.getElementById('llista-productes').innerHTML = '';

                //Estableix la data actual si no hi ha una guardada
                document.getElementById('data').valueAsDate = new Date();

                //Carrega els productes
                data.productes.forEach(producte => {
                    afegirProducteForm(producte);
                });

                //Per ultim ensenya el modal
                document.getElementById('modal-tiquet').style.display = 'block';
            } else {
                alert('Error al carregar el tiquet: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al carregar el tiquet');
        });
}

//Funcio per eliminar un tiquet
function eliminarTiquet(index) {
    if (confirm('Estàs segur que vols eliminar aquest tiquet?')) {
        //Envia la peticio al servidor per eliminar
        fetch('php/gestionarTiquets.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accio: 'eliminar',
                usuari: usuariActual,
                index: index
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Tiquet eliminat correctament');
                    location.reload();
                } else {
                    alert('Error al eliminar el tiquet: ' + data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al eliminar el tiquet');
            });
    }
}

//Funcio que retorna la imatge seleccionada d'un producte
function obtenirImatgeProducte(li) {
    const select = li.querySelector('.producte-imatge-select');
    const customInput = li.querySelector('.producte-imatge-custom');

    if (select.value === 'custom') {
        return customInput.value.trim() || '../Images/default.png';
    } else {
        return select.value;
    }
}

//Funcio per guardar el modal al editar o afegir un tiquet
document.getElementById('form-tiquet').addEventListener('submit', function (e) {
    e.preventDefault();

    const data = document.getElementById('data').value;
    const productes = [];

    //Recull tots els productes del formulari
    const items = document.querySelectorAll('#llista-productes li');
    items.forEach(item => {
        const nom = item.querySelector('.producte-nom').value.trim();
        const preu = item.querySelector('.producte-preu').value;
        const quantitat = parseInt(item.querySelector('.producte-quantitat').value);
        const imatge = obtenirImatgeProducte(item);

        if (nom && !isNaN(preu) && !isNaN(quantitat) && preu >= 0 && quantitat > 0) {
            productes.push({
                id: nom.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                name: nom,
                price: preu.toLowerCase().replace(/\s+/g, '-').replace(",", ".").replace(/[^\d.-]/g, ''),
                quantity: quantitat,
                image: imatge
            });
        }
    });

    if (productes.length === 0) {
        alert('Has d\'afegir almenys un producte vàlid');
        return;
    }

    //Determina si estem editant o afegint un tiquet
    const accio = tiquetEditantIndex !== null ? 'editar' : 'afegir';

    const requestData = {
        accio: accio,
        usuari: usuariActual,
        data: data,
        productes: productes
    };

    if (tiquetEditantIndex !== null) {
        requestData.index = tiquetEditantIndex;
    }

    //Ho enviem al servidor
    fetch('../php/gestionarTiquets.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(tiquetEditantIndex !== null ? 'Tiquet actualitzat correctament' : 'Tiquet guardat correctament');
                tancarModal();
                location.reload();
            } else {
                alert('Error al guardar el tiquet: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al guardar el tiquet');
        });
});

//Funcio de busqueda
document.getElementById('cerca').addEventListener('input', function (e) {
    const textCerca = e.target.value.toLowerCase();
    const tiquets = document.querySelectorAll('.tiquet-card');

    tiquets.forEach(tiquet => {
        const text = tiquet.textContent.toLowerCase();
        if (text.includes(textCerca)) {
            tiquet.style.display = 'block';
        } else {
            tiquet.style.display = 'none';
        }
    });
});

//Tanca el modal al fer click fora
window.onclick = function (event) {
    const modal = document.getElementById('modal-tiquet');
    if (event.target == modal) {
        tancarModal();
    }
}