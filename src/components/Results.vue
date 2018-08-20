<template>
  <div>
    <md-table v-model="rows" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <div class="md-title">{{ results && results.length }} Results</div>
        </div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="select(item)">
        <md-table-cell md-label="#">
          {{ item.id }}
        </md-table-cell>
        <md-table-cell md-label="Name">
          {{ item.name }}
        </md-table-cell>
        <md-table-cell md-label="Tracker">
          {{ item.tracker }}
          <md-tooltip v-if="item.category" md-direction="bottom">{{ item.category.join(', ') }}</md-tooltip>
        </md-table-cell>
        <md-table-cell md-label="Size">{{ size(item.size) }}</md-table-cell>
        <md-table-cell md-label="Release">{{ date(item.date) }}</md-table-cell>
      </md-table-row>
    </md-table>
    <app-download
      :selected="selected"
      :labels="labels"
      :show="showDetails"
      @close="close"
      @download="download"
    ></app-download>
  </div>
</template>

<script>
import * as moment from 'moment'
import Download from '@/components/Download.vue'

const K = {name: 'K', value: 1024}
const M = {name: 'M', value: K.value * 1024}
const G = {name: 'G', value: M.value * 1024}
const units = [ K, M, G ]

export default {
  data: () => ({
    search: null,
    selected: {},
    showDetails: false
  }),
  props: {
    labels: Array,
    results: Array
  },
  computed: {
    rows() {
      return this.results || []
    }
  },
  methods: {
    size(size) {
      let ret = size
      for (let i = units.length - 1; i >= 0; i--) {
        if (size > units[i].value) {
          ret = (size / units[i].value).toFixed(1) + units[i].name
          break
        }
      }
      return ret
    },
    date(date) {
      return moment(new Date(date * 1000)).fromNow()
    },
    select(item) {
      this.selected = item
      this.showDetails = true
    },
    close() {
      this.showDetails = false
    },
    download(label) {
      this.$emit('download', this.selected.key, label)
      this.close()
    }
  },
  components: {
    'app-download': Download
  }
}
</script>

<style scoped>
.md-table-row {
  cursor: pointer;
}

.description {
  white-space: pre-wrap;
}
</style>
