/**
 * Genera un arreglo que representa el número de elementos del tablero de juego en binario.
 * @param {Array} tabla  Arreglo que contiene la cantidad de elementos en cada fila,
 * cada indice representa la fila y el contenido representa el número de piezas presentes. 
 * @returns {Array} tablaBinario matriz que representa el número de piezas del tablero en binario.
 * cada indice contiene un arreglo correspondiente al número de piezas por fila en binario.
 */
function tablaBinario(tabla) {
    var tablaBinario = [];
    var numBinario = [];
    var fila = [];

    for (i in tabla) {
        fila = ["0", "0", "0", "0", "0"];
        numBinario = tabla[i].toString(2);

        tablaBinario.push(numBinario.split(""));
        if (tablaBinario[i].length < 5) {
            while (tablaBinario[i].length < 5) { //desplaza los digitos hacia la derecha para que todos tengan la misma longitud
                tablaBinario[i].unshift('0');
            }
        }

    }
    return tablaBinario;
}


/**
 * Indica la cantidad de piezas que se deben remover de una fila específica para realizar
 * una jugada ganadora.
 * @param {Array} tabla Arreglo que contiene la cantidad de elementos en cada fila,
 * cada indice representa la fila y el contenido representa el número de piezas presentes. 
 * @param {Array} tablaBinario Contiene el número de elementos en cada fila en binario.
 * @returns {Array} El primer elemento representa la fila donde se retirarán las piezas y el segundo
 * la cantidad de piezas.
 */
function aplicarEstrategia(tabla, tablaBinario) {
    var resultado = tablaBinario[0].slice();
    console.log(tablaBinario);

    //calcula suma de cada columna de la matriz binaria
    for (j = 0; j < 5; j++) {
        for (i = 1; i < tablaBinario.length; i++) {
            resultado[j] = resultado[j] ^ tablaBinario[i][j].slice();
        }
    }


    columna = resultado.indexOf(1);
    if (columna != -1) {
        var fila;
        //busca fila en la que hay que retirar fichas
        for (i = tablaBinario.length - 1; i >= 0; i--) {
            if (tablaBinario[i][columna] == 1) {
                fila = i;
                break;
            }
        }

        //calcula numero de fichas que deben quedar en la fila
        num = tablaBinario[fila].slice();
        for (; columna < num.length; columna++) {
            num[columna] = num[columna] ^ resultado[columna];
        }

        //convertir el numero encontrado a decimal
        var nDecimal = "";
        for (k in num) {
            nDecimal += num[k];
        }
        nDecimal = parseInt(nDecimal, 2);

        return [fila, tabla[fila] - nDecimal];
    } else {
        //busca la fila que más fichas tenga
        var mayor = tabla[0];
        for (i = 1; i < tabla.length; i++) {
            if (tabla[i] > mayor) {
                mayor = i;
            }
        }
        return [mayor, 1];
    }

}