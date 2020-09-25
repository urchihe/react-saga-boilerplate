import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    getCurrentUser: null,
    currentUserSuccess: ['payload'],
    currentUserError: ['error'],
    login: ['email','password'],
    loginSuccess: ['payload'],
    loginError: ['error'],
    register: ['username','email','password'],
    registerSuccess: ['payload'],
    registerError: ['error'],
    save: ['user'],
    saveSuccess: ['user'],
    saveError: ['error'],
    setToken: ['token'],
    updateFieldAuth: ['action'],
    asyncStart: null,
    asyncEnd: null,
    logout: null,
    logoutSuccess: null,
    logoutError: ['error'],
    redirect: null,

})
export const AuthTypes = Types
export default Creators