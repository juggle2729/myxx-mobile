<style lang="stylus">
.complain-view
    .icon
        height: 44px
        width: 44px
        vertical-align: 1px
    textarea
        border: none
        height: 200px
        width: 100%
    .btn
        margin-top: 32px
        border-radius: 8px
    .result
        padding: 140px 0 80px
</style>
<template lang="jade">
.complain-view.bg(v-if='!$loadingRouteData')
    template(v-if="!result")
        .bg-white(v-for="item in items")
            .line-height-100.mgl-32.pdr-32.bdb.flex(@click="select(item.id)")
                .fz-30.flex-1 {{item.desc}}
                icon(:name="item.selected ? 'selected' : 'select'")
            textarea.pd-32.fz-30(v-if="item.desc==='其他' && item.selected", placeholder="填写投诉原因（必填）", v-model="content")
    template(v-else)
        .result.fz-30.user-txt.center.mgh-32 你的举报已受理，管理员会在1个工作日内处理，感谢你对美玉秀秀的维护和支持。
    .btn.bg-gray.white.line-height-90.center.mgh-32.fz-30(@click="submit", :class="{'bg-red': content || reason}") {{result ? '我知道了' : '提交'}}
</template>
<script>
export default {
    name: 'complain-view',

    data() {
        return {
            reason: '', // 非输入型举报原因,
            content: '', // 其他举报原因
            result: false, // 是否为结果页
            items: [], // 举报原因数组
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
                    }, {
                        id: 2,
                        desc: '其他',
                        selected: false
                    }
                ], [
                    {
                        id: 0,
                        desc: '引导私下、非平台交易',
                        selected: false
                    }, {
                        id: 1,
                        desc: '不遵守平台发货规则',
                        selected: false
                    }, {
                        id: 2,
                        desc: '不遵守平台退货规则',
                        selected: false
                    }, {
                        id: 3,
                        desc: '对顾客进行人身攻击',
                        selected: false
                    }, {
                        id: 4,
                        desc: '滥发营销信息',
                        selected: false
                    }, {
                        id: 5,
                        desc: '其他',
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
                    }, {
                        id: 4,
                        desc: '其他',
                        selected: false
                    }
                ]
            ]
        }
    },

    ready() {
        let title = '' // 显示标题
        switch(this.$route.params.type) {
            case 'us':
                title = '举报用户'
                this.items = this.reasons[0]
                break
            case 'sh':
                title = '投诉店铺'
                this.items = this.reasons[1]
                break
            case 'cm':
                title = '举报评论'
                this.items = this.reasons[2]
                break
            default:
                title = '举报内容'
                this.items = this.reasons[2]
        }
        this.action('updateTitle', {text: title})
    },

    methods: {
        select(id) {
            _.forEach(this.items, (item) => {
                item.selected = false
            })
            this.items[id].selected = !this.items[id].selected
            this.reason = (this.items[id].desc !== '其他') ? this.items[id].desc : ''
        },

        submit() {
            if(!this.result && (this.content || this.reason)) {
                this.$post(`users/complaints`, {
                    target_id: this.$route.params.id,
                    target_type: this.$route.params.type,
                    reason: this.content || this.reason
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
