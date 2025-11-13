// Gestiona carret (localStorage) quan es prem "Afegir al carret"

(function () {
    const STORAGE_KEY = 'carret';

    const getCart = () => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch {
            return [];
        }
    };

    const saveCart = (cart) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    };

    const parsePrice = (text) => {
        if (!text) return 0;
        const cleaned = text.replace(/\s/g, '').replace(',', '.').replace(/[^\d.-]/g, '');
        return parseFloat(cleaned) || 0;
    };

    const createId = (productEl) => {
        const dataId = productEl.dataset.id;
        if (dataId) return dataId;
        const name = (productEl.querySelector('h4')?.innerText || 'producte').toLowerCase();
        const nomf = name.replace(/\s+/g, '-');
        return nomf
    };

    
    const addProduct = (productEl) => {
        const name = productEl.querySelector('h4')?.innerText?.trim() || 'Sense nom';
        const priceText = productEl.querySelector('.preu')?.innerText || '';
        const price = parsePrice(priceText);
        const img = productEl.querySelector('img')?.getAttribute('src') || '';
        const id = createId(productEl);
        const qty = 1;

        const cart = getCart();
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + qty;
        } else {
            cart.push({
                id,
                name,
                price,
                image: img,
                quantity: qty
            });
        }
        saveCart(cart);
    };

    // Delegació d'esdeveniments per a tots els botons .btn_comprar
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn_comprar');
        if (!btn) return;
        const productEl = btn.closest('.producte');
        if (!productEl) return;
        addProduct(productEl);

        // feedback ràpid
        const original = btn.innerText;
        btn.innerText = 'Afegit';
        setTimeout(() => btn.innerText = original, 900);
    });
})();