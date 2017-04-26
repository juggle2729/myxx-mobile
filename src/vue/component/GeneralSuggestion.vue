<style lang="stylus">
.general-suggestion
    .list
        padding: 0 15px
        font-size: 0
        background-color: #efefef
</style>
<template  lang="pug">
.general-suggestion.bg-white
    .fz-26.gray.mgl-32.line-height-80 相关推荐
    tags(v-if='categories && categories.length', :tags="categories")
    card(v-for="item in items", :item="item")
    deep-link 没找到感兴趣的？打开美玉秀秀看看吧！
</template>
<script>
import Card from 'component/item/Card.vue'
import Tags from 'component/Tags.vue'
export default {
    name: 'general-suggestion',

    components: {
        Tags,
        Card
    },

    props: {
        categories: Array
    },

    data() {
        return {
            items: []
        }
    },

    computed: {
        params() {
            return {
                limit: 20,
                obj_id: this.$route.params.id,
                biz_type: _.chain(this.config.types).find({route: this.$route.name}).get('id').value()
            }
        }
    },

    created() {
        this.$fetch('dc/rd/list', this.params)
            .then(resp => {
                this.items = resp.entries
            })
    }
}
</script>
