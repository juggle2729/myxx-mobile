<style lang="stylus">
.deep-link
    display: block
    text-align: center
    font-size: 0
    &.has-icon
        .btn
            display: block
            // color: #888888 此处设置色值导致已点赞按钮为灰色，待处理
    &:not(.has-icon)
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
        background: white url('//o0x80w5li.qnssl.com/open-in-browser-android.png') no-repeat
        background-position: top right
        background-size: 80%
        transition: transform .5s ease
        transform: translate3d(0, -1999px, 0)
        &.show
            transform: translate3d(0, 0, 0)
</style>
<template lang="pug">
.deep-link(@click.stop="xxx")
    .btn(v-if="env.isBrowser", @click="myxx")
        slot 打开
    template(v-else)
        a.btn(v-if="env.isIOS", :href="href", target="_blank")
            slot 打开
        template(v-else)
            .btn(@click="backdrop=true")
                slot 打开
            .backdrop(@click="backdrop=false", :class="{show: backdrop}")
</template>
<script>
export default {
    name: 'deep-link',

    data() {
        return {
            href: '',
            backdrop: false,
            schema: {
                story: 'home/shaibao',
                post: 'home/long_topic',
                question: 'home/jianbao',
                answer: 'home/jianbao_result',
                collection: 'home/album',
                user: 'user/homepage',
                shop: 'user/shop',
                product: 'mall/product',
                auction: 'mall/auctions'
            }
        }
    },

    ready() {
        this.updateHref()
        setInterval(() => {
            this.updateHref()
        }, 2000)
    },

    methods: {
        updateHref() {
            this.href = this.checkPageUniversalLinkSupport() ? location.href.replace('www.meiyuxiuxiu', 'w3.meiyuxiuxiu')
                : this.config.download
        },

        checkPageUniversalLinkSupport() {
            return this.hasUniversalLinkSupport && Object.keys(this.schema).some(item => location.pathname.indexOf(item) !== -1)
        },

        getNativeLink(route) {
            let schema = _.get(this.schema, route.name)
            if(schema) {
                schema += ('/' + route.params.id)
            } else {
                schema = 'home/tab'
            }
            return 'myxx://' + schema
        },

        myxx() {
            const ifr = document.createElement('iframe')
            ifr.style.display = 'none'
            ifr.height = 0
            ifr.width = 0
            ifr.src = this.getNativeLink(this.$route)
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
        },

        xxx() {}
    }
}
</script>