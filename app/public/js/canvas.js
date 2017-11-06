function initCanvas() {
	var canvas = new fabric.Canvas('draw');
	canvas.isDrawingMode = true;
	canvas.freeDrawingBrush.width = 3;
	return canvas;
};

var canvas = initCanvas();

canvas.on('path:created', (path) => {
	let pathData = path['path'];
	socket.emit('path:drawn', JSON.stringify(pathData));
});