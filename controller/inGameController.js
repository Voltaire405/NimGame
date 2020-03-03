//variables globales
var dim = []; //va a contener el indice de cada fila y su número de piezas
const nrow = generateRandom(); //inicialmente
const ncol = generateRandom();
var played = false;

/**
 * Obtiene el modo de juego solicitado en una petición get por la url.
 * @returns String  representa el modo de juego elegido: 1, 2, 3
 */
function getRequestParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const mode = urlParams.get('mode');
    return mode;
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
                    let myRow = Number.parseInt(this.attributes["row"].value);
                    let myIndex = Number.parseInt(this.attributes["index"].value);
                    for (let k = myIndex; k < dim[myRow]; k++) {
                        table.rows[myRow].cells[k].style.color = "red";
                    }
                    //console.log(this.attributes["row"].value);
                });

                rowvar.cells[j].addEventListener("mouseout", function (e) {
                    let myRow = Number.parseInt(this.attributes["row"].value);
                    let myIndex = Number.parseInt(this.attributes["index"].value);
                    for (let k = myIndex; k < dim[myRow]; k++) {
                        table.rows[myRow].cells[k].style.color = "green";
                    }
                });

                rowvar.cells[j].addEventListener("click", function (e) {
                    let takenPieces;

                    if (played) {
                        alert("Sólo se puede retirar piezas de una fila a la vez. ¡Presione confirmar para finalizar su turno!");
                    } else {
                        let myRow = Number.parseInt(this.attributes["row"].value);
                        let myIndex = Number.parseInt(this.attributes["index"].value);
                        for (let k = myIndex; k < dim[myRow]; k++) {
                            table.rows[myRow].cells[k].style.color = "aliceblue";
                        }

                        takenPieces = dim[myRow] - myIndex;
                        dim[myRow] -= takenPieces;
                        document.getElementById('taken').value = takenPieces;
                        played = true;
                        //console.log(dim);
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

createBodyTable(nrow, ncol); //genera tablero
document.getElementById('taken').value = 0;