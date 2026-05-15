/* ============================================================
   galeria.js — JS exclusivo de galeria.html
   Depende de: shared.js (carregado antes)
   ============================================================ */

/* ===== LIGHTBOX ===== */
(function initLightbox() {
  const lightbox    = document.querySelector('.lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn    = lightbox.querySelector('.lightbox-close');

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    /* Limpa src após a transição para não mostrar imagem antiga no próximo hover */
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  }

  /* Clique nas imagens da galeria */
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openLightbox(img.src);
    });
  });

  /* Fechar */
  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
})();


/* ===== FILTRO DE CATEGORIAS (preparado para uso futuro) =====
   Quando as fotos chegarem, adicione data-category="nome" em
   cada .gallery-item e descomente este bloco.

(function initFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.gallery-item').forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        item.style.display = match ? '' : 'none';
      });
    });
  });
})();
*/