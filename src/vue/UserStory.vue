<style lang="stylus">
@import '~style/partials/var'
.user-story
    min-height: inherit
    .list
        padding: 10px 0 0 15px
    .topic-type
        height: 100px
        > div
            line-height: 56px
            border-radius: 28px
</style>
<template lang="pug">
.user-story
    .topic-type.flex.bg-white.pdh-40.scrollable
        .fz-26.gray.bd.center.pdh-18.mgh-20(v-for="type in types", @click="selected=type.code", :class="{'white bg-red': selected === type.code}") {{type.name}} {{type.count}}
    story-list(v-ref:list, path='dc/sns/search', :params="{limit: 100, owner_id: $route.params.id, doc_type: 'tp'}")
</template>
<script>
import List from 'component/List.vue'
export default {
    name: 'user-story',

    components: {
        StoryList: new List('Card')
    },

    data() {
        return {
            types: {},
            selected: '',
            items: []
        }
    },

    activate(done) {
        return this.$fetch('sns/topics/base', {user_id: this.$route.params.id})
            .then(resp => {
                this.types = [{name: '全部', count: resp.topic_count, code: ''}].concat(resp.topic_types)
            }).then(done)
    },

    ready() {
        this.$watch('selected', type => {
            if(!this.items.length) {
                this.items = _.clone(this.$refs.list.items)
            }
            this.$refs.list.items = this.items.filter(item => !type || item.entry.topic_type.code === type)
        })
    }
}
</script>
