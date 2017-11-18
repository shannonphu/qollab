// Handles socket connections and event callbacks
module.exports = function (server, canvasHistory) {
    const io = require('socket.io').listen(server);

    io.sockets.on('connection', function (socket) {
        console.log("A connection was made");

        socket.on('disconnect', function () {
            console.log('A user disconnected');
        });

        socket.on('action', (action) => {
            switch (action.type) {
                case 'socket/CANVAS_UPDATED':
                    {
                        let json = action.canvasJSON;
                        let joinCode = json['joinCode'];
                        let canvasData = json['data'];
                        canvasHistory[joinCode]["canvas"] = canvasData;
                        socket.broadcast.emit('action', {
                            type: 'LOAD_CANVAS_FROM_JSON',
                            canvasJSON: {
                                "joinCode": joinCode,
                                "data": canvasData
                            }
                        });
                    }
                    break;
                case 'socket/COMMENT_ADDED':
                    {
                        let json = action.data;
                        let joinCode = json['joinCode'];
                        let comment = json['comment'];
                        
                        // Add new comment to comment history
                        if (!(joinCode in canvasHistory)) {
                            canvasHistory[joinCode] = { comments: [] }
                        }
                        canvasHistory[joinCode]["comments"].push(comment);

                        socket.broadcast.emit('action', {
                            type: 'SYNC_NEW_COMMENT',
                            comment: comment,
                            joinCode: joinCode
                        });
                    }
                    break;
                default:
                    break;
            }
        });
    });
};