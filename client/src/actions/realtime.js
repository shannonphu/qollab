export const setInitialComments = (comments) => {
    return {
        type: 'SET_INITIAL_COMMENTS',
        comments: comments
    }
};

export const addComment = (comment) => {
    return {
        type: 'ADD_COMMENT',
        comment: comment
    }
};

export const storeJoinCode = (joinCode) => {
    return {
        type: 'STORE_JOIN_CODE',
        joinCode: joinCode
    }
};

export const canvasUpdated = (canvasJSON) => {
    return {
        type: 'socket/CANVAS_UPDATED',
        canvasJSON: canvasJSON
    }
};