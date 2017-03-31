<style lang="stylus">
@import '~style/partials/var'
.jade-view
    position: relative
    height: 100%
    .jade-video
        height: 577px
        background-size: contain
        background-color: #000000
        &.play::after
            background-size: 144px 144px
    .titles
        .header
            min-height: 164px
            padding: 28px 32px
            .price
                font-weight: bold
                &:first-letter
                    font-size: 32px
                    font-weight: normal
        .title
            margin-bottom: 18px
            line-height: 1.5
        .button
            padding: 0 20px 0 20px
            height: 72px
            border-width: 0
            border-radius: 10px
            text-align: center
            line-height: 56px
        .guarantee
            line-height: 0
            position: relative
            img
                // height: 97px
                width: 100%
            .icon-enter
                height: 24px
                width: 12px
                position: absolute
                right: 32px
                top: 36px
    .master
        height: 72px
        line-height: 72px
        .name
            height: 72px
            line-height: 72px
        img
            display: block
            height: 26px
            width: 26px
    .shop
        height: 144px
        padding: 0 32px
        .img
            height: 100px
            width: 100px
            border-radius: 6px
            margin-right: 20px
        .name
            width: 380px
            .line-clamp
                line-height: 1.2
        .address
            max-width: 200px
        .icon-shop
            height: 44px
            width: 48px
            margin-top: -46px
            & + div
                margin-top: -24px
        .new
            border-radius: 40px
            height: 32px
            line-height: 32px
    .tabs
        width: 100%
        height: 90px
        top: 0
        > div
            width: 33.3%
            line-height: 54px
            &.active
                line-height: 54px // FIXME: 临时方案
                color: #cc3f4f
        &.default
            > div:first-child
                color: #cc3f4f
    .float-box
        position: fixed
        bottom: 0
        height: 98px
        width: 100%
        & > div
            height: 100%
        & > div:first-child
            width: 450px
        .contact-btn,.collect-btn,.shop-btn
            font-size: 22px
            -webkit-box-orient: vertical
            -webkit-box-pack: center
            width: 50%
            height: 100%
            .btn
                font-size: 22px
            [class^='icon-'], [class*=' icon-']
                margin-bottom: 4px
                padding: 0
                height: 1.6em
                width: @height
        .contact-btn .btn
            color: #CC3F4F
        .buy-btn, .buy-btn .btn
            width: 300px
            color: white
            text-align: center
            height: 98px
            line-height: 98px
            padding: 0
    .tabs-fixed
        will-change: visibility
        position: fixed
        visibility: hidden
        width: 100%
        z-index: 999
    .placeholder
        height: 110px
    .offline
        position: absolute
        width: 100%
        top: 45%
        left: 50%
        transform: translate(-50%, -50%)
        img
            display: block
            margin: 0 auto
            height: 244px
            width: 386px
</style>
<template lang="jade">
.jade-view
    template(v-if="jade.status === 'online'")
        .tabs.tabs-fixed.bdb.flex.fz-26.bg-white.center(:class="{'default': isDefaultView}")
            .bdr(@click="go('detail')", :class="{'active': $route.params.tab === 'detail'}") 详情
            .bdr(@click="go('attribute')", :class="{'active': $route.params.tab === 'attribute'}") 属性
            div(@click="go('problem')", :class="{'active': $route.params.tab === 'problem'}") 常见问题
        .jade-video.video(v-bg='jade.video', @click='play(jade.video)', query='vframe/jpg/offset/7/rotate/auto|imageView2/2/w/750')
        .titles.bg-white
            .header
                .title.fz-32 {{jade.title}}
                .flex.red
                    .fz-30(v-if="jade.sell_status === 'sold'") {{jade.sell_status_editable ? '实体店已售出' : '已售出'}}
                    .price.fz-44.flex-1(v-else) {{jade.price | price}}
            .guarantee(@click="guarantee")
                img(:src="'jade/term.png' | qn")
                icon.fz-26.red(name="enter")
        .hr
        .shop.bg-white.flex.detail(v-link="{name: 'shop', params: {id: jade.shop.id}}")
            .img(v-bg='jade.shop.logo')
            .flex-1
                .fz-30.flex.mgb-12.name
                    .line-clamp.mgr {{jade.shop.shop_name}}
                    lv(:lv='jade.shop.level')
                .fz-26.gray.flex
                    icon(name="location")
                    div(:class="{'address': jade.shop.pd_count_today, 'line-clamp-1': jade.shop.pd_count_today}") {{jade.shop.locale_name}}
                    .new.bg-red.white.fz-22.mgl-16.pdh-16(v-if="jade.shop.pd_count_today") 今日上新 {{jade.shop.pd_count_today}}
            .center
                icon(name="shop")
                .fz-22.gray 进店逛逛
        .master.flex.bg-white.bdt.pdl-32(v-link="{name: 'user', params: {id: jade.owner.id}}")
            avatar(:user='jade.owner', :size='50')
            .flex
                .name.fz-26.gray.mgl {{jade.owner.name}}
                img.mgl-8(v-if="jade.owner.vip_flag", :src="'profile/'+jade.owner.role+'.png' | qn")
        .hr
        .tabs.tabs-static.bdb.flex.fz-26.bg-white.center(:class="{'default': isDefaultView}")
            .bdr(@click="go('detail')", :class="{'active': $route.params.tab === 'detail'}") 详情
            .bdr(@click="go('attribute')", :class="{'active': $route.params.tab === 'attribute'}") 属性
            div(@click="go('problem')", :class="{'active': $route.params.tab === 'problem'}") 常见问题
        .bg.tab-content
            component(:is='view', keep-alive, :jade='jade')
        .bg.placeholder
        .float-box.flex.fixed.fz-30.bg-white(v-if="env.isShare")
            .bdt.flex-1.flex
                deep-link.has-icon.flex.flex-1.red.contact-btn.bdr
                    icon.fz-30(name="chat")
                    .mgt-6 私信
                deep-link.has-icon.flex.flex-1.gray.collect-btn.bdr
                    icon.fz-30(:name="jade.is_faved ? 'star-solid' : 'star'")
                    .mgt-6 {{jade.is_faved ? '已收藏' : '收藏'}}
                .flex.flex-1.gray.shop-btn(v-link="{name: 'shop', params:{id: jade.shop.id}}")
                    icon.fz-30(name="shop")
                    .mgt-6 店铺
            deep-link.has-icon.flex-2.buy-btn.bg-red.white.fz-30 {{(jade.sell_status==='selling') ? '立即购买' : '已售出'}}
        .float-box.flex.fixed.fz-30.bg-white(v-else)
            .bdt.flex-1.flex
                .flex.flex-1.red.contact-btn.bdr(@click='contact')
                    icon.fz-30(name="chat")
                    .mgt-6 私信
                .flex.flex-1.gray.collect-btn.bdr(:class="{'red': jade.is_faved}", @click='collect()')
                    icon.fz-30(:name="jade.is_faved ? 'star-solid' : 'star'")
                    .mgt-6 {{jade.is_faved ? '已收藏' : '收藏'}}
                .flex.flex-1.gray.shop-btn(v-link="{name: 'shop', params:{id: jade.shop.id}}")
                    icon.fz-30(name="shop")
                    .mgt-6 店铺
            .fz-30.flex-2.buy-btn.bg-red.white(v-if="jade.sell_status==='selling'", @click='buy()') 立即购买
            .fz-30.flex-2.buy-btn.bg-gray.white(v-else) 已售出
    .offline(v-else)
        img(:src="'mall/offline.png' | qn")
        .mgt-28.gray.fz-26.center 该商品已下架
</template>
<script>
import Q from 'q'
import shareable from 'shareable'
import lv from 'component/Lv.vue'
import detail from './JadeDetail.vue'
import attribute from './JadeAttribute.vue'
import problem from './JadeProblem.vue'
export default {
    name: 'JadeView',
    mixins: [shareable],
    components: {
        lv,
        detail,
        attribute,
        problem
    },
    data() {
        return {
            jade: {
                owner: {},
                shop: {},
                is_faved: false,
                status: ''
            },
            isSelf: false,
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
        tabContent && (tabContent.style.minHeight = `calc(${window.innerHeight-this.staticTabs.clientHeight}px - ${window.getComputedStyle(this.$el)['padding-bottom']})`)
    },
    route: {
        canReuse({from, to}) {
            return from.name === to.name && from.params.id === to.params.id
        },
        data({from, to, next}) {
            if(from.name !== to.name || from.params.id !== to.params.id) { // 初次进入商品详情页
                return this.$fetch('mall/products/'+ this.$route.params.id)
                    .then(jade => {
                        _.update(jade, 'circle_size', size => size ? size/100 : '')
                        this.setShareData(jade)
                        this.isSelf = (_.get(this, 'self.id') == (jade.owner.id || jade.default_admin.id))
                        this.isDefaultView = ['detail', 'attribute', 'problem'].indexOf(to.params.tab) === -1
                        this.view = this.isDefaultView ? 'detail' : to.params.tab
                        this.jade = jade
                })
            } else {
                this.isDefaultView = false
                this.view = to.params.tab
                next()
            }
        }
    },
    methods: {
        buy() {
            if(this.isSelf) {
                this.action('toast', {success: 0, text: '您不能购买自己的商品'})
            } else {
                this.action('orderConfirm', {product: this.jade.id})
            }
         },
        contact() {
            if(this.isSelf) {
                this.action('toast', {success: 0, text: '您不能和自己聊天'})
            } else {
                this.action('chat', {id: this.jade.default_admin.id, name: this.jade.default_admin.nickname, product: this.jade.id})
            }
        },
        go(tab) { // FIXME 采用v-link替代
            (this.$route.params.tab !== tab) && this.$router.replace(`/jade/${this.jade.id}/${tab}`)
        },
        collect(tab) {
            // TODO api
            const api = 'users/favs'
            const data = {
                doc_type: 'pd',
                doc_id: this.jade.id
            }
            this[this.jade.is_faved ? '$put' : '$post'](api, data)
            .then(() => {
                this.jade.is_faved = !this.jade.is_faved
                this.action('toast', {
                    success: 1,
                    text: this.jade.is_faved ? '恭喜，宝贝收藏成功!' : '取消宝贝收藏成功!'
                })
            })
        },

        guarantee() {
            this.$root.popup = {handler: 'guarantee'}
        }
    },
    events: {
        scroll() {
            if(!this.fixedTabs) {
                this.staticTabs = this.$el.querySelector('.tabs-static')
                this.fixedTabs = this.$el.querySelector('.tabs-fixed')
            } else {
                if(!this.env.isWechat) {
                    this.fixedTabs.style.visibility = window.scrollY - this.staticTabs.offsetTop > 0 ? 'visible' : 'hidden'
                }
            }
        }
    }
}
</script>
