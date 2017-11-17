var RealtimeReducer = (state = {
    comments: initialComments(),
    lectureCode: null,
    canvasJSON: null
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
        case 'ADD_COMMENT':
            // Update client-side props
            return {
                ...state,
                addAnnotationActive: false,
                activeAnnotationId: null,
                comments: [
                    ...state.comments,
                    Object.assign({}, action.comment)
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
                    Object.assign({}, action.comment)
                ]
            };
        default:
            return state;
    }
}

function initialComments() {
    return [
        {
            text: "Question",
            replies: ["Reply 1", "Reply 2", "Reply 3"],
            votes: 5,
            resolved: false,
        },
        {
            text: "Question 2",
            replies: ["Reply 1", "Reply 2", "Reply 3"],
            votes: 5,
            resolved: false,
        },
        {
            text: "Question 3",
            replies: ["Reply 1", "Reply 2", "Reply 3"],
            votes: 5,
            resolved: false,
        },
        {
            text: "Question 4",
            replies: ["Reply 1", "Reply 2", "Reply 3"],
            votes: 5,
            resolved: false,
        },
        {
            text: "Question 5",
            replies: ["Reply 1", "Reply 2", "Reply 3"],
            votes: 5,
            resolved: false,
        },
    ]
}

export default RealtimeReducer;