/* ============================================================
   empreendimento.js — JS exclusivo de empreendimento.html
   Depende de: shared.js (carregado antes)
   ============================================================ */

(function initMapa() {

  const pontos = {
    serra: {
      titulo: 'Serra da Canastra',
      desc:   'Vista panorâmica privilegiada da Serra da Canastra, contemplada de praticamente todos os lotes do empreendimento.',
      icon:   '<polyline points="3,17 9,11 13,15 21,7"/><polyline points="14,7 21,7 21,14"/>'
    },
    hospital: {
      titulo: 'Hospital Municipal',
      desc:   'Área institucional integrada ao loteamento destinada ao Hospital Municipal de São Roque de Minas, com heliporto, estacionamento e estrutura completa.',
      icon:   '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'
    },
    acesso: {
      titulo: 'Entradas do Loteamento',
      desc:   'Três acessos pela lateral direita conectam o loteamento à malha viária da cidade, com entradas distribuídas para facilitar a circulação interna.',
      icon:   '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/>'
    },
    quadras: {
      titulo: 'Quadras Residenciais',
      desc:   '155 lotes distribuídos em 6 quadras (A a F), a partir de 250m², com projeto urbanístico planejado e ruas pavimentadas.',
      icon:   '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>'
    },
    infra: {
      titulo: 'Infraestrutura',
      desc:   'Rede elétrica, iluminação pública, pavimentação asfáltica e saneamento — toda a estrutura instalada para que você construa com segurança.',
      icon:   '<polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>'
    },
    loc: {
      titulo: 'Avenida Principal',
      desc:   'O loteamento está na Av. Vicente Picardi, uma das principais vias da cidade, com acesso facilitado ao centro, comércio, escolas e serviços.',
      icon:   '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>'
    }
  };

  const tagIndex = { serra: 0, loc: 1, hospital: 2, infra: 3, quadras: 4, acesso: 5 };
  const acessoIds = ['m-acesso1', 'm-acesso2', 'm-acesso3'];

  const panelTitle = document.getElementById('painel-titulo');
  const panelDesc  = document.getElementById('painel-desc');
  const panelIcon  = document.getElementById('painel-svg-icon');
  const tagBtns    = document.querySelectorAll('.tag-btn');

  if (!panelTitle) return;

  window.selectMarker = function selectMarker(id) {
    const p = pontos[id];
    if (!p) return;

    panelTitle.textContent = p.titulo;
    panelDesc.textContent  = p.desc;
    panelIcon.innerHTML    = p.icon;

    document.querySelectorAll('.marker circle.bg').forEach(c => {
      c.style.opacity = '0.45';
    });

    if (id === 'acesso') {
      acessoIds.forEach(mid => {
        const el = document.getElementById(mid);
        if (el) el.querySelector('circle.bg').style.opacity = '1';
      });
    } else {
      const marker = document.getElementById('m-' + id);
      if (marker) marker.querySelector('circle.bg').style.opacity = '1';
    }

    document.querySelectorAll('.map-area').forEach(area => {
      area.classList.toggle('active', area.dataset.point === id);
    });

    const activeIdx = tagIndex[id] ?? -1;
    tagBtns.forEach((btn, i) => btn.classList.toggle('active', i === activeIdx));
  };

  selectMarker('hospital');

})();
