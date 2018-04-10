<style lang="stylus">
.level-help-view
    img
        width 100%
        display block
    .desc
        padding: 36px 50px 50px
        line-height: 1.5
</style>
<template  lang="pug">
.level-help-view.bg
    template(v-if="isUserView || self && self.goodsPublishPermission")
        help-desc(type="shop_level")
    .desc.fz-30.gray(v-else) 店铺等级受销售额、好评率和退货率影响。等级越高，信誉和商品质量越有保障。
    .hr
    img(src="//o0x80w5li.qnssl.com/shop-levels.png")
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
                this.action('user').then(user => this.$set('self', user))
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