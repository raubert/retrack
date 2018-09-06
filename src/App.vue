<template>
  <div class="page-container">
   <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-dense md-primary">
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
      </md-app-toolbar>

      <md-app-drawer class="torrents md-right" :md-active.sync="dlVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <md-button class="md-icon-button md-dense" @click="dlVisible = false">
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
          <span class="md-title">Torrents</span>
        </md-toolbar>
        <app-torrents :torrents="torrents"></app-torrents>
      </md-app-drawer>

      <md-app-content>
        <app-search
          v-if="initialized"
          :trackers="trackers"
          :categories="categories"
          @search="search"
        ></app-search>
        <div v-if="!initialized || searching" class="spinner">
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
        <md-empty-state
          v-if="initialized && empty"
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
import JackettService from '@/services/jackett'
import TorrentsComponent from '@/components/Torrents.vue'
import SearchComponent from '@/components/Search.vue'
import ResultsComponent from '@/components/Results.vue'

export default {
  data: () => ({
    initialized: false,
    error: false,
    trackers: false,
    categories: false,
    selected: false,
    searching: false,
    results: null,
    labels: null,
    nonce: null,
    dlVisible: false,
    dlFetch: null,
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
  watch: {
    dlVisible(newValue) {
      if (newValue) {
        this.fetchInfo()
        this.dlFetch = setInterval(() => {
          this.fetchInfo()
        }, 5000)
      } else {
        clearInterval(this.dlFetch)
      }
    }
  },
  created() {
    this.fetchInfo()
    this.fetchMetadata()
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
    fetchMetadata() {
      return this.jackett.categories().then((ret) => {
        this.trackers = ret.trackers
        this.categories = ret.categories
        this.selected = this.categories[0]
        this.labels = ret.labels
      }).catch(() => {
        this.error = true
      }).then(() => {
        this.initialized = true
      })
    },
    selectCategory(category) {
      this.selected = category
    },
    search(input, category, tracker) {
      this.searching = true
      return this.jackett.search(input, category, tracker).then((ret) => {
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
    }
  },
  components: {
    'app-torrents': TorrentsComponent,
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
.results {
  margin: 16px 0;
  > /deep/ .md-table {
    margin-right: 10px;
    margin-left: 10px;
  }
}
@media (max-width: 600px) {
  .torrents {
    max-width: 100%;
    width: 100%;
  }
}
</style>
