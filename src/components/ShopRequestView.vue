<template>
<div class="shop-request">
    <div class="openshop bg-white" :class="{'hide': requestShow}">
        <div class="banner">
            <img class="center-horizontal" :src="banner" />
            <p class="font-30 center-horizontal">{{title}}</p>
            <button v-touch:tap="toggleShow" class="font-30 center-horizontal white">
                <span>立即申请</span>
            </button>
        </div>
        <div class="separ"></div>
        <div class="textarea">
            <div class="content">
                <p class="font-22 blue"> 快速申请开通店铺，也可联系我们，400-0000-8888</p>
                <p class="font-30 line-42"> 美玉秀秀是国内最大的和田玉鉴定社交交易平台，全国各地超过4000家高品质店铺现已入驻，期待您的加入。</p>
            </div>
            <div class="title border-bottom font-30">
                <p >开通店铺优势</p>
            </div>
            <div class="text flex">
                <div class="left font-22">
                    <img src="/static/images/open/od1.png" />
                    <p>海量用户</p>
                </div>
                <div class="right font-26 flex">
                    <p>高品质和田玉资源齐聚
                        <br>全国海量高端用户云集
                        <br>广阔市场为您的店铺打开</p>
                </div>
            </div>
            <div class="text flex">
                <div class="left font-22">
                    <img src="/static/images/open/od2.png" />
                    <p>精准推广</p>
                </div>
                <div class="right font-26 flex">
                    <p>各种推广方式，全方位精准推广
                        <br>全面提升店铺的知名度和交易量</p>
                </div>
            </div>
            <div class="text flex">
                <div class="left font-22">
                    <img src="/static/images/open/od3.png" />
                    <p>鉴宝权限</p>
                </div>
                <div class="right font-26 flex">
                    <p valign="middle">私人定制，精雕细琢
                        <br>彰显您高端的品牌文化</p>
                </div>
            </div>
            <div class="text flex">
                <div class="left font-22">
                    <img src="/static/images/open/od4.png" />
                    <p>精准推广</p>
                </div>
                <div class="right font-26 flex">
                    <p>多渠道销售途径全面打开市场
                        <br>为您打造高效的销售网络</p>
                </div>
            </div>
            <div class="separ-38"></div>
            <div class="title border-bottom font-30">
                <p>申请条件</p>
            </div>
            <div class="content">
                <p class="font-26">只要您想提升自己的知名度，均可提出申请。</p>
            </div>
            <div class="title border-bottom font-30">
                <p>开通流程</p>
            </div>
            <div class="bottom">
                <img class="center-horizontal" src="/static/images/open/od5.png" />
            </div>
        </div>
    </div>
    <div class="request" :class="{'hide': !requestShow}">
        <div class="text font-30">
            <p>您正在申请开通店铺，请填写以下信息。</p>
            <p style="margin-top:8px">我们会在两个工作日内联系你。</p>
        </div>
        <div class="input">
            <input class="font-30 border-default" type="text" placeholder="手机号" v-model="contact" maxlength="20"><div></div>
            <input class="font-30 border-default"  type="text" placeholder="姓名" v-model="name" maxlength="20"><div></div>
            <textarea class="font-30 border-default" placeholder="申请说明，50字以内(选填)" maxlength="50" v-model="content"></textarea>
            <button v-touch:tap="submit" class="white font-30" :class="{ 'bg-red': checked, 'bg-gray': !checked}" :disabled="!checked">
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
            banner: '/static/images/open/odbanner.png',
            title: '【人人皆可拥有】',
            requestShow: false,
            type: 'shop',
            contact: 0,
            photo: 0,
            name: '',
            content: '',
            checked: false
        };
    },
    created() {
        this.$watch('result', (data) => {
            if(data.name !== '' && data.phone !== 0){
                this.checked = true;
            } else {
                this.checked = false;
            }
        });
    },
    route: {
        data() {
            this.$get(`users/${this.$route.params.id}/basic`)
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
                    this.action('toast', {success: 1, text: '已成功提交'});
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
.shop-request {
    .openshop {
        .banner {
            height: 600px;
            position: relative;
            padding-top: 108px;
            background-color: #3865a7;
            > img {
                height: 280px;
                width: 320px;
            }
            > p {
                margin-top: 54px;
                width: 340px;
                text-align: center;
                color: #4cd18e;
            }
            > button {
                margin-top: 55px;
                height: 90px;
                width: 392px;
                border: 0;
                background-color: #4cd18e;
            }
        }
        .textarea {
            padding: 0 32px;
            .content {
                padding: 32px 64px;
                .blue {
                    color: #3865a7;
                    text-align: center;
                }
                .line-42 {
                    margin-top: 58px;
                    line-height: 42px;
                }
            }
            .title {
                margin-top: 22px;
                padding: 24px 0;
            }
            .text {
                padding-left: 64px;
                margin-top: 50px;
                height: 108px;
                position: relative;
                .left {
                    width: 100px;
                    > img {
                        margin-left: 10px;
                        width: 72px;
                        height: 72px;
                    }
                    > p {
                        margin-top: 14px;
                    }
                }
                .right {
                    margin-left: 88px;
                    height: 108px;
                    p {
                        line-height: 38px;
                    }
                }
            }
            .bottom {
                height: 382px;
                position: relative;
                margin-top: 50px;
                > img {
                    width: 558px;
                    height: 182px;
                }
            }
        }
        .separ {
            background-color: #184b96;
            display: block;
            width: 100%;
            height: 16px;
        }
        .separ-38 {
            height: 38px;
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
                div {
                    height: 14px;
                }
                textarea {
                    margin-top: 14px;
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
