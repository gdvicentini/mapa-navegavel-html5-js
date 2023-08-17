
var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40, PGUP = 33, PGDOWN = 34;
var mvLeft = false, mvRight = false, mvUp = false, mvDown = false, zoomIn = false, zoomOut = false;

//referenciar o elemento canvas
let cnv = document.querySelector("canvas");
//variavel para pegar o contexto de renderização do canvas
let ctx = cnv.getContext("2d");
let srcX = 0;
let srcY = 0;
let size = 400;
let speed = 2;

var map = new Image();
map.src = "img/map.png";
map.onload = looping();

window.addEventListener("keydown",keydownHandler,false);
window.addEventListener("keyup",keyupHandler,false);

function keydownHandler(e){//função disparada quando uma tecla é pressionada
    var key = e.keyCode;
    switch(key){
        case LEFT:
            mvLeft = true;
            break;
        case RIGHT:
            mvRight = true;
            break;
        case UP:
            mvUp = true;
            break;
        case DOWN:
            mvDown = true;
            break;
        case PGDOWN:
            zoomOut = true;
            break;
        case PGUP:
            zoomIn = true;
            break;
    }
}

function keyupHandler(e) {//função disparada quando uma tecla é liberada
    var key = e.keyCode;
    switch(key){
        case LEFT:
            mvLeft = false;
            break;
        case RIGHT:
            mvRight = false;
            break;
        case UP:
            mvUp = false;
            break;
        case DOWN:
            mvDown = false;
            break;
        case PGDOWN:
            zoomOut = false;
            break;
        case PGUP:
            zoomIn = false;
            break;
    }
}

//função responsável por desenhar os elementos na tela
function render() {
    ctx.clearRect(0,0,cnv.width,cnv.height);
    
    //(pos. captura: 0,0), (tam. captura img: 400,400), (pos. desenho: 0,0), (tam. tela desenho: cnv.width, cnv.height)
    ctx.drawImage(map,srcX,srcY,size,size,0,0,cnv.width,cnv.height);
}

//função de atualização dos elementos
function update(){
    if(mvLeft){
        if(srcX > speed){//garante que a imagem capturada esteja dentro da margem à esquerda do mapa
            srcX -= speed;
        }
    }
    if(mvRight){
        if(srcX + size < map.width - speed){//garante que a imagem capturada esteja dentro da margem à direita do mapa
            srcX += speed;
        }
    }
    if(mvUp){
        if(srcY > speed){//garante que a imagem capturada esteja dentro da margem superior do mapa
            srcY -= speed;
        }
    }
    if(mvDown){
        if(srcY + size < map.height - speed){//garante que a imagem capturada esteja dentro da margem inferior do mapa
            srcY += speed;
        }
    }
    if(zoomIn){
        size -= speed;
    }
    if(zoomOut){
        size += speed;
    }
}

function looping() {//função que se repete 60x por segundo
    requestAnimationFrame(looping,cnv);
    update();//processa a interação
    render();//desenha o mapa atualizado na tela
}