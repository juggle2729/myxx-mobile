<style lang="stylus">
.question-feedback-view
    min-height: 100%
    padding-top 32px
    .item
        height 240px
        line-height 240px
        border-radius 8px
        margin 0 32px
        padding 56px 42px 0 36px
        & + .item
            margin-top 32px
    .title
        color #242424
    .desc
        color #999
        line-height 1.4
        margin-right 64px
    .icon-enter
        width 14px
        height 24px
        position absolute
        top 54%
        right 42px
        transform translateY(-50%)
</style>
<template lang="pug">
.question-feedback-view.bg
    .item.bg-white.relative(v-for="item in items", track-by="$index", @click="onAction(item.path || item.action)")
        .left-info
            .title.fz-30 {{ item.title }}
            .desc.fz-26.mgt-24 {{ item.desc }}
        icon.gray(name="enter")
</template>
<script>
export default {
    name: 'QuestionFeedbackView',

    data() {
        return {
            jianbaoId: 0,
            items: [
                {
                    title: '不认同鉴定结果',
                    desc: '鉴宝师的回答没有帮助，或回答结果不准确。对鉴定结果有疑议。',
                    path: { name: 'complain', params: { id: this.$route.params.id, type: 'jb-1' } }
                },
                {
                    title: '补充求鉴宝图片、视频',
                    desc: '求鉴宝的物品和您有关，为了得到更加准确的鉴定结果，您希望补充更多图片、视频素材帮助鉴宝师判断，或得到更加准确的结果。',
                    action: true
                },
                {
                    title: '求鉴宝有滥用鉴宝资源嫌疑',
                    desc: '发布者通过鉴定帮助其商品销售，或多次重复发布相同求鉴定，涉嫌滥用鉴宝及鉴宝师资源。对求鉴宝动机有疑议。',
                    path: { name: 'complain', params: { id: this.$route.params.id, type: 'jb-2' } }
                }
            ]
        }
    },

    methods: {
        onAction(params) {
            if(_.isBoolean(params)) {
                this.action('appendJianbaoInfo', { jianbaoId: this.$route.params.id, userId: this.$route.query.userId })
            } else if(_.isObject(params)) {
                this.$router.go(params)
            }
        }
    }
}
</script>