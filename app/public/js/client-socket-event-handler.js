const socket = io();

socket.on('connect', function() {
	console.log("A new client connected to the websocket");
});

socket.on('canvas:update', function(pathJSON) {
	canvas.loadFromJSON(pathJSON);
});
