// Funzione per applicare o rimuovere il filtro Pantone con sfumatura
function applyRemoveFilter(canvasId, buttonId, pantoneColor) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const button = document.getElementById(buttonId);
    let isFilterApplied = false;
    let originalImageData = null; // Salva l'immagine originale

    button.addEventListener('click', function() {
        if (isFilterApplied) {
            // Rimuove il filtro (ripristina l'immagine originale)
            ctx.putImageData(originalImageData, 0, 0);
            isFilterApplied = false;
            button.textContent = `Applica Filtro ${pantoneColor}`;
        } else {
            // Memorizza l'immagine originale prima di applicare il filtro
            originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Applica il filtro Pantone con sfumatura
            const filterColor = hexToRgb(pantoneColor);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                // Aggiungi la sfumatura del 50%
                data[i] = (data[i] * 0.5) + (filterColor.r * 0.5);     // Rosso
                data[i + 1] = (data[i + 1] * 0.5) + (filterColor.g * 0.5); // Verde
                data[i + 2] = (data[i + 2] * 0.5) + (filterColor.b * 0.5); // Blu
            }

            ctx.putImageData(imageData, 0, 0);
            isFilterApplied = true;
            button.textContent = `Rimuovi Filtro ${pantoneColor}`;
        }
    });
}

// Funzione per convertire un colore esadecimale in RGB
function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) { // #RGB
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) { // #RRGGBB
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return {r: r, g: g, b: b};
}

// Funzione per caricare un'immagine nel canvas
function loadImageIntoCanvas(canvasId, imageUrl) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageUrl;

    img.onload = function() {
        // Imposta le dimensioni del canvas in base all'immagine
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Disegna l'immagine sul canvas
        ctx.drawImage(img, 0, 0);
    };
}

// Carica le immagini di default nei canvas
loadImageIntoCanvas('canvas1', 'images/image1.jpg'); // Sostituisci con il percorso della tua immagine
loadImageIntoCanvas('canvas2', 'images/image2.jpg'); // Sostituisci con il percorso della tua immagine

// Imposta i filtri
applyRemoveFilter('canvas1', 'filter1', '#6c3b2a'); // Pantone 6C3B2A
applyRemoveFilter('canvas2', 'filter2', '#2a6478'); // Pantone 2A6478
