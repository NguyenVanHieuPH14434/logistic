export const authReducer = (state, { type, payload: { isAuthenticated, user } }) => {
    switch (type) {
        case 'SET_AUTH':
            return {
                ...state,
                isLoading: false,
                isAuthenticated,
                user
            }
        default:
            return state
    }
}