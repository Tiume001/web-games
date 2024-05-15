function createPlayfield(N){

    let score = 0;
    let symbols = { "imgs/grass.png":0 , "imgs/head.png":100, "imgs/rear.png":-200 };

    function updateMole(mole){
        let choices = Object.keys(symbols);
        let	choice = Math.floor(Math.random()*choices.length);
        mole.setAttribute("src",choices[choice]);
    }

    function actionMole(e){
        let mole = e.target;
        score += symbols[mole.getAttribute("src")];
        if(score<0)
            document.body.innerHTML = "hai perso !";
        if(score>=1000)
            document.body.innerHTML = "hai vinto !";
    }

    function createMole(){
        let mole = document.createElement("img");
        mole.setAttribute("src",Object.keys(symbols)[0]);
        mole.addEventListener("click",actionMole);
        setInterval(function(){updateMole(mole);},1000);
        return mole;
    }

    for(let i=0; i<N; i++){
        for(let j=0; j<N; j++)
            document.body.appendChild(createMole());
        document.body.appendChild(document.createElement("br"));
    }

}

let N = parseInt(document.currentScript.getAttribute('size'));
createPlayfield(isNaN(N)?5:N);
