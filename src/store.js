import { createStore } from 'redux'

import albumReducers from 'reducers/album-reducers'

const store = createStore(albumReducers)

export default store 