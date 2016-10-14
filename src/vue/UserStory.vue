<style lang="stylus">
@import '~style/partials/var'
.user-story
    min-height: inherit
    .topic-type
        height: 100px
        > div
            line-height: 56px
            border-radius: 28px
</style>
<template lang="pug">
.user-story.bg
    story-list(:path="'users/'+ $route.params.id + '/sns'", :params="{limit: 10, user_id: $route.params.id, doc_types: ['tp', 'rt']}")
</template>
<script>
import List from 'component/List.vue'
export default {
    name: 'user-story',

    components: {
        StoryList: new List('Story')
    }
}
</script>
