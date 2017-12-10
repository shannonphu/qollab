var CommentsReducer = (state = {
    showResolvedCommentsToggled: false,
    focusModeActive: false,    
    sortByAnnotationCoordinates: true,
    commentFormShown: false,
    annotationCheckbox: false,
    comments: [],
    lectureCode: null
}, action) => {
    switch (action.type) {
        case 'STORE_JOIN_CODE':
            return {
                ...state,
                lectureCode: action.joinCode
            }
        case 'TOGGLE_FOCUS_MODE':
            return {
                ...state,
                focusModeActive: !state.focusModeActive
            }
        case 'TOGGLE_SHOW_RESOLVED_COMMENTS':
            return {
                ...state,
                showResolvedCommentsToggled: !state.showResolvedCommentsToggled
            }
        case 'SET_ANNOTATION_CHECKBOX':
            return {
                ...state,
                annotationCheckbox: action.isChecked
            }
        case 'SET_COMMENT_FORM_SHOWN':
            return {
                ...state,
                commentFormShown: action.isShown
            }
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
            console.log(state);
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

export default CommentsReducer;