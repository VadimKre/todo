import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'

const initialState = {
    user: userService.getLoggedinUser() || null
}

export function userReducer(state=initialState, cmd){
    switch(cmd.type){
        case SET_USER:{
            return {
                ...state,
                user: cmd.user
            }
        }

        case LOGOUT:{
            return {
                ...state,
                user: null
            }
        }

        default: 
            return state
    }
}