<template>
  <md-dialog :md-active="show">
    <md-dialog-title>{{ name }}</md-dialog-title>
    <md-dialog-content>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Peers</label>
            <md-input v-model="selected.peers" :disabled="true"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Seeders</label>
            <md-input v-model="selected.seeders" :disabled="true"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Size</label>
            <md-input v-model="size" :disabled="true"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Details</label>
            <md-textarea v-model="description" placeholder="no details available" :md-autogrow="true" :disabled="true"></md-textarea>
          </md-field>
        </div>
      </div>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Tracker</label>
            <md-input v-model="selected.tracker" :disabled="true"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label>Released</label>
            <md-input v-model="date" :disabled="true"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100">
          <md-field>
            <label for="label">Label</label>
            <md-select v-model="label" id="label" required>
              <md-option v-for="label in labels" :key="label" :value="label">{{ label }}</md-option>
            </md-select>
          </md-field>
        </div>
      </div>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button @click="$emit('close')">Close</md-button>
      <md-button class="md-primary md-raised" :disabled="!enabled" @click="$emit('download', label)">Download</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { size, date } from '@/services/utilities'

export default {
  data: () => ({
    label: null
  }),
  props: {
    labels: Array,
    selected: Object,
    show: Boolean
  },
  computed: {
    name() {
      return this.selected.name
    },
    description() {
      return this.selected.description && this.selected.description.replace(/(<([^>]+)>)/ig, '')
    },
    size() {
      return size(this.selected.size)
    },
    date() {
      return date(this.selected.date)
    },
    enabled() {
      return !!this.label
    }
  }
}
</script>
