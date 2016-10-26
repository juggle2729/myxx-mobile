<template lang="jade">
    .user-following.bg
        tabs(:tabs="views", :current.sync="view")
        component(:is="view", keep-alive)
</template>
<script>
import paging from 'paging'
import tabs from 'component/Tabs.vue'
import question from 'component/item/MyQuestion.vue'
import topic from 'component/item/MyTopic.vue'
import collection from 'component/item/MyCollection.vue'
import user from 'component/item/MyUser.vue'
export default {
    name: 'UserFollowing',

    mixins: [paging],

    components: {
        tabs,
        question,
        topic,
        collection,
        user
    },

    data() {
        return {
            view: 'question'
        }
    },
    computed: {
        views() {
            return {'question': '问题', 'topic': '话题', 'collection': '专辑', 'user': '用户'}
        }
    }
}
</script>
