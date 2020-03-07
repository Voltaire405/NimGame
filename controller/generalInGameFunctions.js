/**
 * Genera número aleatorio en (0 a 25)
 * @returns {Number} rnumber número aleatorio entre 3 y 24 
 */
function generateRandom() {
    let rnumber = 0;
    do {
        rnumber = Math.round(25 * Math.random());
    } while (rnumber < 4 || rnumber == 25);

    return rnumber;
}

/**
 * Genera número aleatorio de número de piezas para una fila.
 * @param {Number} columns número de columnas de la fila.
 */
function generateRandomPieces(columns) {
    let npieces;
    do {
        npieces = generateRandom();
    } while (npieces > columns);
    return npieces;
}

/**
 *Oculta las celdas seleccionadas cambiando su color 
 *al del tablero de juego.
 * @param {Array} myRow Fila de la celda seleccionada
 * @param {Array} myIndex Índice de la columna seleccionada
 * @param {Number} selects Número de celdas a ocultar.
 */
function disappearCells(myRow, myIndex, selects) {
    if (selects != null && selects != undefined && (dim[myRow] - myIndex) > selects) {
        myIndex = dim[myRow] - selects;
    }
    for (let k = myIndex; k < dim[myRow]; k++) {
        table.rows[myRow].cells[k].style.color = "aliceblue";
    }
}

/**
 * Cambia el turno del jugador.
 * @param {String} opt quien juega
 */
function changeTurn(opt) {
    switch (opt) {
        case "multiplayer":
            if (whoPlaying == players["playerone"]) {
                whoPlaying = players["playertwo"];
            } else {
                whoPlaying = players["playerone"];
            }
            break;
        case "cpu":
            if (whoPlaying == players["playerone"]) {
                whoPlaying = players["cpu"];
            } else {
                whoPlaying = players["playerone"];
            }
            break;
        default:
            break;
    }
    document.getElementById('playing').value = whoPlaying;
    played = false;
}

/**
 * Valida fin del juego según las reglas de la modalidad 3 de juego
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
 * Realiza los movimientos cálculados con el algoritmo ganador para la modalidad 3
 */
function playVsCpuMode3() {
    validateEndGame();
    changeTurn("cpu");
    let binaryTable = tablaBinario(dim);
    let move = aplicarEstrategia3(dim, binaryTable);
    setTimeout(function () {
        disappearCells(move[0], dim[move[0]] - move[1]);
        dim[move[0]] -= move[1]; //Cálculo del numero de piezas retirada.
        validateEndGame();
        played = false;
        changeTurn("cpu");
    }, 1000);
}

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
                    onmouseoverEvent(this);                    
                });

                rowvar.cells[j].addEventListener("mouseout", function (e) {                
                    onmouseoutEvent(this);
                });

                rowvar.cells[j].addEventListener("click", function (e) {
                    onclickEvent(this);
                });

            } else {
                rowvar.cells[j].innerText = "";
            }

        }
    }
}