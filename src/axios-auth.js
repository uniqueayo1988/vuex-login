import axios from 'axios'

const instance = axios.create({
  baseURL: '...firebase.io'
})

instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance
