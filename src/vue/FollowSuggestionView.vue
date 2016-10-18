<style lang="stylus">
.follow-suggestion-view
    padding-top: 40px
    .tips
        margin: 0 auto 60px
        line-height: 100px
        > span
            border-radius: 50px
            padding: 30px 50px
</style>
<template lang="jade">
.follow-suggestion-view.bg
    .tips.fz-30.red.bg.center(v-if='!self', @click="action('login')")
        span.bd-red 登录查看更多关注人的内容
    list
</template>
<script>
import List from 'component/List.vue'
export default {
    name: 'follow-suggestion-view',

    components: {
        list: new List('FollowSuggestion', {path: 'users/suggest_follows'})
    }
}
</script>
