// Dati centralizzati. Per aggiungere un gioco inserisci un oggetto qui.
const GAMES = [
  { id: "campo_minato", name: "Campo Minato", url: "https://tiume001.github.io/web-games/campo_minato/", img: "imgs/campo_minato.png", tags:["puzzle","classico"] },
  { id: "dama",         name: "Dama",         url: "https://tiume001.github.io/web-games/dama/",          img: "imgs/dama.png",          tags:["board","strategia"] },
  { id: "snake",        name: "Snake",        url: "https://tiume001.github.io/web-games/snake/",         img: "imgs/snake.png",         tags:["arcade"] },
  { id: "talpa",        name: "Acchiappa la Talpa", url:"https://tiume001.github.io/web-games/talpa/",    img: "imgs/talpa.png",         tags:["reflex"] },
  { id: "tetris",       name: "Tetris",       url: "https://tiume001.github.io/web-games/tetris/",        img: "imgs/tetris.png",        tags:["puzzle","arcade"] },
  { id: "tris",         name: "Tris",         url: "https://tiume001.github.io/web-games/tris/",          img: "imgs/tris.png",          tags:["board","veloce"] },
];

// --- util ---
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const by = (k)=> (a,b)=> (a[k]??"").localeCompare(b[k]??"", "it", {sensitivity:"base"});

const state = {
  q: new URLSearchParams(location.search).get("q")?.trim() ?? ""
};

// --- render ---
function renderGrid(items){
  const grid = $("#grid");
  const empty = $("#empty");
  grid.innerHTML = "";
  if(!items.length){ empty.hidden = false; return; }
  empty.hidden = true;

  const tpl = $("#card-tpl");
  const frag = document.createDocumentFragment();

  items.forEach(g=>{
    const node = tpl.content.cloneNode(true);
    const a = $(".card-link", node);
    const img = $(".card-img", node);
    const title = $(".card-title", node);
    const meta = $(".card-meta", node);

    a.href = g.url;
    title.textContent = g.name;
    img.src = g.img;
    img.alt = `Anteprima di ${g.name}`;
    meta.textContent = g.tags?.join(" • ") ?? "";

    frag.appendChild(node);
  });
  grid.appendChild(frag);
}

// --- search ---
function normalize(t){ return t.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,""); }
function matches(game, q){
  if(!q) return true;
  const hay = normalize(`${game.name} ${game.id} ${game.tags?.join(" ")}`);
  const needle = normalize(q);
  return hay.includes(needle);
}
function applySearch(){
  const q = state.q;
  const filtered = GAMES
    .filter(g => matches(g, q))
    .sort(by("name"));
  renderGrid(filtered);
}
function setSearchUI(){
  const input = $("#search");
  input.value = state.q;
  input.addEventListener("input", debounce(e=>{
    state.q = e.target.value.trim();
    const usp = new URLSearchParams(location.search);
    state.q ? usp.set("q", state.q) : usp.delete("q");
    history.replaceState({}, "", `${location.pathname}?${usp.toString()}`);
    applySearch();
  }, 120));

  // Invio apre il primo risultato
  input.addEventListener("keydown", e=>{
    if(e.key === "Enter"){
      const first = $("#grid .card-link");
      if(first) first.click();
    }
  });
}

// --- small debounce ---
function debounce(fn, ms=150){
  let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), ms); };
}

// --- init ---
document.addEventListener("DOMContentLoaded", ()=>{
  setSearchUI();
  applySearch();
});
