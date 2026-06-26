(function () {
  function normalizeSpaces(s) {
    return (s || '').toString().replace(/\s+/g, ' ').trim();
  }

  function getChampionFromQuery() {
    const params = new URLSearchParams(location.search);
    return normalizeSpaces(params.get('champion'));
  }

  // Cores aproximadas das bandeiras (fallback quando não existir)
  // Formato: duas cores principais para degradê e cor do texto.
  const flagThemes = {
    Brazil: { a: '#009C3B', b: '#FFDF00', text: '#ffffff' },
    Germany: { a: '#000000', b: '#DD0000', text: '#ffffff' },
    'West Germany': { a: '#000000', b: '#DD0000', text: '#ffffff' },
    Italy: { a: '#009246', b: '#FFFFFF', text: '#111111' },
    Argentina: { a: '#75AADB', b: '#F2F2F2', text: '#111111' },
    France: { a: '#0055A4', b: '#FFFFFF', text: '#111111' },
    Uruguay: { a: '#0B4EA2', b: '#FFFFFF', text: '#111111' },
    Spain: { a: '#AA151B', b: '#F1BF00', text: '#ffffff' },
    England: { a: '#FFFFFF', b: '#C8102E', text: '#111111' },
    Croatia: { a: '#D81E05', b: '#FFFFFF', text: '#111111' },
    Sweden: { a: '#006AA7', b: '#FECC00', text: '#111111' },
    Netherlands: { a: '#AE1C28', b: '#FFFFFF', text: '#111111' },
    Hungary: { a: '#CE2939', b: '#FFFFFF', text: '#111111' },
    Czechoslovakia: { a: '#11457E', b: '#FFFFFF', text: '#ffffff' },
    Poland: { a: '#FFFFFF', b: '#DC143C', text: '#111111' },
    Russia: { a: '#FFFFFF', b: '#0039A6', text: '#111111' },
    Japan: { a: '#FFFFFF', b: '#BC002D', text: '#111111' },
    'South Korea': { a: '#003478', b: '#D80621', text: '#ffffff' },
    'South Africa': { a: '#007749', b: '#FFD43B', text: '#111111' },
    Chile: { a: '#00205B', b: '#FFFFFF', text: '#ffffff' },
    Mexico: { a: '#006847', b: '#CE1126', text: '#ffffff' },
    'United States': { a: '#B22234', b: '#3C3B6E', text: '#ffffff' },
    Switzerland: { a: '#D52B1E', b: '#FFFFFF', text: '#111111' },
    Qatar: { a: '#8A1538', b: '#F3D100', text: '#111111' },
  };

  function applyTheme(champion) {
    const root = document.documentElement;
    const theme = flagThemes[champion] || { a: '#111111', b: '#dddddd', text: '#eaf2ff' };

    // aplica fundo degradê e acentua bordas/cards
    root.style.setProperty('--accent2', theme.b);
    root.style.setProperty('--accent', theme.a);
    root.style.setProperty('--text', theme.text);

    // marca como “em cores”
    root.setAttribute('data-flag-theme', '1');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const champion = getChampionFromQuery();
    if (!champion) return;
    applyTheme(champion);
  });
})();

