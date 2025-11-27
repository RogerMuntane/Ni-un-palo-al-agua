document.addEventListener('DOMContentLoaded', () => {

    const formulari = document.getElementById('tiquet');
    const email = document.getElementById('email');
    const adreca = document.getElementById('adreca');
    const telefon = document.getElementById('telefon');
    const intolerancies = document.getElementById('intolerancies');
    const extras = document.getElementById('extras');

    const errorEmail = document.getElementById('email-error');
    const errorAdreca = document.getElementById('adreca-error');
    const errorTelefon = document.getElementById('telefon-error');
    const errorIntolerancies = document.getElementById('intolerancies-error');
    const errorExtras = document.getElementById('extras-error');

    const MAX_LENGTH = 256; // Longitud màxima per a tots els camps
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida email
    const symbolsRegex = /[!@$%^&*()_+={}\[\]|\\<>\?~]/; // Símbols "que no volem"
    const telefonRegex = /^\d{9}$/; // Valida 9 números exactes

    function emailValid(stringEmail) {
        return emailRegex.test(stringEmail.trim());
    }

    function adrecaValid(stringAdreca) {
        stringAdreca = stringAdreca.trim();
        if (stringAdreca.length === 0)
            return true;
        if (stringAdreca.length < 8)
            return false;
        if (symbolsRegex.test(stringAdreca))
            return false;
        return true;
    }

    function telefonValid(stringTelefon) {
        stringTelefon = stringTelefon.trim();
        return telefonRegex.test(stringTelefon);
    }

    function intoleranciesValid(stringIntolerancies) {
        stringIntolerancies = stringIntolerancies.trim();
        if (stringIntolerancies.length === 0)
            return true;
        if (symbolsRegex.test(stringIntolerancies))
            return false;
        return true;
    }

    function extrasValid(stringExtras) {
        stringExtras = stringExtras.trim();
        if (stringExtras.length === 0)
            return true;
        if (symbolsRegex.test(stringExtras))
            return false;
        return true;
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

    formulari.addEventListener('submit', function (event) {
        let formulariCorrecte = true;

        // Validar Email
        const stringEmail = email.value.trim();
        if (stringEmail.length > MAX_LENGTH || !emailValid(stringEmail)) {
            formulariCorrecte = false;
            mostrarError(email, errorEmail);
        } else {
            ocultarError(email, errorEmail);
        }

        // Validar Adreça
        const stringAdreca = adreca.value.trim();
        if (stringAdreca.length > MAX_LENGTH || !adrecaValid(stringAdreca)) {
            formulariCorrecte = false;
            mostrarError(adreca, errorAdreca);
        } else {
            ocultarError(adreca, errorAdreca);
        }

        // Validar Telèfon
        const stringTelefon = telefon.value.trim();
        if (stringTelefon.length > MAX_LENGTH || !telefonValid(stringTelefon)) {
            formulariCorrecte = false;
            mostrarError(telefon, errorTelefon);
        } else {
            ocultarError(telefon, errorTelefon);
        }

        // Validar Intoleràncies
        const stringIntolerancies = intolerancies.value.trim();
        if (stringIntolerancies.length > MAX_LENGTH || !intoleranciesValid(stringIntolerancies)) {
            formulariCorrecte = false;
            mostrarError(intolerancies, errorIntolerancies);
        } else {
            ocultarError(intolerancies, errorIntolerancies);
        }

        // Validar Extras
        const stringExtras = extras.value.trim();
        if (stringExtras.length > MAX_LENGTH || !extrasValid(stringExtras)) {
            formulariCorrecte = false;
            mostrarError(extras, errorExtras);
        } else {
            ocultarError(extras, errorExtras);
        }

        //Introduir LocalStorage al Hidden Input

        let carret = []
        let total = 0;

        try {
            const carretData = localStorage.getItem("carret");
            const totalData = localStorage.getItem("total_compra");
            if (carretData) {
                carret = JSON.parse(carretData);

                // Validar que sea un array
                if (!Array.isArray(carret)) {
                    console.warn("Los datos del carrito no son un array válido");
                    carret = [];
                }
            }
            if (totalData) {
                total = JSON.parse(totalData);
            }
            localStorage.clear();
        } catch (error) {
            console.error("Error al parsear el carrito:", error);
            // Opcional: mostrar mensaje al usuario
            alert("Error al cargar los datos del carrito");
            carret = [];
            total = 0;
        }

        document.getElementById("carretData").value = JSON.stringify(carret);
        document.getElementById("totalData").value = total;

        console.log("Carrito enviado:", carret);
        console.log("localData value:", document.getElementById("localData").value);
        console.log("Formulari correcte:", formulariCorrecte);


        // Es para l'enviament si alguna cosa ha fallat
        if (!formulariCorrecte) {
            event.preventDefault();
        }
    });

    // Funció per si el text supera MAX_LENGTH
    function controlarLongitud(inputElement) {
        if (inputElement.value.length > MAX_LENGTH) {
            inputElement.value = inputElement.value.substring(0, MAX_LENGTH);
        }
    }

    // EMAIL
    email.addEventListener('input', () => {
        controlarLongitud(email);
        const stringEmail = email.value.trim();
        if (emailValid(stringEmail) || stringEmail.length === 0) {
            ocultarError(email, errorEmail);
        } else {
            mostrarError(email, errorEmail);
        }
    });
    email.addEventListener('blur', () => {
        const stringEmail = email.value.trim();
        if (stringEmail.length > 0 && !emailValid(stringEmail)) {
            mostrarError(email, errorEmail);
        }
    });

    // ADREÇA
    adreca.addEventListener('input', () => {
        controlarLongitud(adreca);
        const stringAdreca = adreca.value.trim();
        if (adrecaValid(stringAdreca) || stringAdreca.length === 0) {
            ocultarError(adreca, errorAdreca);
        } else {
            mostrarError(adreca, errorAdreca);
        }
    });
    adreca.addEventListener('blur', () => {
        const stringAdreca = adreca.value.trim();
        if (stringAdreca.length > 0 && !adrecaValid(stringAdreca)) {
            mostrarError(adreca, errorAdreca);
        }
    });

    // TELÈFON
    telefon.addEventListener('input', () => {
        controlarLongitud(telefon);
        const stringTelefon = telefon.value.trim();
        if (telefonValid(stringTelefon) || stringTelefon.length === 0) {
            ocultarError(telefon, errorTelefon);
        } else {
            mostrarError(telefon, errorTelefon);
        }
    });
    telefon.addEventListener('blur', () => {
        const stringTelefon = telefon.value.trim();
        if (stringTelefon.length > 0 && !telefonValid(stringTelefon)) {
            mostrarError(telefon, errorTelefon);
        }
    });

    // INTOLERÀNCIES
    intolerancies.addEventListener('input', () => {
        controlarLongitud(intolerancies);
        const stringIntolerancies = intolerancies.value.trim();
        if (intoleranciesValid(stringIntolerancies)) {
            ocultarError(intolerancies, errorIntolerancies);
        } else {
            mostrarError(intolerancies, errorIntolerancies);
        }
    });
    intolerancies.addEventListener('blur', () => {
        const stringIntolerancies = intolerancies.value.trim();
        if (stringIntolerancies.length > 0 && !intoleranciesValid(stringIntolerancies)) {
            mostrarError(intolerancies, errorIntolerancies);
        }
    });

    // EXTRAS
    extras.addEventListener('input', () => {
        controlarLongitud(extras);
        const stringExtras = extras.value.trim();
        if (extrasValid(stringExtras)) {
            ocultarError(extras, errorExtras);
        } else {
            mostrarError(extras, errorExtras);
        }
    });
    extras.addEventListener('blur', () => {
        const stringExtras = extras.value.trim();
        if (stringExtras.length > 0 && !extrasValid(stringExtras)) {
            mostrarError(extras, errorExtras);
        }
    });

}); // Tancament del DOMContentLoaded


function total_guardat(total) {
    const STORAGE_KEY = "total_compra";

    try {
        localStorage.setItem(STORAGE_KEY, total.toString());
    } catch (error) {
        console.error("Error guardant el total:", error);
    }
}


//Mostrar tiquets per pantralla
function obtenir_productes() {
    const STORAGE_KEY = "carret"

    try {
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : []
    } catch {
        return []
    }
}

function carregar_productes() {
    const productes = obtenir_productes();
    const contenidor = document.querySelector(".futur-tiquet");

    if (productes.length !== 0) {
        let total = 5; // Costos d'enviament
        contenidor.innerHTML = '';

        productes.forEach(element => {
            // Crear contenidor compacte per cada producte
            const itemDiv = document.createElement("div");
            itemDiv.className = "tiquet-item";

            // Nom del producte
            const nomDiv = document.createElement("div");
            nomDiv.className = "tiquet-nom";
            nomDiv.textContent = element.name;

            // Detalls compactes
            const detallsDiv = document.createElement("div");
            detallsDiv.className = "tiquet-esp";
            detallsDiv.innerHTML = `
                <span>${element.price.toFixed(2)}€</span>
                <span>x${element.quantity}</span>
            `;

            // Subtotal
            const subtotal = element.price * element.quantity;
            const subtotalDiv = document.createElement("div");
            subtotalDiv.className = "tiquet-subtotal";
            subtotalDiv.textContent = `${subtotal.toFixed(2)}€`;

            // Afegir tot al item
            itemDiv.appendChild(nomDiv);
            itemDiv.appendChild(detallsDiv);
            itemDiv.appendChild(subtotalDiv);

            // Afegir item al contenidor
            contenidor.appendChild(itemDiv);

            total += subtotal;
        });

        // Total final
        const totalDiv = document.createElement("div");
        totalDiv.className = "tiquet-total";
        totalDiv.textContent = `TOTAL: ${total.toFixed(2)}€`;
        contenidor.appendChild(totalDiv);

        total_guardat(total);

    } else {
        contenidor.innerHTML = "<h3>No hi ha elements al carret</h3>";
    }
}

addEventListener("DOMContentLoaded", carregar_productes);
