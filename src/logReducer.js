const initialState = {
    isLoggedIn: false,
    currentUser: {
        email: '',
        username: ''
    }
}
const logReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case 'login':
            return {
                ...state,
                isLoggedIn: true,
                currentUser: {
                    ...state.currentUser,
                    email: payload.email,
                    username: payload.username
                }
            }
        case 'logout':
            return {
                ...state,
                isLoggedIn: false,
                currentUser: {
                    ...state.currentUser,
                    email: '',
                    username: ''
                }
            }
        default:
            return state
    }
}
export default logReducer