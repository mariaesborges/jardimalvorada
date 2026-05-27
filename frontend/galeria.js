/* ===== GALERIA — Lightbox ===== */
(function initGaleria() {

  const items = document.querySelectorAll('.gal-item');
  if (!items.length) return;

  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbCounter = document.getElementById('lb-counter');
  const lbClose   = document.getElementById('lb-close');
  const lbPrev    = document.getElementById('lb-prev');
  const lbNext    = document.getElementById('lb-next');

  /* Monta array de imagens a partir dos itens do grid */
  const images = Array.from(items).map(item => ({
    src:     item.querySelector('img').src,
    alt:     item.querySelector('img').alt,
    caption: item.querySelector('.gal-overlay span')?.textContent || ''
  }));

  let current = 0;

  /* ── Abre lightbox ── */
  function open(index) {
    current = index;
    render();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  /* ── Fecha lightbox ── */
  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ── Renderiza imagem atual ── */
  function render() {
    const { src, alt, caption } = images[current];
    lbImg.classList.add('loading');
    lbImg.src = src;
    lbImg.alt = alt;
    lbCaption.textContent = caption;
    lbCounter.textContent = `${current + 1} / ${images.length}`;

    lbImg.onload = () => lbImg.classList.remove('loading');
  }

  /* ── Navegação ── */
  function prev() {
    current = (current - 1 + images.length) % images.length;
    render();
  }

  function next() {
    current = (current + 1) % images.length;
    render();
  }

  /* ── Eventos dos itens do grid ── */
  items.forEach((item, i) => {
    item.addEventListener('click', () => open(i));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Ampliar imagem ${i + 1}`);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(i);
      }
    });
  });

  /* ── Eventos do lightbox ── */
  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  /* Fecha ao clicar fora da imagem */
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) close();
  });

  /* Teclado */
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  /* ── Swipe touch (mobile) ── */
  let touchStartX = 0;

  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    }
  }, { passive: true });

})();