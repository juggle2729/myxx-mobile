<style lang="stylus">
@import '~style/partials/var'
.jade-view
    .notice
        position: fixed
        z-index: 9
        top: 0
        left: 0
        width: 100%
        height: 90px
        line-height: 90px
        padding: 0 30px
        background-color: #fcf1e0
        .txt
            color: #eaa123
        .close
            height: 90px
            width: 60px
            background-image: url($qn + 'bzone/close-yellow.png')
            background-position: right center
            background-size: 28px 28px
    .notice-placeholder
        height: 90px
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
            .fz-44
                fz-weight: bold
                &:first-letter
                    font-size: 32px
                    fz-weight: normal
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
            img
                height: 72px
                width: 100%
    .master
        height: 72px
        line-height: 72px
        margin-left: 32px
        .name
            height: 72px
            line-height: 75px
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
            img
                width: 42px
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
        .buy-btn
            width: 300px
        .contact-btn,.collect-btn,.comment-btn
            -webkit-box-orient: vertical
            -webkit-box-pack: center
            width: 50%
            height: 100%
            [class^='icon-'], [class*=' icon-']
                margin-bottom: 4px
                padding: 0
        .buy-btn
            text-align: center
            height: 98px
            line-height: 98px
    .tabs-fixed
        will-change: visibility
        position: fixed
        visibility: hidden
        width: 100%
        z-index: 999
    .placeholder
        height: 148px
</style>
<template lang="jade">
.jade-view
    .notice-placeholder(v-if="firstVisit")
    .notice.flex(v-if="firstVisit")
        .txt.fz-26.flex-1 清仓只有商家能看到，了解更多请前往商户专区
        .close(@click="closeNotice")
    .tabs.tabs-fixed.bdb.flex.fz-26.bg-white.center(:class="{'default': isDefaultView}")
        .bdr(@click="go('detail')", :class="{'active': $route.params.tab === 'detail'}") 详情
        .bdr(@click="go('attribute')", :class="{'active': $route.params.tab === 'attribute'}") 属性
        div(@click="go('problem')", :class="{'active': $route.params.tab === 'problem'}") 常见问题
    .jade-video.video(v-bg='jade.video', @click='play(jade.video)', query='vframe/jpg/offset/0/rotate/auto|imageView2/2/w/750')
    .titles.bg-white
        .header
            .title.fz-32 {{jade.title}}
            .flex
                p.red.fz-44.flex-1 {{jade.price | price}}
        .guarantee.bdt
            img(:src="'jade/guarantee.png' | qn")
    .hr
    .shop.bg-white.flex.detail(v-link="{name: 'shop', params: {id: jade.shop.id}}")
        .img(v-bg='jade.shop.logo')
        .flex-1
            .fz-30.flex.margin-bottom.name
                .line-clamp.mgr {{jade.shop.shop_name}}
                lv(:lv='jade.shop.level')
            .fz-26.gray
                icon(name="location")
                span {{jade.shop.locale_name}}
        icon.fz-30.gray(name="enter")
    .master.flex.bg-white.bdt(v-link="{name: 'user', params: {id: jade.owner.id}}")
        avatar(:user='jade.owner', :size='50')
        .name.fz-26.gray.mgl {{jade.owner.name}}
    .hr
    .tabs.tabs-static.bdb.flex.fz-26.bg-white.center(:class="{'default': isDefaultView}")
        .bdr(@click="go('detail')", :class="{'active': $route.params.tab === 'detail'}") 详情
        .bdr(@click="go('attribute')", :class="{'active': $route.params.tab === 'attribute'}") 属性
        div(@click="go('problem')", :class="{'active': $route.params.tab === 'problem'}") 常见问题
    .bg.tab-content
        component(:is='view', keep-alive, :jade='jade')
    .bg.placeholder
    .float-box.flex.fixed.fz-30.bg-white
        .bdt.flex-1.flex
            .fz-22.flex.flex-1.gray.contact-btn.bdr(@click='contact')
                icon.fz-30(name="chat")
                div 私信
            .fz-22.flex.flex-1.gray.collect-btn.bdr(:class="{'red': jade.is_faved}", @click='collect()')
                icon.fz-30(name="star")
                div {{jade.is_faved ? '已收藏' : '收藏'}}
            .fz-22.flex.flex-1.gray.comment-btn(@click='gotoComments')
                icon.fz-24(name="comment")
                div 评论  {{jade.comment_count}}
        .fz-30.flex-2.buy-btn.bg-red.white(v-if="jade.sell_status==='selling'", @click='buy()') 立即购买
        .fz-30.flex-2.buy-btn.bg-gray.white(v-else) 已售出
</template>
<script>
import Q from 'q'
import shareable from 'shareable'
import lv from 'component/Lv.vue'
import comment from './JadeComment.vue'
import detail from './JadeDetail.vue'
import attribute from './JadeAttribute.vue'
import problem from './JadeProblem.vue'
export default {
    name: 'JadeView',
    mixins: [shareable],
    components: {
        lv,
        comment,
        detail,
        attribute,
        problem
    },
    data() {
        return {
            firstVisit: false,
            jade: {
                owner: {},
                shop: {},
                is_faved: false
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
        tabContent.style.minHeight = `calc(${window.innerHeight-this.staticTabs.clientHeight}px - ${window.getComputedStyle(this.$el)['padding-bottom']})`

        this.action('cache', {k: 'jade-visited'})
            .then(v => {
                if(!v && _.get(this, 'jade.is_tob')) {
                    this.firstVisit = true
                }
            })
    },
    route: {
        canReuse({from, to}) {
            return from.name === to.name && from.params.id === to.params.id
        },
        data({from, to, next}) {
            if(from.name !== to.name || from.params.id !== to.params.id) { // 初次进入商品详情页
                return this.$fetch('mall/products/'+ this.$route.params.id)
                    .then(jade => {
                        this.setShareData(jade)
                        this.isSelf = (_.get(this, 'self.id') == (jade.owner.id || jade.default_admin.id))
                        this.isDefaultView = ['detail', 'attribute', 'problem'].indexOf(to.params.tab) === -1
                        this.view = this.isDefaultView ? 'detail' : to.params.tab
                        this.jade = jade
                        if(!jade.is_tob) {
                            this.firstVisit = false
                        }
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
        gotoComments() {
            if(this.env.isApp) {
                this.$router.go({name: 'comments', params: {id: this.jade.id, type: '40'}})
            } else {
                this.gotoDownload()
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

        closeNotice() {
            this.firstVisit = false
            this.action('cache', {k: 'jade-visited', v: 1})
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
