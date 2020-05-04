import { create } from 'apisauce'

//const tokens = {}

const API_ROOT = 'https://conduit.productionready.io/api';


export const ApiService = create({
  baseURL: API_ROOT,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 30000,
})

ApiService.addResponseTransform((response) => {
  if (response.ok) {
    if (window.localStorage.getItem('jwt')) {
      window.localStorage.getItem('jwt')
    }
  }
})
ApiService.addRequestTransform((request) => {
  if (window.localStorage.getItem('jwt')) {
    request.headers.Authorization = `Token ${window.localStorage.getItem('jwt')}`
  }
})
