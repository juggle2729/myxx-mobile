<style lang="stylus">
@import '~style/partials/mixin'
.auction-mine-view
    height 100%
    .icon
        width 48px
        height 48px
        background-size cover
    .item
        height 112px
        border(b, #ededed)
    .icon-enter
        width 14px
        height 24px
        top 50%
        right 36px
        transform translateY(-50%)
    p
        line-height 42px
</style>
<template lang="pug">
.auction-mine-view.bg-gray-f7(@touchstart="touchStart($event)")
    .flex.pdv-36.bg-white.mgb-20.bdb
        avatar.mgl-32(:user='self', :size='120')
        .mgl-28.fz-36.black-24 {{ self.nickname }}
    .bdb.bdt.bg-white
        .item.flex.relative(v-for="item in items", @click="menuClick(item)")
            .icon.mgl-32(:style="{backgroundImage: bg(item) }")
            .fz-30.mgl-20 {{ item.name }}
            icon.fz-22.absolute.gray-99(name="enter")
    auction-footer-menu
    download-dialog(:show.sync="showContact")
        .fz-36.center 联系客服
        p.mgt-40 进入美玉秀秀APP，体验最贴心的客服服务：
        p 1. 订单跟踪处理
        p 2. 24小时服务
        p 3. 个性化问题咨询
</template>
<script>
import AuctionFooterMenu from 'component/AuctionFooterMenu.vue'
import DownloadDialog from 'component/DownloadDialog.vue'
export default {
    name: 'auction-mine-view',
    components: { AuctionFooterMenu, DownloadDialog },

    data() {
        return {
            showContact: false,
            items: [
                {
                    key: 'margin',
                    name: '保证金管理',
                    path: '/auction/bid-margin'
                },
                {
                    key: 'address',
                    name: '地址管理',
                    path: '/addresses'
                },
                {
                    key: 'problem',
                    name: '常见问题',
                    path: '/help/mall'
                },
                {
                    key: 'contact',
                    name: '联系客服',
                    action: 'contactUs'
                }
            ]
        }
    },

    route: {
        data() {
            this.checkUser()
        }
    },

    methods: {
        menuClick(menu) {
            if (menu.action) {
                this[menu.action]()
            } else if (menu.path) {
                this.$router.go(menu.path)
            }
        },

        contactUs() {
            this.showContact = true
        },

        bg(item) {
            return 'url(\'//o0x80w5li.qnssl.com/auction/' + item.key + '.png\')'
        }
    }
}
</script>