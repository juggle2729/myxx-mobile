<style lang="stylus">
.level-help-view
    .user
        padding: 72px 50px 60px
        .level-comp img
            width: 63px
            height: 54px
            margin: 0 5px
        .lv-label
            margin: 50px 0
        .bar-label
            span
                padding: 0 20px
            .hr
                height: 1px
                height: .5px
                background-color: #d9d9d9
        .lv-bar
            width: 512px
            height: 50px
            line-height: 50px
            margin: 50px auto 20px
            padding-left: 20px
            text-align: left
            border-radius: 6px
    .lvs
        padding: 40px 50px 50px
        header
            border-radius: 6px
            height: 80px
            line-height: 80px
            text-align: center
        .item
            margin-top: 50px
            .level-comp
                width: 260px
                img
                    width: 42px
    .usage
        padding: 0 50px 100px
        h3
            font-size: 30px
            padding: 42px 0 32px
            &::before
                content: '•'
                color: #CC3F4F
                margin-right: 12px
        p
            line-height: 1.5
        .flex
            padding-bottom: 50px
            label
                display: inline-block
                width: 280px
    .desc
        padding: 36px 50px 50px
        line-height: 1.5
</style>
<template lang="jade">
.level-help-view.bg
    .user.center.fz-30.bg-white(v-if="isUserView")
        lv(:lv="lv")
        .lv-label.gray 信誉评价等级
        .bar-label.flex
            .hr.flex-1
            span 店铺积分
            .hr.flex-1.
        .lv-bar.fz-24.white(:style="barStyle") {{point}}/{{point+gap}}
        .red 还差{{gap}}点积分升级到{{lv+1}}级
    .hr(v-if="isUserView")
    .lvs.bg-white
        header.fz-30.bd-gray 积分等级制度
        .item.flex.fz-30(v-for="(i, point) in lvs")
            lv(:lv="i+1")
            .flex-1 {{i+1}}级
            div {{point}}分
    .hr
    .usage.fz-30.bg-white(v-if="isUserView || self && self.add_product")
        h3.gray 店铺等级有什么用？
        p 店铺等级将展示在店铺的显眼位置，是买家选择店铺的重要参考标准。
        p 店铺等级越高，在搜索、推荐、专题中的排名越靠前，同时享受美玉秀秀平台专属推广。
        h3.gray 如何提高店铺等级？
        p 通过销售商品、获取评价以及其他行为获得积分，不同的积分对应相应的等级。
        h3.gray 如何赚取积分？
        .flex
            label 商品销售
            span +(商品价格/40)分
        .flex
            label 好评
            span +10分
        .flex
            label 中评
            span +1分
        .flex
            label 差评
            span -10分
        .flex
            label 参与求购竞标
            span +1分
        .flex
            label 商品审核通过
            span +5分
    .desc.fz-30.gray(v-else) 店铺等级受销售额、好评率和退货率影响。等级越高，信誉和商品质量越有保障。
</template>
<script>
import lv from 'component/Lv.vue'
export default {
    name: 'LevelHelpView',

    components: { lv },

    data() {
        return {
            lvs: [1, 200, 400, 800, 1600, 3200, 6400, 9000, 12000, 18000, 25000, 35000, 50000, 65000, 100000],
            lv: 0,
            point: 0
        }
    },

    route: {
        data({next, to}) {
            if(this.isUserView) {
                this.$fetch(`mall/shop/${to.params.id}/profile`)
                    .then(shop => {
                        this.lv = shop.level
                        this.point = shop.point
                    })
            }
            next()
        }
    },

    computed: {
        isUserView() {
            return this.$route.params.id !== 'none'
        },

        gap() {
            return this.lvs[this.lv] - this.point
        },

        barStyle() {
            const percent = 100*this.point/this.lvs[this.lv] + '%'
            return {
                backgroundImage: `-webkit-linear-gradient(left, rgb(204, 63, 79) ${percent}, rgba(204, 63, 79, .6) ${percent})`
            }
        }
    }
}
</script>