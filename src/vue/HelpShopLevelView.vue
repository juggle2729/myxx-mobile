<style lang="stylus">
.level-help-view
    .lvs
        header
            border-radius: 6px
            height: 80px
            line-height: 80px
            text-align: center
        .item
            margin-top: 50px
            .level-comp
                width: 260px
    .desc
        padding: 36px 50px 50px
        line-height: 1.5
</style>
<template  lang="pug">
.level-help-view.bg.pdb-30
    template(v-if="isUserView || self && self.goodsPublishPermission")
        help-desc(type="shop_level")
    .desc.fz-30.gray(v-else) 店铺等级受销售额、好评率和退货率影响。等级越高，信誉和商品质量越有保障。
    .hr
    .lvs.bg-white.pd-50
        header.fz-30.bd-gray 积分等级制度
        .item.flex.fz-30(v-for="(i, point) in lvs")
            lv(:lv="i+1")
            .flex-1 {{i+1}}级
            div {{point}}分
</template>
<script>
import Lv from 'component/Lv.vue'
import HelpDesc from 'component/HelpDesc.vue'
export default {
    name: 'LevelHelpView',

    components: {
        Lv,
        HelpDesc
    },

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
            } else {
                this.action('user')
                    .then(user => this.$set('self', user))
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