const socket = io.connect('', { query: 'lectureCode=' + joinCode });

socket.on('canvas:update', function(canvasJSON) {
	let parsedCanvasJSON = JSON.parse(canvasJSON);
	let updatedLectureJoinCode = parsedCanvasJSON['joinCode'];

	if (updatedLectureJoinCode == joinCode) {
		let pathHistory = parsedCanvasJSON['data'];
		canvas.loadFromJSON(JSON.stringify(pathHistory));	
	}
});
