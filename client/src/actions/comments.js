export const toggleShowResolvedComments = () => {
    return {
        type: 'TOGGLE_SHOW_RESOLVED_COMMENTS'
    }
}

export const setAnnotationCheckbox = (isChecked) => {
    return {
        type: 'SET_ANNOTATION_CHECKBOX',
        isChecked: isChecked
    }
}

export const setCommentFormShown = (isShown) => {
    return {
        type: 'SET_COMMENT_FORM_SHOWN',
        isShown: isShown
    }
}

export const setInitialComments = (comments) => {
    return {
        type: 'SET_INITIAL_COMMENTS',
        comments: comments
    }
};

export const storeJoinCode = (joinCode) => {
    return {
        type: 'STORE_JOIN_CODE',
        joinCode: joinCode
    }
};

// Comment Operations

export const addComment = (comment) => {
    return {
        type: 'ADD_COMMENT',
        comment: comment
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