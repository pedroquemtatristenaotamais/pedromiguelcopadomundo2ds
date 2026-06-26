#!/usr/bin/env python3
import json, os

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

# Criar mapa de year -> dados
year_data = {}
for item in data:
    year = item.get('year')
    if year and year != '2026':
        year_data[year] = item

with open(index_path, encoding='utf-8') as f:
    content = f.read()

# Substituir cada linha de ed-item para incluir bandeiras
for year, item in year_data.items():
    champ = item.get('champion', '')
    if not champ:
        continue
    flag = get_flag(champ)
    
    # Procurar o padrão <div class="ed-item"><a href="YYYY.html">...
    # Substituir cada ocorrência
    old_pattern = f'<div class="ed-item"><a href="{year}.html">'
    if old_pattern in content:
        # Pegar o conteúdo da linha
        start = content.find(old_pattern)
        end = content.find('</a></div>', start) + len('</a></div>')
        old_line = content[start:end]
        
        # Verificar se já tem bandeira
        if flag in old_line and year in old_line:
            continue  # Já tem bandeira
        
        # Substituir "Campeão: CHAMP" por "Campeão: FLAG CHAMP"
        new_line = old_line.replace(f'Campeão: {champ}', f'Campeão: {flag} {champ}')
        content = content.replace(old_line, new_line, 1)
        print(f'Atualizado {year}')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('index.html atualizado com todas as bandeiras!')
