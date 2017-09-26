<style lang="stylus">
$base = '//o0x80w5li.qnssl.com/auction/'
bg($icon, $size)
    height $size
    background url($base + $icon + '.png') left center no-repeat
    background-size $size $size
.address-item
    .content
        padding 36px 32px
    .operation
        height 86px
    .delete
        margin-left 72px
    .edit
        bg(edit, 26px)
    .delete
        bg(delete, 26px)
    .full-address
        line-height 1.5
</style>
<template lang="pug">
.address-item.bg-white.black-24
    .content.bdb
        .flex
            .flex-1.fz-30 {{ item.receiver_name }}
            .fz-30 {{ item.receiver_phone }}
        .fz-26.gray-8f.mgt-28.full-address {{ item.receiver_address_flat }}
    .operation.flex.pdh-32
        .flex.fz-26(@click="setDefault")
            icon(:name="item.is_default ? 'checked' : 'uncheck'")
            .address-text.mgl-20 {{ item.is_default ? '默认地址': '设为默认' }}
        .flex-1
        .edit.pdl-42.fz-26(@click.stop="edit") 编辑
        .delete.pdl-42.fz-26(@click.stop="del") 删除
</template>
<script>
export default {
    name: 'address-item',

    props: {
        item: Object,
        index: Number
    },

    methods: {
        del() {
            this.action('confirm', {
                text: '确定删除此地址吗？',
                labels: ['取消', '删除']
            }).then((data) => {
                if(data === '1') {
                    this.$delete(`mall/address/${this.item.id}`)
                        .then(() => {
                            this.action('toast', {success: 1, text: '删除成功'})
                            this.$dispatch('deleteAddress', this.index)
                        })
                }
            })
        },

        edit() {
            this.$router.go({
                name: 'address-add',
                params: {
                    id: this.item.id,
                    type: this.$route.query.type
                },
                query: {
                    select: this.$route.query.select
                }
            })
        },

        setDefault() {
            this.$put(`mall/address/${this.item.id}`, {
                is_default: !this.item.is_default
            }).then(() => {
                    this.action('toast', {success: 1, text: '设置成功'})
                    this.$dispatch('changeDefault', this.item)
                }, err =>
                    this.action('toast', {success: 0, text: err.message})
            )
        }
    }
}
</script>