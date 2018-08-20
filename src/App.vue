<template>
  <div class="page-container">
   <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-dense md-primary" :class="{'md-large': !!categories}">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <span class="md-title">retrack</span>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>
        </div>

        <div class="md-toolbar-row" v-if="categories">
          <md-tabs class="md-primary">
            <md-tab
              v-for="item in categories"
              :key="item.name"
              :md-label="item.name"
              @click="selectCategory(item)"
            ></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <div v-if="initialized">
          <app-search
            :categories="selected.subcats"
            @search="search"
          ></app-search>
          <div v-if="searching" class="spinner">
            <md-progress-spinner
              md-mode="indeterminate"
              :md-diameter="100"
            ></md-progress-spinner>
          </div>
          <app-results
            v-if="!searching && results && results.length"
            :results="results"
            :labels="labels"
            @download="download"
            class="results"
          ></app-results>
        </div>
        <md-empty-state
          v-if="empty"
          :class="{searching: searching}"
          :md-icon="empty.icon"
          :md-label="empty.label"
          :md-description="empty.description"
        ></md-empty-state>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import JackettService from '@/services/jackett'
import SearchComponent from '@/components/Search.vue';
import ResultsComponent from '@/components/Results.vue';

export default {
  data: () => ({
    initialized: false,
    error: false,
    categories: false,
    selected: false,
    searching: false,
    results: null,
    labels: null,
    nonce: null
  }),
  props: {
    jackett: {
      default: () => JackettService
    }
  },
  computed: {
    empty() {
      if (this.error) {
        return {
          icon: 'block',
          label: 'Not Available',
          description: 'System is not available at the moment. Please try again later.'
        }
      }
      if (!this.results) {
        return {
          icon: 'search',
          label: 'Start Searching',
          description: 'Write down what you want to search in the field above, and hit Enter.'
        }
      }
      if (!this.results.length) {
        return {
          icon: 'youtube_searched_for',
          label: 'Nothing Found',
          description: 'No results were found. Please try searching for something else...'
        }
      }
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    fetchCategories() {
      this.jackett.categories(this).then((ret) => {
        this.categories = ret.categories
        this.selected = this.categories[0]
        this.labels = ret.labels
        this.initialized = true
      }).catch(() => {
        this.error = true
      })
    },
    selectCategory(category) {
      this.selected = category
    },
    search(input, categories) {
      this.searching = true
      this.jackett.search(this, input, categories).then((ret) => {
        this.results = ret && ret.results || []
        this.results.forEach((result, index) => {
          result.id = index + 1
        })
        this.nonce = ret && ret.nonce
        this.searching = false
        this.error = false
      }).catch(() => {
        this.results = false
        this.searching = false
        this.error = true
      })
    },
    download(selected, label) {
      this.jackett.download(this, this.nonce, selected, label)
    }
  },
  components: {
    'app-search': SearchComponent,
    'app-results': ResultsComponent
  }
}
</script>

<style lang="scss" scoped>
  .page-container, .md-app {
    height: 100%;
  }
  .spinner {
    position: relative;
    .md-progress-spinner {
      position: absolute;
      top: 5rem;
      left: calc(50% - 50px);
    }
  }
  .md-empty-state.searching {
    visibility: hidden;
  }
  .md-layout-item {
    margin: 1rem;
  }
  .md-layout-item:first-child {
    margin-top: 0;
  }
  @media (max-width: 450px) {
    /deep/ .md-tabs-navigation {
      flex-wrap: wrap;
    }
    /deep/ .md-active .md-button-content {
      color: var(--md-theme-default-accent-on-background, #64dd17);
    }
  }
  .results {
    margin: 16px 0;
  }
</style>
