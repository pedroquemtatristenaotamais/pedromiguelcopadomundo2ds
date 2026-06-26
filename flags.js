const countryFlags = {
  'Brazil': '🇧🇷',
  'Germany': '🇩🇪',
  'West Germany': '🇩🇪',
  'Italy': '🇮🇹',
  'Argentina': '🇦🇷',
  'France': '🇫🇷',
  'Uruguay': '🇺🇾',
  'Spain': '🇪🇸',
  'England': '🇬🇧',
  'Croatia': '🇭🇷',
  'Sweden': '🇸🇪',
  'Netherlands': '🇳🇱',
  'Hungary': '🇭🇺',
  'Czechoslovakia': '🇨🇿',
  'Poland': '🇵🇱',
  'Russia': '🇷🇺',
  'Japan': '🇯🇵',
  'South Korea': '🇰🇷',
  'South Africa': '🇿🇦',
  'Chile': '🇨🇱',
  'Mexico': '🇲🇽',
  'United States': '🇺🇸',
  'Switzerland': '🇨🇭',
  'Qatar': '🇶🇦',
};

function getFlag(country) {
  return countryFlags[country] || '⚽';
}
