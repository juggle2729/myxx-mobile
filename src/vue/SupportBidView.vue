<style lang="stylus">
.support-bid-view
    .form
        padding: 36px 32px 32px
    textarea
        border-radius: 8px
        font-size: 30px
        width: 100%
        height: 120px
        border: none
        resize: none
    .tag
        line-height: 68px
        border-radius: 8px
        margin-right: 20px
    .submit-btn
        height: 90px
        line-height: 90px
        text-align: center
        margin: 32px 32px 0
        border-radius: 8px
</style>
<template  lang="pug">
.support-bid-view.bg
    .form.bg-white
        textarea(type="text", placeholder="请输入支持理由(140字内)", v-model="input.comment")
        .fz-30.gray.bdt.pdt-32.pdb-8 请至少选一个标签
        .tag.fz-26.bg.inline-block.pdh-30(v-for="tag in input.tags", @click="tag.on = !tag.on", :class="{'bg-red white': tag.on}") {{tag.label}}
    .submit-btn.white.fz-30(@click="submit()", :class="{'bg-red': valid, 'bg-disable': !valid}") 提交
</template>
<script>
const tags = '真皮真籽,皮色漂亮,肉细,结构致密,白度好,油性好,无明显瑕疵,雕工精致,苏工,海派工,价格公道,捡漏了,老熟度好'
export default {
    name: 'support-bid',

    data() {
        return {
            input: {
                comment: '',
                tags: tags.split(',').map(t => ({label: t, on: false}))
            },
            support: {},
            valid: false
        }
    },

    ready() {
        this.$watch('input', input => {
            this.support.comment = input.comment.trim()
            this.support.tags = _.chain(this.input.tags).filter(tag => tag.on).map(tag => tag.label).value()
            this.valid = this.support.comment.length > 0 && this.support.comment.length <= 140 && this.support.tags.length
        }, {deep: true})
    },

    methods: {
        submit() {
            if(this.valid) {
                this.$post(`mall/bid/${this.$route.params.id}/support`, this.support)
                    .then(resp => {
                        this.action('back', {step: 1, refresh: true})
                    })
            }
        }
    }
}
</script>