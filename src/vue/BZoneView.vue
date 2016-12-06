<style lang="stylus">
@import '~style/partials/var'
.b-zone
    padding-top: 100px
    .placeholder-notice
        height: 90px
    > header
        z-index: 99
        position: fixed
        top: 0
        display: block
        width: 100%
        .notice
            height: 90px
            line-height: 90px
            padding: 0 30px
            background-color: #fcf1e0
            .txt
                color: #eaa123
            .close
                height: 90px
                width: 60px
                background-image: url($qn + "bzone/close-yellow.png")
                background-position: right center
                background-size: 28px 28px
        .tabs
            height: 100px
            .tab
                z-index: 999
                text-align: center
                line-height: 50px
</style>
<template lang="jade">
.b-zone
    header.bg-white
        .notice.flex(v-if="firstVisit")
            .txt.fz-26.flex-1 商户专区仅对入驻商户/工作室开放，普通用户不可见
            .close(@click="closeNotice")
        .tabs.flex.fz-30.bdb
            .tab.flex-1(v-for="(k, v) in tabs", @click="tab=k", :class="{'bdl': $index, 'red': tab===k}") {{v}}
    component(:is="tab", keep-alive)
</template>
<script>
import purchases from './BPurchases.vue'
import products from './BProducts.vue'
export default {
    name: 'BZone',

    components: {
        purchases,
        products
    },

    data() {
        return {
            firstVisit: false,
            tab: 'products',
            tabs: {products: '清仓', purchases: '调货'}
        }
    },

    ready() {
        this.$watch('tab', tab => {
            const query = _.merge({}, this.$route.query, {tab})
            this.$router.replace(_.merge({query}, _.pick(this.$route, 'name', 'params')))
        })

        this.action('cache', {k: 'bzone-visited'})
            .then(v => {
                if(!v) {
                    this.firstVisit = true
                }
            })

        this.setHelp()
        this.$on('restore', this.setHelp)
    },

    route: {
        data({to, next}) {
            if(this.tabs[to.query.tab]) {
                this.tab = to.query.tab
            }
            next()
        }
    },

    methods: {
        closeNotice() {
            this.firstVisit = false
            this.action('cache', {k: 'bzone-visited', v: 1})
        },

        setHelp() {
            this.action('action', {icon: 'question-2x.png?'})
                .then(() => {
                    this.$router.go({name: 'bzone-help'})
                })
        }
    }
}
</script>