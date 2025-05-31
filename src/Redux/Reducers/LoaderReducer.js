const INITIAL_VALUE = {
    isLoading: true 
}

export default function loaderReducer(state = INITIAL_VALUE, action){
    switch (action.type){
        case "HANDLE_LOADER": 
            return{
               
                isLoading: action.payload
            }
        default:
            return state;
    }
}