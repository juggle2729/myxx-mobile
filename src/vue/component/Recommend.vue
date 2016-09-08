<style lang="stylus">
.recommend-component
    .title
        line-height: 84px
        margin-left: 32px
    .list
        padding: 0 15px
        font-size: 0
</style>
<template lang="jade">
.recommend-component.bg(v-if="data.length > 0", :class="{'padding-top': !name}")
    .title.fz-26.gray {{name}}
    .list
        card(v-for="item in data", :entry="item.entry", :type="item.type")
        partial(name="load-more", v-if="data.hasMore")
</template>
<script>
import Card from 'component/Card.vue'
export default {
    name: 'Recommend',
    components: [
        Card
    ],
    props: {
        name: String,
        data: {
            type: Array,
            default: function() {
                return []
            }
        }
    }
}
</script>
