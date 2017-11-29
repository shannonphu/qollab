export const toggleShowResolvedComments = () => {
    return {
        type: 'TOGGLE_SHOW_RESOLVED_COMMENTS'
    }
}

export const setCommentFormShown = (isShown) => {
    return {
        type: 'SET_COMMENT_FORM_SHOWN',
        isShown: isShown
    }
}