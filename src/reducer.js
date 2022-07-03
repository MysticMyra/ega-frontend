const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            };

        case 'SET_USER_ACCOUNT':
            return {
                ...state,
                account: action.payload
            };

        case 'SET_TRANSACTIONS':
            return {
                ...state,
                transactions: action.payload
            };

        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.concat(action.payload)
            };

        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
export default Reducer;
