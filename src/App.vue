<template>
  <div class="page-container">
   <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-dense md-primary" :class="{'md-large': !!categories}">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <span class="md-title">retrack</span>
          </div>

          <div class="md-toolbar-section-end" v-if="torrents.length > 0">
            <md-badge class="md-primary" :md-content="torrents.length">
              <md-button class="md-icon-button" @click="dlVisible = !dlVisible">
                <md-icon>cloud_download</md-icon>
              </md-button>
            </md-badge>
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

      <md-app-drawer class="md-right" :md-active.sync="dlVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <md-button class="md-icon-button md-dense" @click="dlVisible = false">
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
          <span class="md-title">Torrents</span>
        </md-toolbar>
        <md-list class="md-double-line">
          <md-list-item v-for="torrent in torrents" :key="torrent.id">
            <div class="md-list-item-text">
              <span>
                {{ torrent.name }}
                <md-tooltip>{{ torrent.name }}</md-tooltip>
              </span>
              <span>{{ size(torrent.size) }} - added {{ date(torrent.added) }}</span>
            </div>
          </md-list-item>
        </md-list>
      </md-app-drawer>

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
        <md-snackbar md-position="center" :md-active.sync="dlStatus.visible" md-persistent>
          <span v-if="dlStatus.success">Torrent added successfully!</span>
          <span v-else>An error occurred. {{ dlStatus.reason }}</span>
          <md-button class="md-accent" @click="dlStatus.visible = false">Close</md-button>
        </md-snackbar>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { size, date } from '@/services/utilities'
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
    nonce: null,
    dlVisible: false,
    torrents: [],
    dlStatus: {
      visible: false
    }
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
    this.fetchInfo()
    this.fetchCategories()
  },
  methods: {
    fetchInfo() {
      return this.jackett.info().then((ret) => {
        const torrents = []
        ret.results.forEach((torrent) => {
          if (ret.user === torrent.owner) {
            torrents.push(torrent)
          }
        })
        this.torrents = torrents
      })
    },
    fetchCategories() {
      return this.jackett.categories().then((ret) => {
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
      return this.jackett.search(input, categories).then((ret) => {
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
      return this.jackett.download(this.nonce, selected, label).then((res) => {
        this.dlStatus.success = res.status === 'success'
        this.dlStatus.reason = res.message
        this.dlStatus.visible = true
        return this.fetchInfo()
      })
    },
    size,
    date
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
  /deep/ .md-tabs.md-theme-default.md-primary .md-tabs-indicator {
    background-color: var(--md-theme-default-accent-on-background, #64dd17);
  }
  .results {
    margin: 16px 0;
  }
</style>
