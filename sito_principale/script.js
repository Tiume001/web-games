const links_to_play = {
    campo_minato: "https://tiume001.github.io/web-games/campo_minato/",
    dama: "https://tiume001.github.io/web-games/dama/",
    snake: "https://tiume001.github.io/web-games/snake/",
    talpa: "https://tiume001.github.io/web-games/talpa/",
    tetris: "https://tiume001.github.io/web-games/tetris/",
    tris: "https://tiume001.github.io/web-games/tris/"
}

const images = {
    dama: "imgs/dama.png",
    campo_minato: "imgs/campo_minato.png",
    snake: "imgs/snake.png",
    talpa: "imgs/talpa.png",
    tris: "imgs/tris.png",
    tetris: "imgs/tetris.png"
}

function crea_titolo_pagina(){
    let title = document.createElement("h1");
    title.textContent = "Giochi online by Tiumex";
    title.style.color = "white";
    title.style.position = "fixed";
    title.style.left = "40%";
    document.body.appendChild(title);
}

function crea_barra_di_ricerca(){
    let inputRicerca = document.createElement("input");
    // Impostazione degli attributi dell'input
    inputRicerca.setAttribute("type", "text");
    inputRicerca.setAttribute("id", "barra-ricerca");
    inputRicerca.setAttribute("placeholder", "Cerca qui!");
    //inputRicerca.addEventListener("keyup", ricerca); // Aggiungi evento keyup per chiamare la funzione ricerca()
    // Creazione dell'elemento label
    let label = document.createElement("label");
    label.setAttribute("for", "barra-ricerca");
    // Aggiungi il testo all'elemento label se necessario
    //label.textContent = "Testo dell'etichetta";
    // Aggiungi l'elemento label e l'elemento input al documento
    document.body.appendChild(label);
    document.body.appendChild(inputRicerca);
}

function crea_bottone(){
    let button = document.createElement("button");
    button.textContent = "search here!";
    button.id = "button_ID";
    button.addEventListener("click", () => {
        let valoreRicerca = document.getElementById("barra-ricerca").value;
        // Puoi aggiungere ulteriori azioni qui in base alla ricerca
        let elem = document.createElement("div");
        elem.textContent = valoreRicerca;
        if(links_to_play.hasOwnProperty(valoreRicerca)){
            const url = links_to_play[valoreRicerca];
            window.open(url, '_blank');
        }
    });
    document.body.appendChild(button);
}

function giochi_disponibili() {
    let container = document.createElement("div");
    container.id = "giochi-container";
    container.style.display = "flex"; // Imposta il display flessibile per il container
    container.style.flexWrap = "wrap"; // Avvolgi i contenuti se non ci sono abbastanza spazi
    container.style.position = "fixed";
    container.style.top = "15%";
    //container.style.justifyContent = "space-between"

    for (let gioco in links_to_play) {
        if (links_to_play.hasOwnProperty(gioco)) {
            let giocoContainer = document.createElement("div");
            giocoContainer.classList.add("gioco");
            giocoContainer.style.margin = "10px"; // Aggiungi margine tra i giochi
            giocoContainer.style.marginRight = "70px"; // Aggiungi margine a destra per spazio laterale


            // Titolo del gioco
            let titolo = document.createElement("h3");
            titolo.textContent = gioco.charAt(0).toUpperCase() + gioco.slice(1); // Capitalizza il nome del gioco
            titolo.style.color = "white";
            giocoContainer.appendChild(titolo);

            // Immagine di preview (puoi sostituire con l'immagine del gioco)
            let immaginePreview = document.createElement("img");
            immaginePreview.setAttribute("src", images[gioco]); // Inserisci l'URL dell'immagine
            immaginePreview.setAttribute("alt", "Preview " + gioco);
            immaginePreview.style.width = "150px"; // Imposta la larghezza a 150 pixel
            immaginePreview.style.height = "150px"; // Imposta l'altezza a 150 pixel
            giocoContainer.appendChild(immaginePreview);

            // Link per giocare
            let linkGioco = document.createElement("a");
            linkGioco.setAttribute("href", links_to_play[gioco]);
            linkGioco.textContent = "Gioca a " + gioco;
            linkGioco.setAttribute("target", "_blank"); // Apre il link in una nuova scheda
            linkGioco.style.display = "block"; // Rende il link un blocco per occupare l'intera larghezza disponibile
            linkGioco.style.marginTop = "10px"; // Distanza dal margine superiore dell'immagine
            linkGioco.style.color = "white";
            giocoContainer.appendChild(linkGioco);

            container.appendChild(giocoContainer);
        }
    }

    document.body.appendChild(container);
}

function set_colore_sfondo_paina(){
    document.body.style.backgroundColor = "rgba(27,31,42,0.97)"
}

crea_titolo_pagina();
crea_barra_di_ricerca();
crea_bottone();
giochi_disponibili();
set_colore_sfondo_paina();


