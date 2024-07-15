/** Import des modules nécessaires */
import Axios from './caller.service'
import { jwtDecode } from "jwt-decode";

// appel service de l'api
// fonction decodage token
export const tokenDecode = (token) => {
    let decode = jwtDecode(token);
    return decode
}

// fonction login
export const loginUser = (data) => {
    return Axios.post('/api/v1/user/signin', data)
}

// fonction inscription
export const signupUser = (data) => {
    return Axios.post('/api/v1/user/signup', data)
}

export const updateUser = (data) => {
    return Axios.patch('/api/v1/user/updateFreeTrial', data);
}

// fonction deconnexion
export const logout = () => {
    localStorage.removeItem('token')
}

// fonction recuperation du token
export const getToken = () => {
    return localStorage.getItem('token')
}

// fonction insertion du token dans le local storage
export const saveToken = (token) => {
    localStorage.setItem('token', token)
}

// fonction verification connexion
export const isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}