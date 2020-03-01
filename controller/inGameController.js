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

