/* ============================================================
   empreendimento.js — Mapa interativo Jardim Alvorada
   Carrega img/mapa-site.svg e transforma os 155 paths em lotes clicáveis
   Depende de: shared.js carregado antes
   ============================================================ */

(function initMapa() {
  const pontos = {
    serra: {
      titulo: 'Serra da Canastra',
      desc: 'Vista panorâmica privilegiada da Serra da Canastra, contemplada de praticamente todos os lotes do empreendimento.',
      icon: '<polyline points="3,17 9,11 13,15 21,7"/><polyline points="14,7 21,7 21,14"/>'
    },
    hospital: {
      titulo: 'Hospital Municipal',
      desc: 'Área institucional integrada ao loteamento destinada ao Hospital Municipal de São Roque de Minas, com heliporto, estacionamento e estrutura completa.',
      icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'
    },
    acesso: {
      titulo: 'Entradas do Loteamento',
      desc: 'Três acessos pela lateral direita conectam o loteamento à malha viária da cidade, com entradas distribuídas para facilitar a circulação interna.',
      icon: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/>'
    },
    quadras: {
      titulo: 'Quadras Residenciais',
      desc: '155 lotes distribuídos em 6 quadras (A a F), a partir de 250m², com projeto urbanístico planejado e ruas pavimentadas.',
      icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>'
    },
    infra: {
      titulo: 'Infraestrutura',
      desc: 'Rede elétrica, iluminação pública, pavimentação asfáltica e saneamento — toda a estrutura instalada para que você construa com segurança.',
      icon: '<polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>'
    },
    loc: {
      titulo: 'Avenida Principal',
      desc: 'O loteamento está na Av. Vicente Picardi, uma das principais vias da cidade, com acesso facilitado ao centro, comércio, escolas e serviços.',
      icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>'
    }
  };

  const tagIndex = { serra: 0, loc: 1, hospital: 2, infra: 3, quadras: 4, acesso: 5 };
  const acessoIds = ['m-acesso1', 'm-acesso2', 'm-acesso3'];

  const ordemLotes = [
  "A-01",
  "A-02",
  "A-03",
  "A-04",
  "A-05",
  "A-06",
  "A-07",
  "A-08",
  "A-09",
  "A-10",
  "A-11",
  "A-12",
  "A-13",
  "A-14",
  "A-15",
  "A-16",
  "A-17",
  "A-18",
  "A-19",
  "A-20",
  "A-21",
  "A-22",
  "A-23",
  "A-24",
  "A-25",
  "A-26",
  "A-27",
  "A-28",
  "A-29",
  "A-30",
  "B-01",
  "B-02",
  "B-03",
  "B-04",
  "B-05",
  "B-06",
  "B-07",
  "B-08",
  "B-09",
  "B-10",
  "B-11",
  "B-12",
  "B-13",
  "B-14",
  "B-15",
  "B-16",
  "B-17",
  "B-18",
  "B-19",
  "B-20",
  "B-21",
  "B-22",
  "B-23",
  "B-24",
  "B-25",
  "B-26",
  "B-27",
  "B-28",
  "C-01",
  "C-02",
  "C-03",
  "C-04",
  "C-05",
  "C-06",
  "C-07",
  "C-08",
  "C-09",
  "C-10",
  "C-11",
  "C-12",
  "C-13",
  "C-14",
  "C-15",
  "C-16",
  "C-17",
  "C-18",
  "C-19",
  "C-20",
  "C-21",
  "C-22",
  "C-23",
  "C-24",
  "C-25",
  "C-26",
  "C-27",
  "C-28",
  "C-29",
  "D-01",
  "D-02",
  "D-03",
  "D-04",
  "D-05",
  "D-06",
  "D-07",
  "D-08",
  "D-09",
  "D-10",
  "D-11",
  "D-12",
  "D-13",
  "D-14",
  "D-15",
  "D-16",
  "D-17",
  "D-18",
  "D-19",
  "D-20",
  "D-21",
  "D-22",
  "D-23",
  "D-24",
  "D-25",
  "D-26",
  "D-27",
  "D-28",
  "D-29",
  "D-30",
  "D-31",
  "D-32",
  "D-33",
  "D-34",
  "E-01",
  "E-02",
  "E-03",
  "E-04",
  "E-05",
  "E-06",
  "E-07",
  "E-08",
  "F-01",
  "F-02",
  "F-03",
  "F-04",
  "F-05",
  "F-06",
  "F-07",
  "F-08",
  "F-09",
  "F-10",
  "F-11",
  "F-12",
  "F-13",
  "F-14",
  "F-15",
  "F-16",
  "F-17",
  "F-18",
  "F-19",
  "F-20",
  "F-21",
  "F-22",
  "F-23",
  "F-24",
  "F-25",
  "F-26"
];
  const dadosLotes = {
  "A-01": {
    "quadra": "A",
    "lote": "01",
    "area": "294,2 m²",
    "status": "disponivel"
  },
  "A-02": {
    "quadra": "A",
    "lote": "02",
    "area": "319,6 m²",
    "status": "disponivel"
  },
  "A-03": {
    "quadra": "A",
    "lote": "03",
    "area": "317,8 m²",
    "status": "disponivel"
  },
  "A-04": {
    "quadra": "A",
    "lote": "04",
    "area": "315,9 m²",
    "status": "disponivel"
  },
  "A-05": {
    "quadra": "A",
    "lote": "05",
    "area": "313,7 m²",
    "status": "disponivel"
  },
  "A-06": {
    "quadra": "A",
    "lote": "06",
    "area": "311,5 m²",
    "status": "disponivel"
  },
  "A-07": {
    "quadra": "A",
    "lote": "07",
    "area": "311,2 m²",
    "status": "disponivel"
  },
  "A-08": {
    "quadra": "A",
    "lote": "08",
    "area": "312,1 m²",
    "status": "disponivel"
  },
  "A-09": {
    "quadra": "A",
    "lote": "09",
    "area": "313,1 m²",
    "status": "disponivel"
  },
  "A-10": {
    "quadra": "A",
    "lote": "10",
    "area": "314,1 m²",
    "status": "disponivel"
  },
  "A-11": {
    "quadra": "A",
    "lote": "11",
    "area": "314,7 m²",
    "status": "disponivel"
  },
  "A-12": {
    "quadra": "A",
    "lote": "12",
    "area": "299,4 m²",
    "status": "disponivel"
  },
  "A-13": {
    "quadra": "A",
    "lote": "13",
    "area": "260,0 m²",
    "status": "disponivel"
  },
  "A-14": {
    "quadra": "A",
    "lote": "14",
    "area": "260,0 m²",
    "status": "disponivel"
  },
  "A-15": {
    "quadra": "A",
    "lote": "15",
    "area": "260,0 m²",
    "status": "disponivel"
  },
  "A-16": {
    "quadra": "A",
    "lote": "16",
    "area": "382,3 m²",
    "status": "disponivel"
  },
  "A-17": {
    "quadra": "A",
    "lote": "17",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "A-18": {
    "quadra": "A",
    "lote": "18",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "A-19": {
    "quadra": "A",
    "lote": "19",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "A-20": {
    "quadra": "A",
    "lote": "20",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "A-21": {
    "quadra": "A",
    "lote": "21",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "A-22": {
    "quadra": "A",
    "lote": "22",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "A-23": {
    "quadra": "A",
    "lote": "23",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "A-24": {
    "quadra": "A",
    "lote": "24",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "A-25": {
    "quadra": "A",
    "lote": "25",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "A-26": {
    "quadra": "A",
    "lote": "26",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "A-27": {
    "quadra": "A",
    "lote": "27",
    "area": "225,4 m²",
    "status": "disponivel"
  },
  "A-28": {
    "quadra": "A",
    "lote": "28",
    "area": "236,4 m²",
    "status": "disponivel"
  },
  "A-29": {
    "quadra": "A",
    "lote": "29",
    "area": "260,2 m²",
    "status": "disponivel"
  },
  "A-30": {
    "quadra": "A",
    "lote": "30",
    "area": "250,1 m²",
    "status": "disponivel"
  },
  "B-01": {
    "quadra": "B",
    "lote": "01",
    "area": "286,5 m²",
    "status": "disponivel"
  },
  "B-02": {
    "quadra": "B",
    "lote": "02",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-03": {
    "quadra": "B",
    "lote": "03",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-04": {
    "quadra": "B",
    "lote": "04",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-05": {
    "quadra": "B",
    "lote": "05",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-06": {
    "quadra": "B",
    "lote": "06",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-07": {
    "quadra": "B",
    "lote": "07",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-08": {
    "quadra": "B",
    "lote": "08",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-09": {
    "quadra": "B",
    "lote": "09",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-10": {
    "quadra": "B",
    "lote": "10",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-11": {
    "quadra": "B",
    "lote": "11",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-12": {
    "quadra": "B",
    "lote": "12",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-13": {
    "quadra": "B",
    "lote": "13",
    "area": "267,4 m²",
    "status": "disponivel"
  },
  "B-14": {
    "quadra": "B",
    "lote": "14",
    "area": "267,4 m²",
    "status": "disponivel"
  },
  "B-15": {
    "quadra": "B",
    "lote": "15",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-16": {
    "quadra": "B",
    "lote": "16",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-17": {
    "quadra": "B",
    "lote": "17",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-18": {
    "quadra": "B",
    "lote": "18",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-19": {
    "quadra": "B",
    "lote": "19",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-20": {
    "quadra": "B",
    "lote": "20",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-21": {
    "quadra": "B",
    "lote": "21",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-22": {
    "quadra": "B",
    "lote": "22",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-23": {
    "quadra": "B",
    "lote": "23",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-24": {
    "quadra": "B",
    "lote": "24",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-25": {
    "quadra": "B",
    "lote": "25",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "B-26": {
    "quadra": "B",
    "lote": "26",
    "area": "260,9 m²",
    "status": "disponivel"
  },
  "B-27": {
    "quadra": "B",
    "lote": "27",
    "area": "254,0 m²",
    "status": "disponivel"
  },
  "B-28": {
    "quadra": "B",
    "lote": "28",
    "area": "261,5 m²",
    "status": "disponivel"
  },
  "C-01": {
    "quadra": "C",
    "lote": "01",
    "area": "340,3 m²",
    "status": "disponivel"
  },
  "C-02": {
    "quadra": "C",
    "lote": "02",
    "area": "351,6 m²",
    "status": "disponivel"
  },
  "C-03": {
    "quadra": "C",
    "lote": "03",
    "area": "358,7 m²",
    "status": "disponivel"
  },
  "C-04": {
    "quadra": "C",
    "lote": "04",
    "area": "364,4 m²",
    "status": "disponivel"
  },
  "C-05": {
    "quadra": "C",
    "lote": "05",
    "area": "369,9 m²",
    "status": "disponivel"
  },
  "C-06": {
    "quadra": "C",
    "lote": "06",
    "area": "375,8 m²",
    "status": "disponivel"
  },
  "C-07": {
    "quadra": "C",
    "lote": "07",
    "area": "381,7 m²",
    "status": "disponivel"
  },
  "C-08": {
    "quadra": "C",
    "lote": "08",
    "area": "384,0 m²",
    "status": "disponivel"
  },
  "C-09": {
    "quadra": "C",
    "lote": "09",
    "area": "384,9 m²",
    "status": "disponivel"
  },
  "C-10": {
    "quadra": "C",
    "lote": "10",
    "area": "687,7 m²",
    "status": "disponivel"
  },
  "C-11": {
    "quadra": "C",
    "lote": "11",
    "area": "260,9 m²",
    "status": "disponivel"
  },
  "C-12": {
    "quadra": "C",
    "lote": "12",
    "area": "200,4 m²",
    "status": "disponivel"
  },
  "C-13": {
    "quadra": "C",
    "lote": "13",
    "area": "202,9 m²",
    "status": "disponivel"
  },
  "C-14": {
    "quadra": "C",
    "lote": "14",
    "area": "202,1 m²",
    "status": "disponivel"
  },
  "C-15": {
    "quadra": "C",
    "lote": "15",
    "area": "245,3 m²",
    "status": "disponivel"
  },
  "C-16": {
    "quadra": "C",
    "lote": "16",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "C-17": {
    "quadra": "C",
    "lote": "17",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "C-18": {
    "quadra": "C",
    "lote": "18",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "C-19": {
    "quadra": "C",
    "lote": "19",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "C-20": {
    "quadra": "C",
    "lote": "20",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "C-21": {
    "quadra": "C",
    "lote": "21",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "C-22": {
    "quadra": "C",
    "lote": "22",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "C-23": {
    "quadra": "C",
    "lote": "23",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "C-24": {
    "quadra": "C",
    "lote": "24",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "C-25": {
    "quadra": "C",
    "lote": "25",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "C-26": {
    "quadra": "C",
    "lote": "26",
    "area": "367,1 m²",
    "status": "disponivel"
  },
  "C-27": {
    "quadra": "C",
    "lote": "27",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "C-28": {
    "quadra": "C",
    "lote": "28",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "C-29": {
    "quadra": "C",
    "lote": "29",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-01": {
    "quadra": "D",
    "lote": "01",
    "area": "267,3 m²",
    "status": "disponivel"
  },
  "D-02": {
    "quadra": "D",
    "lote": "02",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-03": {
    "quadra": "D",
    "lote": "03",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-04": {
    "quadra": "D",
    "lote": "04",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-05": {
    "quadra": "D",
    "lote": "05",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-06": {
    "quadra": "D",
    "lote": "06",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-07": {
    "quadra": "D",
    "lote": "07",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-08": {
    "quadra": "D",
    "lote": "08",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-09": {
    "quadra": "D",
    "lote": "09",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-10": {
    "quadra": "D",
    "lote": "10",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-11": {
    "quadra": "D",
    "lote": "11",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-12": {
    "quadra": "D",
    "lote": "12",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-13": {
    "quadra": "D",
    "lote": "13",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-14": {
    "quadra": "D",
    "lote": "14",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-15": {
    "quadra": "D",
    "lote": "15",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-16": {
    "quadra": "D",
    "lote": "16",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-17": {
    "quadra": "D",
    "lote": "17",
    "area": "248,0 m²",
    "status": "disponivel"
  },
  "D-18": {
    "quadra": "D",
    "lote": "18",
    "area": "207,3 m²",
    "status": "disponivel"
  },
  "D-19": {
    "quadra": "D",
    "lote": "19",
    "area": "211,8 m²",
    "status": "disponivel"
  },
  "D-20": {
    "quadra": "D",
    "lote": "20",
    "area": "208,9 m²",
    "status": "disponivel"
  },
  "D-21": {
    "quadra": "D",
    "lote": "21",
    "area": "201,8 m²",
    "status": "disponivel"
  },
  "D-22": {
    "quadra": "D",
    "lote": "22",
    "area": "213,3 m²",
    "status": "disponivel"
  },
  "D-23": {
    "quadra": "D",
    "lote": "23",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-24": {
    "quadra": "D",
    "lote": "24",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-25": {
    "quadra": "D",
    "lote": "25",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-26": {
    "quadra": "D",
    "lote": "26",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-27": {
    "quadra": "D",
    "lote": "27",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-28": {
    "quadra": "D",
    "lote": "28",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-29": {
    "quadra": "D",
    "lote": "29",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-30": {
    "quadra": "D",
    "lote": "30",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-31": {
    "quadra": "D",
    "lote": "31",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-32": {
    "quadra": "D",
    "lote": "32",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-33": {
    "quadra": "D",
    "lote": "33",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "D-34": {
    "quadra": "D",
    "lote": "34",
    "area": "267,3 m²",
    "status": "disponivel"
  },
  "E-01": {
    "quadra": "E",
    "lote": "01",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "E-02": {
    "quadra": "E",
    "lote": "02",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "E-03": {
    "quadra": "E",
    "lote": "03",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "E-04": {
    "quadra": "E",
    "lote": "04",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "E-05": {
    "quadra": "E",
    "lote": "05",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "E-06": {
    "quadra": "E",
    "lote": "06",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "E-07": {
    "quadra": "E",
    "lote": "07",
    "area": "250,0 m²",
    "status": "disponivel"
  },
  "E-08": {
    "quadra": "E",
    "lote": "08",
    "area": "283,5 m²",
    "status": "disponivel"
  },
  "F-01": {
    "quadra": "F",
    "lote": "01",
    "area": "305,2 m²",
    "status": "disponivel"
  },
  "F-02": {
    "quadra": "F",
    "lote": "02",
    "area": "258,2 m²",
    "status": "disponivel"
  },
  "F-03": {
    "quadra": "F",
    "lote": "03",
    "area": "261,1 m²",
    "status": "disponivel"
  },
  "F-04": {
    "quadra": "F",
    "lote": "04",
    "area": "264,0 m²",
    "status": "disponivel"
  },
  "F-05": {
    "quadra": "F",
    "lote": "05",
    "area": "266,9 m²",
    "status": "disponivel"
  },
  "F-06": {
    "quadra": "F",
    "lote": "06",
    "area": "269,8 m²",
    "status": "disponivel"
  },
  "F-07": {
    "quadra": "F",
    "lote": "07",
    "area": "272,7 m²",
    "status": "disponivel"
  },
  "F-08": {
    "quadra": "F",
    "lote": "08",
    "area": "276,9 m²",
    "status": "disponivel"
  },
  "F-09": {
    "quadra": "F",
    "lote": "09",
    "area": "283,7 m²",
    "status": "disponivel"
  },
  "F-10": {
    "quadra": "F",
    "lote": "10",
    "area": "289,4 m²",
    "status": "disponivel"
  },
  "F-11": {
    "quadra": "F",
    "lote": "11",
    "area": "287,6 m²",
    "status": "disponivel"
  },
  "F-12": {
    "quadra": "F",
    "lote": "12",
    "area": "276,8 m²",
    "status": "disponivel"
  },
  "F-13": {
    "quadra": "F",
    "lote": "13",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-14": {
    "quadra": "F",
    "lote": "14",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-15": {
    "quadra": "F",
    "lote": "15",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-16": {
    "quadra": "F",
    "lote": "16",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-17": {
    "quadra": "F",
    "lote": "17",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-18": {
    "quadra": "F",
    "lote": "18",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-19": {
    "quadra": "F",
    "lote": "19",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-20": {
    "quadra": "F",
    "lote": "20",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-21": {
    "quadra": "F",
    "lote": "21",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-22": {
    "quadra": "F",
    "lote": "22",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-23": {
    "quadra": "F",
    "lote": "23",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-24": {
    "quadra": "F",
    "lote": "24",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-25": {
    "quadra": "F",
    "lote": "25",
    "area": "240,0 m²",
    "status": "disponivel"
  },
  "F-26": {
    "quadra": "F",
    "lote": "26",
    "area": "314,0 m²",
    "status": "disponivel"
  }
};

  const panelTitle = document.getElementById('painel-titulo');
  const panelDesc  = document.getElementById('painel-desc');
  const panelIcon  = document.getElementById('painel-svg-icon');
  const lotesLayer = document.getElementById('lotes-layer');

  if (!panelTitle || !panelDesc || !panelIcon || !lotesLayer) return;

  const loteIcon = '<path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 3v18"/>';

  function statusLabel(status) {
    return status === 'vendido' ? 'Vendido' : 'Disponível';
  }

  function limparSelecaoLotes() {
    document.querySelectorAll('.lote').forEach(lote => lote.classList.remove('selected'));
  }

  function selecionarLote(path) {
    const id = path.dataset.id;
    const info = dadosLotes[id];
    if (!info) return;

    limparSelecaoLotes();
    path.classList.add('selected');

    panelTitle.textContent = `Quadra ${info.quadra} - Lote ${info.lote}`;
    panelDesc.innerHTML = `
      <strong>Área:</strong> ${info.area}<br>
      <strong>Situação:</strong> ${statusLabel(info.status)}
    `;
    panelIcon.innerHTML = loteIcon;
  }

  function estadoInicialPainel() {
    panelTitle.textContent = 'Selecione um lote';
    panelDesc.innerHTML = 'Clique em qualquer lote do mapa para visualizar quadra, número, área e situação.';
    panelIcon.innerHTML = loteIcon;
  }

  async function carregarLotes() {
    try {
      const resposta = await fetch('img/mapa-site.svg', { cache: 'no-store' });
      if (!resposta.ok) throw new Error('Não foi possível carregar img/mapa-site.svg');

      const svgText = await resposta.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, 'image/svg+xml');
      const paths = Array.from(doc.querySelectorAll('path'));

      lotesLayer.innerHTML = '';

      paths.forEach((originalPath, index) => {
        const idLote = ordemLotes[index];
        const info = dadosLotes[idLote];
        if (!idLote || !info) return;

        const path = originalPath.cloneNode(true);
        path.removeAttribute('style');
        path.removeAttribute('stroke');
        path.removeAttribute('fill');

        path.setAttribute('id', idLote);
        path.setAttribute('tabindex', '0');
        path.setAttribute('role', 'button');
        path.setAttribute('aria-label', `Quadra ${info.quadra}, lote ${info.lote}, área ${info.area}, ${statusLabel(info.status)}`);

        path.classList.add('lote', info.status);
        path.dataset.id = idLote;
        path.dataset.quadra = info.quadra;
        path.dataset.lote = info.lote;
        path.dataset.area = info.area;
        path.dataset.status = info.status;

        path.addEventListener('click', () => selecionarLote(path));
        path.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selecionarLote(path);
          }
        });

        lotesLayer.appendChild(path);
        const bbox = path.getBBox();

        const texto = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'text'
        );

        texto.setAttribute('x', bbox.x + bbox.width / 2);
        texto.setAttribute('y', bbox.y + bbox.height / 2);
        texto.setAttribute('class', 'lote-numero');
        texto.setAttribute('text-anchor', 'middle');
        texto.setAttribute('dominant-baseline', 'middle');

        texto.textContent = info.lote;

        lotesLayer.appendChild(texto);
      });

      if (paths.length !== ordemLotes.length) {
        console.warn(`Mapa carregado com ${paths.length} paths, mas existem ${ordemLotes.length} lotes cadastrados.`);
      }
    } catch (error) {
      console.error(error);
      panelTitle.textContent = 'Mapa indisponível';
      panelDesc.textContent = 'Não foi possível carregar os lotes. Confira se o arquivo img/mapa-site.svg está na pasta correta.';
    }
  }

  estadoInicialPainel();
  carregarLotes();
})();
