//variable global
var array = [];

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
 * @param {number} row número de filas
 * @param {number} col número de columnas
 */
function createBodyTable(row, col) {
    table = document.getElementById('table');   

    for (let index = 0; index < row; index++) {        
        table.insertRow(index);
        rowvar = table.rows[index];
        for (let columnIndex = 0; columnIndex < col; columnIndex++) {            
            rowvar.insertCell(columnIndex);
            rowvar.cells[columnIndex].innerHTML = "▄";
            rowvar.cells[columnIndex].addEventListener("click",
                function(e){
                    array[0] = index + " - " + columnIndex;
                    console.log(array);
                }
            );
        }
    }    
}

//Eventos click sobre botones salir
document.getElementById('exit').addEventListener('click', function (e) {
    window.location.replace('../index.html');
});

createBodyTable(24,24);