var CommentsReducer = (state = {
    showResolvedCommentsToggled: false
}, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_RESOLVED_COMMENTS':
            return {
                ...state,
                showResolvedCommentsToggled: !state.showResolvedCommentsToggled
            }
        default:
            return state;
    }
}

export default CommentsReducer;