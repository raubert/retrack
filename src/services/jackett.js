const host = ''

export default {

  categories(vm) {
    return vm.$http.get(host + '/api/categories.php').then((resp) => resp.json())
  },

  search(vm, input, categories) {
    return vm.$http.post(host + '/api/search.php', {q: input, cat: categories}).then((resp) => resp.json())
  },

  download(vm, nonce, key, label) {
    return vm.$http.post(host + '/api/download.php', {nonce, key, label}).then((resp) => resp.json())
  }

}
