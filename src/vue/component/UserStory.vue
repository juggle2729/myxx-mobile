<style lang="stylus">
@import '~style/partials/var'
.user-story
    min-height: inherit
    .sum
        height: 80px
</style>
<template lang="pug">
.user-story.bg
    .hr
    template(v-for="item in items")
        component(:is="config.category[item.type]", keep-alive, :item="item")
        .hr
</template>
<script>
import paging from 'paging'
import story from 'component/item/Story.vue'
import post from 'component/item/Post.vue'
import question from 'component/item/Question.vue'
import answer from 'component/item/Answer.vue'
import collection from 'component/item/Collection.vue'
import topic from 'component/item/Topic.vue'
export default {
    name: 'user-story',

    mixins: [paging],

    components: {
        story,
        post,
        question,
        answer,
        collection,
        topic
    },

    computed: {
        paging() {
            return {
                path: `users/${this.$route.params.id}/timeline`,
                params: {
                    limit: 10
                }
            }
        }
    },

    events: {
        scrollToBottom(e) {
            if(this.$route.query.tab == 'story') {
                this.fetch()
            }
        }
    }
}
</script>
