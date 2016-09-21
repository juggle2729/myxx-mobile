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
            .icon-enter
                position: relative
                top: 3px
</style>
<template lang="jade">
.user-view.bg
    .tabs.tabs-fixed.flex.fz-30.bdb.bg-white(:class="{'default': isDefaultView}")
        .flex-1.center.bdr(v-if='user.has_homepage', :class="{'active': $route.params.tab === 'home'}", @click="go('home')") 主页
        .flex-1.center.bdr(:class="{'active': $route.params.tab === 'story'}", @click="go('story')") 帖子
        .flex-1.center(:class="{'active': $route.params.tab === 'evaluation'}", @click="go('evaluation')") 鉴宝
    .banner.bg.center
        avatar(:user='user', :size='120')
        p.fz-30 {{user.nickname}}
        .fz-26.gray.record.mgt
            span.bdr.pdh-30 关注 {{user.follow_count}}
            span.pdh-30 粉丝数 {{user.fans_count}}
        p.gray.fz-26.mgt(v-if='user.title') 美玉认证: {{user.title}}
    .tabs.tabs-static.flex.fz-30.bdb.bg-white(:class="{'default': isDefaultView}")
        .flex-1.center.bdr(v-if='user.has_homepage', :class="{'active': $route.params.tab === 'home'}", @click="go('home')") 主页
        .flex-1.center.bdr(:class="{'active': $route.params.tab === 'story'}", @click="go('story')") 帖子
        .flex-1.center(:class="{'active': $route.params.tab === 'evaluation'}", @click="go('evaluation')") 鉴宝
    .tab-content
        component(:is='view', keep-alive='', transition-mode='out-in', transition='fade')
    .footer.flex.bdt.bg-white(v-if='!isSelf')
        follow(:user='user.id', :follow='user.is_followed', :has-border='false')
        share.bdl
        .button.bg-red.white.fz-30(v-if='user.shop_id', v-link="{name: 'shop', params: {id: user.shop_id}}")
            | 进入{{(user.shop_type === 'studio') ? '工作室' : '店铺'}}
            span.icon-enter
</template>
<script>
import shareable from 'shareable'
import home from './UserHome.vue'
import story from './UserStory.vue'
import evaluation from './UserEvaluation.vue'
import follow from 'component/Follow.vue'
import share from 'component/Share.vue'
export default {
    name: 'UserView',
    mixins: [shareable],
    components: {
        home,
        story,
        evaluation,
        follow,
        share
    },
    data() {
        return {
            user: {
                id: 0
            },
            isDefaultView: false,
            view: undefined
        }
    },
    ready() {
        this.staticTabs = this.$el.querySelector('.tabs-static')
        this.fixedTabs = this.$el.querySelector('.tabs-fixed')
        const tabContent = this.$el.querySelector('.tab-content')
        // FIXME: 采用css解决方案
        // tab内容最小高度为 window高度 - tabs高度 - $el的底部padding
        tabContent.style.minHeight = `calc(${window.innerHeight-this.staticTabs.clientHeight}px - ${window.getComputedStyle(this.$el)['padding-bottom']})`
    },
    computed: {
        isSelf() {
            return _.get(this, 'self.id') == this.user.id
        }
    },
    route: {
        canReuse({from, to}) {
            return from.name === to.name && from.params.id === to.params.id
        },
        data({from, to, next}) {
            if(from.name !== to.name || from.params.id !== to.params.id) { // 初次进入个人主页
                this.$fetch(`users/${to.params.id}/profile`)
                    .then((user) => {
                        this.user = user
                        this.isDefaultView = ['home', 'story', 'evaluation'].indexOf(to.params.tab) === -1
                        this.view = this.isDefaultView ? (this.user.has_homepage ? 'home': 'story') : to.params.tab
                        this.action('updateTitle', {text: `${user.nickname}的个人主页`})
                        this.setShareData({id: user.id, name: user.nickname, photo: user.photo, title: user.title} , true)
                        next()
                    })
            } else { // 个人主页内部跳转
                this.isDefaultView = false
                this.view = to.params.tab
                next()
            }
        }
    },
    methods: {
        go(tab) {
            (this.$route.params.tab !== tab) && this.$router.replace(`/user/${this.user.id}/${tab}`)
        }
    },
    events: {
        scroll() {
            if(!this.env.isWechat) {
                this.fixedTabs.style.visibility = window.scrollY - this.staticTabs.offsetTop > 0 ? 'visible' : 'hidden'
            }
        }
    }
}
</script>
