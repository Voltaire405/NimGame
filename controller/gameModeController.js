var OPTIONS = {"multiplayer": 1,
                "cpu":2
}
//Eventos click sobre botones multijugador o cpu
document.getElementById('comeback').addEventListener('click', function (e) {
    window.location.replace('../index.html');
});

document.getElementById('btn-cpu').addEventListener('click', function (e) {
    gameNavOpt(OPTIONS["cpu"]);
});

document.getElementById('btn-multiplayer').addEventListener('click', function (e) {
    gameNavOpt(OPTIONS["multiplayer"]);
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
function gameNavOpt(opt) {
    
    items = document.getElementsByClassName('sel');
    for (let index = 0; index < items.length; index++) {
        if (items[index].checked) {
            switch (opt) {
                case 1:
                    window.location.replace('../view/inGameMulti' + (index + 1) + '.html');
                    break;
                case 2:
                    window.location.replace('../view/inGame' + (index + 1) + '.html');
                    break;
                default:
                    break;
            }
            
            break;
        }
    }

}