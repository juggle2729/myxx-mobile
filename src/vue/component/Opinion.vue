<style lang="stylus">
.opinion
    border-color #ededed
    -webkit-box-align start
    overflow hidden
    .opinion-items
        justify-content space-between
    .comment
        height 30px
        width 56px
        display block
    .line-clamp-3
        line-height 1.5
    .comment-images
        display flex
        flex-wrap wrap
        .image
            width 25%
            height 0
            padding-bottom 25%
            border-right 3px solid #fff
            border-bottom 3px solid #fff
            background-position center
            background-size 100%
    .product
        border-color #E8EAED
        border-radius 48px
        .goods-icon
            width 22px
            height @width
            background-image url('//o0x80w5li.qnssl.com/shop/goods.png')
            background-size cover
        .img
            width 50px
            height @width
    .anonymous
        display block
        height 68px
        width 68px
        border-radius 50%
    .user-txt
        line-height 1.5
    .reply
        height 46px
        line-height 46px
        width 116px
        border-radius 46px
        float right
    .btn
        width 140px
        height 70px
        line-height 70px
        text-align center
        border-radius 6px
    .marks-comp
        .tag
            margin 10px 10px 0 0
    .arrow
        width 0
        height 0
        border 16px
        border-color transparent transparent #f7f7f7 transparent
        border-style dashed dashed solid dashed
        top -28px
        left 32px
    &:last-child
        border 0
</style>
<template lang="pug">
.opinion.pdt-60.pdb-30
    div.flex(@click="goDetail(item)")
        template(v-if="item.buyer")
            avatar(:user="item.buyer",@click.stop="goUser(item)")
        template(v-else)
            img.anonymous(:src="'shop/anonymous-4.11.png' | qn")
        .mgl.flex-1
            .flex
                .fz-26.flex-1.gray-6b.bold
                    span {{ item.buyer ? item.buyer.nickname : '匿名用户' }}
                    user-lv(v-if="item.buyer", :lv="item.buyer.level")
                .fz-20.gray-b3 {{ item.create_at | moment }}
            .opinion-items.flex.mgt-16.mgr-30.fz-24.gray-8f
                .opinion-item.flex
                    span 描述：
                    span {{item.goods_description}}
                .opinion-item.flex
                    span 服务：
                    span {{item.attitude_service}}
                .opinion-item.flex
                    span 物流：
                    span {{item.express_service}}
    .desc.fz-30.user-txt.black-24.relative(:class="{'mgt-22': item.description }")
        span(:class="{'line-clamp-3': desc_clamp}") {{ item.description }}
    .fz-30.mgt-8.txt-right.gray-8f(v-if="desc_clamp", @click.stop="desc_clamp = flase")
        span 展开
    .comment-images.mgt-22(v-if="item.pictures")
        .image(v-for="img in item.pictures",v-bg.md='img' @click.stop="coverflow(item.pictures, $index)")
    .pdt-22.pdb-24.pdh-28.fz-26.black-47.user-txt.bg-gray-f7.dark.mgt-22.relative(v-if="item.reply")
        span 商家回复： {{{ item.reply.reply_content | content }}}
        .arrow.absolute
    .product.pdv-10.pdl-32.bd.mgt-22.flex(v-if="!isChat",@click="goProduct(item)")
        .goods-icon
        .flex-1.title.fz-24.gray-8f.mgl-20.line-clamp-1.line-height-50 {{ item.product_title }}
    .reply.center.white.bg-red-f4.fz-24.mgt-24(v-if="!isChat && seller && !item.reply" ,@click.stop="action('replyOpinion', {id: item.id})") 回复
    .btn.bd.fz-26.mgt-24(v-if="isChat", @click.stop="action('chat', {id: item.buyer_id, name: item.buyer.nickname, product: item.product_id})") 联系买家
</template>
<script>
import UserLv from '../component/icon/UserLv.vue'
export default {
    name: 'opinion',
    components: { UserLv },
    props: {
        item: Object,
        seller: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            desc_clamp: false
        }
    },

    ready() {
        this.desc = this.$el.querySelector('.desc')
        if(this.desc && window.getComputedStyle(this.desc).height.replace('px','') > 70) {
            this.desc_clamp = true
            // this.desc.classList.add('desc', 'line-clamp-3')
        }
        console.log(this.$route.name)
    },

    computed: {
        // seller() {
        //     return this.$route.name === 'user-comment'
        // },

        // 3.1之前版本显示 ”联系卖家“，之后版本显示 ”回复评价“
        isChat() {
            return this.env.version < '3.1'
        }
    },

    methods: {
        goProduct(item) {
            this.seller ? this.action('orderDetail', {id: item.order_no}) : this.$router.go({name: 'product', params: {id: item.product_id}})
        },
        goDetail(item){

        },
        goUser(item){
            //placeholder
        }

    }
}
</script>