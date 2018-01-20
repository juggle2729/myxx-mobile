<style lang="stylus">
.help-shop-promise
    .icon-enter
        height: 26px
        width: 26px
        vertical-align: -2px
    .blue + .icon-enter
        height: 22px
        width: 22px
    img
        display: block
        height: 30px
        width: 30px
</style>
<template lang="pug">
.help-shop-promise.bg
    .bg-white.pdv-36.pdh-32.fz-26(v-link="{name: 'help-desc', params: {type: 'shop_promise'}}")
        .user-txt 店铺服务承诺是美玉秀秀推出的旨在提升平台交易中消费者合法权益和体验的服务体系。“三天无条件退货”，为加入店铺服务承诺的必选项。“烟标图”、“自然光拍摄”等都是其中的服务之一，由卖家自行选择加入。
        .flex.mgt-10
            .flex-1 加入“店铺服务承诺”的优势有...
            .blue 查看完整说明
            icon.mgl-12.blue(name="enter")
    .hr
    .pdl-32.fz-30.bg-white
        .line-height-100.bdb.bold 商品标记
        .line-height-100.flex.bdb.pdr-32(v-link="{name: 'promise-detail', params: {type: 'sunlight'}}")
            img(:src="'shop/promise/sun.png' | qn")
            .mgl-12.flex-1 自然光拍摄
            .mgr-12.gray 查看说明
            icon.gray(name="enter")
        .line-height-100.flex.bdb.pdr-32(v-link="{name: 'promise-detail', params: {type: 'cigar_scale'}}")
            img(:src="'shop/promise/smoke.png' | qn")
            .mgl-12.flex-1 烟标图
            .mgr-12.gray 查看说明
            icon.gray(name="enter")
        .line-height-100.flex.pdr-32(v-link="{name: 'promise-detail', params: {type: 'ziliao_feature'}}")
            img(:src="'shop/promise/ziliao.png' | qn")
            .mgl-12.flex-1 籽料特征图
            .mgr-12.gray 查看说明
            icon.gray(name="enter")
        .line-height-100.flex.pdr-32(v-link="{name: 'promise-detail', params: {type: 'certificate'}}")
            img(:src="'shop/promise/certificate.png' | qn")
            .mgl-12.flex-1 出具鉴定证书
            .mgr-12.gray 查看说明
            icon.gray(name="enter")
    .hr
    .pdl-32.fz-30.bg-white
        .line-height-100.bdb.bold 店铺服务
        .line-height-100.flex.pdr-32(v-link="{name: 'promise-detail', params: {type: 'shop_return'}}")
            img(:src="'shop/promise/three.png' | qn")
            .mgl-12.flex-1 三天无理由退货
            .green.mgr-12 已开通
            icon.gray(name="enter")
    .hr
    .pdl-32.fz-30.bg-white
        .line-height-100.bdb.bold 品牌店铺
        .line-height-100.flex.pdr-32(v-link="{name: 'brand-shop-detail', params: {type: 'brand_shop_rule'}}")
            img(:src="'shop/brand.png' | qn")
            .mgl-12.flex-1 品牌店铺
            .mgr-12(:class="profile.brand_shop ? 'green': 'red'") {{ profile.brand_shop ? '已入选': '尚未入选' }}
            icon.gray(name="enter")
</template>
<script>
export default {
    name: 'help-shop-promise',

    data() {
        return {
            profile: {}
        }
    },

    route: {
        data() {
            return this.$fetch('mall/shop/profile').then(data => {
                this.profile = data
            })
        }
    }
}
</script>