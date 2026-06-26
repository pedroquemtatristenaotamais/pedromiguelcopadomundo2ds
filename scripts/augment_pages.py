#!/usr/bin/env python3
import json, os

BASE = '/workspaces/pedromiguelcopadomundo2ds'
data_path = os.path.join(BASE, 'data_finals.json')
with open(data_path, encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    year = item.get('year')
    if not year: continue
    path = os.path.join(BASE, f'{year}.html')
    if not os.path.exists(path):
        print('Arquivo não existe:', path)
        continue
    with open(path, encoding='utf-8') as f:
        html = f.read()
    # build details HTML
    details = f'''\n      <section class="edition-details">\n        <h2>Dados da final</h2>\n        <div class="meta">\n          <div><span class="key">Estádio:</span> {item.get('venue','')}</div>\n          <div><span class="key">Local:</span> {item.get('location','')}</div>\n          <div><span class="key">Público:</span> {item.get('attendance','')}</div>\n          <div><span class="key">Vice:</span> {item.get('runner_up','')}</div>\n          <div><span class="key">Placar final:</span> {item.get('score','')}</div>\n        </div>\n      </section>\n'''
    if 'edition-details' in html:
        print('Já contém detalhes:', path)
        continue
    # insert before the closing of article or before footer
    if '</article>' in html:
        html = html.replace('</article>', details + '    </article>')
    else:
        html = html.replace('</main>', details + '</main>')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print('Atualizado', path)
