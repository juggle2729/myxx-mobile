<style lang="stylus">
.my-topic
    .item
        height: 188px
        position: relative
        > div
            position: absolute
            top: 50%
            transform: translateY(-50%)
</style>
<template  lang="pug">
.my-topic(:class="{'bg-white': !items.isEmpty}")
    .item.mgl-32(v-for="item in items", :class="{'bdb': $index < (items.length - 1)}", v-link="{name: 'topic', params: {id: item.entry.id}}")
        .pdv-28.pdr-32
            .fz-30.mgb {{item.entry.name}}
            .fz-26.gray.line-clamp-2 {{{item.entry.desc | input}}}
    empty(v-if="items.isEmpty")
</template>
<script>
import paging from 'paging'
export default {
    name: 'my-topic',

    mixins: [paging],

    computed: {
        paging() {
            return {
                path: `users/${this.$route.params.id}/follow_list`,
                list: 'entries',
                params: {
                    target_type: 'ct'
                }
            }
        }
    }
}
</script>