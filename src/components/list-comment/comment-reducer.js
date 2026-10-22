export function commentReducer(state, action) {
    switch (action.type) {
        case "SET_COMMENTS":
            return action.payload;
        case "DELETE_COMMENT":
            return state.filter(comment => comment.id !== action.payload);
        case "ADD_COMMENT":
            return [...state, action.payload];
        default:
            return state;
    }
}