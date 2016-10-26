<style lang="stylus">
@import '~style/partials/var'
.user-story
    min-height: inherit
</style>
<template lang="pug">
.user-story.bg.pdt
    template(v-for="item in items")
        component(:is="config.category[item.type]", keep-alive, :item="item.entry")
        .hr
</template>
<script>
import paging from 'paging'
import story from 'component/item/Story.vue'
import post from 'component/item/Post.vue'
import question from 'component/item/Question.vue'
import answer from 'component/item/Answer.vue'
export default {
    name: 'user-story',
    
    mixins: [paging],

    components: {
        story,
        post,
        question,
        answer
    },

    computed: {
        paging() {
            return {
                path: `users/${this.$route.params.id}/sns`,
                params: {
                    limit: 10,
                    user_id: this.$route.params.id,
                    order_by: '-click_count'
                }
            }
        }
    }
}
</script>
