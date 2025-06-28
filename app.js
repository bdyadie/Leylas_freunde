const imageInput = document.getElementById('imageUpload');
const gallery = document.getElementById('gallery');
const MAX_FILES = 10;
const MAX_SIZE_MB = 3;

imageInput.addEventListener('change', () => {
    gallery.innerHTML = '';

    if (imageInput.files.length > MAX_FILES) {
        alert(`Maximal ${MAX_FILES} Bilder erlaubt.`);
        return;
    }

    Array.from(imageInput.files).forEach(file => {
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            alert(`${file.name} ist zu groß (max. ${MAX_SIZE_MB}MB).`);
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = "Hochgeladenes Fanbild";
            gallery.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});
