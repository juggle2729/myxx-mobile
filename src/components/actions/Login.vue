<style lang="sass">
.login {
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
            <input name="code" v-model="code" type="text" placeholder="验证码"><input @click="getCode" type="button" class="white bg-red" v-model="label">
        </div>
        <div v-show="msg" class="msg font-34 bg-default red padding">{{msg}}</div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            phone: localStorage.getItem('MYXX_USER') ? JSON.parse(localStorage.getItem('MYXX_USER')).phone : '',
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
                    .then(resp => {
                        if(resp.data.status === 200) {
                            this.msg = '登录成功';
                            const user = JSON.stringify(resp.data.data);
                            localStorage.setItem('MYXX_USER', user);
                            // 处理保存的请求
                            if(localStorage.getItem(this.uid)) {    
                                const {url, method, data} = JSON.parse(localStorage.getItem(this.uid));
                                console.debug(url, method, this.$req);
                                this.$req(url, method, data)
                                    .then(() => {
                                        localStorage.removeItem(this.uid);
                                        this.action('toast', {success: 1, text: '操作成功'});
                                    });
                            } else {
                                this.close();
                            }
                        } else {
                            this.msg = resp.data.message
                        }
                    });
            } else {
                this.msg = '';
            }
        })
    },
    methods: {
        getCode() {
            document.querySelector("[name='code']").focus();
            if(this.label === '获取验证码') {
                if(/^1\w{10}$/.test(this.phone)) {
                    this.$http.get(`users/login/verify?phone=${this.phone}`)
                        .then(resp => {
                            if(resp.data.status === 200) {
                                let countdown = 60;
                                let interval = setInterval(() => {
                                    this.label = --countdown;
                                    if(!countdown) {
                                        clearInterval(interval);
                                        this.label = '获取验证码';
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
            // localStorage.removeItem(this.uid);
            this.params.handler = undefined;
        }
    }
}
</script>