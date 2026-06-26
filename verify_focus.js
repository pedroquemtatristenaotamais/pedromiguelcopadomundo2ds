(function(){
  // Pequeno utilitário (opcional) para depurar no navegador:
  // marca as âncoras da home como clicáveis e mostra o campeão detectado.
  document.addEventListener('DOMContentLoaded', ()=>{
    const editions = Array.from(document.querySelectorAll('#editions .ed-item'));
    if(!editions.length) return;
    editions.forEach(node=>{
      const a = node.querySelector('a');
      if(!a) return;
      node.style.outline = '2px dashed rgba(255,255,255,0.12)';
      const champ = node.dataset.champion || '';
      if(champ){
        a.title = `Campeão: ${champ}`;
      }
    });
  });
})();

