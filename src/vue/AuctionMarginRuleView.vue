<style lang="stylus">
.margin-rule
    padding 80px 0
    .pic
        width 100%
        height 1308px
</style>
<template lang="pug">
.margin-rule.bg-gray-f7
    .pic(v-bg.lg="marginRulePhoto")
</template>
<script>
export default {
    name: 'margin-rule',

    data() {
        return {
            marginRulePhoto: ''
        }
    },

    route: {
        data() {
            this.$fetch(`mall/auctions/myb/margin_rule`)
                .then(({margin_rule_photo: { photo }}) => {
                this.marginRulePhoto = photo
            })
        }
    }
}
</script>
