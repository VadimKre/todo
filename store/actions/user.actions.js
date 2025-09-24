import { SET_USER, LOGOUT } from '../reducers/user.reducer.js'
export const setUser = (user) => ({ type: SET_USER, user })
export const logout = () => ({ type: LOGOUT })
