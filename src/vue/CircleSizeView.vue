<style lang="stylus">
@import '~style/partials/mixin'
.circle-size-view
    padding-top 118px
    .tabs
        position fixed
        top 0
        left 0
        z-index 999
        background-color white
        width 100%
        height 118px
        color #cccccc
        .flex-1
            line-height 80px
            text-align center
            width 50%
        .flex-1:first-child
            border(r, #cccccc)
    img
        width 100%
</style>

<template lang="pug">
.circle-size-view
    .tabs.fz-36.flex.bdb
        .flex-1(@click="tab=1", :class="{ black: tab === 1 }") 手镯
        .flex-1(@click="tab=2", :class="{ black: tab === 2 }") 戒指
    img(v-show="tab === 1", src="https://o0x80w5li.qnssl.com/circle-size-bracelet.png?v1")
    img(v-show="tab === 2", src="https://o0x80w5li.qnssl.com/circle-size-ring.png")
</template>
<script>
export default {
    name: 'circle-size-view',

    data() {
        return {
            tab: 1
        }
    },

    ready() {
        this.$watch('tab', () => {
            window.scrollTo(0, 0)
        })
    }
}
</script>
