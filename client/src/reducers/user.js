var UserReducer = (state = {
    user: null
}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default UserReducer;