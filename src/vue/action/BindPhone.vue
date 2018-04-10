<style lang="stylus">
.bind-phone
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 999
    background-color white
    height 100%
    padding 116px 54px 0
    .form
        margin-top 64px
    input
        font-size 30px
        border 0
        background #f7f7f7
        &[name='phone']
            width 100%
            height 80px
            border 1px solid #ededed
            border-radius 40px
            margin-bottom 30px
            padding 16px 40px
        &[name='code']
            height 100%
            border-right 1px solid #ededed
        &[type='button']
            width 206px
            height 100%
            color #6dcfd1
    .identifying-code
        width 100%
        height 80px
        border 1px solid #ededed
        border-radius 40px
        padding 16px 40px
    .msg
        height 70px
        line-height 70px
    .skip
        margin-top 100px
</style>
<template  lang="pug">
.bind-phone.center
    .fz-40.black-24 绑定手机号
    .fz-24.gray-b3.mgt-12 为了您的账号安全，请绑定手机号
    .form
        input.bg(name="phone", v-model="phone", type="text", placeholder="手机号码")
        .identifying-code.flex.bg
            input.block.flex-1(name="code", v-model="code", type="text", placeholder="输入验证码")
            input.block(@click="requestCode", type="button", v-model="label")
    .msg.fz-30.red-e6.mgt-40 {{msg}}
    .skip.fz-30(@click="close()") 跳过
</template>
<script>
export default {
    name: 'bind-phone',

    data() {
        return {
            phone: '',
            code: '',
            label: '获取验证码',
            msg: ''
        }
    },

    props: {
        params: {
            type: Object,
            required: true
        }
    },

    computed: {
        formData() {
            return {
                phone: this.phone,
                verify_code: this.code
            }
        }
    },

    ready() {
        document.querySelector("[name='phone']").focus()
    },

    watch: {
        formData(newData) {
            if (newData && /^1\w{10}$/.test(newData.phone) && /^\w{4}$/.test(newData.verify_code)) {
                this.$put('users/bind/phone', newData).then(() => {
                    this.msg = '绑定成功'
                    this.action('toast', {success: '1', text: '绑定成功'})
                }).catch(({message}) => {this.msg = message})
            } else {
                this.code = ''
                this.msg = ''
            }
        }
    },

    methods: {
        requestCode() {
            this.$el.querySelector("[name='code']").focus()
            this.msg = ''
            this.code = ''
            if (this.label === '获取验证码') {
                if (/^1\w{10}$/.test(this.phone)) {
                    this.$fetch(`users/login/verify?phone=${this.phone}`).then(() => {
                        this.env.isTest && this.getCode()
                        let countdown = 60
                        this.label = `${countdown}秒后重发`
                        let interval = setInterval(() => {
                            this.label = `${--countdown}秒后重发`
                            if (!countdown || this.msg) {
                                clearInterval(interval)
                                this.label = '获取验证码'
                                this.msg = this.msg || '超时,请重试'
                            }
                        }, 1000)
                    }).catch(({message}) => {this.msg = message})
                } else {
                    this.msg = '手机号错误'
                }
            }
        },

        close() {
            this.$root.user && this.$store.set('bindPhone', false)
            this.params.handler = undefined
        },

        getCode() {
            // 自动获取验证码
            this.$http.get(`${this.config.api}/common/sms`).then(resp => {
                if (resp.status === 200) {
                    const code = resp.data
                        .split('<hr>')
                        .slice(0, 3)
                        .map(record => record.replace(/\D+/g, '-').match(/\d{11}-\d{4}/).pop().split('-'))
                        .filter(record => record[0] === this.phone)
                        .shift()
                        .pop()
                    this.code = code
                }
            })
        }
    }
}
</script>
