<style lang="stylus">
.apply-master
    padding: 39px 32px
    position: relative
    .text
        line-height: 48px
    .input
        width: 100%
        margin-top:15px
        input
            width: 100%
            border-radius: 6px
            border-style: solid
            border-width: 1px
            height: 80px
            padding: 30px 20px
        input:nth-of-type(2)
            margin-top: 30px
        textarea
            margin-top: 30px
            width: 100%
            padding: 30px 20px
            height: 180px
            resize: none
            border-radius: 6px
        input:active, input:focus, textarea:active, textarea:focus
            border-color: #cc3f4f
        button
            height: 80px
            width: 100%
            border: 0
            border-radius: 8px
            margin-top: 30px
    .title
        margin-top: 56px
        padding-bottom: 24px
    .imgs
        height: 224px
        padding: 56px 80px
        .tr
            .tb
                > span
                    margin-left: 32px
                > img:nth-of-type(2)
                    margin-left: 120px
        > .tr:nth-of-type(2)
            margin-top: 44px
        img
            width: 60px
            height: 60px
    .bottom
        margin-top: 56px
</style>
<template lang="jade">
.apply-master
    .text.fz-30 申请和田玉鉴定权限————需要您是玉石行业的匠师、雕刻师、资深藏家。
        br
        | 如果您有意向请填写以下信息，美玉秀秀客服人员会在两个工作日内联系您！
        .input
            input.fz-30.bd(type="tel", placeholder="手机号", v-model="contact", maxlength="20")
            input.fz-30.bd(type="text", placeholder="姓名", v-model="name", maxlength="20")
            textarea.fz-30.bd(placeholder="申请说明，50字以内(选填)", maxlength="50", v-model="content")
            button.white.fz-30.bg-gray(@click="submit", :class="{'bg-red': complete}")
                span 提交
        .title.fz-30.bdb
            p 大师特权
            .imgs.fz-26
                .tr
                    .tb.flex
                        img(:src="'open/om1.png' | qn")
                        span.flex.bold 大师官网
                        img(:src="'open/om2.png' | qn")
                        span.flex.bold 鉴宝权限
                .tr
                    .tb.flex
                        img(:src="'open/om3.png' | qn")
                        span.flex.bold 专属店铺
                        img(:src="'open/om4.png' | qn")
                        span.flex.bold 精准推广
        .bottom.fz-26.gray.center 美玉秀秀客服：400-058-7266
</template>
<script>
    export default {
        name: 'ApplyMaster',
        data() {
            return {
                type: 'identify_jianbao',
                contact: '',
                name: '',
                content: '',
                complete: false
            }
        },
        computed: {
            complete() {
                return this.contact && this.name
            },
            isValid() {
                return this.contact.length === 11
            },
            result(){
                return {
                    permission: this.type,
                    owner_phone: this.contact,
                    owner_name: this.name,
                    content: this.content
                }
            }
        },
        methods: {
            submit() {
                if(this.complete && this.isValid) {
                    this.$post('users/perm_requests', this.result)
                        .then(() => {
                            this.action('toast', {text: '工作人员两日内联系您！', success: 1})
                            setTimeout(() => {
                                this.action('back', {step: 1, refresh: true})
                            }, 1500)
                         })
                } else if(this.complete && !this.isValid) {
                    this.action('toast', {success: 0, text: '请填写正确的手机号'})
                }
            }
        }
    }
</script>
