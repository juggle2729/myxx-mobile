<style lang="stylus">
.help-explanation-view
    padding 20px 0 30px
    .pic
        padding 0 32px
        img
            width 100%
    .table
        overflow auto
        padding 0 32px
    .violation-product
        img
            width 1525px
    .violation-shop
        img
            width 1475px
    .high-grade-shop
        img
            width 1107px
</style>
<template lang="pug">
.help-explanation-view
    template(v-if="$route.params.type === 'about_violation_product'")
        .pic
            img(:src="'explanation/violation-product.png' | qn")
        .table.violation-product
            img(:src="'explanation/table/violation-product.png' | qn")
    template(v-if="$route.params.type === 'about_violation_shop'")
        .pic
            img(:src="'explanation/violation-shop.png' | qn")
        .table.violation-shop
            img(:src="'explanation/table/violation-shop.png' | qn")
    template(v-if="$route.params.type === 'about_high_grade_shop'")
        .pic
            img(:src="'explanation/high-grade-shop.png' | qn")
        .table.high-grade-shop
            img(:src="'explanation/table/high-grade-shop.png' | qn")
        .pic
            img(:src="'explanation/about-high-grade-shop.png' | qn")
</template>
<script>
import help from '../help'
export default {
    name: 'help-explanation-view',

    data() {
        return {
            title: '',
            explanations: []
        }
    },

    ready() {
        _.forIn(help.medias, (value, key) => {
            if(/^about_/.test(key)) {
                this.explanations.push(value)
            }
        })

        this.title = this.explanations.filter(explanation => explanation.type === this.$route.params.type)[0].title
        this.action('updateTitle', { text: this.title })
    }
}
</script>