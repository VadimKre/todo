export const SET_FILTER = 'SET_FILTER'

// const defaultFilter = todoService.getFilterFromSearchParams(searchParams)


const initialState = { filterBy: null }

export function filterReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_FILTER: {
            return { ...state, filterBy: cmd.filterBy }
        }
        default:
            return state
    }
}
