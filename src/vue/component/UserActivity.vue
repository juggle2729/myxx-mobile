<style lang="stylus">
@import '~style/partials/var'
.user-activity
    min-height: inherit
</style>
<template lang="pug">
.user-activity.bg
    .hr
    template(v-for="item in items")
        component(:is="config.category[item.type]", keep-alive, :item="item",class="bdb bdt")
        .hr
</template>
<script>
import paging from 'paging'
import Topic from 'component/item/Topic.vue'
import Post from 'component/item/Post.vue'
import Question from 'component/item/Question.vue'
import Answer from 'component/item/Answer.vue'
import Collection from 'component/item/Collection.vue'
import Tag from 'component/item/Tag.vue'
import Live from 'component/item/Live.vue'
export default {
    name: 'user-activity',

    mixins: [paging],

    components: {
        Topic,
        Post,
        Question,
        Answer,
        Collection,
        Tag,
        Live
    },

    props:['userId'],

    data() {
        return  {
            paging: {
                path: this.userId ? `users/${this.userId}/timeline` :`users/${this.$route.params.id}/timeline`,
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
