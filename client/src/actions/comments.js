/**
 * @file
 * comment actions
 * @module actions
 */

 /**
  * @returns action of toggling of showing/hiding resolved comments
  * @memberof module:actions
  */
export const toggleShowResolvedComments = () => {
    return {
        type: 'TOGGLE_SHOW_RESOLVED_COMMENTS'
    }
}
/**
 * @returns toggling of focus mode
 * @memberof module:actions
 */
export const toggleFocusMode = () => {
    return {
        type: "TOGGLE_FOCUS_MODE"
    }
}

/**
 * @returns action of seting the annotation check box to show/hide
 * @memberof module:actions
 * @param {*} isChecked 
 */
export const setAnnotationCheckbox = (isChecked) => {
    return {
        type: 'SET_ANNOTATION_CHECKBOX',
        isChecked: isChecked
    }
}

/**
 * @returns action of setting the comment form to be shown
 * @memberof module:actions
 * @param {boolean} isShown 
 */
export const setCommentFormShown = (isShown) => {
    return {
        type: 'SET_COMMENT_FORM_SHOWN',
        isShown: isShown
    }
}

/**
 * @returns action of setting the initial comments
 * @memberof module:actions
 * @param {*} comments 
 */
export const setInitialComments = (comments) => {
    return {
        type: 'SET_INITIAL_COMMENTS',
        comments: comments
    }
};

/**
 * @returns action of storing the joincode
 * @memberof module:actions
 * @param {*} joinCode 
 */
export const storeJoinCode = (joinCode) => {
    return {
        type: 'STORE_JOIN_CODE',
        joinCode: joinCode
    }
};

// Comment Operations

/**
 * @returns action of adding a comment
 * @memberof module:actions
 * @param {*} comment 
 */
export const addComment = (comment) => {
    return {
        type: 'ADD_COMMENT',
        comment: comment
    }
};

/**
 * @returns action of upvoting a comment
 * @memberof module:actions
 * @param {String} id 
 * @param {String} lectureCode 
 */
export const upVoteComment = (id, lectureCode) => {
	return {
		type: 'UPVOTE_COMMENT',
        id: id,
        joinCode: lectureCode
	}
};

/**
 * @returns action of resolving a given comment
 * @memberof module:actions
 * @param {String} id 
 */
export const resolveComment = (id) => {
    return {
        type: "RESOLVE_COMMENT",
        id: id
    }
};

/**
 * @returns action of replying a comment
 * @memberof module:actions
 * @param {String} id 
 * @param {String} lectureCode 
 * @param {String} reply 
 */
export const replyComment = (id, lectureCode, reply) => {
    return {
        type: "REPLY_COMMENT",
        id: id,
        lectureCode: lectureCode,
        reply: reply
    }
}