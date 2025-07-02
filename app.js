// Image upload preview
const imageUpload = document.getElementById('imageUpload');
const gallery = document.getElementById('gallery');

imageUpload?.addEventListener('change', (e) => {
  gallery.innerHTML = '';
  Array.from(e.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// Countdown function
function updateCountdowns() {
  document.querySelectorAll('.countdown').forEach(el => {
    const targetDate = new Date(el.dataset.date);
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
      el.textContent = '🎉 Das Event läuft oder ist vorbei!';
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    el.textContent = `⏳ Noch ${d}d ${h}h ${m}m ${s}s`;
  });
}
setInterval(updateCountdowns, 1000);
window.addEventListener('DOMContentLoaded', updateCountdowns);

// Secret unlock zone tap logic
let tapCount = 0, lastTap = 0;
document.getElementById('secret-zone').addEventListener('click', () => {
  const now = new Date().getTime();
  if (now - lastTap < 600) {
    tapCount++;
    if (tapCount >= 5) {
      document.getElementById('secret-tap-area').style.display = 'block';
    }
  } else {
    tapCount = 1;
  }
  lastTap = now;
});

// Unlock admin panel with 🔒 button
let unlockTaps = 0, unlockLast = 0;
document.getElementById('tapUnlock').addEventListener('click', () => {
  const now = new Date().getTime();
  if (now - unlockLast < 600) {
    unlockTaps++;
    if (unlockTaps >= 3) {
      document.getElementById('admin-panel').style.display = 'block';
      document.getElementById('tapUnlock').style.display = 'none';
    }
  } else {
    unlockTaps = 1;
  }
  unlockLast = now;
});

// Admin form submission
document.getElementById('eventForm').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('eventTitle').value;
  const date = document.getElementById('eventDate').value;
  const location = document.getElementById('eventLocation').value;

  const card = document.createElement('div');
  card.className = 'event-card upcoming';
  card.innerHTML = `
    <h3>${title}</h3>
    <p><strong>Datum:</strong> ${date}</p>
    <p><strong>Ort:</strong> ${location}</p>
    <p class="countdown" data-date="${date}T20:00:00">⏳ Countdown lädt...</p>
  `;

  document.getElementById('eventPreview').appendChild(card);
  updateCountdowns();
  e.target.reset();
});