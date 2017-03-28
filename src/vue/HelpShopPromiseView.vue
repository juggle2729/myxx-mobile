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
        .line-height-100.flex.bdb.pdr-32(v-if="items[profile.sunlight]", v-link="items[profile.sunlight].interaction ? {name: 'promise-detail', params: {type: 'sunlight'}, query: {isOpen: profile.sunlight}} : ''")
            img(:src="'shop/promise/sun.png' | qn")
            .mgl-12.flex-1 自然光拍摄
            .mgr-12(v-if="items[profile.sunlight]", :class="[items[profile.sunlight].color]") {{items[profile.sunlight].title}}
            icon.gray(name="enter", v-if="profile.sunlight != 'auditing'")
        .line-height-100.flex.pdr-32(v-if="items[profile.cigar_scale]", v-link="items[profile.cigar_scale].interaction ? {name: 'promise-detail', params: {type: 'cigar_scale'}, query: {isOpen: profile.cigar_scale}} : ''")
            img(:src="'shop/promise/smoke.png' | qn")
            .mgl-12.flex-1 烟标图
            .mgr-12(v-if="items[profile.cigar_scale]", :class="[items[profile.cigar_scale].color]") {{items[profile.cigar_scale].title}}
            icon.gray(name="enter", v-if="profile.cigar_scale != 'auditing'")
    .hr
    .pdl-32.fz-30.bg-white
        .line-height-100.bdb.bold 店铺服务
        .line-height-100.flex.pdr-32(v-link="{name: 'promise-detail', params: {type: 'shop_return'}, query: {isOpen: 'succeed'}}")
            img(:src="'shop/promise/three.png' | qn")
            .mgl-12.flex-1 三天无理由退货
            .green.mgr-12 已开通
            icon.gray(name="enter")
</template>
<script>
const items = { // interaction 是否可以点击进入二级页面
    'succeed': { title: '已开通', color: 'green', interaction: true},
    'auditing': { title: '审核中', color: 'gray', interaction: false},
    'unaudited': { title: '尚未开通', color: 'red', interaction: true}
}
export default {
    name: 'help-shop-promise',

    data() {
        return {
            profile: {},
            items: items
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