//Eventos click sobre botones multijugador o cpu
document.getElementById('comeback').addEventListener('click', function (e) {
    window.location.replace('../index.html');
});

document.getElementById('btn-cpu').addEventListener('click', function (e) {
    gameNavOpt();
});
//

//Eventos click sobre radio buttons
document.getElementById('gameone').addEventListener('click', function (e) {

    if (this.checked) {
        document.getElementById('gametwo').checked = false;
        document.getElementById('gamethree').checked = false;
    } else {
        this.checked = false;
    }
});

document.getElementById('gametwo').addEventListener('click', function (e) {

    if (this.checked) {
        document.getElementById('gameone').checked = false;
        document.getElementById('gamethree').checked = false;

    } else {
        this.checked = false;
    }
});

document.getElementById('gamethree').addEventListener('click', function (e) {

    if (this.checked) {
        document.getElementById('gametwo').checked = false;
        document.getElementById('gameone').checked = false;

    } else {
        this.checked = false;
    }
});
//

/**
 * Navega hacia la opción del juego elegida.
 */
function gameNavOpt() {
    debugger;
    items = document.getElementsByClassName('sel');
    for (let index = 0; index < items.length; index++) {
        if (items[index].checked) {
            window.location.replace('../view/ingame.html?mode=' + (index + 1));
            break;
        }
    }

}