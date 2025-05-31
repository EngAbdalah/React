import axios from "axios";

export const fetchMovies = (searchQuery = "", language = "en-US") => (dispatch) => {
    // 1. Dispatch loading action
    dispatch({ type: "MOVIES_LOADING" });
    
    const API_KEY = "29cf44b93ca83bf48d9356395476f7ad";
    const BASE_URL = "https://api.themoviedb.org/3";
    const endpoint = searchQuery 
        ? `/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=${language}`
        : `/movie/popular?api_key=${API_KEY}&language=${language}`;

    // 2. Make API request
    return axios.get(`${BASE_URL}${endpoint}`)
        .then((res) => {
            // 3. Dispatch success action with results
            dispatch({
                type: "GET_MOVIES_LIST",
                payload: res.data.results
            });
            return res.data;
        })
        .catch((err) => {
            // 4. Dispatch error action
            dispatch({
                type: "MOVIES_ERROR",
                payload: err.response?.data?.message || err.message
            });
            throw err;
        });
};
