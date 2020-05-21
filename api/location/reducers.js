import {
    LOCATION_BEGIN,
    LOCATION_ERROR,
    LOCATION_SUCCESS
} from './actions'

const initianState = {
    location: {},
    loading: false,
    error: null,
    country_name: ''
}

export default function locationReducer(state = initianState,action){
    switch(action.type){
        case LOCATION_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case LOCATION_SUCCESS:
            return{
                ...state,
                loading: false,
                location: action.payload.item,
                country_name: action.payload.item.country_name
            }
        case LOCATION_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload.error,
                location:{}
            }
        default:
            return state
    }
}