export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'

const initialState = {
    todos: null
}

export function todosReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TODOS: {
            // Replace the list after querying the service
            return { ...state, todos: cmd.todos }
        }

        case ADD_TODO: {
            const next = state.todos ? [...state.todos, cmd.todo] : [cmd.todo]
            return { ...state, todos: next }
        }

        case UPDATE_TODO: {
            if (!state.todos) return state
            return {
                ...state,
                todos: state.todos.map(todo => (todo._id === cmd.todo._id ? cmd.todo : todo))
            }
        }

        case REMOVE_TODO: {
            if (!state.todos) return state
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId)
            }
        }

        default:
            return state
    }
}
