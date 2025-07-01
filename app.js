// ===== Image Upload Preview =====
const imageUpload = document.getElementById('imageUpload');
const gallery = document.getElementById('gallery');

imageUpload.addEventListener('change', (e) => {
  gallery.innerHTML = '';
  const files = Array.from(e.target.files);

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// ===== Countdown Timer =====
function updateCountdowns() {
  const countdownElements = document.querySelectorAll('.countdown');

  countdownElements.forEach(el => {
    const targetDate = new Date(el.dataset.date);
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      el.textContent = '🎉 Das Event läuft oder ist vorbei!';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    el.textContent = `⏳ Noch ${days}d ${hours}h ${minutes}m ${seconds}s`;
  });
}

setInterval(updateCountdowns, 1000);
window.addEventListener('DOMContentLoaded', updateCountdowns);