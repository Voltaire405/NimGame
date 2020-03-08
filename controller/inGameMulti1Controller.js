/**
 * Define de manera particular implementación del evento onclick sobre una pieza.
 * @param {object} cell 
 */
function onclickEvent(cell) {
    let takenPieces;
    if (played) {
        alert("Sólo se puede retirar piezas de una fila a la vez. ¡Presione confirmar para finalizar su turno!");
    } else if (cell.style.color != "aliceblue") {
        let myRow = Number.parseInt(cell.attributes["row"].value);
        let myIndex = Number.parseInt(cell.attributes["index"].value);
        disappearCells(myRow, myIndex);
        takenPieces = dim[myRow] - myIndex;
        dim[myRow] -= takenPieces;
        played = true;        
        changeTurn("multiplayer");
        validateEndGame();
        played = false;
    }
}

function onmouseoverEvent(cell) {
    let takenPieces;
    let myRow = Number.parseInt(cell.attributes["row"].value);
    let myIndex = Number.parseInt(cell.attributes["index"].value);
    for (let k = myIndex; k < dim[myRow]; k++) {
        table.rows[myRow].cells[k].style.color = "red";
    }
    takenPieces = dim[myRow] - myIndex;
    document.getElementById('taken').value = takenPieces > 0 ? takenPieces : 0;
}

function onmouseoutEvent(cell) {
    let myRow = Number.parseInt(cell.attributes["row"].value);
    let myIndex = Number.parseInt(cell.attributes["index"].value);
    for (let k = myIndex; k < dim[myRow]; k++) {
        table.rows[myRow].cells[k].style.color = "green";
    }
    document.getElementById('taken').value = 0;
}

//Eventos click sobre botones salir
document.getElementById('exit').addEventListener('click', function (e) {
    window.location.replace('../index.html');
});

//variables globales
var dim = []; //va a contener el indice de cada fila y su número de piezas
const nrow = generateRandom(); //inicialmente
const ncol = generateRandom();
var played = false;
var players = {
    "playerone": "Jugador 1",
    "playertwo": "Jugador Dos",
    "cpu": "CPU"
}
var whoPlaying = players["playerone"];
//------------------------------------------------------------------------
createBodyTable(nrow, ncol); //genera tablero
document.getElementById('taken').value = 0; //inicializo contador de piezas tomadas
document.getElementById('playing').value = whoPlaying;