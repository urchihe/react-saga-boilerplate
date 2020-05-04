import { ApiService } from '../ApiService'

function getCurrentUser() {
  return ApiService.get('/user')
}

function login(email,password) {
    return ApiService.post('/users/login',{user : email,password})
}

function register(username,email,password) {
    return ApiService.post('/users',{ user: username,email,password})
}

function save(user) {
    return ApiService.put('/user',{ user })
}

function logout() {
    return ApiService.post('/users/logout')
}

export const AuthService = {
    getCurrentUser,
    login,
    register,
    save,
    logout,
}
  