<style lang="stylus">
.recognition-view
    .dot
        height: 10px
        width: 10px
        border-radius: 50%
    .content
        padding: 0 32px 0 54px
</style>
<template lang="jade">
.recognition-view.bg-whtie
    .mgt-36(v-for="item in items")
        .flex.mgh-32.mgb
            .dot.bg-red.mgr-12
            .fz-30.bold {{item.title}}
        .content.fz-26.gray.user-txt {{{item.content | input}}}
</template>
<script>
const items = [
    {
        title: '认同度是什么？',
        content: '认同度代表着视频回答受观看用户的认可程度，认同度每周更新一次，数值变化基于用户上周发布的视频回答的播放量、用户认同数量、播放时长、分享数量、评论数量、收藏数量综合计算得出'
    }, {
        title: '认同度有什么作用？',
        content: '一方面认同度代表了用户对视频回答的认可程度，另一方面认同度影响获取鉴宝值的速度，根据认同度的不同鉴宝值增速也不同'
    }, {
        title: '如何提升认同度？',
        content: '1. 发布高质量视频回答，提升用户播放时长和认同度\n2. 积极回复评论'
    }
]
export default {
    name: 'recognition-view',

    data() {
        return {
            items: items
        }
    }
}
</script>