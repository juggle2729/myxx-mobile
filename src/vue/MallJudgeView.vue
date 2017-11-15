<style lang="stylus">
.mall-judge-view
    padding-bottom 51px
    .logo
        width 80px
        height 80px
    .icon
        width 46px
        height 46px
        vertical-align 5px
    .item + .item
        margin-top 50px
    textarea
        resize none
        width 100%
        height 200px
        line-height 1.3
        border-radius 0
        &::-webkit-input-placeholder
            color #d6d6d6
    .options
        margin-left 93px
    .option + .option
        margin-top 42px
    .checkbox
        background-image url('//o0x80w5li.qnssl.com/judge_uncheck.png')
        background-size cover
        width 30px
        height 30px
        &.checked
            background-image url('//o0x80w5li.qnssl.com/judge_check.png')
    .submit
        width 642px
        line-height 80px
        border-radius 40px
        margin 51px 54px 51px
    .mark
        background-image url('//o0x80w5li.qnssl.com/judge_success.png')
        background-size 100px
        background-position center
        margin 112px 0 39px 0
        width 100%
        height 100px
    .desc
        margin 48px 75px 0
        line-height 39px
    .know
        width 400px
        line-height 80px
        margin 114px 175px 0
        border-radius 40px
</style>
<template lang="pug">
.mall-judge-view
    template(v-if="!succeed")
        .flex.mgh-25.pdv-25.bdb
            .logo(v-bg="photo")
            .mgl-26.fz-34.bold.black-24 {{ title }}
        .items.mgh-25.mgv-39
            .item(v-for="item in items[type]")
                .flex(@click="onChangeChoice(item)")
                    icon.mgl-25(:name="choice === item.id ? 'checked' : 'uncheck'")
                    .fz-30.black-24.mgl-20 {{ item.desc }}
                textarea.mgt-32.bg-gray-f7.pd-22.fz-30.bd(v-if="item.id === 'ot' && choice === item.id", v-model="desc", :placeholder="'输入评判内容（必填）'")
                .options.mgv-46(v-if="item.options && item.id === choice", @click.stop="doNothing")
                    .option.flex(v-for="option in item.options", @click.stop="onSelectOption(option)")
                        .checkbox(:class="desc.indexOf(option) !== -1 ? 'checked': ''")
                        .mgl-13.gray-6b.fz-26 {{ option }}
        .white.bg-red-e6.center.fz-36.submit(@click="onSubmit") 提交评判
    template(v-else)
        .mark
        .mgt-59.black-47.fz-40.center 提交成功
        .gray-b3.fz-24.desc.center 感谢您为玉石行业的健康发展添砖加瓦，一起出力构建良性的行业生态！
        .know.white.fz-36.bg-red-e6.center(@click="onKnow") 我知道了
</template>
<script>
export default {
    name: 'mall-judge-view',

    data() {
        return {
            id: 0,
            type: '',
            photo: '',
            title: '',
            choice: 'gd',
            desc: '',
            items: {
                pd: [
                    {
                        id: 'gd',
                        desc: '如实描述',
                    },
                    {
                        id: 'bd',
                        desc: '未如实描述',
                        options: ['人工染色', '图片模糊', '人工毛孔', '滚筒修型', '标题属性与商品本身不符', '未达到和田玉官方标准', '未达到A货翡翠标准', '籽料特征模糊', '未展现籽料特征', '图片与视频差异性大']
                    },
                    {
                        id: 'ot',
                        desc: '其他',
                    }
                ],
                sh: [
                    {
                        id: 'gd',
                        desc: '值得推荐',
                    },
                    {
                        id: 'bd',
                        desc: '需要整改',
                        options: ['大量商品未如实描述或虚假描述', '大量商品图片、视频明显夸大', '大量出售非和田玉、翡翠商品']
                    },
                    {
                        id: 'ot',
                        desc: '其他',
                    }
                ]
            },
            submitting: false,
            succeed: false
        }
    },

    route: {
        data({ to }) {
            const { type, id } = to.params
            this.type = type
            this.id = id
            this.desc = this.items[this.type][0].desc

            if (this.type === 'pd') {
                this.action('updateTitle', {text: '评判商品'})
                return this.$fetch('mall/products/'+ this.id).then(({first_picture, title}) => {
                    this.photo = first_picture
                    this.title = title
                })
            } else if (this.type === 'sh') {
                this.action('updateTitle', {text: '评判店铺'})
                return this.$fetch(`mall/shop/${this.id}/profile`).then(({logo, shop_name}) => {
                    this.photo = logo
                    this.title = shop_name
                })
            }
        }
    },

    methods: {
        onChangeChoice(item) {
            if (this.choice === item.id) return
            this.choice = item.id
            this.desc = this.choice === 'gd' ? item.desc : ''
        },

        onSubmit() {
            if(!this.desc.trim()) {
                this.action('toast', {success: 0, text: '请填写理由'})
                return
            }

            this.submitting = true
            this.$post('mall/judgement', {
                target_type: this.type,
                target_id: this.id,
                value: this.choice,
                desc: this.desc.trim()
            }).then(() => {
                this.succeed = true
                this.submitting = false

                window.scroll(0, 0) // 成功之后，回到页面顶部
            }, err => {
                this.action('toast', {success: 0, text: err.message})
                this.submitting = false
            })
        },

        onKnow() {
            this.action('back', {step: 1, refresh: true})
        },

        onSelectOption(option) {
            const descArray = this.desc.length ? this.desc.split(',') : []
            if (_.includes(descArray, option)) {
                descArray.splice(descArray.indexOf(option), 1)
            } else {
                descArray.push(option)
            }
            this.desc = descArray.join(',')
        },

        doNothing() {}
    }
}
</script>