export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
    isLoading: false
}

export function loadingReducer(state=initialState, cmd){
    switch(cmd.type){
        case SET_IS_LOADING:{
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        }

        default: 
            return state
    }
}