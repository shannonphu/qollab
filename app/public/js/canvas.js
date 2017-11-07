function initCanvas() {
	var canvas = new fabric.Canvas('draw');
	
	let windowHeight = $(window).height() - $('.navbar-fixed').height();	
	let windowWidth = $('#canvas-column').width();
	canvas.setHeight(windowHeight);
	canvas.setWidth(windowWidth);
	
	canvas.isDrawingMode = true;
	canvas.freeDrawingBrush.width = 3;
	return canvas;
};

var canvas = initCanvas();

canvas.on('path:created', (path) => {
	let pathData = path['path'];
	socket.emit('path:drawn', JSON.stringify(pathData));
});