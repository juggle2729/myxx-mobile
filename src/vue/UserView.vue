<style lang="stylus">
@import '~style/partials/var'
.user-view
    padding-bottom: 98px
    .banner
        padding: 48px 40px 36px 36px
        -webkit-box-align: start
        .avatar[size='120']
            box-shadow: 0 0 0 1px rgba(136, 136, 136, 0.3)
        img
            display: block
            height: 28px
            width: 54px
        .center
            margin-right: 88px
    .medal
        img
            display: block
            height: 30px
            width: 30px
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
        height: 112px
        line-height: 60px
        width: 100%
        position: fixed
        bottom: 0
        z-index: 999
        > div
            -webkit-box-flex: 1
            text-align: center
        .follow-icon, .share-icon
            font-size: 30px
        .button
            border-radius: 6px
            line-height: 72px
</style>
<template lang="jade">
.user-view.bg(v-if="!$loadingRouteData")
    .banner.bg-white.flex
        avatar(:user="profile", :size="120")
        .mgl-32.flex-1
            .flex.bdb.pdb
                .fz-34.bold {{profile.nickname}}
                img.mgl-8(:src="'profile/'+profile.level+'.png' | qn")
            .flex.pdt
                .center
                    .fz-30.mgb-14 {{profile.fans_count}}
                    .fz-22 粉丝
                .center
                    .fz-30.mgb-14 {{profile.follow_count}}
                    .fz-22 关注
                .center
                    .fz-30.mgb-14 {{profile.post_count}}
                    .fz-22 发布
                .center
                    .fz-30.mgb-14 {{profile.post_like_count}}
                    .fz-22 获赞
     .medal.bg-white.pdh-40.pdb-48
            .flex(v-if="profile.vip_flag")
                img(:src="'profile/' + profile.role + '.png' | qn")
                .fz-26.gray.mgl-16 {{config.role[profile.role]}}认证{{'：'+profile.title}}
            .flex.pdt(v-if="profile.jianbao_level")
                img(:src="'jb/' + profile.jianbao_level + '.png' | qn")
                .fz-26.gray.mgl-16 {{profile.jianbao_level}}级鉴定师
            .flex.pdt(v-if="profile.star_author")
                img(:src="'medal/star_author.png' | qn")
                .fz-26.gray.mgl-16 精华内容贡献者
    tabs(:tabs="views", :current.sync="view")
    component(:is="view", keep-alive)
    .footer.flex.bdt.bg-white.fz-30(v-if='!isSelf')
        icon-follow(:target='profile.id', :follow='profile.is_followed', :has-border='false')
        icon-share.bdl
        .button.mgr.bg-red.white(v-if='profile.shop_id', v-link="{name: 'shop', params: {id: profile.shop_id}}")
            span 进入{{(profile.shop_type === 'studio') ? '工作室' : '店铺'}}
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
            view: '',
            profile: {}
        }
    },

    computed: {
        isSelf() {
            return _.get(this, 'self.id') == this.profile.id
        },

        views() {
            const tabs = {home: '主页', story: '动态', collection: '专辑'}
            return this.profile.has_homepage ? tabs : _.omit(tabs, 'home')
        }
    },

    route: {
        data({from, to, next}) {
            if(from.name !== to.name || from.params.id !== to.params.id) { // 初次进入个人主页
                return this.$fetch(`users/${to.params.id}/profile`)
                    .then(user => {
                        this.profile = user
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
