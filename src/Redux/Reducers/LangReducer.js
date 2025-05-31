const INITIAL_VALUE = {
    lang: "EN", // AR
    theme: "light",
    counter: 0 
}
export default function languageReducer(state= INITIAL_VALUE, action){
    switch(action.type){
        case "CHANGE_LANG":
            return{
                ...state, 
                lang: action.payload // AR 
            }
        default: 
            return state;
    }
}
