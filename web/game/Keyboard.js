var Keyboard = function() {
    this.keys = {};

    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);

    document.onmousemove = tankMouseMove;
    document.onmousedown = tankMouseDown;
    document.onmouseup = tankMouseUp;
};

Keyboard.prototype.keyDown = function(event) {
    keyboard.keys[event.keyCode] = true;
    //console.log('down', event.keyCode);
};

Keyboard.prototype.keyUp = function(event) {
    keyboard.keys[event.keyCode] = false;
    //console.log('up', event.keyCode);
};

var mousex=0, mousey= 0, mousedown = false;
var tankMouseMove = function(e) {

    if(e.offsetX) {
        mousex = e.offsetX;
        mousey = e.offsetY;
    } else if(e.layerX) {
        mousex = e.layerX;
        mousey = e.layerY;
    }
};

var tankMouseDown = function(e) {
    mousedown = true;
};

var tankMouseUp = function(e) {
    mousedown = false;
};

var keyboard = new Keyboard();
