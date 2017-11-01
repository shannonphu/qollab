var canvas = new fabric.Canvas('draw');
canvas.isDrawingMode = true;
canvas.freeDrawingBrush.width = 3;

var strokeHistory = [];

canvas.on('path:created', function(data) {
	// console.log(JSON.stringify(canvas));
	// canvas.add(data);
	strokeHistory.push(data);
	socket.emit('path:drawn', JSON.stringify(canvas));
});

/*
function onMouseDown(event) {
	path = new Path();
	path.strokeColor = 'black';
}

function onMouseDrag(event) {
	// Every drag event, add a point to the path at the current
	// position of the mouse:
	path.add(event.point);
}

function onMouseUp(event) {	
	// When the mouse is released, simplify it:
	path.simplify();

	strokeHistory.push(path);
	
	socket.emit('path:drawn', path.exportJSON());
}
*/