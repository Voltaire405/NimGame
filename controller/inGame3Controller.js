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




/**
 * Crea el cuerpo o estructura de una tabla preexistente que representa el tablero de juego, se deben especificar sus dimensiones.
 * Añade los eventos al tablero correspondiente.
 * @param {number} row número de filas
 * @param {number} col número de columnas
 */
function createBodyTable(row, col) {
    table = document.getElementById('table');
    var randomPieces;
    for (let index = 0; index < row; index++) {
        randomPieces = generateRandomPieces(col);
        table.insertRow(index);
        rowvar = table.rows[index];
        dim[index] = randomPieces; //agrega el número de piezas a la fila

        for (let columnIndex = 0; columnIndex < col; columnIndex++) {
            rowvar.insertCell(columnIndex);
            cell = rowvar.cells[columnIndex];
            cell.innerHTML = "▄";
            cell.setAttribute("row", index);
            cell.setAttribute("index", columnIndex);
        }
        for (let j = 0; j < col; j++) {
            if (j < randomPieces) {
                rowvar.cells[j].style.color = "green";

                //Definición de eventos por celdas     
                rowvar.cells[j].addEventListener("mouseover", function (e) {
                    let takenPieces;
                    let myRow = Number.parseInt(this.attributes["row"].value);
                    let myIndex = Number.parseInt(this.attributes["index"].value);
                    for (let k = myIndex; k < dim[myRow]; k++) {
                        table.rows[myRow].cells[k].style.color = "red";
                    }
                    takenPieces = dim[myRow] - myIndex;
                    document.getElementById('taken').value = takenPieces > 0 ? takenPieces : 0;
                    //console.log(this.attributes["row"].value);
                });

                rowvar.cells[j].addEventListener("mouseout", function (e) {
                    let myRow = Number.parseInt(this.attributes["row"].value);
                    let myIndex = Number.parseInt(this.attributes["index"].value);
                    for (let k = myIndex; k < dim[myRow]; k++) {
                        table.rows[myRow].cells[k].style.color = "green";
                    }
                    document.getElementById('taken').value = 0;

                });

                rowvar.cells[j].addEventListener("click", function (e) {
                    let takenPieces;

                    if (played) {
                        alert("Sólo se puede retirar piezas de una fila a la vez. ¡Presione confirmar para finalizar su turno!");
                    } else if(this.style.color != "aliceblue") {
                        let myRow = Number.parseInt(this.attributes["row"].value);
                        let myIndex = Number.parseInt(this.attributes["index"].value);
                        disappearCells(myRow, myIndex);
                        takenPieces = dim[myRow] - myIndex;
                        dim[myRow] -= takenPieces;
                        played = true;
                        playVsCpu();
                    }
                });

            } else {
                rowvar.cells[j].innerText = "";
            }

        }
    }
}

//Eventos click sobre botones salir
document.getElementById('exit').addEventListener('click', function (e) {
    window.location.replace('../index.html');
});

/**
 * Genera número aleatorio en (0 a 25)
 * @returns {number} rnumber número aleatorio entre 3 y 24 
 */
function generateRandom() {
    let rnumber = 0;
    do {
        rnumber = Math.round(25 * Math.random());
    } while (rnumber < 4 || rnumber == 25);

    return rnumber;
}

function generateRandomPieces(columns) {
    let npieces;
    do {
        npieces = generateRandom();
    } while (npieces > columns);
    return npieces;
}

function playVsCpu() {
    validateEndGame();
    changeTurn(players["cpu"]);    
    let binaryTable = tablaBinario(dim);
    let move = aplicarEstrategia3(dim, binaryTable);
    setTimeout(function(){
        disappearCells(move[0], dim[move[0]] - move[1]);
        dim[move[0]] -= move[1]; //Cálculo del numero de piezas retirada.
        validateEndGame();
        played = false;
        changeTurn(players["playerone"]);    
    }, 1000);    
}

function disappearCells(myRow, myIndex) {
    for (let k = myIndex; k < dim[myRow]; k++) {
        table.rows[myRow].cells[k].style.color = "aliceblue";
        table.rows[myRow].cells[k].onclick 
    }
}

/**
 * 
 */
function validateEndGame() {
    let endgame = true;
    for (let index = 0; index < dim.length; index++) {
        if (dim[index] > 0) {
            endgame = false;
            break;
        }
    }
    if (endgame) {
        confirm(whoPlaying + " Ha ganado!");
        window.location.reload();
    }
}

/**
 * 
 * @param {*} namePlayer 
 */
function changeTurn(namePlayer) {
    whoPlaying = namePlayer;
    document.getElementById('playing').value = whoPlaying;
}

createBodyTable(nrow, ncol); //genera tablero
document.getElementById('taken').value = 0; //inicializo contador de piezas tomadas
document.getElementById('playing').value = whoPlaying;