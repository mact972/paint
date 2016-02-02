var mousePressed = false;
var started = true;
var lastX, lastY;
var ctx;

function InitThis() {
    canvas = $('#myCanvas').get(0);

    ctx = canvas.getContext("2d");

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });
	    
    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });

    $('#save').get(0).addEventListener('click', function(e) { 
        onSave(); }, false);

    $('#fill').get(0).addEventListener('click', function(e) { 
        onFill(); }, false);
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}
	
function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function onSave() {
    var img = canvas.toDataURL("image/png");
    document.write('<img src="' + img + '"/>');

}

function onFill() {
    // Start a new path to begin drawing in a new color.
    
    ctx.fillStyle = $('#selColor').val();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}



