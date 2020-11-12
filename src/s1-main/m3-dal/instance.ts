import axios from 'axios'

export const baseURL = 'http://'

export const instance = axios.create({
   baseURL,
   // withCredentials: true,
})
