<template>
  <form novalidate @submit.prevent="search">
    <div  class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="categories">Category</label>
          <md-select v-model="category" name="categories" id="categories">
            <md-option value="ALL">All</md-option>
            <md-option
              v-for="item in categories"
              :key="item.name"
              :value="item.name"
            >{{ item.name }}</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-field>
          <label for="trackers">Tracker</label>
          <md-select v-model="tracker" name="trackers" id="trackers">
            <md-option value="ALL">All</md-option>
            <md-option
              v-for="item in trackers"
              :key="item.id"
              :value="item.id"
            >{{ item.name }}</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
    <div  class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-toolbar>
          <md-field>
            <label>Search</label>
            <md-input v-model="input" autocomplete="off" @keyup.enter="search"></md-input>
          </md-field>
        </md-toolbar>
      </div>
    </div>
  </form>
</template>

<script>
const ALL = 'ALL'

export default {
  name: 'search',
  data: () => ({
    category: null,
    tracker: null,
    input: ''
  }),
  props: {
    categories: Array,
    trackers: Array
  },
  created() {
    this.reset()
  },
  methods: {
    reset() {
      this.category = ALL
      this.tracker = ALL
    },
    find(what, as, where) {
      for (let i = where.length - 1; i >= 0; i--) {
        if (where[i][as] === what) {
          return where[i]
        }
      }
      return null
    },
    search() {
      const category = this.find(this.category, 'name', this.categories)
      const tracker = this.find(this.tracker, 'id', this.trackers)
      this.$emit('search', this.input, category, tracker)
    }
  }
}
</script>

<style scoped>
  form {
    padding: 0 10px;
  }
  .md-toolbar {
    margin: 12px 0;
  }
  .md-field {
    margin-top: .5rem !important;
  }
</style>
