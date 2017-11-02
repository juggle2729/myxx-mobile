<style lang="stylus">
.mall-judge-view
    .logo
        width 80px
        height 80px
    .icon
        width 46px
        height 46px
    .item + .item
        margin-top 50px
    textarea
        resize none
        width 100%
        height 200px
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
        margin 51px 54px 0
</style>
<template lang="pug">
.mall-judge-view
    .flex.mgh-25.pdv-25.bdb
        .logo(v-bg="photo")
        .mgl-26.fz-34.bold.black-24 {{ title }}
    .items.mgh-25.mgv-39
        .item(v-for="item in items[type]", @click="choice = item.id")
            .flex
                icon.flex.mgl-25(:name="choice === item.id ? 'checked' : 'uncheck'")
                .fz-30.black-24.mgl-20 {{ item.desc }}
            textarea.mgt-32.bg-gray-f7.pd-22.fz-30.bd(v-if="item.id !== 'bd' && choice === item.id", v-model="desc", :placeholder="item.id === 'gd' ? '输入推荐分值，满分100分' : '输入评判内容（必填）'")
            .options.mgt-46(v-if="item.options && item.id === choice")
                .option.flex(v-for="option in item.options", @click="desc = option")
                    .checkbox(:class="desc === option ? 'checked': ''")
                    .mgl-13.gray-6b.fz-26 {{ option }}
    .white.bg-red-e6.center.fz-36.submit(@click="onSubmit") 提交评判
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
                sh: [
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
                pd: [
                    {
                        id: 'gd',
                        desc: '值得推荐',
                    },
                    {
                        id: 'bd',
                        desc: '需要整改',
                        options: ['商品存疑', '图片模糊', '图片带有微信号']
                    },
                    {
                        id: 'ot',
                        desc: '其他',
                    }
                ]
            },
            submitting: false
        }
    },

    route: {
        data({ to }) {
            const { type, id } = to.params
            this.type = type
            this.id = id

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
                this.action('toast', {success: 1, text: '评判成功'})
                _.delay(() => {
                    this.action('back', {step: 1, refresh: true})
                    this.submitting = false
                }, 1000)
            }, err => {
                this.action('toast', {success: 0, text: err.message})
                this.submitting = false
            })
        }
    }
}
</script>