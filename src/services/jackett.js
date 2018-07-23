export default {

  categories(vm) {
    return vm.$http.get('/api/categories.php').then((resp) => resp.json())
  },

  search(vm, input, categories) {
    return vm.$http.get('/api/search.php', {params: {q: input, cat: categories}}).then((resp) => resp.json())
  }

}
