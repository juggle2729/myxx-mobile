<style lang="stylus">
@import '~style/partials/var'
.user-story
    min-height: inherit
    .list
        padding: 10px 0 0 15px
    .topic-type
        height: 100px
        padding: 0 40px
        overflow-x: auto
        overflow-y: hidden
        white-space: nowrap
        -webkit-overflow-scrolling: touch
        > div
            line-height: 56px
            padding: 0 18px
            border-radius: 28px
            margin: 0 20px
            &.active
                color: white
                background-color: #cc3f4f
</style>
<template lang="jade">
.user-story(:class="{'bg-white': items.isEmpty}")
    .topic-type.flex.bg-white(v-if='items && items.length > 0')
        .fz-26.gray.bd.center(@click='classify()', :class="{'active': !selected}") 全部 {{types.topic_count}}
        .fz-26.gray.bd.center(v-for='tab in types.topic_types', @click='classify(tab.code)', :class="{'active': selected === tab.code}") {{tab.name}} {{tab.count}}
    .list
        card(v-for='item in items', :entry='item.entry', :type='item.type')
    empty(v-if='items.isEmpty', title='暂无帖子')
</template>
<script>
import paging from 'paging'
import Card from 'component/item/Card.vue'
export default {
    name: 'UserStory',
    mixins: [paging],
    components: [Card],
    data() {
        return {
            types: {},
            selected: ''
        }
    },
    activate(done) {
        return this.$fetch('sns/topics/base', {
            user_id: this.$route.params.id
        }).then((data) => {
            this.types = data
        }).then(done)
    },
    computed: {
        paging() {
            return {
                path: 'dc/sns/search',
                list: 'entries',
                params: {
                    owner_id: this.$route.params.id,
                    doc_type: 'tp',
                    topic_type: this.selected
                }
            }
        }
    },
    methods: {
        classify(type) {
            this.selected = type
            this.$fetch('dc/sns/search', {
                owner_id: this.$route.params.id,
                doc_type: 'tp',
                topic_type: type,
                limit: 10
            }).then((data) => {
                this.items = data.entries
            })
        }
    }
}
</script>
