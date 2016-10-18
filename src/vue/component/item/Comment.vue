<style lang="stylus">
.comment-item
    -webkit-box-align: start
    padding: 26px 0 26px 32px
    .content
        &[to]::before
            content: '回复' attr(to) '说：'
        img
            height: 44px
            vertical-align: bottom
</style>
<template lang="jade">
.comment-item.flex(@click="$dispatch((self && self.id==item.reply_from.id) ? 'delComment' : 'reply', item)")
    avatar.mgr(:user='item.reply_from')
    .flex-1.bdb.pdr-32.pdb-16
        .flex.pdb
            .flex-1
                .fz-26.gray {{item.reply_from.name}}
                .fz-22.light.mgt-12 {{item.create_at | moment}}
            icon-like(:target='item.id', type='70', :count='item.like_count', :active='item.liked', zero='')
        .fz-30.content.user-txt(:to="item.reply_to && item.reply_to.name") {{{content}}}
</template>
<script>

export default {
    name: 'comment',

    props: {
        item: Object,
        target: Object
    },

    computed: {
        content() {
            let content = this.item.content.replace(/</g, '&lt').replace(/>/g, '&gt')
            if(/\[.{1,3}?\]/.test(content)) {
                content = content.replace(/\[(.{1,3}?)\]/g, alt => {
                    const i = this.config.emoji.indexOf(alt.replace(/\[|\]/g, ''))
                    return i === -1 ? alt : `<img src="${this.config.www}/emoji/${i}.png" alt="${alt}" />`
                })
            }
            return content
        }
    }
}
</script>