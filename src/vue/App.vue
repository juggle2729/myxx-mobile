<style lang="stylus">
@import '~style/myxx'
#app
    > [class*='-view']
        min-height 100%
    .share-top-placeholder
        height 100px
        & + div
            min-height calc(100% - 100px)
    .share-top
        color white
        z-index 990
        position fixed
        top 0
        height 100px
        width 100%
        padding 0 22px 0 18px
        .logo
            width 186px
            height 60px
            transform translateY(-4px)
            img
                width 100%
                height 100%
        .deep-link
            padding 0
            margin-bottom 0
            .btn
                background #e61717
                font-size 26px
                width 140px
                height 46px
                line-height 46px
                border-radius 23px
    #user
        z-index 99
        position fixed
        top 0
        right 0
        padding 10px
        cursor pointer
        img
            border-radius 50%
            width 60px
            height 60px
            box-shadow 0 0 10px 5px #4CAF50
    .get-red-pocket
        display block
        height 194px
        width 136px
        position fixed
        z-index 999
        right 32px
        bottom 116px
        background transparent url("//o0x80w5li.qnssl.com/invitation/red-pocket.png") center / contain no-repeat
</style>
<template  lang="pug">
div(:class="{'loading': loading}")
    <!--template(v-if="env.isShare")-->
        <!--.share-top.flex(:class="showBlackBg ? 'bg-black' : 'bg-white bdb'")-->
            <!--.logo.mgr-26-->
                <!--img(:src="(showBlackBg ? 'share-logo-white.png' : 'share-logo.png') | qn", alt="美玉秀秀")-->
            <!--.flex-1-->
            <!--deep-link-->
        <!--.share-top-placeholder-->
    router-view
    <!--#user(v-if="env.isBrowser && env.isTest")-->
        <!--img(v-if="self && self.photo", @click="logout", :src="config.img + self.photo", :alt="self.nickname")-->
        <!--.fz-34(v-else, @click="login") 👤-->
    component(:is="popup.handler", :params.sync="popup", transition="pop")
</template>
<script>
import emitter from '../util/emitter'
import components from 'action'
export default {
    name: 'App',
    components,
    data() {
        return {
            loading: true,
            user: this.$store.get('user'),
            shareData: {},
            popup: {}
        }
    },
    computed: {
        env() {
            const ua = navigator.userAgent
            let env = {
                isApp: /myxx/i.test(ua),
                isMobile: /android|iphone|ipod|ipad/i.test(ua),
                isIOS: /iphone|ipod|ipad/i.test(ua),
                isAndroid: /android/i.test(ua),
                isWechat: /micromessenger/i.test(ua),
                isQQ: /qq\//i.test(ua),
                isWeibo: /weibo/i.test(ua),
                isDingTalk: /dingtalk/i.test(ua),
                isTest: !/meiyuxiuxiu\.com$/.test(location.hostname)
            }
            env.isBrowser = !(env.isApp || env.isWechat || env.isQQ || env.isWeibo || env.isDingTalk)
            env.isShare = !env.isApp && (_.hasIn(this, '$route.query.isappinstalled') || _.hasIn(this, '$route.query.channel') || _.hasIn(this, '$route.query.user'))
            env.version = env.isApp ? ua.match(/^MYXX\/\w+\/([\d|\.]+)/).pop().replace(/\./g, (match, i) => i > 1 ? '' : '.') : 99
            return env
        },

        showBlackBg() {
            return _.includes(['live'], this.$route.name)
        }
    },
    ready() {
        emitter.on('back', () => this.$broadcast('restore'))
        emitter.on('scroll', (e) => this.$broadcast('scroll', e))
        emitter.on('scroll-to-bottom', (e) => this.$broadcast('scrollToBottom', e))
    },
    methods: {
        logout() {
            this.$store.remove('user')
            location.href = location.href
        },
        login() {
            this.action('login')
                .then((user) => {
                    this.user = user
                })
        }
    }
}
</script>
