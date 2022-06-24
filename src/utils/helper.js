import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

let HELPERS = {
  request: (config) => {
    return axios.request(config).then((response) => {
      return response
    })
  },
}

export default HELPERS
