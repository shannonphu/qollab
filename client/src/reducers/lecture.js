var LectureReducer = (state = {
    lecture: null
}, action) => {
    switch (action.type) {
        case 'STORE_LECTURE':
            return {
                ...state,
                lecture: action.lecture
            }
        default:
            return state;
    }
}

export default LectureReducer;