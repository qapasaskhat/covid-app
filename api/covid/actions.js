import axios from "axios";

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


export function network(){
    return dispatch=>{
        dispatch(fethBegin())
        //url = 'https://api.covid19api.com/summary'
        const request = axios({
            method: 'GET',
            url: 'https://api.covid19api.com/summary',
            headers: []
        })
        return request
        .then(function (response) {
            //console.log(response.data)
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

