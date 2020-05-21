import { combineReducers } from 'redux'

import fetch from './covid/redusers'

const rootRedusers = combineReducers({
    fetch
})

export default rootRedusers