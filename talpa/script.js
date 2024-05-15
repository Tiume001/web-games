/*
* Implementare il gioco ”caccia alle talpe”. Il gioco prevede una griglia di lato N dove si alternano casualmente erba,
* la testa di una talpa, il fondoschiena di una talpa. Se il giocatore clicca l’erba non succede nulla, se clicca la
* testa di una talpa ottiene 100 punti, se clicca il fondoschiena ne perde 200. Il gioco termina se il punteggio scende
* sotto 0 punti, segnalando al giocatore che ha perso, o se sale oltre i 1000 punti, segnalando al giocatore che ha vinto.
* Il punteggio deve essere sempre visibile. Si assuma di avere a disposizione le immagini grass.png, head.png, rear.png.
* */

// Definizione delle variabili e degli oggetti iniziali
let N = 5; // grandezza del campo sia in larghezza che altezza
let score = 0; // score attuale
let images = { "imgs/grass.png": 0, "imgs/head.png": 100, "imgs/rear.png": -200 }; // immagini possibili da inserire random

// Funzione per creare una talpa (mole)
function createMole() {
    // Crea un elemento immagine (talpa)
    let mole = document.createElement("img");
    // Imposta l'attributo "src" dell'immagine con la prima chiave nell'oggetto "images"
    mole.setAttribute("src", Object.keys(images)[0]); // setta l'immagine corretta da inserire

    // Gestore dell'evento di click
    function clickHandler() {
        // Aggiorna lo score in base all'immagine cliccata
        display.innerHTML = score += images[mole.getAttribute("src")];
        // Controlla se lo score è inferiore a 0, in tal caso visualizza "hai perso !"
        if (score < 0)
            document.body.innerHTML = "hai perso !";
        // Controlla se lo score è maggiore o uguale a 1000, in tal caso visualizza "hai vinto !"
        if (score >= 1000)
            document.body.innerHTML = "hai vinto !";
    }
    // Aggiunge un event listener per il click sull'immagine (talpa)
    mole.addEventListener("click", clickHandler);

    // Funzione per cambiare l'immagine (talpa) ad intervalli di tempo regolari
    function intervalHandler(){
        mole.setAttribute("src", Object.keys(images)[Math.floor(Math.random() * 3)]);
    }
    // Imposta un intervallo di tempo per chiamare la funzione di cambio immagine (talpa)
    setInterval(intervalHandler, 1000); // timeout: quanto tempo attendiamo per aggiornare le talpe e le immagini

    // Aggiunge l'immagine (talpa) al documento HTML
    document.body.appendChild(mole); // inserisce immagine
}

// Ciclo per creare il campo di talpe (mole)
for(let i= 0; i < N; i++){ // scorre in larghezza il campo da creare
    for(let j= 0; j < N; j++) // scorre in altezza
        createMole(); // chiama la funzione per creare una talpa
    // Aggiunge un elemento "br" per andare a capo
    document.body.appendChild(document.createElement("br")); // crea un Tag br per andare a capo (newLine)
}

// Crea un elemento "div" per visualizzare lo score
let display = document.createElement("div"); // crea un Tag div per metterci dentro la roba da far vedere
// Aggiunge l'elemento "div" al documento HTML
document.body.appendChild(display);  // aggiunge al body del documento html cio che sta dentro a display