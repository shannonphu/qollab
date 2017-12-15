/**
 * Reducer for handling actions on Lectures 
 * @param {*} state initial state
 * @param {*} action 
 * @returns new state
 */
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