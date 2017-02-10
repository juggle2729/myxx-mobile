<style lang="stylus">
@import '~style/partials/var'
.user-story
    min-height: inherit
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
import Story from 'component/item/Story.vue'
import Post from 'component/item/Post.vue'
import Question from 'component/item/Question.vue'
import Answer from 'component/item/Answer.vue'
import Collection from 'component/item/Collection.vue'
import Topic from 'component/item/Topic.vue'
export default {
    name: 'user-story',

    mixins: [paging],

    components: {
        Story,
        Post,
        Question,
        Answer,
        Collection,
        Topic
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
