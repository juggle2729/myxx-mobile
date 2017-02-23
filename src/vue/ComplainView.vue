<style lang="stylus">
.complain-view
    .icon
        height: 44px
        width: 44px
    .btn
        margin-top: 60px
        border-radius: 8px
    .result
        padding: 140px 0 80px
</style>
<template lang="jade">
.complain-view.bg-white(v-if='!$loadingRouteData')
    template(v-if="!result")
        div(v-for="item in items")
            .line-height-100.mgl-32.pdr-32.bdb.flex(@click="select(item.id)")
                .fz-30.flex-1 {{item.desc}}
                icon(:name="item.selected ? 'selected' : 'select'")
    template(v-else)
        .result.fz-30.user-txt.center.mgh-32 你的举报已受理，管理员会在1个工作日内处理，感谢你对美玉秀秀的维护和支持。
    .btn.bg-gray.white.line-height-90.center.mgh-32.fz-30(@click="submit", :class="{'bg-red': reason}") {{result ? '我知道了' : '举报'}}
</template>
<script>
export default {
    name: 'complain-view',

    data() {
        return {
            reason: '',
            result: false, // 是否为结果页
            reasons : [
                [
                    {
                        id: 0,
                        desc: '发布过人身攻击、骚扰信息',
                        selected: false
                    }, {
                        id: 1,
                        desc: '发布过大量垃圾信息',
                        selected: false
                    }
                ], [
                    {
                        id: 0,
                        desc: '内容抄袭',
                        selected: false
                    }, {
                        id: 1,
                        desc: '虚假信息',
                        selected: false
                    }, {
                        id: 2,
                        desc: '人身攻击、骚扰',
                        selected: false
                    }, {
                        id: 3,
                        desc: '垃圾广告信息',
                        selected: false
                    }
                ]
            ]
        }
    },

    computed: {
        items() {
            return (this.$route.params.type === 'us') ? this.reasons[0] : this.reasons[1]
        }
    },

    ready() {
        const title = this.$route.params.type === 'us' ? '举报用户' : (this.$route.params.type === 'cm' ? '举报评论' : '举报内容')
        this.action('updateTitle', {text: title})
    },

    methods: {
        select(id) {
            _.forEach(this.items, (item) => {
                item.selected = false
            })
            this.items[id].selected = !this.items[id].selected
            this.reason = this.items[id].desc
        },

        submit() {
            if(!this.result && this.reason) {
                this.$post(`users/complaints`, {
                    target_id: this.$route.params.id,
                    target_type: this.$route.params.type,
                    reason: this.reason
                }).then(resp => {
                    this.result = true
                }, err => {
                    this.action('toast', {success: 0, text: err.message})
                    _.delay(() => {
                        this.action('back', {step: 1})
                    }, 1000)
                })
            } else {
                this.action('back', {step: 1})
            }
        }
    }
}
</script>
