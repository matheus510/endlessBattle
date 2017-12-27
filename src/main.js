import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue({
  methods: {
    addLog(logObj) {
      this.$emit('logAdded', logObj)
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
