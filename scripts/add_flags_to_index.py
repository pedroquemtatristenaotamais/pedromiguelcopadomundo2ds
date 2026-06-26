#!/usr/bin/env python3
import json, os, re

BASE = '/workspaces/pedromiguelcopadomundo2ds'
data_path = os.path.join(BASE, 'data_finals.json')
index_path = os.path.join(BASE, 'index.html')

flags = {
    'Brazil': '🇧🇷', 'Germany': '🇩🇪', 'West Germany': '🇩🇪', 'Italy': '🇮🇹',
    'Argentina': '🇦🇷', 'France': '🇫🇷', 'Uruguay': '🇺🇾', 'Spain': '🇪🇸',
    'England': '🇬🇧', 'Croatia': '🇭🇷', 'Sweden': '🇸🇪', 'Netherlands': '🇳🇱',
    'Hungary': '🇭🇺', 'Czechoslovakia': '🇨🇿', 'Poland': '🇵🇱', 'Russia': '🇷🇺',
    'Japan': '🇯🇵', 'South Korea': '🇰🇷', 'South Africa': '🇿🇦', 'Chile': '🇨🇱',
    'Mexico': '🇲🇽', 'United States': '🇺🇸', 'Switzerland': '🇨🇭', 'Qatar': '🇶🇦',
}

def get_flag(country):
    return flags.get(country, '⚽')

with open(data_path, encoding='utf-8') as f:
    data = json.load(f)

with open(index_path, encoding='utf-8') as f:
    html = f.read()

# Para cada edição, adicionar bandeira do campeão no link
for item in data:
    year = item.get('year')
    if not year or year == '2026': continue
    champ = item.get('champion', '')
    if not champ: continue
    flag = get_flag(champ)
    
    # Procurar o padrão: <div class="ed-item"><a href="YYYY.html">YYYY — ...Campeão: CHAMP...
    pattern = f'<a href="{year}.html">{year} — .+?Campeão: {champ}.*?</a>'
    matches = re.findall(pattern, html)
    if matches:
        # Substituir o primeiro match
        old = matches[0]
        new = old.replace(f'Campeão: {champ}', f'Campeão: {flag} {champ}')
        html = html.replace(old, new, 1)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)

print('index.html atualizado com bandeiras!')
