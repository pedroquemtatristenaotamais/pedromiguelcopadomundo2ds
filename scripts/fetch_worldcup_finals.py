#!/usr/bin/env python3
import re, json, sys
from urllib.request import urlopen
from html import unescape

URL = 'https://en.wikipedia.org/wiki/List_of_FIFA_World_Cup_finals'

def text(node):
    # remove tags
    t = re.sub(r'<[^>]+>', '', node)
    return unescape(t).strip()

def main():
    print('Baixando', URL)
    from urllib.request import Request
    req = Request(URL, headers={'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0'})
    html = urlopen(req).read().decode('utf-8')
    # find all tables and pick the one that references individual final pages (YYYY_FIFA_World_Cup_final)
    tables = re.findall(r'(<table[\s\S]*?</table>)', html)
    table = None
    for t in tables:
        if re.search(r"\d{4}_FIFA_World_Cup_final", t):
            table = t
            break
    if not table:
        print('Tabela de finais não encontrada', file=sys.stderr); sys.exit(1)
    rows = re.findall(r'<tr[\s\S]*?>([\s\S]*?)</tr>', table)
    data = []
    for r in rows[1:]:
        cols = re.findall(r'<t[dh][^>]*>([\s\S]*?)</t[dh]>', r)
        if len(cols) < 3: continue
        # columns: year | winner | score | runner-up | venue | location | attendance
        year = text(cols[0]).split(' ')[0]
        champion = text(cols[1]) if len(cols) > 1 else ''
        score = text(cols[2]) if len(cols) > 2 else ''
        runner_up = text(cols[3]) if len(cols) > 3 else ''
        venue = text(cols[4]) if len(cols) > 4 else ''
        location = text(cols[5]) if len(cols) > 5 else ''
        attendance = text(cols[6]) if len(cols) > 6 else ''
        item = {
            'year': year,
            'champion': champion,
            'runner_up': runner_up,
            'score': score,
            'venue': venue,
            'location': location,
            'attendance': attendance,
        }
        data.append(item)
    out = '/workspaces/pedromiguelcopadomundo2ds/data_finals.json'
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print('Escrito', out)

if __name__ == '__main__':
    main()
