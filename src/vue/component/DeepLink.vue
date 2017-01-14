<style lang="stylus">
.deep-link
    display: block
    text-align: center
    font-size: 0
    padding: 20px 32px
    .btn
        display: block
        font-size: 30px
        height: 80px
        line-height: 80px
        padding: 0 28px
        border-radius: 8px
        color: white
        background-color: #CC3F4F
    .backdrop
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
        z-index: 999
        background: white url('//o0x80w5li.qnssl.com/open-in-browser-android.png') no-repeat center
        background-size: 80%
        transition: transform .5s ease
        transform: translate3d(0, -1999px, 0)
        &.show
            transform: translate3d(0, 0, 0)
</style>
<template lang="jade">
.deep-link(v-if="env.isBrowser")
    .btn(@click="myxx") {{label}}
template(v-else)
    a.deep-link(v-if="env.isIOS", :href="href", target="_blank")
        .btn {{label}}
    .deep-link(v-else)
        .btn(@click="backdrop=true") {{label}}
        .backdrop(@click="backdrop=false", :class="{show: backdrop}")
</template>
<script>
const getNativeLink = (() => {
    const SCHEMA = {
        story: 'home/shaibao',
        post: 'home/long_topic',
        question: 'home/jianbao',
        answer: 'home/jianbao_result',
        collection: 'home/album',
        activity: 'home/category',
        user: 'user/homepage',
        shop: 'user/shop'
    }
    return (route) => {
        let schema = _.get(SCHEMA, route.name)
        if(schema) {
            schema += ('/' + route.params.id)
        } else {
            schema = 'home/tab'
        }
        return 'myxx://' + schema
    }
})()
export default {
    name: 'deep-link',

    data() {
        return {
            backdrop: false
        }
    },

    props: {
        label: {
            type: String,
            default() {
                return '立即打开'
            }
        },

        path: {
            type: String,
            default() {
                return location.pathname
            }
        }
    },

    computed: {
        href() {
            const hasUniversalLinkSupport = this.env.isIOS && _.get(navigator.userAgent.match(/OS (\d+)/), 1) >= 9
            return hasUniversalLinkSupport ? this.path + '?ulfa=' + Date.now() : this.config.download
        }
    },

    methods: {
        myxx() {
            const ifr = document.createElement('iframe')
            ifr.style.display = 'none'
            ifr.height = 0
            ifr.width = 0
            ifr.src = getNativeLink(this.$route)
            document.body.appendChild(ifr)

            // 打开下载页面
            const start = Date.now()
            const timer = setTimeout(() => {
                if(Date.now() - start < 3000) {
                    window.location.replace(this.config.download)
                } else {
                    clearTimeout(timer)
                }
            }, 1500)
        }
    }
}
</script>