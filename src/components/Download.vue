<template>
  <md-dialog :md-active="show">
    <md-dialog-title>{{ name }}</md-dialog-title>
    <md-dialog-content>
      <md-field>
        <label>Details</label>
        <md-textarea v-model="description" placeholder="no details available" :md-autogrow="true" :disabled="true"></md-textarea>
      </md-field>
      <md-field>
        <label for="label">Label</label>
        <md-select v-model="label" id="label">
          <md-option v-for="label in labels" :key="label" :value="label">{{ label }}</md-option>
        </md-select>
      </md-field>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="$emit('close')">Close</md-button>
      <md-button class="md-primary" :disabled="!label" @click="$emit('download', label)">Download</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
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
      return this.selected.description && this.selected.description.replace(/<br>/g, '')
    }
  }
}
</script>
