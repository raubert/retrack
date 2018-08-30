<template>
  <form novalidate class="md-layout" @submit.prevent="search">
    <div class="categories md-layout md-gutter">
      <div
        v-for="(value, key) in categories"
        :key="value"
        class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
        <md-checkbox v-model="checked" :value="value">{{ key }}</md-checkbox>
      </div>
    </div>
    <md-toolbar>
      <md-field>
        <label>Search</label>
        <md-input v-model="input" autocomplete="off"></md-input>
      </md-field>
    </md-toolbar>
  </form>
</template>

<script>
export default {
  name: 'search',
  data: () => ({
    checked: [],
    input: ''
  }),
  props: {
    categories: Object
  },
  watch: {
    categories() {
      this.reset()
    }
  },
  created() {
    this.reset()
  },
  methods: {
    reset() {
      this.checked = Object.values(this.categories)
    },
    search() {
      this.$emit('search', this.input, this.checked)
    }
  }
}
</script>

<style scoped>
  form {
    margin: 0 16px 16px 16px;
  }
  .md-layout-item {
    flex: 0 0;
  }
  .md-toolbar {
    margin: 12px 0;
  }
  .md-field {
    margin-top: .5rem !important;
  }
</style>
