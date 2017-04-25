<style lang="stylus">
@import '~style/myxx'
#app
    > :first-of-type:not(.share-top)
        min-height: 100%
    .share-top-placeholder
        height: 112px
        & + div
            min-height: calc(100% - 112px)
    .share-top
        z-index: 990
        position: fixed
        top: 0
        height: 112px
        width: 100%
        padding: 0 24px
        box-shadow: 0 0 30px 0 rgba(0,0,0,.2);
        .logo
            line-height: 0
            img
                height: 72px
                width: 72px
        .dot
            margin: 0 10px
        .deep-link
            padding: 0
            margin-bottom: 0
            .btn
                height: 60px
                line-height: 60px
    #user
        z-index: 99
        position: fixed
        top: 0
        right: 0
        padding: 10px
        cursor: pointer
        img
            border-radius: 50%
            width: 60px
            height: 60px
            box-shadow: 0 0 10px 5px #4CAF50
</style>
<template  lang="pug">
div(:class="{'loading': loading}")
    template(v-if="env.isShare")
        .share-top.flex.bg-white
            .logo.mgr
                img(src="http://img.meiyuxiuxiu.com/static/logo.png", alt="美玉秀秀")
            .flex-1
                .flex
                    .name.fz-30.bold 美玉秀秀
                    .fz-22.dot •
                    .slogan.fz-22 50万玉友的选择
                .fz-22.gray.mgt-8 最大的和田玉线上交易App
            deep-link
        .share-top-placeholder
    router-view
    #user(v-if="env.isBrowser && env.isTest")
        img(v-if="self", @click="logout", :src="config.img + self.photo", :alt="self.nickname")
        .fz-34(v-else, @click="login") 👤
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
            env.isShare = !env.isApp && (_.hasIn(this, '$route.query.channel') || _.hasIn(this, '$route.query.user'))
            env.version = env.isApp ? ua.match(/^MYXX\/\w+\/([\d|\.]+)/).pop().replace(/\./g, (match, i) => i > 1 ? '' : '.') : 99
            return env
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
