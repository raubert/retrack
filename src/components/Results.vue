<template>
  <div>
    <md-table v-model="rows" md-card md-sort="empty">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <div class="md-title">{{ results && results.length }} Results</div>
        </div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">
          {{ item.name }}
          <md-tooltip v-if="item.description" md-direction="bottom">{{ item.description }}</md-tooltip>
        </md-table-cell>
        <md-table-cell md-label="Tracker" md-sort-by="tracker">
          {{ item.tracker }}
          <md-tooltip v-if="item.category" md-direction="bottom">{{ item.category.join(', ') }}</md-tooltip>
        </md-table-cell>
        <md-table-cell md-label="Size" md-sort-by="size">{{ size(item.size) }}</md-table-cell>
        <md-table-cell md-label="Release" md-sort-by="date">{{ date(item.date) }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import * as moment from 'moment'

const K = {name: 'K', value: 1024}
const M = {name: 'M', value: K.value * 1024}
const G = {name: 'G', value: M.value * 1024}
const units = [ K, M, G ]

export default {
  data: () => ({
    search: null
  }),
  props: {
    results: Array
  },
  computed: {
    rows() {
      return this.results || []
    }
  },
  methods: {
    size: (size) => {
      let ret = size
      for (let i = units.length - 1; i >= 0; i--) {
        if (size > units[i].value) {
          ret = (size / units[i].value).toFixed(1) + units[i].name
          break
        }
      }
      return ret
    },
    date: (date) => {
      // Wed, 29 Mar 2017 22:09:11 -0400
      return moment(new Date(date * 1000)).fromNow()
    }
  }
}
</script>
