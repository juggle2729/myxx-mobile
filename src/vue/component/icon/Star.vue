<style lang="stylus">
.star-icon
    display: block
</style>
<template lang="jade">
.star-icon(@click="star")
    icon.fz-32(name="star", :class="{'red': active}")
    span {{active ? '已收藏' : '收藏'}}
</template>
<script>
import Icon from './Icon.vue'
export default {
    name: 'star-icon',

    components: {Icon},

    props: {
        active: Boolean,
        type: {
            type: String,
            default: 'pd'
        },
        id: Number
    },

    methods: {
        star() {
            this[this.active ? '$put' : '$post']('users/favs', {doc_type: this.type, doc_id: this.id})
                .then(() => {
                    this.active = !this.active
                    const entry = this.type === 'pd' ? '宝贝' : '店铺'
                    this.action('toast', {
                        success: 1,
                        text: this.active ? `恭喜，${entry}收藏成功!` : `取消${entry}收藏成功!`
                    })
            })
        }
    }
}
</script>