import { combineReducers } from 'redux'

import fetch from './covid/redusers'
import location from './location/reducers'
const rootRedusers = combineReducers({
    fetch,
    location,
})

export default rootRedusers