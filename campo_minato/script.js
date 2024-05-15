const RowsAndCols = 10;
let numMine = 5;
const tiles = [];

function createBoard() {
    let i, j;
    for (i = 0; i < RowsAndCols; i++, document.body.appendChild(document.createElement("br"))) {
        for (j = 0; j < RowsAndCols; j++) {
            createTile(i, j);
        }
    }
}

function createTile(i, j) {
    const tile = document.body.appendChild(document.createElement("img"));
    tile.setAttribute("src", "images/piastrella.gif");
    tile.mina = (i * RowsAndCols + j) < numMine;
    tile.vicini = [];
    for (let y = Math.max(0, i - 1); y <= Math.min(RowsAndCols - 1, i + 1); y++) {
        for (let x = Math.max(0, j - 1); x <= Math.min(RowsAndCols - 1, j + 1); x++) {
            tile.vicini.push(y * RowsAndCols + x);
        }
    }
    tile.addEventListener("click", function (e) {
        click(e.target);
    });
    tiles.push(tile);
}

function shuffleTiles() {
    for (let i = tiles.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i].mina, tiles[j].mina] = [tiles[j].mina, tiles[i].mina];
    }
}

function click(tile) {
    if (tile.getAttribute("src") === "images/piastrella.gif") {
        if (tile.mina) {
            revealMines();
            document.body.appendChild(document.createTextNode("Hai perso ! "));
        }
        else {
            let mine = 0;
            for (let i = 0; i < tile.vicini.length; i++) {
                mine += tiles[tile.vicini[i]].mina;
            }
            tile.setAttribute("src", "images/sq" + mine + ".gif");
            if (mine === 0) {
                for (let i = 0; i < tile.vicini.length; i++) {
                    click(tiles[tile.vicini[i]]);
                }
            }
            if (++numMine === RowsAndCols * RowsAndCols) {
                document.body.appendChild(document.createTextNode("Hai vinto ! "));
            }
        }
    }
}

function revealMines() {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].mina) {
            tiles[i].setAttribute("src", "images/mina.gif");
        }
    }
}

createBoard();
shuffleTiles();
