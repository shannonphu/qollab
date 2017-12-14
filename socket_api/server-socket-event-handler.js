// Handles socket connections and event callbacks
module.exports = function (server) {
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
                        socket.broadcast.emit('action', {
                            type: 'LOAD_CANVAS_FROM_JSON',
                            joinCode: joinCode,
                            canvasJSON: canvasData
                        });
                    }
                    break;
                case 'socket/COMMENT_ADDED':
                    {
                        let json = action.data;
                        let joinCode = json['joinCode'];
                        let comment = json['comment'];

                        socket.broadcast.emit('action', {
                            type: 'SYNC_NEW_COMMENT',
                            comment: comment,
                            joinCode: joinCode
                        });
                    }
                    break;
                case 'socket/COMMENT_UPVOTED':
                    {
                        let json = action.data;
                        let joinCode = json['joinCode'];
                        let commentID = json['commentID'];
                        socket.broadcast.emit('action', {
                            type: 'UPVOTE_COMMENT',
                            id: commentID,
                            joinCode: joinCode
                        });
                    }
                    break;
                case 'socket/COMMENT_REPLY_ADDED':
                    {
                        let json = action.data;
                        let lectureCode = json['lectureCode'];
                        let commentID = json['commentID'];
                        let replyText = json['reply'];

                        socket.broadcast.emit('action', {
                            type: 'REPLY_COMMENT',
                            id: commentID,
                            lectureCode: lectureCode,
                            reply: replyText
                        });
                    }
                    break;
                case 'socket/COMMENT_RESOLVED':
                    {
                        let json = action.data;
                        let joinCode = json['joinCode'];
                        let commentID = json['commentID'];
                        socket.broadcast.emit('action', {
                            type: 'RESOLVE_COMMENT',
                            id: commentID,
                            joinCode: joinCode
                        });
                    }
                case 'socket/ANNOTATION_RESOLVED':
                    {
                        let json = action.data;
                        let annotationID = json['annotationID'];
                        socket.broadcast.emit('action', {
                            type: 'CANVAS_RECT_REMOVED',
                            objectId: annotationID
                        });
                    }
                default:
                    break;
            }
        });
    });
};