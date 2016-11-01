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
        background-color: #fff
        > div
            line-height: 40px
            &.active
                color: #cc3f4f
        &.default > div:first-child
            color: #cc3f4f
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
        .follow-icon
            font-size: 30px
        .button
            border-radius: 6px
            line-height: 72px
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
    tabs(:tabs="views", :current.sync="view")
    component(:is="view", keep-alive)
    .footer.flex.bdt.bg-white(v-if='!isSelf')
        icon-follow.fz-30(:target='user.id', :follow='user.is_followed', :has-border='false')
        icon-share.bdl
        .button.mgr-14.bg-red.white.fz-30(v-if='user.shop_id', v-link="{name: 'shop', params: {id: user.shop_id}}")
            span 进入{{(user.shop_type === 'studio') ? '工作室' : '店铺'}}
            icon.fz-22(name="enter")
</template>
<script>
import shareable from 'shareable'
import tabs from 'component/Tabs.vue'
import home from 'component/UserHome.vue'
import story from 'component/UserStory.vue'
import collection from 'component/UserCollection.vue'
export default {
    name: 'user-view',

    mixins: [shareable],

    components: {
        tabs,
        home,
        story,
        collection
    },

    data() {
        return {
            view: ''
        }
    },

    computed: {
        isSelf() {
            return _.get(this, 'self.id') == this.user.id
        },

        views() {
            const tabs = {home: '主页', story: '动态', collection: '专辑'}
            return this.user.has_homepage ? tabs : _.omit(tabs, 'home')
        }
    },

    route: {
        data({from, to, next}) {
            if(from.name !== to.name || from.params.id !== to.params.id) { // 初次进入个人主页
                return this.$fetch(`users/${to.params.id}/profile`)
                    .then(user => {
                        this.user = user
                        this.view = user.has_homepage ? 'home' : 'story'
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
