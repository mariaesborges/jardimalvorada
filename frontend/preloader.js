/* ============================================================
   preloader.js  — Jardim Alvorada
   Carregado via <script src="preloader.js"> no <head>,
   ANTES de qualquer conteúdo do body. Isso garante que o
   preloader apareça antes de qualquer flash de conteúdo.
   ============================================================ */
(function () {

  /* Só exibe na primeira visita da sessão */
  if (sessionStorage.getItem('alvorada_visited')) return;
  sessionStorage.setItem('alvorada_visited', '1');

  /* ── Injeta estilos diretamente no <head> ─────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '#alv-preloader{',
      'position:fixed;inset:0;z-index:99999;',
      'background:#f5f0e8;',
      'display:flex;flex-direction:column;',
      'align-items:center;justify-content:center;',
    '}',

    '#alv-logo-wrap{',
      'display:flex;flex-direction:column;',
      'align-items:center;gap:0;',
    '}',

    /* Ícone: cresce de baixo para cima */
    '#alv-icon{',
      'width:clamp(80px,14vw,160px);height:auto;',
      'opacity:0;',
      'transform:scale(0.35) translateY(40px);',
      'transform-origin:bottom center;',
      'will-change:opacity,transform;',
    '}',
    '#alv-icon.bloom{',
      'opacity:1;transform:scale(1) translateY(0);',
      'transition:opacity .65s ease,transform 1.1s cubic-bezier(.23,1,.32,1);',
    '}',

    /* Texto */
    '#alv-text{',
      'opacity:0;transform:translateY(14px);',
      'text-align:center;',
      'will-change:opacity,transform;',
    '}',
    '#alv-text.show{',
      'opacity:1;transform:translateY(0);',
      'transition:opacity .7s ease,transform .7s ease;',
    '}',

    '#alv-text .alv-jardim{',
      'display:block;',
      'font-family:"Cormorant Garamond",Georgia,serif;',
      'font-size:clamp(13px,2vw,20px);',
      'font-weight:400;letter-spacing:.18em;',
      'color:#594452;margin-bottom:2px;',
    '}',
    '#alv-text .alv-alvorada{',
      'display:block;',
      'font-family:"Cormorant Garamond",Georgia,serif;',
      'font-size:clamp(36px,6.5vw,70px);',
      'font-weight:300;letter-spacing:.04em;',
      'color:#594452;line-height:1;',
    '}',

    /* Linha decorativa */
    '#alv-line{',
      'width:0;height:1px;',
      'background:linear-gradient(90deg,transparent,#5a6b3a,transparent);',
      'margin:16px 0 10px;',
    '}',
    '#alv-line.grow{',
      'width:clamp(100px,18vw,180px);',
      'transition:width .8s ease;',
    '}',

    /* Subtítulo */
    '#alv-sub{',
      'font-family:"Jost",sans-serif;',
      'font-size:10px;letter-spacing:.35em;',
      'text-transform:uppercase;color:#7a8f52;',
      'opacity:0;',
    '}',
    '#alv-sub.show{',
      'opacity:1;',
      'transition:opacity .6s ease;',
    '}',

    /* Saída */
    '#alv-preloader.exit{',
      'opacity:0;pointer-events:none;',
      'transition:opacity .65s ease;',
    '}',

    'body.alv-loading{overflow:hidden;}'
  ].join('');
  document.head.appendChild(style);

  /* Bloqueia scroll enquanto preloader estiver visível */
  document.documentElement.classList.add('alv-loading');

  /* ── Cria o elemento imediatamente ───────────────────────── */
  var el = document.createElement('div');
  el.id = 'alv-preloader';
  el.innerHTML = [
    '<div id="alv-logo-wrap">',
      '<img id="alv-icon" src="img/icone-transparent.png" alt="Jardim Alvorada">',
      '<div id="alv-line"></div>',
      '<div id="alv-text">',
        '<span class="alv-jardim">Jardim</span>',
        '<span class="alv-alvorada">Alvorada</span>',
      '</div>',
      '<div id="alv-sub">São Roque de Minas · MG</div>',
    '</div>'
  ].join('');

  /* Insere no body assim que ele existir */
  function mountPreloader() {
    if (document.body) {
      document.body.appendChild(el);
      document.body.classList.add('alv-loading');
      startAnimation();
    } else {
      /* body ainda não existe — espera o DOMContentLoaded */
      document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(el);
        document.body.classList.add('alv-loading');
        startAnimation();
      });
    }
  }

  /* ── Sequência de animação ───────────────────────────────── */
  function startAnimation() {

    /* Garante que o browser pintou o elemento antes de animar */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {

        var icon = document.getElementById('alv-icon');
        var text = document.getElementById('alv-text');
        var line = document.getElementById('alv-line');
        var sub  = document.getElementById('alv-sub');

        /* 1 — ícone floresce */
        if (icon) icon.classList.add('bloom');

        /* 2 — texto aparece */
        setTimeout(function () {
          if (text) text.classList.add('show');
        }, 350);

        /* 3 — linha cresce */
        setTimeout(function () {
          if (line) line.classList.add('grow');
        }, 650);

        /* 4 — subtítulo */
        setTimeout(function () {
          if (sub) sub.classList.add('show');
        }, 950);

        /* 5 — fade out */
        setTimeout(function () {
          el.classList.add('exit');
          document.body.classList.remove('alv-loading');
          document.documentElement.classList.remove('alv-loading');
        }, 2700);

        /* 6 — remove do DOM */
        setTimeout(function () {
          if (el.parentNode) el.parentNode.removeChild(el);
          if (style.parentNode) style.parentNode.removeChild(style);
        }, 3450);

      });
    });
  }

  mountPreloader();

})();