import axios from 'axios';

export const LOCATION_BEGIN = 'LOCATION_BEGIN';
export const LOCATION_SUCCESS = 'LOCATION_SUCCESS';
export const LOCATION_ERROR = 'LOCATION_ERROR';

const ACCESS_KEY = '41257643a4a5a905a11b7b06e35302ef';

export const locationBegin = () => ({
  type: LOCATION_BEGIN,
});
export const locationSuccess = item => ({
  type: LOCATION_SUCCESS,
  payload: {item},
});
export const locationError = error => ({
  type: LOCATION_ERROR,
  payload: {error},
});

export function fetchLocation(ip) {
  return dispatch => {
    dispatch(locationBegin());
    const request = axios({
      method: 'GET',
      url: `http://api.ipstack.com/${ip}?access_key=${ACCESS_KEY}`,
      headers: []
    })
    return request
      .then(function(response) {
        //console.log(response.data)
        dispatch(locationSuccess(response.data));
      })
      .catch(function(error) {
        dispatch(locationError(error));
        console.log(error);
      });
  };
}