function initCanvas() {
	var canvas = new fabric.Canvas('draw');
	canvas.isDrawingMode = true;
	canvas.freeDrawingBrush.width = 3;
	canvas.strokeHistory = [];
	return canvas;
};

var canvas = initCanvas();

canvas.on('path:created', function(path) {
	canvas.strokeHistory.push(path);
	socket.emit('path:drawn', JSON.stringify(canvas));
});