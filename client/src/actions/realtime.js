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

export const upVoteComment = (id, lectureCode) => {
	return {
		type: 'UPVOTE_COMMENT',
        id: id,
        joinCode: lectureCode
	}
};

export const resolveComment = (id) => {
    return {
        type: "RESOLVE_COMMENT",
        id: id
    }
};

export const replyComment = (id, lectureCode, reply) => {
    return {
        type: "REPLY_COMMENT",
        id: id,
        lectureCode: lectureCode,
        reply: reply
    }
}