const INITIAL_VALUE = {
    favorites: []
}

export default function favoritesReducer(state = INITIAL_VALUE, action) {
    switch(action.type) {
        case "ADD_TO_FAVORITES":
            // Prevent duplicates
            if (state.favorites.find(movie => movie.id === action.payload.id)) {
                return state;
            }
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case "REMOVE_FROM_FAVORITES":
            return {
                ...state,
                favorites: state.favorites.filter(movie => movie.id !== action.payload)
            }
        default:
            return state;
    }
}