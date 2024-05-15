// 0 = quadrato bianco, 1 = quadrato nero, -1 = pallino nero, 2 = pallino rosso, 3 = doppio pallino rosso, 4 = doppio pallino nero
// mappatura per associare le immagini a i numeri della matrice
const map_images = {
    0: "imgs/gray.gif",
    1: "imgs/black.gif",
    '-1': "imgs/me1.gif", // Use quotes around keys that are not simple identifiers
    2: "imgs/you1.gif",
    3: "imgs/you1k.gif",
    4: "imgs/me1k.gif"
};
// gestione dei turni : 2 = rosso, 1 = nero
let selected_piece_row = -1;
let selected_piece_col = -1;
// check mangiata
let mangiata = false;
// campo per stampare il turno corrente
let current_player_div = document.createElement("div");
const board_ID = "board_container_ID";
let currentPlayer = true;
//numero di righe del campo
const ROWS = 8;
// numero di colonne del campo
const COLS = 8;
// campo di gioco : ogni numero rappresenta una immagine
let board = [
    [1, 2, 1, 2, 1, 2, 1, 2],
    [2, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 1, 2, 1, 2, 1, 2],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [-1, 1, -1, 1, -1, 1, -1, 1],
    [1, -1, 1, -1, 1, -1, 1, -1],
    [-1, 1, -1, 1, -1, 1, -1, 1]
];
//funzione per inizializzare il campo a inizio partita
function create_board(){
    //container che conterrà il campo
    const board_container = document.createElement("div");
    board_container.id = board_ID;
    //board_container.style.display = "inline-block"; // Imposta il contenitore come inline-block per visualizzare la griglia
    //doppio ciclo per assegnare ad ogni elemento della matrice la gif corrispondente
    for(let i = 0; i < ROWS; i++){
        // Creare un div per contenere le immagini di questa riga
        const row_container = document.createElement("div");
        row_container.id = "row_container_ID" + i + "-esimo";
        row_container.style.display = "flex"; // Utilizza un layout flessibile per allineare le immagini
        for(let j = 0; j < COLS; j++){
            // Creare un elemento <img> per ogni cella della matrice
            const img = document.createElement("img");
            // Ottenere il valore dalla matrice 'board' per la posizione (i, j)
            const value = board[i][j];
            // Assegnare il percorso dell'immagine corrispondente al valore
            if (map_images[value]) {
                img.src = map_images[value]; // Imposta il percorso dell'immagine
                Object.assign(img.style, {
                    width : "50px", // Imposta una larghezza fissa per l'immagine
                    height : "50px"  // Imposta un'altezza fissa per l'immagine
                });
                update_board(img, i, j);
                row_container.appendChild(img);
            }
        }
        // Alla fine di ogni riga, aggiungi il contenitore della riga al contenitore principale
        board_container.appendChild(row_container);
    }
    Object.assign(board_container.style, {
        position : "fixed",
        left : "500px",
        top : "200px"
    });
    // inserimento del campo nel body del documento
    document.body.appendChild(board_container);
}
function check_mangia_pedina(old_row, old_col, new_row, new_col, tipo_pedina){
    // differenza di spostamento di colonne
    const deltaX = Math.abs(new_col - old_col);
    const deltaY = Math.abs(new_row - old_row);
    // Controllo che la differenza tra la colonna iniziale e la nuova colonna sia al massimo 1
    if (deltaX > 1) {
        // Se lo spostamento è maggiore di 1, controllo che nella posizione scavalcata ci sia una pedina avversaria che viene mangiata
        if(deltaX === 2 && deltaY === 2){ // TODO da fare anche i casi in cui si possono mangiare piu pedine in una mossa
            if(tipo_pedina === "Rossa"){
                //const deltaY = new_row - old_row;
                if(old_col < new_col){ // sta andando a destra
                    if(board[old_row + 1][old_col + 1] === -1 && board[old_row + 2][old_col + 2] === 0 && board[new_row][new_col] === 0){
                        mangiata = true;
                        board[old_row + 1][old_col + 1] = 0;
                        return true;
                    }
                    else {
                        //mangiata = false;
                        return false;
                    }
                }
                else{ // sta andando a sinistra
                    if(board[old_row + 1][old_col - 1] === -1 && board[old_row + 2][old_col - 2] === 0 && board[new_row][new_col] === 0){
                        //mangiata = true;
                        board[old_row + 1][old_col - 1] = 0;
                        return true;
                    }
                    else {
                        //mangiata = false;
                        return false;
                    }
                }
            }
            else{ // è grigia
                if(old_col < new_col){ // sta andando a destra
                    if(board[old_row - 1][old_col + 1] === 2 && board[old_row - 2][old_col + 2] === 0 && board[new_row][new_col] === 0){
                        mangiata = true;
                        board[old_row - 1][old_col + 1] = 0;
                        return true;
                    }
                    else {
                        //mangiata = false;
                        return false;
                    }
                }
                else{ // sta andando a sinistra
                    if(board[old_row - 1][old_col - 1] === 2 && board[old_row - 2][old_col - 2] === 0 && board[new_row][new_col] === 0){
                        mangiata = true;
                        board[old_row - 1][old_col - 1] = 0;
                        return true;
                    }
                    else {
                        //mangiata = false;
                        return false;
                    }
                }
            }
        }
        else if(deltaX === 4){
            //return false;
        }
        else if(deltaX === 6){
            //return false;
        }
        else {
            return false;
        }
    }
    else {
        // Se la differenza in colonna è al massimo 1, lo spostamento è sempre valido
        return deltaY === deltaX;
    }
}
function check_move(row1, col1, row2, col2){
    //controllare che la pedina non vada su un quadratino nero
    let res1 = board[row2][col2] !== 1;
    // check della direzione alto/basso della pedina
    let res2;
    // check della distanza
    let res3;
    // check della presenza di un altra pedina && check per vedere se è stata effettivamete schiacciata una pedina e non altro
    let res4 = (board[row2][col2] !== 2 && board[row2][col2] !== -1) && (board[row1][col1] === 2 || board[row1][col1] === -1);
    // check della direzione diagonale della pedina : non può andare dritta
    let res5 = col1 !== col2;
    // caso della pedina rossa selezionata : può andare solo verso il basso e in diagonale
    if(board[row1][col1] === 2){
        res2 = row1 < row2;
        res3 = check_mangia_pedina(row1, col1, row2, col2, "Rossa");
        //mangiata = res3;
    }
    // caso della pedina grigia : può andare solo verso l'alto e in diagonale
    else if(board[row1][col1] === -1){
        res2 = row1 > row2;
        res3 = check_mangia_pedina(row1, col1, row2, col2, "Grigia");
        //mangiata = res3;
    }
    else if("pedina rossa doppia"){

    }
    else if("pedina nera doppia"){

    }
    return res1 && res2 && res3 && res4 && res5;
}
function check_turno(pedina){ // TODO da rifinire dettagli
    if(pedina === 2 && currentPlayer === true){
        return true;
    }
    else return pedina === -1 && currentPlayer === false;
}
function swapBoardPositions(row1, col1, row2, col2) {
    if(row1 === row2 && col1 === col2){
        return;
    }
    if(check_move(row1, col1, row2, col2) && (check_turno(board[row1][col1]))){
        const temp = board[row1][col1];
        board[row1][col1] = board[row2][col2];
        board[row2][col2] = temp;
        if(!mangiata) { // TODO logica della mangiata funziona, solo che se provo a magiare con la pedina opposta a quella del tunro corrente me la mangia lo stesso
            currentPlayer = ((currentPlayer === true) ? currentPlayer = false : currentPlayer = true);
            //mangiata = true;
        }
        else mangiata = false;
        if(currentPlayer){
            current_player_div.textContent = "Turno della pedina ROSSA!";
        }
        else current_player_div.textContent = "Turno della pedina NERA!";
        document.body.appendChild(current_player_div);
    }
    //else if(mangiata)
}
function handle_piece_click(row, col){
    // Controlla se è il turno del giocatore della pedina cliccata
    if(selected_piece_row === -1 && selected_piece_col === -1){
        // Se nessuna pedina è stata selezionata, seleziona la pedina cliccata
        selected_piece_row = row;
        selected_piece_col = col;
    }
    else{
        swapBoardPositions(selected_piece_row, selected_piece_col, row, col);
        selected_piece_row = -1;
        selected_piece_col = -1;
        // Aggiorna la visualizzazione della scacchiera;
        create_board();
    }
}
function update_board(img, row, col){
    const clickedPiece = board[row][col];
    // Gestore di evento click sull'immagine
    img.addEventListener("click", () => {
        if(clickedPiece !== 0 && clickedPiece !== 1) img.style.transform = "scale(1.1)"
        handle_piece_click(row, col);
    });
    img.style.transform = "scale(1)";
}
function create_div_turn(){
    current_player_div.id = "current_player_div_ID";
    current_player_div.textContent = "Turno della pedina ROSSA!"
    current_player_div.style.fontSize = "30px";
    current_player_div.style.position = "fixed";
    current_player_div.style.left = "550px"
    current_player_div.style.top = "110px"
    document.body.appendChild(current_player_div);
}
//chiamata alla funzione per creare il campo iniziale
create_board();
create_div_turn();
// funzione per creare il titolo della pagina
function create_header(){
    let title = document.createElement("h1");
    title.id = "title_ID";
    title.textContent = "My Dama Game!";
    // assegno lo stile CSS al titolo per centralizzarlo
    Object.assign(title.style, {
        position: "fixed",
        left: "580px"
    })
    document.body.appendChild(title);
}
// chiamata alla funzione per creare il titolo della pagina
create_header();

// Parte per gestire le pedine doppie
//function handle_double_piece();
