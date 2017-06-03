<style lang="stylus">
.like-icon .icon
    height: 2em
    width: @height
</style>
<template lang="pug">
deep-link.has-icon.like-icon.fz-26.gray(:class="{'red': active}")
    icon(:name="name")
    span {{count || zero}}
</template>
<script>
import DeepLink from 'component/DeepLink.vue'
import Icon from './Icon.vue'
export default {
    name: 'like-icon',

    components: { DeepLink, Icon },

    props: {
        active: Boolean,

        count: Number,

        zero: {
            type: String,
            default: () => 0
        },

        recognition: { // 是否显示为认同icon
            type: Boolean,
            default: () => false
        }
    },

    computed: {
        name() {
            return this.recognition ? (this.active ? 'recognition-solid' : 'recognition') : (this.active ? 'like-solid' : 'like')
        }
    }
}
</script>
