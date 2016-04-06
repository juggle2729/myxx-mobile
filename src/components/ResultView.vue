<template>
    <div class="result-view">
        result view
    </div>
</template>
<script>
export default {
    name: 'ResultView',
    data() {
        return {
            version: '1.0'
        }
    },
    created() {
        this.action('version', '').then((data) => {
            this.version = data;
        });
    }
}
</script>
<style lang="sass">
.result-view {

}
</style>
