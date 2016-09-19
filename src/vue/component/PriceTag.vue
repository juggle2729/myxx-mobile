<style lang="stylus">
.price-tag
    .price::before
        content: '￥'
</style>
<template lang="jade">
.price-tag.flex
    .label {{label}}
    .price {{price}}
</template>
<script>
export default {
    name: 'price-tag',

    props: {
        cents: Number,
        zero: {
            type: String,
            default: '面议'
        },
        label: {
            type: String,
            default: ''
        }
    },

    computed: {
        price() {
            return _.isNumber(this.cents) && this.cents >= 0 ? Math.floor(this.cents/100) : this.zero
        }
    }
}
</script>