const socket = io();

socket.on('connect', function() {
	console.log("A new client connected to the websocket");
});

socket.on('canvas:update', function(canvasJSON) {
	canvas.loadFromJSON(canvasJSON);
});
