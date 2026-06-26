document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('search');
  const filter = document.getElementById('filter');
  const editions = Array.from(document.querySelectorAll('#editions .ed-item'));
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  function normalize(text){return text.toLowerCase().trim()}

  function applySearch(){
    const q = normalize(search.value);
    const f = filter.value;
    editions.forEach(node => {
      const txt = normalize(node.textContent);
      const yearMatch = (node.textContent.match(/\d{4}/)||[''])[0];
      let show = true;
      if(q && !txt.includes(q)) show = false;
      if(f === 'pre1950' && Number(yearMatch) >= 1950) show = false;
      if(f === '1950-1990' && (Number(yearMatch) < 1950 || Number(yearMatch) > 1990)) show = false;
      if(f === '1994-2022' && (Number(yearMatch) < 1994 || Number(yearMatch) > 2022)) show = false;
      node.style.display = show ? '' : 'none';
    })
  }

  search.addEventListener('input', applySearch);
  filter.addEventListener('change', applySearch);

  // Em vez de modal, clique na edição abre em nova aba.
  // Também passa campeão no querystring para permitir o tema por bandeira.
  editions.forEach(node => {
    const a = node.querySelector('a');
    const text = a.textContent;

    // captura: "Campeão: X" dentro do texto do link
    const champMatch = text.match(/Campeão:\s*([^,\n\(]+)/);
    const champion = (champMatch && champMatch[1]) ? champMatch[1].trim() : '';

    // guarda no elemento pra CSS/JS ficar mais simples depois
    node.dataset.champion = champion;

    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const href = a.getAttribute('href');
      const year = (a.textContent.match(/\d{4}/)||[''])[0];
      const qs = new URLSearchParams({
        from: 'index',
        year,
        champion,
      });
      window.open(`${href}?${qs.toString()}`, '_blank', 'noopener');
    });

    // Mantém um botão "Detalhes" para acessibilidade, mas apontando para mesma nova aba
    const btn = document.createElement('button');
    btn.textContent = 'Detalhes';
    btn.className = 'details-btn';
    btn.setAttribute('aria-label', 'Abrir detalhes em nova aba');
    a.after(btn);

    btn.addEventListener('click', (ev) => {
      ev.preventDefault();
      const href = a.getAttribute('href');
      const year = (a.textContent.match(/\d{4}/)||[''])[0];
      const qs = new URLSearchParams({ from: 'index', year, champion });
      window.open(`${href}?${qs.toString()}`, '_blank', 'noopener');
    });
  });

  function closeModal(){ modal.classList.add('hidden'); modalBody.innerHTML=''; document.body.style.overflow = ''; }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); })

});
