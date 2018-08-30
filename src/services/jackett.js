import axios from 'axios'

export default {

  info() {
    return axios.get('/api/info.php').then((resp) => resp.data)
  },

  categories() {
    return axios.get('/api/categories.php').then((resp) => resp.data)
  },

  search(input, categories) {
    return axios.post('/api/search.php', {q: input, cat: categories}).then((resp) => resp.data)
  },

  download(nonce, key, label) {
    return axios.post('/api/download.php', {nonce, key, label}).then((resp) => resp.data)
  }

}
