/**
 * app.js — Main application logic for the Copa do Mundo index page
 * Handles search, filtering, and dynamic card generation
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ─── Data ─── */
  const editions = [
    { year: 1930, host: 'Uruguai',                champion: 'Uruguay',       champPt: 'Uruguai',              runner: 'Argentina',       runnerPt: 'Argentina',            score: '4–2',                          topScorer: 'Guillermo Stábile (ARG) — 8 gols',       venue: 'Estadio Centenario',       city: 'Montevidéu, Uruguai',                    attendance: '68.346' },
    { year: 1934, host: 'Itália',                  champion: 'Italy',         champPt: 'Itália',               runner: 'Czechoslovakia',  runnerPt: 'Checoslováquia',       score: '2–1 (prorr.)',                 topScorer: 'Oldřich Nejedlý (TCH) — 5 gols',         venue: 'Stadio Nazionale PNF',     city: 'Roma, Itália',                           attendance: '55.000' },
    { year: 1938, host: 'França',                  champion: 'Italy',         champPt: 'Itália',               runner: 'Hungary',         runnerPt: 'Hungria',              score: '4–2',                          topScorer: 'Leônidas (BRA) — 7 gols',                venue: 'Stade Olympique de Colombes', city: 'Colombes, França',                     attendance: '45.000' },
    { year: 1950, host: 'Brasil',                  champion: 'Uruguay',       champPt: 'Uruguai',              runner: 'Brazil',          runnerPt: 'Brasil',               score: '2–1',                          topScorer: 'Ademir (BRA) — 8 gols',                  venue: 'Maracanã',                 city: 'Rio de Janeiro, Brasil',                 attendance: '173.850' },
    { year: 1954, host: 'Suíça',                   champion: 'West Germany',  champPt: 'Alemanha Ocidental',   runner: 'Hungary',         runnerPt: 'Hungria',              score: '3–2',                          topScorer: 'Sándor Kocsis (HUN) — 11 gols',          venue: 'Wankdorf Stadium',         city: 'Berna, Suíça',                           attendance: '62.500' },
    { year: 1958, host: 'Suécia',                  champion: 'Brazil',        champPt: 'Brasil',               runner: 'Sweden',          runnerPt: 'Suécia',               score: '5–2',                          topScorer: 'Just Fontaine (FRA) — 13 gols',          venue: 'Råsunda Stadium',          city: 'Solna, Suécia',                          attendance: '49.737' },
    { year: 1962, host: 'Chile',                   champion: 'Brazil',        champPt: 'Brasil',               runner: 'Czechoslovakia',  runnerPt: 'Checoslováquia',       score: '3–1',                          topScorer: 'Garrincha (BRA) e outros — 4 gols',      venue: 'Estadio Nacional',         city: 'Santiago, Chile',                        attendance: '68.679' },
    { year: 1966, host: 'Inglaterra',              champion: 'England',       champPt: 'Inglaterra',           runner: 'West Germany',    runnerPt: 'Alemanha Ocidental',   score: '4–2 (prorr.)',                 topScorer: 'Eusébio (POR) — 9 gols',                 venue: 'Wembley Stadium',          city: 'Londres, Inglaterra',                    attendance: '96.924' },
    { year: 1970, host: 'México',                  champion: 'Brazil',        champPt: 'Brasil',               runner: 'Italy',           runnerPt: 'Itália',               score: '4–1',                          topScorer: 'Gerd Müller (ALE) — 10 gols',            venue: 'Estadio Azteca',           city: 'Cidade do México, México',               attendance: '107.412' },
    { year: 1974, host: 'Alemanha Ocidental',      champion: 'West Germany',  champPt: 'Alemanha Ocidental',   runner: 'Netherlands',     runnerPt: 'Holanda',              score: '2–1',                          topScorer: 'Grzegorz Lato (POL) — 7 gols',           venue: 'Olympiastadion',           city: 'Munique, Alemanha',                      attendance: '78.200' },
    { year: 1978, host: 'Argentina',               champion: 'Argentina',     champPt: 'Argentina',            runner: 'Netherlands',     runnerPt: 'Holanda',              score: '3–1 (prorr.)',                 topScorer: 'Mario Kempes (ARG) — 6 gols',            venue: 'Estadio Monumental',       city: 'Buenos Aires, Argentina',                attendance: '71.483' },
    { year: 1982, host: 'Espanha',                 champion: 'Italy',         champPt: 'Itália',               runner: 'West Germany',    runnerPt: 'Alemanha Ocidental',   score: '3–1',                          topScorer: 'Paolo Rossi (ITA) — 6 gols',             venue: 'Santiago Bernabéu',        city: 'Madri, Espanha',                         attendance: '90.000' },
    { year: 1986, host: 'México',                  champion: 'Argentina',     champPt: 'Argentina',            runner: 'West Germany',    runnerPt: 'Alemanha Ocidental',   score: '3–2',                          topScorer: 'Gary Lineker (ING) — 6 gols',            venue: 'Estadio Azteca',           city: 'Cidade do México, México',               attendance: '114.600' },
    { year: 1990, host: 'Itália',                  champion: 'West Germany',  champPt: 'Alemanha Ocidental',   runner: 'Argentina',       runnerPt: 'Argentina',            score: '1–0',                          topScorer: 'Salvatore Schillaci (ITA) — 6 gols',     venue: 'Stadio Olimpico',          city: 'Roma, Itália',                           attendance: '73.603' },
    { year: 1994, host: 'Estados Unidos',          champion: 'Brazil',        champPt: 'Brasil',               runner: 'Italy',           runnerPt: 'Itália',               score: '0–0 (3–2 pên.)',               topScorer: 'Oleg Salenko (RUS) / Hristo Stoichkov (BUL) — 6 gols', venue: 'Rose Bowl', city: 'Pasadena, EUA',                  attendance: '94.194' },
    { year: 1998, host: 'França',                  champion: 'France',        champPt: 'França',               runner: 'Brazil',          runnerPt: 'Brasil',               score: '3–0',                          topScorer: 'Davor Šuker (CRO) — 6 gols',             venue: 'Stade de France',          city: 'Saint-Denis, França',                    attendance: '80.000' },
    { year: 2002, host: 'Coreia/Japão',            champion: 'Brazil',        champPt: 'Brasil',               runner: 'Germany',         runnerPt: 'Alemanha',             score: '2–0',                          topScorer: 'Ronaldo (BRA) — 8 gols',                 venue: 'International Stadium',    city: 'Yokohama, Japão',                        attendance: '69.029' },
    { year: 2006, host: 'Alemanha',                champion: 'Italy',         champPt: 'Itália',               runner: 'France',          runnerPt: 'França',               score: '1–1 (5–3 pên.)',               topScorer: 'Miroslav Klose (ALE) — 5 gols',          venue: 'Olympiastadion',           city: 'Berlim, Alemanha',                       attendance: '69.000' },
    { year: 2010, host: 'África do Sul',           champion: 'Spain',         champPt: 'Espanha',              runner: 'Netherlands',     runnerPt: 'Holanda',              score: '1–0 (prorr.)',                 topScorer: 'Thomas Müller (ALE) e outros — 5 gols',  venue: 'Soccer City',              city: 'Joanesburgo, África do Sul',             attendance: '84.490' },
    { year: 2014, host: 'Brasil',                  champion: 'Germany',       champPt: 'Alemanha',             runner: 'Argentina',       runnerPt: 'Argentina',            score: '1–0 (prorr.)',                 topScorer: 'James Rodríguez (COL) — 6 gols',         venue: 'Maracanã',                 city: 'Rio de Janeiro, Brasil',                 attendance: '74.738' },
    { year: 2018, host: 'Rússia',                  champion: 'France',        champPt: 'França',               runner: 'Croatia',         runnerPt: 'Croácia',              score: '4–2',                          topScorer: 'Harry Kane (ING) — 6 gols',              venue: 'Luzhniki Stadium',         city: 'Moscou, Rússia',                         attendance: '78.011' },
    { year: 2022, host: 'Catar',                   champion: 'Argentina',     champPt: 'Argentina',            runner: 'France',          runnerPt: 'França',               score: '3–3 (4–2 pên.)',               topScorer: 'Kylian Mbappé (FRA) — 8 gols',           venue: 'Lusail Stadium',           city: 'Lusail, Catar',                          attendance: '88.966' },
  ];

  const flagEmojis = {
    Brazil: '🇧🇷', Germany: '🇩🇪', 'West Germany': '🇩🇪',
    Italy: '🇮🇹', Argentina: '🇦🇷', France: '🇫🇷',
    Uruguay: '🇺🇾', Spain: '🇪🇸', England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    Croatia: '🇭🇷', Sweden: '🇸🇪', Netherlands: '🇳🇱',
    Hungary: '🇭🇺', Czechoslovakia: '🇨🇿', Poland: '🇵🇱',
    Russia: '🇷🇺', Japan: '🇯🇵', 'South Korea': '🇰🇷',
    'South Africa': '🇿🇦', Chile: '🇨🇱', Mexico: '🇲🇽',
    'United States': '🇺🇸', Switzerland: '🇨🇭', Qatar: '🇶🇦',
  };

  function getFlag(country) {
    return flagEmojis[country] || '⚽';
  }

  /* ─── DOM refs ─── */
  const searchInput = document.getElementById('search');
  const filterSelect = document.getElementById('filter');
  const gridContainer = document.getElementById('editions');
  const gameGrid = document.getElementById('gameCards');
  const sidebarStats = document.getElementById('sidebarStats');
  const sidebar = document.getElementById('mainSidebar');
  const sidebarClose = document.getElementById('sidebarClose');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const menuToggle = document.getElementById('menuToggle');
  const quizCard = document.getElementById('quizCard');
  const quizQuestions = quizCard ? Array.from(quizCard.querySelectorAll('.quiz-question')) : [];
  const quizResult = document.getElementById('quizResult');
  let quizStep = 0;
  let quizScore = 0;

  /* ─── Build cards ─── */
  function buildCards() {
    gridContainer.innerHTML = '';

    editions.forEach((ed) => {
      const card = document.createElement('a');
      card.className = 'ed-card';
      card.href = `${ed.year}.html?champion=${encodeURIComponent(ed.champion)}&from=index&year=${ed.year}`;
      card.target = '_blank';
      card.rel = 'noopener';
      card.dataset.year = ed.year;
      card.dataset.champion = ed.champion;
      card.dataset.searchtext = `${ed.year} ${ed.host} ${ed.champPt} ${ed.runnerPt} ${ed.champion} ${ed.runner}`.toLowerCase();

      card.innerHTML = `
        <div class="ed-year">${ed.year}</div>
        <div class="ed-host">${ed.host}</div>
        <div class="ed-champion">
          <span class="trophy">🏆</span>
          <span class="champ-name">${getFlag(ed.champion)} ${ed.champPt}</span>
        </div>
        <div class="ed-score">${ed.score}</div>
        <div class="ed-runner-up">Vice: ${getFlag(ed.runner)} ${ed.runnerPt}</div>
      `;

      // Set a champion color (used by CSS --champ-color for the hover stripe)
      const championColors = {
        /* English */
        Brazil: '#009c3b', Argentina: '#74b9ff', Uruguay: '#6fc2e6', Italy: '#0072bc', France: '#002395',
        England: '#cf142b', Germany: '#000000', 'West Germany': '#000000', Spain: '#c60b1e', Netherlands: '#ff7f00',
        Croatia: '#ff0000', Sweden: '#006aa7', Poland: '#dc143c', Hungary: '#d20000', 'Czechoslovakia': '#d7141a',
        Russia: '#0033a0', Japan: '#bc002d', 'South Korea': '#003478', 'South Africa': '#008053', Chile: '#d52b1e',
        Mexico: '#006847', 'United States': '#b22234', Switzerland: '#e2001a', Qatar: '#8a1538', Uruguay: '#6fc2e6',
        /* Portuguese keys (champPt) */
        Brasil: '#009c3b', Argentina: '#74b9ff', Uruguai: '#6fc2e6', Itália: '#0072bc', França: '#002395',
        Inglaterra: '#cf142b', Alemanha: '#000000', 'Alemanha Ocidental': '#000000', Espanha: '#c60b1e', Holanda: '#ff7f00',
        Croácia: '#ff0000', Suécia: '#006aa7', Polônia: '#dc143c', Hungria: '#d20000', 'Checoslováquia': '#d7141a',
        Rússia: '#0033a0', Japão: '#bc002d', 'Coreia do Sul': '#003478', 'África do Sul': '#008053', Chile: '#d52b1e',
        México: '#006847', 'Estados Unidos': '#b22234', Suíça: '#e2001a', Catar: '#8a1538'
      };

      // Prefer canonical English champion name but fall back to Portuguese champPt
      const rawKey = (ed.champion || ed.champPt || '').trim();
      // Try several normalized variants to catch mismatches
      const variants = [rawKey, rawKey.replace(/\s+\(.*\)$/, ''), rawKey.replace(/\s+de\s+/, ' '), rawKey.toLowerCase()];
      let champColor = null;
      for (const k of variants) {
        if (!k) continue;
        if (championColors[k]) { champColor = championColors[k]; break; }
        // try capitalized lookup
        const cap = k.charAt(0).toUpperCase() + k.slice(1);
        if (championColors[cap]) { champColor = championColors[cap]; break; }
      }

      if (!champColor) {
        // fallback to CSS secondary variable
        const cssSecondary = getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim();
        champColor = cssSecondary || '#ff7a18';
      }

      card.style.setProperty('--champ-color', champColor);

      gridContainer.appendChild(card);
    });
  }

  buildCards();
  buildGameCards();
  updateSidebarStats();
  setupSidebar();
  setupQuiz();

  /* ─── Search & Filter ─── */
  function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const filterVal = filterSelect.value;
    const cards = gridContainer.querySelectorAll('.ed-card');
    let visibleCount = 0;

    cards.forEach((card) => {
      const year = parseInt(card.dataset.year, 10);
      const searchtext = card.dataset.searchtext;
      let show = true;

      // Text search
      if (query && !searchtext.includes(query)) {
        show = false;
      }

      // Period filter
      if (filterVal === 'pre1950' && year >= 1950) show = false;
      if (filterVal === '1950-1990' && (year < 1950 || year > 1990)) show = false;
      if (filterVal === '1994-2022' && (year < 1994 || year > 2022)) show = false;

      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    // Show/hide no-results message
    let noResults = gridContainer.querySelector('.no-results');
    if (visibleCount === 0) {
      if (!noResults) {
        noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = '<span class="emoji">🔍</span>Nenhuma edição encontrada.';
        gridContainer.appendChild(noResults);
      }
      noResults.style.display = '';
    } else if (noResults) {
      noResults.style.display = 'none';
    }
  }

  searchInput.addEventListener('input', applyFilters);
  filterSelect.addEventListener('change', applyFilters);

  function buildGameCards() {
    if (!gameGrid) return;
    gameGrid.innerHTML = '';

    editions.forEach((ed) => {
      const card = document.createElement('article');
      card.className = 'game-card';
      card.innerHTML = `
        <div class="game-header">
          <div class="game-year">${ed.year}</div>
          <div class="game-score">${ed.score}</div>
        </div>
        <div class="game-teams">
          <span class="team champion">${getFlag(ed.champion)} ${ed.champPt}</span>
          <span>vs</span>
          <span class="team runner">${getFlag(ed.runner)} ${ed.runnerPt}</span>
        </div>
        <div class="game-meta">${ed.venue} · ${ed.city} · Público: ${ed.attendance}</div>
        <div class="game-topscorer">Artilheiro da final: ${ed.topScorer}</div>
      `;
      gameGrid.appendChild(card);
    });
  }

  function parseGoals(score) {
    const parts = score.match(/\d+/g);
    if (!parts || parts.length < 2) return 0;
    return parts.slice(0, 2).reduce((sum, v) => sum + Number(v), 0);
  }

  function updateSidebarStats() {
    if (!sidebarStats) return;
    const totalEditions = editions.length;
    const championCounts = editions.reduce((acc, ed) => {
      const name = ed.champPt;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    const favorite = Object.entries(championCounts).sort((a, b) => b[1] - a[1])[0] || ['Brasil', 0];
    const totalGoals = editions.reduce((sum, ed) => sum + parseGoals(ed.score), 0);
    const averageGoals = (totalGoals / totalEditions).toFixed(1);
    const allChampions = Object.keys(championCounts).length;

    sidebarStats.innerHTML = `
      <strong>${totalEditions} finais</strong> analisadas.<br>
      ${allChampions} campeões diferentes.<br>
      Média de <strong>${averageGoals}</strong> gols por final.<br>
      Seleção com mais títulos: <strong>${favorite[0]} (${favorite[1]})</strong>.
    `;
  }

  function openSidebar() {
    document.body.classList.add('sidebar-open');
    if (sidebar) sidebar.setAttribute('aria-hidden', 'false');
  }

  function closeSidebar() {
    document.body.classList.remove('sidebar-open');
    if (sidebar) sidebar.setAttribute('aria-hidden', 'true');
  }

  function setupSidebar() {
    if (menuToggle) menuToggle.addEventListener('click', openSidebar);
    if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && document.body.classList.contains('sidebar-open')) {
        closeSidebar();
      }
    });
  }

  function setupQuiz() {
    if (!quizCard || !quizResult || !quizQuestions.length) return;

    const quizAnswers = ['Brazil', 'Brazil', '1970'];

    function showQuestion(step) {
      quizQuestions.forEach((question, index) => {
        question.classList.toggle('hidden', index !== step);
      });
      quizResult.classList.add('hidden');
    }

    function showResult() {
      quizQuestions.forEach((question) => question.classList.add('hidden'));
      quizResult.classList.remove('hidden');
      quizResult.innerHTML = `
        <p>Você acertou <strong>${quizScore}</strong> de <strong>${quizQuestions.length}</strong> perguntas.</p>
        <button id="quizRestart" type="button">Recomeçar quiz</button>
      `;
      document.getElementById('quizRestart').addEventListener('click', () => {
        quizStep = 0;
        quizScore = 0;
        showQuestion(0);
      });
    }

    quizQuestions.forEach((question, index) => {
      Array.from(question.querySelectorAll('button')).forEach((button) => {
        button.addEventListener('click', () => {
          const answer = button.dataset.answer;
          if (answer === quizAnswers[index]) {
            quizScore += 1;
          }
          quizStep += 1;
          if (quizStep < quizQuestions.length) {
            showQuestion(quizStep);
          } else {
            showResult();
          }
        });
      });
    });

    showQuestion(0);
  }
});
