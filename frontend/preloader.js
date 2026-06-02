/* ============================================================
   preloader.js  — Jardim Alvorada
   ============================================================ */
(function () {

  if (sessionStorage.getItem('alvorada_visited')) return;
  sessionStorage.setItem('alvorada_visited', '1');

  var style = document.createElement('style');
  style.textContent = [
    '#alv-preloader{',
      'position:fixed;inset:0;z-index:99999;',
      'background:#ede8df;',
      'display:flex;flex-direction:column;',
      'align-items:center;justify-content:center;',
    '}',

    '#alv-logo-wrap{',
      'display:flex;flex-direction:column;',
      'align-items:center;',
    '}',

    /* Ícone */
    '#alv-icon{',
      'width:clamp(90px,13vw,160px);height:auto;',
      'opacity:0;',
      'transform:scale(0.6) translateY(16px);',
      'transform-origin:bottom center;',
      'will-change:opacity,transform;',
      'margin-bottom:clamp(8px,1.5vw,16px);',
    '}',
    '#alv-icon.bloom{',
      'opacity:1;transform:scale(1) translateY(0);',
      'transition:opacity .7s ease,transform 1.1s cubic-bezier(.23,1,.32,1);',
    '}',

    /* Bloco de texto — Jardim + Alvorada juntos */
    '#alv-text-block{',
      'display:flex;flex-direction:column;',
      'align-items:center;',
      'gap:0;',
      'line-height:1;',
      'opacity:0;transform:translateY(10px);',
      'will-change:opacity,transform;',
    '}',
    '#alv-text-block.show{',
      'opacity:1;transform:translateY(0);',
      'transition:opacity .65s ease,transform .65s ease;',
    '}',

    /* "Jardim" — pequeno, tracking largo */
    '#alv-jardim{',
      'font-family:"Cormorant Garamond",Georgia,serif;',
      'font-size:clamp(13px,1.8vw,22px);',
      'font-weight:400;',
      'font-style:normal;',
      'letter-spacing:.22em;',
      'color:#594452;',
      'line-height:1;',
      'margin-bottom:clamp(0px,0.2vw,2px);',
    '}',

    /* "Alvorada" — grande, serifado elegante */
    '#alv-alvorada{',
      'font-family:"Cormorant Garamond",Georgia,serif;',
      'font-size:clamp(58px,10vw,120px);',
      'font-weight:300;',
      'font-style:normal;',
      'letter-spacing:.02em;',
      'color:#4a3040;',
      'line-height:0.88;',
    '}',

    /* Subtítulo */
    '#alv-sub{',
      'font-family:"Jost",sans-serif;',
      'font-size:clamp(8px,1vw,11px);',
      'letter-spacing:.32em;',
      'text-transform:uppercase;',
      'color:#7a8f52;',
      'margin-top:clamp(14px,2.5vw,26px);',
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

  document.documentElement.classList.add('alv-loading');

  var el = document.createElement('div');
  el.id = 'alv-preloader';
  el.innerHTML = [
    '<div id="alv-logo-wrap">',
      '<img id="alv-icon" src="img/icone-transparent.png" alt="Jardim Alvorada">',
      '<div id="alv-text-block">',
        '<span id="alv-jardim">Jardim</span>',
        '<span id="alv-alvorada">Alvorada</span>',
      '</div>',
      '<div id="alv-sub">São Roque de Minas · MG</div>',
    '</div>'
  ].join('');

  function mountPreloader() {
    if (document.body) {
      document.body.appendChild(el);
      document.body.classList.add('alv-loading');
      startAnimation();
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(el);
        document.body.classList.add('alv-loading');
        startAnimation();
      });
    }
  }

  function startAnimation() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {

        var icon      = document.getElementById('alv-icon');
        var textBlock = document.getElementById('alv-text-block');
        var sub       = document.getElementById('alv-sub');

        /* 1 — ícone floresce */
        if (icon) icon.classList.add('bloom');

        /* 2 — Jardim + Alvorada juntos */
        setTimeout(function () {
          if (textBlock) textBlock.classList.add('show');
        }, 450);

        /* 3 — subtítulo */
        setTimeout(function () {
          if (sub) sub.classList.add('show');
        }, 850);

        /* 4 — fade out */
        setTimeout(function () {
          el.classList.add('exit');
          document.body.classList.remove('alv-loading');
          document.documentElement.classList.remove('alv-loading');
        }, 2800);

        /* 5 — remove do DOM */
        setTimeout(function () {
          if (el.parentNode) el.parentNode.removeChild(el);
          if (style.parentNode) style.parentNode.removeChild(style);
        }, 3500);

      });
    });
  }

  mountPreloader();

})();