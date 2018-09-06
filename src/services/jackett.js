import axios from 'axios'

export default {

  info() {
    return axios.get('/api/info.php').then((resp) => resp.data)
  },

  categories() {
    return axios.get('/api/categories.php').then((resp) => resp.data)
  },

  search(input, category, tracker) {
    const params = {q: input}
    if (category) {
      params.cat = Object.values(category.subcats)
    }
    if (tracker) {
      params.idx = tracker.id
    }
    return axios.post('/api/search.php', params).then((resp) => resp.data)
  },

  download(nonce, key, label) {
    return axios.post('/api/download.php', {nonce, key, label}).then((resp) => resp.data)
  }

}
