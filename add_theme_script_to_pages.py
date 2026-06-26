#!/usr/bin/env python3
import os

BASE = '/workspaces/pedromiguelcopadomundo2ds'
pages = [
  '1930.html','1934.html','1938.html','1950.html','1954.html','1958.html','1962.html','1966.html',
  '1970.html','1974.html','1978.html','1982.html','1986.html','1990.html','1994.html','1998.html',
  '2002.html','2006.html','2010.html','2014.html','2018.html','2022.html'
]

SCRIPT = '\n      <script src="theme.js" defer></script>\n'

for p in pages:
  path = os.path.join(BASE, p)
  if not os.path.exists(path):
    continue
  with open(path, encoding='utf-8') as f:
    html = f.read()

  if 'src="theme.js"' in html:
    continue

  # tenta inserir logo após o <article class="edition-card">
  needle = '<article class="edition-card">'
  if needle in html:
    html = html.replace(needle, needle + SCRIPT, 1)
  else:
    # fallback: antes do </head>
    if '</head>' in html:
      html = html.replace('</head>', f'\n  <script src="theme.js" defer></script>\n</head>', 1)

  with open(path, 'w', encoding='utf-8') as f:
    f.write(html)

print('theme.js inserido nas páginas do World Cup finals.')

