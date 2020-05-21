import {
    FETCH_BEGIN,
    FETCH_ERROR,
    FETCH_SUCCESS,
    SEARCH_TEXT
} from './actions'

const initianState = {
    items: {},
    loading: false,
    error: null,
    data: [],
    global: {}
}

export default function fetchApi(state = initianState,action){
    switch(action.type){
        case FETCH_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_SUCCESS:
            return{
                ...state,
                loading: false,
                items: action.payload.items,
                global: action.payload.items.Global
            }
        case FETCH_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload.error,
                items:{}
            }
        case SEARCH_TEXT:
            return{
                ...state,
                data: state.items.Countries.filter(i=>{
                        const itemData = `${i.Country.toUpperCase()}`
                        const textData = action.text.toUpperCase()
                        console.log(itemData.indexOf(textData) > -1);
                    return itemData.indexOf(textData) > -1
                })
            }
        default:
            return state
    }
}