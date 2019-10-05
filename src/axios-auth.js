import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://ng-http-7c32f.firebaseio.com/'
  baseURL: 'https://identitytoolkit.googleapis.com/v1'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance
