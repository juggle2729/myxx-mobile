<style lang="stylus">
.follow-suggestion
    padding: 32px
    &:last-child
        background-size: 0
    .flex-1
        margin-left: 20px
    .name
        margin: 2px 0 12px
    .content
        margin-top: 20px
        line-height: 36px
</style>
<template lang="pug">
.follow-suggestion.flex.bdb.bg-white
        avatar(:user='item', :size='108')
        .flex-1
            div
                .name.fz-30 {{item.name}}
                .fz-26.light 粉丝数&nbsp&nbsp{{item.fans_count}}
            .content.fz-26.gray {{item.desc}}
        follow(:user='item.id', :follow='item.is_followed', :oneway='true', :has-border='true')
</template>
<script>
export default {
    name: 'follow-suggestion',

    props: {
        item: Object
    }
}
</script>