<style lang="stylus">
.complain-view
    .option
        min-height: 100px
        > div
            line-height: 1.5
            padding: 20px 0
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
    .warn
        img
            height: 10px
            width: 10px
            display: block
        a
            display: block
        .content
            padding: 0 32px 0 54px
            p
                line-height: 1.5
    .single-item
        padding 46px 52px 0
        height 440px
        line-height 1.4
        &::-webkit-input-placeholder
            color #c6c6c6
</style>
<template lang="pug">
.complain-view(v-if='!$loadingRouteData', :class="{bg: !isFirstPdComplain}")
    .warn.mgt-36(v-if="isFirstPdComplain")
        .flex.mgh-32
            img.mgr-12(src="//o0x80w5li.qnssl.com/red_dot.png")
            a.fz-30.bold.user-txt 存疑商品举报
        .content.fz-26.gray
            p 1. 商品举报是维护商城品质的重要举措，我们希望借助玉友的力量，共同维护商城良好的品质和氛围。
            p 2. 管理员会对举报商品进行二次审核，如举报情况属实将对商品下架、删除，同时系统会根据不合规商品数量和严重程度，调整商品所属店铺的展示权重。
            p 3. 举报信息直接提交至美玉秀秀官方管理员，被举报人不会知晓举报者的任何信息。
            p 4. 请合理使用举报权利，如出现滥用举报、恶意举报等破坏秩序的情况，管理员将对举报者采取封号等处理手段。
        .btn.bg-red.white.line-height-90.center.mgh-32.fz-30(@click="clearWarn") 我知道了
    template(v-else)
        .gray.fz-30.bg-white.pdh-32.pdt-36.bdb(v-if="!result && $route.params.type === 'pd'")
            p.user-txt 举报是根据玉友自身经验，帮助管理员筛查疑似不合规的商品的重要的辅助手段。
            p.user-txt.pdb-32 依据您的经验判断，您认为这件商品：
        template(v-if="!result")
            .bg-white(v-for="item in items")
                .option.mgl-32.pdr-32.bdb.flex(@click="select(item.id)")
                    .fz-30.flex-1 {{item.desc}}
                    icon(:name="item.selected ? 'selected' : 'select'")
                textarea.pd-32.fz-30(v-if="item.desc==='其他' && item.selected", placeholder="填写投诉原因（必填）", v-model="content")
            .bg-white(v-if="items.length === 0")
                textarea.single-item.fz-30(placeholder="请您描述您对目前鉴宝师鉴定结果的看法和观点，此信息提交后只有管理员能看到。", v-model="content")
        template(v-else)
            .result.fz-30.user-txt.center.mgh-32 {{feedback}}
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
            isFirstPdComplain: false,
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
                ], [
                    {
                        id: 0,
                        desc: '皮色存疑',
                        selected: false
                    }, {
                        id: 1,
                        desc: '疑似仿籽',
                        selected: false
                    }, {
                        id: 2,
                        desc: '疑似非和田玉冒充和田玉',
                        selected: false
                    }, {
                        id: 3,
                        desc: '图片、视频展示的信息和卖家通过标题、属性描述的信息不相符',
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

    computed: {
        feedback() {
            let txt = ''
            if(this.$route.params.type === 'pd') {
                txt = '举报已受理，管理员会对您举报的商品进行二次审核，感谢您对美玉秀秀商城秩序的维护，美玉秀秀因为有你更精彩。'
            } else {
                txt = `您的${(this.$route.params.type === 'sh') ? '投诉' : '举报'}已受理，管理员会在1个工作日内处理，感谢您对美玉秀秀的维护和支持。`
            }
            return txt
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
                let reasons = this.reasons[1]
                if(this.$route.query.order) {
                    reasons.splice(reasons.length - 1, 1, {
                        id: reasons.length - 1,
                        desc: '收到的商品和描述不一致',
                        selected: false
                    },  {
                        id: reasons.length,
                        desc: '其他',
                        selected: false
                    })
                }
                this.items = reasons
                break
            case 'cm':
                title = '举报评论'
                this.items = this.reasons[2]
                break
            case 'pd':
                this.isFirstPdComplain = this.$store.get('first-pd-complaint') !== false
                title = '存疑商品举报'
                this.items = this.reasons[3]
                break
            case 'jb-1':
                title = '不认同鉴定结果'
                break
            case 'jb-2':
                title = '求鉴宝有滥用鉴宝资源嫌疑'
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
            let target_type = this.$route.params.type
            const isJianbao = _.includes(target_type, '-')
            if(isJianbao) { // 举报鉴宝
                target_type = target_type.substr(0, target_type.indexOf('-'))
            }
            if(!this.result && (this.content || this.reason)) {
                this.$post(`users/complaints`, {
                    target_id: this.$route.params.id,
                    target_type,
                    reason: (isJianbao ? document.title + ": " : '') + (this.content || this.reason),
                    remark: this.$route.query.order || ''
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
        },

        clearWarn() {
            this.$store.set('first-pd-complaint', false)
            this.isFirstPdComplain = false
        }
    }
}
</script>
