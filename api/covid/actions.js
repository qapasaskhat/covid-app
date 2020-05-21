import Axios from "axios";
var translate = require('react-node-google-translate');
export const FETCH_BEGIN = 'FETCH_BEGIN';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

export const SEARCH_TEXT = 'SEARCH_TEXT' 

export const fethBegin = () =>({
    type: FETCH_BEGIN
})
export const fetchSuccess = (items)=>({
    type: FETCH_SUCCESS,
    payload: {items}
})
export const fetchError = (error)=>({
    type: FETCH_ERROR,
    payload: {error}
})

export const searchText =(text) =>({
    type: SEARCH_TEXT,
    text
})


export function fetch(){
    return dispatch=>{
        dispatch(fethBegin())
        return Axios.get('https://api.covid19api.com/summary')
        .then(function (response) {
            console.log(response.data)
            dispatch(fetchSuccess(response.data))
        })
        .catch(function (error) {
            dispatch(fetchError(error))
            console.log(error);
        })
    }
}

export function search(text){
    return dispatch=>{
        translate({
            text: `${text}`,
            source: 'ru',
            target: 'en'
          }, function(result) {
            dispatch(searchText(result))
            console.log(result);
          });
        
    }
}

