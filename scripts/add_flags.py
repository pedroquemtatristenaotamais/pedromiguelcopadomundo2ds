#!/usr/bin/env python3
import json, os, re

BASE = '/workspaces/pedromiguelcopadomundo2ds'
data_path = os.path.join(BASE, 'data_finals.json')

# Mapeamento de países para emojis
flags = {
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
}

def get_flag(country):
    return flags.get(country, '⚽')

with open(data_path, encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    year = item.get('year')
    if not year or year == '2026': continue
    path = os.path.join(BASE, f'{year}.html')
    if not os.path.exists(path):
        print('Arquivo não existe:', path)
        continue
    with open(path, encoding='utf-8') as f:
        html = f.read()
    
    champ = item.get('champion', '')
    runner = item.get('runner_up', '')
    champ_flag = get_flag(champ)
    runner_flag = get_flag(runner)
    
    # Replace champion name with flag + name in the h1 and meta section
    # Atualizar a linha meta do campeão
    old_meta = f'<div><span class="key">Campeão:</span> {champ}</div>'
    new_meta = f'<div><span class="key">Campeão:</span> {champ_flag} {champ}</div>'
    if old_meta in html:
        html = html.replace(old_meta, new_meta)
    
    # Atualizar a linha meta do vice
    old_meta_runner = f'<div><span class="key">Vice:</span> {runner}</div>'
    new_meta_runner = f'<div><span class="key">Vice:</span> {runner_flag} {runner}</div>'
    if old_meta_runner in html:
        html = html.replace(old_meta_runner, new_meta_runner)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print('Atualizado com bandeiras:', path)

print('Feito!')
