// Simple client-side renderer for /data/publications.json
// Keep publications.json sorted by year desc to match Scholar ordering.

(async function(){
  const wrap = document.getElementById('papers');
  try{
    const res = await fetch('data/publications.json', {cache:'no-store'});
    const items = await res.json();

    // Group by year (already sorted desc in the JSON)
    const years = [...new Set(items.map(p => p.year))];

    years.forEach(yr => {
      const h2 = document.createElement('h2');
      h2.textContent = yr;
      wrap.appendChild(h2);

      items.filter(p => p.year === yr).forEach(p => {
        const card = document.createElement('div');
        card.className = 'paper';

        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = p.title;

        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.textContent = [p.authors, p.venue].filter(Boolean).join(' • ');

        card.appendChild(title);
        card.appendChild(meta);

        if (p.link){
          const a = document.createElement('a');
          a.href = p.link;
          a.target = '_blank';
          a.rel = 'noopener';
          a.textContent = 'PDF/Link';
          a.style.display = 'inline-block';
          a.style.marginTop = '8px';
          card.appendChild(a);
        }

        wrap.appendChild(card);
      });
    });
  }catch(e){
    wrap.innerHTML = '<p>Could not load publications yet.</p>';
    console.error(e);
  }
})();
