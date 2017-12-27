<template>
      <section class="row log" v-if="logs[0]">
        <div class="small-12 columns">
            <ul>
                <li v-for="(log, i) in logs"
                    :class="{'monster-turn': (log.from === 'monster'), 'player-turn': (log.from === 'player')}">
                    {{ log.message }}
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { eventBus } from '../../main.js'

export default {
    data: () => {
        return {
            logs: []
        }
    },
    created() {
        eventBus.$on('newLog', (logObj) => {
            this.logs.push(logObj)
        })
    }
}
</script>

<style>

</style>
