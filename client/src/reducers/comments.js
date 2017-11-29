var CommentsReducer = (state = {
    showResolvedCommentsToggled: false,
    commentFormShown: false
}, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_RESOLVED_COMMENTS':
            return {
                ...state,
                showResolvedCommentsToggled: !state.showResolvedCommentsToggled
            }
        case 'SET_COMMENT_FORM_SHOWN':
            return {
                ...state,
                commentFormShown: action.isShown
            }
        default:
            return state;
    }
}

export default CommentsReducer;