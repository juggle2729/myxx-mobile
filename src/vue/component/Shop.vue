<style lang="stylus">
@import '~style/partials/mixin'
.shop-component
    -webkit-box-orient vertical
    padding 42px 31px 47px
    > .flex
        width 100%
        display -webkit-box
        -webkit-box-pack justify
        box-sizing border-box
    .img
        width 100px
        height @width
        border-radius 20px
        margin-right 25px
    .flex-2
        display -webkit-box
        -webkit-box-pack justify
        .name
            font-weight bold
            .line-clamp
                line-height 1.2
        .level-comp
            width 130px
            height 34px
            img
                width 100%
                height 100%
        .address-icon
            width 30px
            height @width
            img
                margin-top 3px
                width 21px
                height 24px
    .center
        height 100px
        -webkit-box-orient vertical
        -webkit-box-pack center
        img
            width 44px
            height @width
        .fz-18
            font-size 18px
    .mgt-48
        -webkit-box-pack justify
        padding 0 10px
    .separator
        border(r, #d9d9d9)
        width 1px
        height 64px
    .flex3
        display -webkit-box
        -webkit-box-orient vertical
        text-align center
    img
        width 36px
        height 36px
        display block
</style>
<template lang="pug">
.shop-component.flex(C)
    .flex
        .img(v-bg="shop.logo")
        .flex
            .flex
                .flex3.mgr-24.mgl-24
                    .fz-30.black-24 {{ shop.selling_count }}
                    .black-47.fz-20.mgt-12 在售
                .separator
            .flex
                .flex3.mgr-24.mgl-24
                    .fz-30.black-24 {{ fans }}
                    .black-47.fz-20.mgt-12 粉丝
                .separator
            .flex
                .flex3.mgr-24.mgl-24(@click = "follow")
                    img(v-if="!followed",:src="'shop/guanzhu.png' | qn")
                    img(v-if="followed",:src="'shop/yiguanzhu.png' | qn")
                    .black-47.fz-20.mgt-12(v-if=" followed") 已关注
                    .black-47.fz-20.mgt-12(v-if="!followed") 关注
    .flex.mgt-31
        .flex-2
            .fz-38.flex.name.black
                .line-clamp {{ shop.shop_name }}
            .fz-26.flex.gray.mgt-12
                .address-icon.center.mgr-6
                    img(:src="'shop/address.png' | qn")
                .fz-22.gray-b3 {{ shop.locale_name }}
    .flex.mgt-25
        .flexthis
            img(v-if="shop.brand_shop",:src="'shop/pinpaidianpu.png' | qn")
            img(v-if="shop.shop_type == 'person'",:src="'shop/gerenrenzheng.png' | qn")
            img(v-if="shop.shop_type == 'enterprise'",:src="'shop/yingyezhizhaorenzheng.png' | qn")
            .mgl-10.mgr-10
                star-rating(:rating='shop.seller_comment.comment_index[0]',:max-rating='5',:star-size='8',:increment='0.1')
            .black-24.fz-30 {{shop.seller_comment.comment_index[0].toFixed(1)}}
        .black-47.fz-24 {{shop.seller_comment.comment_count}} 人评价 >
    .flex.center.bdt.mgt-47(v-link="{name: 'shop', params: {id: shop.id}}",v-if="shop.id")
            .fz-30.black-47.mgt-12 进入店铺
</template>
<script>
    import StarRating from 'component/StarRating.vue'
export default {
    name: 'Shop',
    props: {
        shop: Object,
        type: String
    },
    components: {StarRating},
    
    methods:{
        follow() {
            if (!this.followed) {
                this.$post("users/target/"+this.$route.params.id+"/type/us/follow").then(res=>{
                    this.action('toast', {success: 1, text: '已关注'})
                    this.followed = !this.followed;
                    console.log("******");
                    console.log(this.followed);
                    this.$nexttick(_ => {
                        this.fans ++
                    })
                })
            } else{
                this.$delete("users/target/"+this.$route.params.id+"/type/us/follow").then(res=>{
                    this.action('toast', {success: 1, text: '取消关注'})
                    this.$nexttick(_ => {
                        this.followed = !this.followed;
                        this.fans ++
                    })
                })

            }
        }
    },
    computed: {
        followed() {
            return  this.shop.owner.is_followed
        },
        fans() {
            return this.shop.owner.fans_count
        }
    }
}
</script>
