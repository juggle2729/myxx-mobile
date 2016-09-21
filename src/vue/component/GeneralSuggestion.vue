<style lang="stylus">
.general-suggestion
    .title
        line-height: 84px
        margin-left: 32px
    .list
        padding: 0 15px
        font-size: 0
</style>
<template lang="jade">
.general-suggestion.bg
    .title.fz-26.gray 相关推荐
    cards(path="dc/rd/list", :params="params")
</template>
<script>
import List from 'component/List.vue'
export default {
    name: 'general-suggestion',

    components: {
        cards: new List('Card')
    },

    computed: {
        params() {
            return {
                obj_id: this.$route.params.id,
                biz_type: {jade: 'pd', story: 'tp', evaluation: 'jb', post: 'rt'}[this.$route.name]
            }
        }
    }
}
</script>
