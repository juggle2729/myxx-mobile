<style lang="stylus">
.user-item
    height: 168px
    img
        display: block
        height: 30px
        width: 30px
    &:last-child
        background-image: none
</style>
<template lang="jade">
.user-item.bg-white.flex.pdr-32.mgl-32.bdb
    avatar(:user='item', :size='120')
    .flex-1.mgl(v-link='item | profile')
        .flex
            .fz-30 {{item.nickname}}
            img.mgl-8(v-if="item.vip_flag", :src="'profile/'+item.role+'.png' | qn")
        .fz-26.gray.mgt-16 {{title}}
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
