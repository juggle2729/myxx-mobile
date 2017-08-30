<style lang="stylus">
.user-following
    min-height 100%
    padding-top 100px
    .empty-component
        height calc(100% - 100px)
</style>
<template  lang="pug">
.user-following.bg(v-if="!$loadingRouteData")
    tabs.bg-white(:tabs="views", :current.sync="view")
    component(:is="view", keep-alive)
</template>
<script>
import Tabs from 'component/Tabs.vue'
import Question from 'component/item/MyQuestion.vue'
import Topic from 'component/item/MyTopic.vue'
import Shop from 'component/item/MyShop.vue'
import User from 'component/item/MyUser.vue'
export default {
    name: 'UserFollowing',

    components: {
        Tabs,
        Question,
        Topic,
        Shop,
        User
    },

    data() {
        return {
            view: 'user'
        }
    },
    computed: {
        views() {
            return {'user': '用户', 'shop': '店铺', 'topic': '话题', 'question': '问题'}
        }
    }
}
</script>
