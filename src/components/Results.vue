<template>
  <div>
    <md-table v-model="rows" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <div class="md-title">{{ results && results.length }} Results</div>
        </div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="{'disabled': item.seeders === 0}" @click="select(item)">
        <md-table-cell md-label="#" md-numeric>
          {{ item.id }}
        </md-table-cell>
        <md-table-cell md-label="Free">
          <md-icon v-if="item.free" class="md-accent">favorite</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Name">
          {{ item.name }}
        </md-table-cell>
        <md-table-cell md-label="P / S" class="single-line">
          {{ item.peers }} / {{ item.seeders }}
          <md-tooltip>{{ item.peers }} peers and {{ item.seeders }} seeders</md-tooltip>
        </md-table-cell>
        <md-table-cell md-label="Tracker">
          {{ item.tracker }}
          <md-tooltip v-if="item.category">{{ item.category.join(', ') }}</md-tooltip>
        </md-table-cell>
        <md-table-cell md-label="Size">{{ size(item.size) }}</md-table-cell>
        <md-table-cell md-label="Released" class="single-line-lg">{{ date(item.date) }}</md-table-cell>
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
import { size, date } from '@/services/utilities'
import Download from '@/components/Download.vue'

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
    size,
    date,
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
.disabled {
  opacity: .5;
}
.single-line /deep/ .md-table-cell-container {
  white-space: nowrap;
}
@media (min-width: 1200px) {
  .single-line-lg /deep/ .md-table-cell-container {
    white-space: nowrap;
  }
}
.description {
  white-space: pre-wrap;
}
</style>
