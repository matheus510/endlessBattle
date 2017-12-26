<template>
      <section class="row log" v-if="logs[0]">
        <div class="small-12 columns">
            <ul>
                <li :class="logCondition"
                    :v-for="log in logs">
                    {{ log.message }}
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style>

</style>
