const INITIAL_VALUE = {
  movies: [],
  loading: false,
  error: null
}

export default function moviesReducer(state = INITIAL_VALUE, action) {
  switch(action.type) {
      case "GET_MOVIES_LIST":
          return {
              ...state,
              movies: action.payload,
              loading: false,
              error: null
          }
      case "MOVIES_LOADING":
          return {
              ...state,
              loading: true,
              error: null
          }
      case "MOVIES_ERROR":
          return {
              ...state,
              loading: false,
              error: action.payload
          }
      default:
          return state
  }
}
