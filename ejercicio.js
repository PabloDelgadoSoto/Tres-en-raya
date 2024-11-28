let table;
let cont = 0;
var tablero = 3;
let jUno = [];
let jDos = [];
let colores = ["Circulo", "Cruz"];
let turno = [jUno, jDos];
let victorias = [
    ["0-0", "0-1", "0-2"],
    ["0-0", "1-1", "2-2"],
    ["0-0", "1-0", "2-0"],
    ["0-1", "1-1", "2-1"],
    ["0-2", "1-1", "2-0"],
    ["0-2", "1-2", "2-2"],
    ["1-1", "1-2", "1-3"],
    ["2-0", "2-1", "2-2"]
];

window.onload = function () {
    escrito = document.getElementById('perder');
    table = document.getElementById('table');
    hacerTabla();
};

const hacerTabla = function () {
    for (let i = 0; i < tablero; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < tablero; j++) {
            let td = document.createElement('td');
            td.setAttribute('id', i + '-' + j);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    for (let i = 0; i < tablero; i++) {
        for (let j = 0; j < tablero; j++) {
            document.getElementById(i + '-' + j).addEventListener('click', hacerClic);
        }
    }
};

const desbordar = function (num) {
    if (num < 0) {
        return true;
    } else if (num > tablero) {
        return true;
    }
    return false;
};

const hacerClic = function (event) {
    marcarXClic(event.target.getAttribute('id'));
};

const marcarXClic = function (id) {
    let marca = document.getElementById(id);
    let comprobarUno = jUno.includes(marca.getAttribute("id"));
    let comprobarDos = jDos.includes(marca.getAttribute("id"));
    if(comprobarUno || comprobarDos){
        alert("Ese espacio ya está ocupado");
        return;
    }
    marca.setAttribute("style", "background-image:url("+colores[cont%colores.length]+".png);background-size:100% 100%;");
    turno[cont%colores.length].push(marca.getAttribute('id'));
    if(jUno.length+jDos.length==tablero*tablero){
        alert("Empate");
    }
    victorias.forEach(casillas => {
        let contadorVictoria = 0;
        casillas.forEach(e => {
            if(turno[cont%colores.length].includes(e)){
                contadorVictoria++;
            }
        });
        if(contadorVictoria==3){
            ganar();
        }
    });
    cont++;
};

const ganar = function(){
    alert('Enhorabuena jugador '+colores[cont%colores.length]);
}