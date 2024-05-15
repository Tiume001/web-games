/*
Consegna: Gioco del Tris in JavaScript

Obiettivo:
Realizzare un gioco del tris che permetta a due giocatori di alternarsi e di inserire i propri simboli (X e O) su una griglia 3x3. Il gioco termina quando uno dei giocatori vince o quando si verifica un pareggio.

Passaggi da seguire:

1. Inizializzazione del gioco:
   - Creare una griglia 3x3 per il campo di gioco.
   - Assegnare un identificatore univoco a ciascuna cella della griglia.
   - Tenere traccia dello stato del gioco, ad esempio con una matrice 3x3 che rappresenta lo stato corrente della griglia (vuoto, X, O).
   - Visualizzare la griglia sullo schermo per consentire ai giocatori di interagire con essa.

2. Turno dei giocatori:
   - Alternare il turno tra due giocatori, di solito rappresentati da X e O.
   - Consentire ai giocatori di selezionare una cella della griglia durante il loro turno.
   - Verificare se la cella selezionata è vuota e aggiornare lo stato della griglia con il simbolo del giocatore corrente (X o O).
   - Controllare se c'è una vittoria o un pareggio dopo ogni mossa.

3. Logica di gioco:
   - Implementare la logica per verificare se un giocatore ha vinto, controllando le combinazioni di simboli su righe, colonne e diagonali.
   - Controllare se tutte le celle sono occupate senza una vittoria, indicando un pareggio.
   - Visualizzare un messaggio di vittoria o pareggio quando necessario e terminare il gioco.

4. Interfaccia utente:
   - Aggiornare l'interfaccia utente per riflettere lo stato corrente del gioco, inclusi i simboli nelle celle e il messaggio di vittoria/pareggio.
   - Aggiungere pulsanti per avviare un nuovo gioco o ripristinare il gioco attuale.

5. Gestione degli eventi:
   - Aggiungere gestori di eventi per gestire i clic sulle celle della griglia e altri eventi dell'interfaccia utente.
   - Quando un giocatore fa clic su una cella, eseguire le operazioni appropriate per il suo turno e verificare lo stato del gioco.

6. Opzionale:
   - Aggiungere funzionalità extra come la possibilità di giocare contro un'intelligenza artificiale.
   - Implementare un sistema di registrazione dei punteggi o delle statistiche del giocatore.
   - Personalizzare l'aspetto del gioco con CSS per renderlo più accattivante.
*/
//----------------------------------------------------------------------------------
// tutti i campi del mio programma
let ROWS = 3; // Numero di righe
let COLS = ROWS; // Numero di colonne
let currentPlayer = ''; // Giocatore corrente (iniziamo con 'X')
let gameBoard = []; // Matrice per rappresentare il campo di gioco
let gameOver = false; // Flag per indicare se il gioco è finito
// Funzione per inizializzare il campo di gioco
function initializeGame() {
    let lowerLimit = 1;
    let upperLimit = 10;
    let temp = Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
    if(temp < 5){
        currentPlayer = 'X';
    }
    else{
        currentPlayer = 'O';
    }
    // Inizializza il campo di gioco con celle vuote
    for (let i = 0; i < ROWS; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < COLS; j++) {
            gameBoard[i][j] = '-';
        }
    }
}
// Funzione per stampare il campo di gioco sull'HTML
function printBoard() {
    let boardHTML = ""; // Stringa per memorizzare la rappresentazione HTML del campo di gioco
    boardHTML += `<div id="current-turn">Turno corrente: ${currentPlayer}</div><br>`;
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            // Aggiungi la cella al campo di gioco HTML
            boardHTML += `<div class="cell" onclick="cellClicked(${i}, ${j})"
                            onmouseover="cellHovered(this, true)"
                            onmouseout="cellHovered(this, false)">${gameBoard[i][j]}</div>`;
        }
        // Aggiungi un salto di riga HTML
        boardHTML += "<br>";
    }
    // Seleziona l'elemento HTML per il campo di gioco
    let gameBoardDiv = document.getElementById("game-board");
    // Aggiorna il contenuto dell'elemento con il campo di gioco HTML
    gameBoardDiv.innerHTML = boardHTML;
}
// Funzione per gestire l'evento mouseover/mouseout
function cellHovered(cell, isHovered) {
    if (isHovered) {
        // Quando il mouse entra nella cella, cambia il colore di sfondo
        cell.classList.add('hovered');
    } else {
        // Quando il mouse esce dalla cella, rimuovi il colore di sfondo
        cell.classList.remove('hovered');
    }
}
// Funzione per controllare se c'è un vincitore
// Funzione per controllare se c'è un vincitore e restituire il simbolo del giocatore vincitore
function fullBoard(){
    for(let i = 0; i < ROWS; i++){
        for(let j = 0; j < COLS; j++){
            if(gameBoard[i][j] === '-'){
                return false;
            }
        }
    }
    return true;
}
function checkWin() {
    // Controlla le righe
    for (let i = 0; i < ROWS; i++) {
        if (gameBoard[i][0] !== '-' && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) {
            return gameBoard[i][0]; // Restituisce il simbolo del giocatore che ha vinto sulla riga i
        }
    }
    // Controlla le colonne
    for (let j = 0; j < COLS; j++) {
        if (gameBoard[0][j] !== '-' && gameBoard[0][j] === gameBoard[1][j] && gameBoard[1][j] === gameBoard[2][j]) {
            return gameBoard[0][j]; // Restituisce il simbolo del giocatore che ha vinto sulla colonna j
        }
    }
    // Controlla le diagonali
    if (gameBoard[0][0] !== '-' && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) {
        return gameBoard[0][0]; // Restituisce il simbolo del giocatore che ha vinto sulla diagonale principale
    }
    if (gameBoard[0][2] !== '-' && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]) {
        return gameBoard[0][2]; // Restituisce il simbolo del giocatore che ha vinto sulla diagonale secondaria
    }
    return null;
}
// Funzione per gestire la mossa del giocatore
function takeMove(row, col) {
    // Controlla se il gioco è ancora in corso e se la cella è vuota
    if (!gameOver && gameBoard[row][col] === '-') {
        // Assegna il simbolo del giocatore corrente alla cella
        gameBoard[row][col] = currentPlayer;
        // Controlla se c'è un vincitore dopo la mossa
        let winner = checkWin();
        if (winner) {
            // Se c'è un vincitore, visualizza il messaggio e interrompi il gioco
            document.getElementById("game-board").innerHTML = (winner === 'X') ? "<span class='message'>Vince Giocatore X!!!</span>" : "<span class='message'>Vince Giocatore O!!!</span>";
            gameOver = true;
        }
        else if (fullBoard()) {
            // Se il campo è pieno e non c'è un vincitore, il gioco finisce in pareggio
            document.getElementById("game-board").innerHTML = "<span class='message'>Pareggio!!!</span>";
            gameOver = true;
        }
        else {
            // Cambia il giocatore corrente e aggiorna il campo di gioco
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            printBoard();
        }
    }
    else {
        // Se la mossa non è valida o il gioco è terminato, stampa un messaggio di errore
        console.log("Mossa non valida o gioco terminato.");
    }
}
// Funzione per avviare il gioco
function startGame() {
    initializeGame();
    printBoard();
}
// Funzione chiamata quando una cella viene cliccata
function cellClicked(row, col) {
    // Se il gioco non è finito, prendi la mossa del giocatore
    if (!gameOver) {
        takeMove(row, col);
    }
}
// Avvia il gioco
startGame();














/*
* function resizeField() {
    // Modifica la grandezza delle celle
    let cellSize = parseInt(prompt("Inserisci la grandezza delle celle (in pixel):"));
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.width = cellSize + "px";
        cells[i].style.height = cellSize + "px";
        cells[i].style.lineHeight = cellSize + "px";
        cells[i].style.fontSize = cellSize / 2 + "px";
    }
}

* */