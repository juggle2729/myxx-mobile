<style lang="stylus">
.star-icon
    display: block
</style>
<template lang="pug">
.star-icon(@click="star")
    .icon-star.fz-32(:class="{'red': active}")
    span {{active ? '已收藏' : '收藏'}}
</template>
<script>
export default {
    name: 'star-icon',

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
            console.log(this.active, this.$put)
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