<style lang="stylus">
.user-item
    height: 168px
    &:last-child
        background-image: none
</style>
<template lang="jade">
.user-item.bg-white.flex.pdr-32.mgl-32.bdb
    avatar(:user='item', :size='120')
    .flex-1.mgl(v-link='item | profile')
        .fz-30 {{item.nickname}}
        .fz-26.gray.mgv-16 {{title}}
        .fz-26.light 帖子数{{item.follow_count}}&nbsp;&nbsp;&nbsp;&nbsp;粉丝数{{item.fans_count}}
    icon-follow(:follow='item.followed', :target='item.id', :has-border="true")
</template>
<script>
export default {
    name: 'user-item',

    props: {
        item: Object
    },

    computed: {
        title() {
            return this.item.title || this.config.role[this.item.role] || this.item.role || '普通用户'
        }
    }
}
</script>
