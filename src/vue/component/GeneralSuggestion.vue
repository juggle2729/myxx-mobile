<style lang="stylus">
.general-suggestion
    .title
        line-height: 84px
        margin-left: 32px
    .list
        padding: 0 15px
        font-size: 0
        background-color: #efefef
</style>
<template lang="jade">
.general-suggestion.bg.pdb-36
    .title.fz-26.gray 相关推荐
    card(v-for="item in items", :item="item.entry")
    share-button.mgt-36(txt="没找到感兴趣的？下载美玉秀秀看看吧！")
</template>
<script>
import Card from 'component/item/Card.vue'
import ShareButton from 'component/ShareButton.vue'
export default {
    name: 'general-suggestion',

    components: {
        Card,
        ShareButton
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
