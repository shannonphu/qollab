var path;
var strokeHistory = [];

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

// This handler is placed here because it mixes paperscript with javascript
// and is not recognized in client-socket-event-handler.js
socket.on('path:add', function(pathJSON) {
	console.log("client path:add");
	console.log(pathJSON);
	var path = new Path();
	path.importJSON(pathJSON);
});