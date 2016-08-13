<style lang="sass">
.login {
    &.pop-transition {
        transition: transform .3s ease;
        transform: translate3d(0, 0, 0);
    }
    &.pop-enter, &.pop-leave {
        transform: translate3d(0, 100%, 0);
    }
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: white;
    height: 100%;
    padding: 0 50px;
    .close {
        text-align: right;
        color: #888888;
        padding-top: 20px;
        cursor: pointer;
    }
    img {
        padding-top: 130px;
        width: 178px;
        padding-bottom: 110px;
    }
    input {
        border: 1px solid #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        letter-spacing: 15px;
        padding: 20px;
        margin-bottom: 30px;
        &[name='phone'] {
            width: 100%;
        }
        &[name='code'] {
            width: 50%;
            border-right: none;
        }
        &[type='button'] {
            width: 50%;
            padding: 24px;
            cursor: pointer;
        }
    }
}
</style>
<template>
    <div class="login center">
        <div class="close" @click="close">&times;</div>
        <img :src="'profile/about.png' | qn">
        <div>
            <input name="phone" v-model="phone" type="text" placeholder="手机号">
            <input name="code" v-model="code" type="text" placeholder="验证码"><input @click="requestCode" type="button" class="white bg-red" v-model="label">
        </div>
        <div v-show="msg" class="msg font-34 bg-default red padding">{{msg}}</div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            phone: this.$store.get('phone') || 1,
            code: '',
            msg: '',
            label: '获取验证码'
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
                verify_code: this.code,
                device_type: 0
            };
        }
    },
    ready() {
        document.querySelector("[name='phone']").focus();
        this.$watch('formData', data => {
            if(/^1\w{10}$/.test(data.phone) && /^\w{4}$/.test(data.verify_code)) {
                this.$http.post('users/login', data)
                    .then(({data: resp}) => {
                        if(resp.status === 200) {
                            this.msg = '登录成功';
                            const user = resp.data;
                            this.$store.set('phone', data.phone);
                            this.$store.set('user', user);
                            this.$root.user = user;
                            this.params.cb(user);
                            this.close();
                        } else {
                            this.msg = resp.message
                        }
                    });
            } else {
                this.code = '';
                this.msg = '';
            }
        })
    },
    methods: {
        requestCode() {
            this.$el.querySelector("[name='code']").focus();
            if(this.label === '获取验证码') {
                if(/^1\w{10}$/.test(this.phone)) {
                    this.$http.get(`users/login/verify?phone=${this.phone}`)
                        .then(resp => {
                            if(resp.data.status === 200) {
                                this.getCode();
                                let countdown = 10;
                                this.label = countdown;
                                let interval = setInterval(() => {
                                    this.label = --countdown;
                                    if(!countdown || this.msg) {
                                        clearInterval(interval);
                                        this.label = '获取验证码';
                                        this.msg = this.msg || '超时,请重试';
                                    }
                                }, 1000);
                            } else {
                                this.msg = resp.data.message;
                            }
                        });
                } else {
                    this.msg = '手机号错误';
                }
            }
        },
        close() {
            this.$store.remove(this.uid);
            this.params.handler = undefined;
        },

        getCode() {
            const url = this.config.api + '/common/sms';
            if(!this.env.isTest) {
                this.msg = '看手机';
            } else {
                // 自动获取验证码
                this.$http.get(url)
                    .then(resp => {
                        if(resp.status === 200) {
                            const code = resp.data
                                .split('<hr>')
                                .slice(0, 3)
                                .map(record => record.replace(/\D+/g, '-').match(/\d{11}-\d{4}/).pop().split('-'))
                                .filter(record => record[0] === this.phone)
                                .shift()
                                .pop();
                            this.code = code;
                        }
                    })
            }
        }
    }
}
</script>
