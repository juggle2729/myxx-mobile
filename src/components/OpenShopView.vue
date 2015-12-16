<style lang="sass">
.openshop {
    .banner {
        display: -webkit-box;
        height: 600px;
        position: relative;
        background-color: #3865a7;
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
            color: #4cd18e;
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
            background-color: #4cd18e;
        }
    }
    .textarea {
        > p:nth-of-type(1) {
            font-size: 22px;
            color: #3865a7;
            margin-top: 32px;
            width: 100%;
            text-align: center;
        }
        .inner1 {
            margin: 64px 7px 0 92px;
            > p {
                margin: -6px 0;
                font-size: 30px;
                color: #9d9d9d;
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
            > p {
                font-size: 30px;
                color: #9d9d9d;
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
            > div {
                display: table;
                margin-left: 188px;
                height: 106px;
                position: absolute;
                p {
                    display: table-cell;
                    vertical-align: middle;
                    line-height: 38px;
                    margin-top: 86px;
                    font-size: 26px;
                }
            }
            > p {
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
        background-color: #184b96;
        display: block;
        width: 100%;
        height: 16px;
    }
    .out {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
        .apply {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 540px;
            height: 615px;
            border-radius: 10px;
            transform: translate(-50%, -50%);
            .top {
                padding: 32px 61px;
                height: 520px;
                .text{
                    height: 64px;
                    margin-bottom: 32px;
                    > p {
                        line-height: 38px;
                    }
                }
                .input {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-top: 0;
                    width: 418px;
                    height: 360px;
                    > input {
                        width: 418px;
                        border-radius: 4px;
                        border-style: solid;
                        border-width: 1px;
                        border-color: #d9d9d9;
                        height: 80px;
                        padding: 32px;
                        font-size: 26px;
                    }
                    > textarea {
                        padding: 28px 32px;
                        font-size: 26px;
                        height: 160px;
                        resize: none;
                        border-radius: 4px;
                        border-color: #d9d9d9;
                    }
                }
            }
            .bottom {
                border-radius: 0 0 10px 10px;
                height: 95px;
                width: 100%;
                padding: 13px 0;
                > div {
                    float: left;
                    width: 50%;
                    height: 100%;
                }
            }
            ::-webkit-input-placeholder {
                color: #c6c6c6;
                font-size: 26px;
            }
        }
    }
}
</style>
<template>
    <div class="openshop">
        <div class="banner">
            <img :src="banner" />
            <p>{{title}}</p>
            <button @click="toggleApply">
                <span>立即申请</span>
            </button>
        </div>
        <div class="separ"></div>
        <div class="textarea">
            <p> 快速申请开通店铺，也可联系我们，400-0000-8888</p>
            <div class="inner1">
                <p> 美玉秀秀是国内最大的和田玉鉴定社交交易平台，全国各地超过4000家高品质店铺现已入驻，期待您的加入。</p>
            </div>
            <div class="title">
                <p>开通店铺优势</p>
                <hr style="border-top:1px ridge #d9d9d9;"></hr>
            </div>
            <div class="text">
                <div>
                    <p>高品质和田玉资源齐聚
                        <br>全国海量高端用户云集
                        <br>广阔市场为您的店铺打开</p>
                </div>
                <p>海量用户</p>
                <img src="/static/images/open/od1.png" />
            </div>
            <div class="text">
                <div>
                    <p>各种推广方式，全方位精准推广
                        <br>全面提升店铺的知名度和交易量</p>
                </div>
                <p>精准推广</p>
                <img src="/static/images/open/od2.png" />
            </div>
            <div class="text">
                <div>
                    <p valign="middle">私人定制，精雕细琢
                        <br>彰显您高端的品牌文化</p>
                </div>
                <p>鉴宝权限</p>
                <img src="/static/images/open/od3.png" />
            </div>
            <div class="text">
                <div>
                    <p>多渠道销售途径全面打开市场
                        <br>为您打造高效的销售网络</p>
                </div>
                <p>精准推广</p>
                <img src="/static/images/open/od4.png" />
            </div>
            <div class="title">
                <p>申请条件</p>
                <hr style="border-top:1px ridge #d9d9d9;"></hr>
            </div>
            <p class="inner2">只要您想提升自己的知名度，均可提出申请。</p>
            <div class="title">
                <p>开通流程</p>
                <hr style="border-top:1px ridge #d9d9d9;"></hr>
            </div>
            <div class="bottom">
                <img src="/static/images/open/od5.png" />
            </div>
        </div>
        <div class="out" v-show="applyShow">
            <div class="apply bg-white" >
                <div class="top border-bottom">
                    <div class="text">
                        <p class="font-26" align="center">您正在申请开通店铺,请填写以下信息,我们会在两个工作日内联系您。</p>
                    </div>
                    <div class="input">
                        <input type="text" placeholder="手机号" value="15012345678">
                        <input type="text" placeholder="姓名">
                        <textarea placeholder="简介，50字以内"></textarea>
                    </div>
                </div>
                <div class="bottom" >
                    <div class="border-right" @click="submit"><p class="font-26 center center-vertical" style="color:#2ab869">确认申请</p></div>
                    <div @click="toggleApply" ><p class="font-26 center center-vertical">取消</p></div>
                </div>
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
                applyShow: false
            };
        },
        methods: {
          submit() {
              this.toast('申请店铺', 1000);
          },
          toggleApply() {
              this.applyShow = !this.applyShow;
          }
        }
    }
</script>
