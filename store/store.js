const { createStore, combineReducers } = Redux

import { todosReducer } from "./reducers/todo.reducer.js"
import { loadingReducer } from "./reducers/loading.reducer.js"
import { filterReducer } from "./reducers/filter.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

const initialState = {

}

const rootReducer = combineReducers({
    todosModule: todosReducer,
    loadingModule: loadingReducer,
    filterModule: filterReducer,
    userModule: userReducer
})

export const store = createStore(rootReducer)

window.gStore = store

store.subscribe( () => {
    console.log('Current state: ', store.getState())
})

