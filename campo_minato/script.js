// Config base: 10x10, 5 mine come nel tuo codice
const ROWS = 10;
const COLS = 10;
const MINES = 5;

const boardEl = document.getElementById('board');
const resultEl = document.getElementById('result');
const revealedEl = document.getElementById('revealed');
const goalEl = document.getElementById('goal');
const newGameBtn = document.getElementById('newGame');

let tiles = [];           // array di oggetti {img, mine, revealed, neighbors: [index,...]}
let revealedCount = 0;
let safeGoal = ROWS * COLS - MINES;
let gameOver = false;

init();

newGameBtn.addEventListener('click', init);

function init(){
  // reset
  tiles = [];
  revealedCount = 0;
  safeGoal = ROWS * COLS - MINES;
  gameOver = false;
  resultEl.textContent = '';
  revealedEl.textContent = '0';
  goalEl.textContent = safeGoal.toString();

  // setup griglia
  boardEl.style.gridTemplateColumns = `repeat(${COLS}, var(--tile-size))`;
  boardEl.innerHTML = '';

  // crea caselle
  for (let r = 0; r < ROWS; r++){
    for (let c = 0; c < COLS; c++){
      const img = document.createElement('img');
      img.src = 'imgs/piastrella.gif';
      img.alt = `Casella ${r+1},${c+1}`;
      img.className = 'tile';
      img.draggable = false;

      const tile = {
        img,
        row: r,
        col: c,
        mine: false,
        revealed: false,
        neighbors: []
      };
      tiles.push(tile);
      boardEl.appendChild(img);
    }
  }

  // vicini
  for (let i = 0; i < tiles.length; i++){
    const {row, col} = tiles[i];
    for (let rr = Math.max(0, row - 1); rr <= Math.min(ROWS - 1, row + 1); rr++){
      for (let cc = Math.max(0, col - 1); cc <= Math.min(COLS - 1, col + 1); cc++){
        const idx = rr * COLS + cc;
        if (idx !== i) tiles[i].neighbors.push(idx);
      }
    }
  }

  // posiziona mine
  placeMines();

  // eventi
  for (const t of tiles){
    t.img.addEventListener('click', () => onReveal(t));
    t.img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        onReveal(t);
      }
    });
    t.img.tabIndex = 0; // accessibilità base
  }
}

function placeMines(){
  // scegli MINES posizioni uniche
  const indices = [...Array(tiles.length).keys()];
  shuffle(indices);
  for (let m = 0; m < MINES; m++){
    tiles[indices[m]].mine = true;
  }
}

function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function onReveal(tile){
  if (gameOver || tile.revealed) return;

  if (tile.mine){
    revealAllMines();
    resultEl.textContent = 'Hai perso';
    gameOver = true;
    return;
  }

  floodReveal(tile);

  revealedEl.textContent = revealedCount.toString();

  if (revealedCount === safeGoal){
    resultEl.textContent = 'Hai vinto';
    gameOver = true;
  }
}

function floodReveal(startTile){
  const stack = [startTile];

  while (stack.length){
    const t = stack.pop();
    if (t.revealed) continue;

    const n = countNeighborMines(t);
    t.revealed = true;
    revealedCount++;

    t.img.src = `imgs/sq${n}.gif`;
    t.img.alt = n === 0 ? 'Vuota' : `Numero ${n}`;

    // se 0, propaga
    if (n === 0){
      for (const idx of t.neighbors){
        const nb = tiles[idx];
        if (!nb.revealed && !nb.mine) stack.push(nb);
      }
    }
  }
}

function countNeighborMines(tile){
  let m = 0;
  for (const idx of tile.neighbors){
    if (tiles[idx].mine) m++;
  }
  return m;
}

function revealAllMines(){
  for (const t of tiles){
    if (t.mine){
      t.img.src = 'imgs/mina.gif';
      t.img.alt = 'Mina';
    }
  }
}
