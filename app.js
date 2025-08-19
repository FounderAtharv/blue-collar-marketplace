const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

const PLACEHOLDER =
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 180'>
      <rect width='240' height='180' fill='#eef2ff'/>
      <g fill='none' stroke='#c7d2fe' stroke-width='6'>
        <rect x='30' y='30' width='180' height='120' rx='12' ry='12'/>
        <path d='M55 130 L110 80 L150 110 L185 85'/>
        <circle cx='95' cy='65' r='10' fill='#c7d2fe' stroke='none'/>
      </g>
    </svg>
  `)}`;

const state = {
  data: window.MOCK_PROVIDERS,
  q: "",
  city: "",
  cat: "all"
};

function filterData(){
  let list = state.data;
  if (state.cat !== "all") list = list.filter(p => p.categories.includes(state.cat));
  if (state.q.trim()) {
    const q = state.q.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) ||
                            p.bio.toLowerCase().includes(q) ||
                            p.categories.join(" ").toLowerCase().includes(q));
  }
  if (state.city.trim()) {
    const c = state.city.toLowerCase();
    list = list.filter(p => p.city.toLowerCase().includes(c));
  }
  return list;
}

function cardTemplate(p){
  return `
    <a class="card" href="provider.html?id=${p.id}">
      <img src="${p.photo}"
           alt="${p.name}"
           loading="lazy"
           onerror="this.onerror=null; this.src='${PLACEHOLDER}';"/>
      <div class="pad">
        <h3>${p.name}</h3>
        <div class="meta">${p.categories.join(", ")} • ${p.city}</div>
        <div class="price">${p.price}</div>
      </div>
    </a>`;
}

function render(){
  const results = filterData();
  const grid = $("#results");
  const empty = $("#empty");
  grid.innerHTML = results.map(cardTemplate).join("");
  empty.hidden = results.length !== 0;
}

function setActiveChip(cat){
  $$(".chip").forEach(ch => ch.classList.toggle("chip--active", ch.dataset.cat === cat));
}

function initUI(){
  // Category chips
  $$(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      state.cat = btn.dataset.cat;
      setActiveChip(state.cat);
      render();
    });
  });

  // Search form
  $("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    state.q = $("#q").value;
    state.city = $("#city").value;
    render();
  });

  render();
}

document.addEventListener("DOMContentLoaded", initUI);