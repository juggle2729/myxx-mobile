<template lang="jade">
    .user-following.bg(v-if="!$loadingRouteData")
        tabs.bg-white(:tabs="views", :current.sync="view")
        component(:is="view", keep-alive)
</template>
<script>
import tabs from 'component/Tabs.vue'
import question from 'component/item/MyQuestion.vue'
import topic from 'component/item/MyTopic.vue'
import collection from 'component/item/MyCollection.vue'
import user from 'component/item/MyUser.vue'
export default {
    name: 'UserFollowing',

    components: {
        tabs,
        question,
        topic,
        collection,
        user
    },

    data() {
        return {
            view: 'user'
        }
    },
    computed: {
        views() {
            return {'user': '用户', 'collection': '专辑', 'topic': '话题', 'question': '问题'}
        }
    }
}
</script>
