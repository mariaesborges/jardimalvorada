/* ============================================================
   empreendimento.js — JS exclusivo de empreendimento.html
   Depende de: shared.js (carregado antes)
   ============================================================ */

/* ===== MAPA INTERATIVO ===== */
(function initMapa() {

  /* Dados de cada marcador */
  const pontos = {
    serra: {
      titulo: 'Serra da Canastra',
      desc:   'Vista panorâmica privilegiada da Serra da Canastra, contemplada de praticamente todos os lotes do empreendimento.',
      icon:   '<polyline points="3,17 9,11 13,15 21,7"/><polyline points="14,7 21,7 21,14"/>'
    },
    hospital: {
      titulo: 'Hospital Integrado',
      desc:   'Estrutura hospitalar dentro do próprio loteamento, oferecendo segurança e conveniência para toda a família.',
      icon:   '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'
    },
    acesso: {
      titulo: 'Portal de Entrada',
      desc:   'Acesso controlado pela Avenida Principal, com portal de entrada monitorado e portaria 24 horas.',
      icon:   '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/>'
    },
    quadras: {
      titulo: 'Quadras Residenciais',
      desc:   '142 lotes a partir de 250m², distribuídos em quadras bem planejadas com projeto paisagístico integrado.',
      icon:   '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>'
    },
    infra: {
      titulo: 'Centro de Infraestrutura',
      desc:   'Central de energia, água e saneamento com projetos próprios, garantindo autonomia e qualidade para os moradores.',
      icon:   '<polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>'
    },
    loc: {
      titulo: 'Avenida Principal',
      desc:   'Acesso direto pela avenida mais importante da cidade, com fácil conexão ao centro comercial, escolas e serviços.',
      icon:   '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>'
    }
  };

  /* Mapeia id do ponto → índice do tag-btn correspondente */
  const tagIndex = { serra: 0, loc: 1, hospital: 2, quadras: 3, infra: 4, acesso: 6 };

  /* Elementos do painel */
  const panelTitle = document.getElementById('painel-titulo');
  const panelDesc  = document.getElementById('painel-desc');
  const panelIcon  = document.getElementById('painel-svg-icon');
  const tagBtns    = document.querySelectorAll('.tag-btn');

  if (!panelTitle) return; // página não tem o mapa

  /* Função pública (chamada também pelos onclick do SVG e tag-btns) */
  window.selectMarker = function selectMarker(id) {
    const p = pontos[id];
    if (!p) return;

    /* Atualiza painel */
    panelTitle.textContent  = p.titulo;
    panelDesc.textContent   = p.desc;
    panelIcon.innerHTML     = p.icon;

    /* Destaca o marcador no SVG */
    document.querySelectorAll('.marker circle.bg').forEach(c => {
      c.style.opacity = '0.5';
    });
    const marker = document.getElementById('m-' + id);
    if (marker) marker.querySelector('circle.bg').style.opacity = '1';

    /* Atualiza tag-btns */
    const activeIdx = tagIndex[id] ?? -1;
    tagBtns.forEach((btn, i) => btn.classList.toggle('active', i === activeIdx));
  };

  /* Estado inicial */
  selectMarker('hospital');

})();