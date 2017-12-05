// TODO: store canvas objects (not json) in store and canvas on render should render all the objs from the store

var RealtimeReducer = (state = {
    comments: [],
    lectureCode: null,
    canvasJSON: null,
    canvas: null
}, action) => {
    switch (action.type) {
        case 'STORE_JOIN_CODE':
            return {
                ...state,
                lectureCode: action.joinCode
            }
        case 'LOAD_CANVAS_FROM_JSON':
            // Only update the stored canvasJSON if the lecture code is for this lecture
            let joinCode = action.canvasJSON["joinCode"];
            if (state.lectureCode !== joinCode) {
                return state;
            }

            let canvasJSON = action.canvasJSON["data"];
            return {
                ...state,
                joinCode: joinCode,
                canvasJSON: canvasJSON
            }
        case 'CANVAS_OBJECT_ADDED':
            return {
                ...state,
                canvas: action.canvas
            }
        case 'REMOVE_CANVAS_OBJECT':
            let objects = state.canvas.getObjects();
            for (let i = 0; i < objects.length; i++) {
                let shape = objects[i];
                if (shape._id === action.objectId) {
                    state.canvas.remove(shape);
                }
            }
            return {
                ...state,
                canvas: state.canvas
            };
            
        case 'SET_INITIAL_COMMENTS':
            return {
                ...state,
                comments: action.comments
            }
        case 'ADD_COMMENT':
            // Update client-side props
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.comment
                ]
            };
        case 'SYNC_NEW_COMMENT':
            // Only update the comments of the lecture session the newly added comment was submitted on
            let updatedJoinCode = action.joinCode;
            if (state.lectureCode !== updatedJoinCode) {
                return state;
            }

            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.comment
                ]
            };
        case 'UPVOTE_COMMENT':
            if (!action.joinCode || action.joinCode !== state.lectureCode) {
                return state;
            }

            return {
                ...state,
                comments: state.comments.map((comment) => {
                    if (comment._id === action.id) {
                        return {
                            ...comment,
                            votes: comment.votes + 1
                        };
                    }
                    else {
                        return comment;
                    }
                })
            };
        case 'RESOLVE_COMMENT':
            return {
                ...state,
                comments: state.comments.map((comment) => {
                    if (comment._id === action.id) {
                        return {
                            ...comment,
                            resolved: true
                        };
                    }
                    else {
                        return comment;
                    }
                })
            }
        case 'REPLY_COMMENT':
            if (action.lectureCode !== state.lectureCode) {
                return state;
            }

            return {
                ...state,
                comments: state.comments.map((comment) => {
                    if (comment._id === action.id) {
                        return {
                            ...comment,
                            replies: [
                                ...comment.replies, action.reply
                            ]
                        };
                    }
                    else {
                        return comment;
                    }
                })
            }
        default:
            return state;
    }
}

export default RealtimeReducer;