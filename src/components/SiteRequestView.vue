<template>
<div class="site-request">
    <div class="opensite bg-white" :class="{'hide': requestShow}">
        <div class="banner">
            <img :src="'open/osbanner.png' | qn" />
            <p>{{title}}</p>
            <button @click="toggleShow">
                <span>立即申请</span>
            </button>
        </div>
        <div class="separ"></div>
        <div class="textarea">
            <p> 快速申请开通官网，也可联系我们，400-0587-266</p>
            <div class="inner1">
              <p > 美玉秀秀是全国最大最权威的和田玉鉴定、社交、交易平台，倾力打造的大师官网正虚位以待，期待您的加入。</p>
            </div>
            <div class="title border-bottom">
                <p>开通官网优势</p>
            </div>
            <div class="text">
                <p>汇聚海量高端用户
                    <br>领略大师风采尽在美玉秀秀</p>
                <p>海量用户</p>
                <img :src="'open/os1.png' | qn" />
            </div>
            <div class="text">
                <p>私人定制，精雕细琢
                    <br>全方位打造玉界明星</p>
                <p>个性定制</p>
                <img :src="'open/os2.png' | qn" />
            </div>
            <div class="text">
                <p>入驻美玉秀秀，获得鉴宝权限
                    <br>突显您渊博的学识和丰富的经验</p>
                <p>鉴宝权限</p>
                <img :src="'open/os3.png' | qn" />
            </div>
            <div class="text">
                <p>多种运营方式，精准推广大师
                    <br>全面提升您的知名度</p>
                <p>精准推广</p>
                <img :src="'open/os4.png' | qn" />
            </div>
            <div class="title border-bottom">
                <p>申请条件</p>
            </div>
            <p class="inner2">只要您想提升自己的知名度，均可提出申请。</p>
            <div class="title border-bottom">
                <p>开通流程</p>
            </div>
            <div class="bottom">
                <img :src="'open/os5.png' | qn" />
            </div>
        </div>
    </div>
    <div class="request" :class="{'hide': !requestShow}">
        <div class="text font-30">
            <p>您正在申请开通官网，请填写以下信息。</p>
            <p style="margin-top:8px">我们会在两个工作日内联系你。</p>
        </div>
        <div class="input">
            <input class="font-30 border-default" type="text" placeholder="手机号" v-model="contact" maxlength="20">
            <input class="font-30 border-default"  type="text" placeholder="姓名" v-model="name" maxlength="20">
            <textarea class="font-30 border-default" placeholder="申请说明，50字以内(选填)" maxlength="50" v-model="content"></textarea>
            <button @click="submit" class="white font-30" :class="{ 'bg-red': checked, 'bg-gray': !checked}" :disabled="!checked">
                <span>提交</span>
            </button>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'SelfEvaluation',
    data() {
        return {
            title: '【人人皆可拥有】',
            requestShow: false,
            type: 'website',
            contact: 0,
            photo: 0,
            name: '',
            content: '',
            checked: false
        };
    },
    created() {
        this.$watch('result', (data) => {
            if(data.phone !== 0){
                this.checked = true;
            } else {
                this.checked = false;
            }
        });
    },
    route: {
        data() {
            return this.$get(`users/${this.self.id}/basic`)
               .then((data) => {
                   this.contact = data.phone;
               });
        }
    },
    computed: {
        result(){
            let phoneReg = /^[1]\d{10}$/i;
            if(phoneReg.test(this.contact)){
                this.phone = this.contact;
            } else {
                this.phone = 0;
            }
            return {
                type: this.type,
                phone: this.phone,
                name: this.name,
                content: this.content
            };
        }
    },
    methods: {
        submit() {
            this.$post('users/feedbacks', this.result)
                .then(() => {
                    this.action('modal');
                });
            this.toggleShow();
        },
        toggleShow() {
            this.requestShow = !this.requestShow;
        }
    }
}
</script>
<style lang="sass">
.site-request {
    .opensite {
        .banner {
            display: -webkit-box;
            height: 600px;
            position: relative;
            background-color: #ce3f3f;
            > img {
                height: 260px;
                width: 340px;
                position: absolute;
                left: 50%;
                margin-left: -170px;
                margin-top: 120px;
            }
            > p {
                position: absolute;
                margin-top: 438px;
                width: 340px;
                left: 50%;
                margin-left: -170px;
                text-align: center;
                font-size: 30px;
                color: #f7bd40;
            }
            > button {
                position: absolute;
                color: #fff;
                height: 90px;
                width: 392px;
                border: 0;
                left: 50%;
                margin-left: -196px;
                margin-top: 526px;
                font-size: 30px;
                background-color: #f7bd40;
            }
        }
        .textarea {
            > p:nth-of-type(1) {
                font-size: 22px;
                color: #cc3f3f;
                margin-top: 32px;
                width: 100%;
                text-align: center;
            }
            .inner1 {
                margin: 64px 80px 0 96px;
                > p {
                    margin: -6px 0;
                    font-size: 30px;
                    line-height: 42px;
                    width: 100%;
                }
            }
            .inner2 {
                font-size: 26px;
                margin-top: 36px;
                padding-left: 96px;
                padding-right: 96px;
                width: 100%;
            }
            .title {
                margin-top: 84px;
                padding-bottom: 24px;
                margin-right: 32px;
                background-position: 32px 100%;
                > p {
                    font-size: 30px;
                    padding-left: 32px;
                    width: 100%;
                }
                > hr {
                    margin: 24px 32px 0;
                }
            }
            .text {
                padding-left: 96px;
                margin-top: 50px;
                height: 108px;
                position: relative;
                > img {
                    margin-left: 10px;
                    width: 72px;
                    height: 72px;
                }
                > p:nth-of-type(1) {
                    margin-left: 188px;
                    margin-top: 16px;
                    line-height: 38px;
                    position: absolute;
                    font-size: 26px;
                }
                > p:nth-of-type(2) {
                    position: absolute;
                    margin-top: 86px;
                    font-size: 22px;
                }
            }
            .bottom {
                height: 382px;
                position: relative;
                margin: 50px 96px 0;
                img {
                    width: 558px;
                    height: 182px;
                }
            }
        }
        .separ {
            background-color: #a43232;
            display: block;
            width: 100%;
            height: 16px;
        }
    }
    .request {
            padding: 48px 32px;
            position: relative;
            .text {
                height: 70px;
            }
            .input {
                width: 100%;
                margin-top: 32px;
                input {
                    width: 100%;
                    border-radius: 4px;
                    border-style: solid;
                    border-width: 1px;
                    height: 80px;
                    padding: 32px;
                }
                input:active, input:focus ,
                textarea:active, textarea:focus{
                    border-color: #cc3f4f;
                }
                input:nth-of-type(2) {
                    margin-top: 30px;
                }
                textarea {
                    margin-top: 30px;
                    width: 100%;
                    padding: 28px 32px;
                    height: 180px;
                    resize: none;
                    border-radius: 4px;
                }
                button {
                    height: 80px;
                    width: 100%;
                    border: 0;
                    border-radius: 8px;
                    margin-top: 32px;
                }
            }
            ::-webkit-input-placeholder {
                color: #888888;
            }
    }
}
</style>
