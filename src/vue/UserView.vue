<style lang="stylus">
@import '~style/partials/var'
.user-view
    padding-bottom: 98px
    .banner
        padding: 12px 0 50px
        background-image: url($qn + 'user/left.png'), url($qn + 'user/right.png'), url($qn + 'user/banner.png')
        background-position: left 12px top 12px, right 12px top 12px, center bottom
        background-size: 72px, 72px, cover
        background-repeat: no-repeat
        .avatar[size='120']
            margin: 48px auto 36px
            box-shadow: 0 0 0 4px rgba(136, 136, 136, 0.3)
    .tabs
        height: 100px
        > div
            line-height: 40px
            &.active
                color: #cc3f4f
        &.default > div:first-child
            color: #cc3f4f
    .tabs-fixed
        will-change: visibility
        position: fixed
        visibility: hidden
        width: 100%
        z-index: 999
    .footer
        height: 98px
        line-height: 60px
        width: 100%
        position: fixed
        bottom: 0
        z-index: 999
        > div
            -webkit-box-flex: 1
            text-align: center
            line-height: 60px
        .follow-component
            font-size: 30px
            color: #888888
            height: 60px
            padding-top: 0
        .button
            border-radius: 6px
            line-height: 72px
            margin-right: 14px
</style>
<template lang="jade">
.user-view.bg(v-if="!$loadingRouteData")
    .banner.bg.center
        avatar(:user='user', :size='120')
        p.fz-30 {{user.nickname}}
        .fz-26.gray.record.mgt
            span.bdr.pdh-30 关注 {{user.follow_count}}
            span.pdh-30 粉丝数 {{user.fans_count}}
        p.gray.fz-26.mgt(v-if='user.title') 美玉认证: {{user.title}}
    tabs(:tabs="{home: '主页', story: '帖子', evaluation: '鉴宝'}", :current.sync="view")
    component(:is="view", keep-alive)
    .footer.flex.bdt.bg-white(v-if='!isSelf')
        follow(:user='user.id', :follow='user.is_followed', :has-border='false')
        share.bdl
        .button.bg-red.white.fz-30(v-if='user.shop_id', v-link="{name: 'shop', params: {id: user.shop_id}}")
            | 进入{{(user.shop_type === 'studio') ? '工作室' : '店铺'}}
            .icon-enter
</template>
<script>
import tabs from 'component/Tabs.vue'
import shareable from 'shareable'
import home from 'UserHome.vue'
import story from 'UserStory.vue'
import evaluation from 'UserEvaluation.vue'
export default {
    name: 'user-view',

    mixins: [shareable],

    components: {
        tabs,
        home,
        story,
        evaluation
    },

    data() {
        return {
            view: 'home'
        }
    },

    computed: {
        isSelf() {
            return _.get(this, 'self.id') == this.user.id
        }
    },

    route: {
        data({from, to, next}) {
            if(from.name !== to.name || from.params.id !== to.params.id) { // 初次进入个人主页
                return this.$fetch(`users/${to.params.id}/profile`)
                    .then(user => {
                        this.user = user
                        this.action('updateTitle', {text: `${user.nickname}的个人主页`})
                        this.setShareData({id: user.id, name: user.nickname, photo: user.photo, title: user.title})
                    })
            } else {
                next()
            }
        }
    }
}
</script>
