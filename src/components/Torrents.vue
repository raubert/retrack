<template>
  <md-list class="md-double-line">
    <md-list-item v-for="torrent in torrents" :key="torrent.id">
      <div class="md-list-item-text">
        <div>
          {{ torrent.name }}
          <md-tooltip>{{ torrent.name }}</md-tooltip>
        </div>
        <div>
          {{ size(torrent.size) }} - added {{ date(torrent.added) }}
          <span v-if="torrent.done === torrent.size">
            <md-icon class="md-accent">check</md-icon>
            <md-tooltip>completed</md-tooltip>
          </span>
          <span v-else>
            <md-progress-bar md-mode="determinate" :md-value="100 * torrent.done / torrent.size"></md-progress-bar>
            &nbsp;ETA {{ torrent.eta > 0 ? duration(torrent.eta) : '∞' }}
            <md-tooltip>{{ (100 * torrent.done / torrent.size).toFixed(0) }}% - {{ torrent.seeds }} seeds</md-tooltip>
          </span>
        </div>
      </div>
    </md-list-item>
  </md-list>
</template>

<script>
import { size, date, duration } from '@/services/utilities'

export default {
  props: {
    torrents: Array
  },
  methods: {
    size,
    date,
    duration
  }
}
</script>

<style scoped>
.md-icon {
  line-height: 1;
  width: auto;
}
.md-progress-bar {
  display: inline-block;
  height: .5rem;
  width: 50px;
}
</style>
