// Image upload + preview gallery
const imageUpload = document.getElementById("imageUpload");
const gallery = document.getElementById("gallery");

imageUpload.addEventListener("change", function () {
  gallery.innerHTML = ""; // clear previous images

  const files = Array.from(this.files);
  files.forEach(file => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "Hochgeladenes Bild";
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});