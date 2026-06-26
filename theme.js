/**
 * theme.js — Flag-based theming for edition pages
 * Reads the champion from the URL query string and applies
 * flag-colored gradients to the entire page.
 */
(function () {
  'use strict';

  function normalizeSpaces(s) {
    return (s || '').toString().replace(/\s+/g, ' ').trim();
  }

  function getChampionFromQuery() {
    const params = new URLSearchParams(location.search);
    return normalizeSpaces(params.get('champion'));
  }

  /**
   * Flag color palettes — 3 colors per flag for rich gradients
   * a = primary color, b = secondary color, c = tertiary/accent
   * text = text color that is readable on the gradient
   */
  const flagThemes = {
    Brazil:           { a: '#009c3b', b: '#ffdf00', c: '#002776', text: '#ffffff' },
    Germany:          { a: '#000000', b: '#dd0000', c: '#ffcc00', text: '#ffffff' },
    'West Germany':   { a: '#000000', b: '#dd0000', c: '#ffcc00', text: '#ffffff' },
    Italy:            { a: '#009246', b: '#ffffff', c: '#ce2b37', text: '#ffffff' },
    Argentina:        { a: '#75aadb', b: '#ffffff', c: '#f5c400', text: '#1a1a2e' },
    France:           { a: '#002395', b: '#ffffff', c: '#ed2939', text: '#ffffff' },
    Uruguay:          { a: '#0038a8', b: '#ffffff', c: '#f5c400', text: '#ffffff' },
    Spain:            { a: '#aa151b', b: '#f1bf00', c: '#aa151b', text: '#ffffff' },
    England:          { a: '#ffffff', b: '#c8102e', c: '#012169', text: '#1a1a2e' },
    Croatia:          { a: '#d81e05', b: '#ffffff', c: '#0033a0', text: '#ffffff' },
    Sweden:           { a: '#006aa7', b: '#fecc00', c: '#006aa7', text: '#ffffff' },
    Netherlands:      { a: '#ae1c28', b: '#ffffff', c: '#21468b', text: '#ffffff' },
    Hungary:          { a: '#ce2939', b: '#ffffff', c: '#477050', text: '#ffffff' },
    Czechoslovakia:   { a: '#11457e', b: '#ffffff', c: '#d7141a', text: '#ffffff' },
    Poland:           { a: '#ffffff', b: '#dc143c', c: '#ffffff', text: '#1a1a2e' },
    Russia:           { a: '#ffffff', b: '#0039a6', c: '#d52b1e', text: '#ffffff' },
    Japan:            { a: '#ffffff', b: '#bc002d', c: '#ffffff', text: '#1a1a2e' },
    'South Korea':    { a: '#003478', b: '#ffffff', c: '#d80621', text: '#ffffff' },
    'South Africa':   { a: '#007749', b: '#ffd43b', c: '#000000', text: '#ffffff' },
    Chile:            { a: '#00205b', b: '#ffffff', c: '#d7141a', text: '#ffffff' },
    Mexico:           { a: '#006847', b: '#ffffff', c: '#ce1126', text: '#ffffff' },
    'United States':  { a: '#b22234', b: '#ffffff', c: '#3c3b6e', text: '#ffffff' },
    Switzerland:      { a: '#d52b1e', b: '#ffffff', c: '#d52b1e', text: '#ffffff' },
    Qatar:            { a: '#8a1538', b: '#ffffff', c: '#8a1538', text: '#ffffff' },
  };

  /**
   * Country flag emojis
   */
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

  function applyTheme(champion) {
    const theme = flagThemes[champion];
    if (!theme) return;

    const root = document.documentElement;

    // Set CSS custom properties for the flag gradient
    root.style.setProperty('--flag-a', theme.a + '33');   // ~20% opacity for bg radials
    root.style.setProperty('--flag-b', theme.b + '28');
    root.style.setProperty('--flag-c', theme.c + '1a');
    root.style.setProperty('--flag-text', theme.text);

    // Override accent colors to match the flag
    root.style.setProperty('--accent', theme.a === '#ffffff' || theme.a === '#000000' ? theme.b : theme.a);
    root.style.setProperty('--gold', theme.b === '#ffffff' ? theme.a : theme.b);

    // Add edition-page class for CSS targeting
    document.body.classList.add('edition-page');

    // Set the flag emoji in the hero if present
    const flagEl = document.querySelector('.flag-emoji');
    if (flagEl) {
      flagEl.textContent = flagEmojis[champion] || '🏆';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const champion = getChampionFromQuery();
    if (!champion) {
      // If no query param, try to extract from the page content
      const champEl = document.querySelector('[data-champion]');
      if (champEl) {
        applyTheme(champEl.dataset.champion);
      }
      return;
    }
    applyTheme(champion);
  });
})();
