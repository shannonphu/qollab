const socket = io();

socket.on('connect', function() {
	socket.emit('chat message', "hi");
});

// This handler is placed here because it mixes paperscript with javascript
// and is not recognized in client-socket-event-handler.js
socket.on('path:add', function(pathJSON) {
	canvas.clear();
	canvas.loadFromJSON(pathJSON, function() {
	  canvas.renderAll();
	});
});