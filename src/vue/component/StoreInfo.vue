<style lang="stylus">
.store-info
    .header
        padding: 28px 32px 16px
    .bdt
        border-color #ededed
    img
        display: block
        height: 30px
        &.refund
            width: 164px
        &.type
            width: 128px
    .icon-enter
        height: 26px
        width: 26px
    .type
        width: 168px
    .media
        height: 222px
        width: 222px
        &:not(:last-child)
            margin-right: 10px
    .detail
        height: 120px
        line-height: 120px
</style>
<template  lang="pug">
    .store-info.bg-white
        .header.fz-26.gray.bg 基本信息
        .content.pdl-32.fz-30.bdt.bdb
            .pdv-32.flex.bdb.pdr-32(v-link="{name: 'user', params: {id: shop.owner.id}}")
                .type.gray 掌柜
                avatar(:user="shop.owner")
                .mgh.flex-1
                    .flex
                        .mgb-12.black-24 {{shop.owner.nickname}}
                        img.mgl-8.mgb-10(v-if="shop.owner.vip_flag", :src="'profile/'+shop.owner.role+'.png' | qn")
                    .fz-26.gray.line-clamp {{shop.owner.title}}
                icon.gray(name="enter")
            .line-height-100.flex.fz-30.bdb.pdr-32
                .type.gray 店铺等级
                lv(:lv="shop.level")
            .line-height-100.flex.fz-30.bdb.pdr-32
                .type.gray 店铺承诺
                img.refund(:src="'shop/refund.png' | qn")
            .line-height-100.flex.fz-30.bdb.pdr-32
                .type.gray 店铺类型
                .mgr-8.black-24 {{config.shopType[shop.shop_type]}}
                img.type(v-if="shop.auth_flag", :src="type | qn")
            .line-height-100.flex.fz-30.bdb.pdr-32
                .type.gray 入驻时间
                div.black-24 {{shop.create_at | date 'yyyy-mm-dd'}}
        template(v-if="desc")
            .header.fz-26.gray.bg 店铺介绍
            .mgh-32.bg-white.mgt-34
                .fz-30.user-txt.pdb-28 {{desc}}
                .flex
                    .media(v-for="media in medias", track-by="$index", v-bg="media")
                .detail.center.fz-26.red-e6(v-link="{name:'shop-introduce', params: {id: $route.params.id}}")
                    span 查看完整店铺介绍
                    icon(name="enter")
        template(v-if="comments.length > 0")
            .header.fz-26.gray.bg 店铺评价
            opinion-list(:items="comments")
            .bdt.detail.center.fz-26.red(v-link="{name: 'shop-comments', params: {id: $route.params.id}}")
                span 查看全部评价
                icon(name="enter")
</template>
<script>
import lv from 'component/Lv.vue'
import OpinionList from 'component/OpinionList.vue'
export default {
    name: 'store-info',

    data() {
        return {
            desc: '',
            comments: [],
            medias: []
        }
    },

    computed: {
        type() {
            return this.shop.shop_type === 'person' ? 'shop/name.png' : 'shop/licence.png'
        }
    },

    components: {
        lv,
        OpinionList
    },

    props: {
        shop: Object
    },

    activate(done) {
        return this.$fetch(`mall/shop/${this.$route.params.id}/comments`).then((data) => {
            this.comments = _.take(data.comments, 3)
            this.$fetch(`mall/shop/${this.$route.params.id}/gallery`).then((info) => {
                this.desc = info.medias[0].media
                _.chain(info.medias)
                .filter(['media_type', 'picture'])
                .take(3)
                .forEach(item => {this.medias.push(item.media)})
                .value()
            })
        }).then(done)
    }
}
</script>