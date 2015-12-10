<style lang="sass">
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
                color: #9d9d9d;
                line-height: 42px;
                width: 100%;
            }
        }
        .inner2 {
            font-size: 26px;
            color: #9d9d9d;
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
            > p:nth-of-type(1) {
                margin-left: 188px;
                margin-top: 16px;
                line-height: 38px;
                position: absolute;
                font-size: 26px;
                color: #9d9d9d;
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
</style>
<template>
    <div class="opensite">
        <div class="banner">
            <img src="{{avatar}}" />
            <p class="">{{nickname}}</p>
            <button @click="submit">
                <span>立即申请</span>
            </button>
        </div>
        <div class="separ"></div>
        <div class="textarea">
            <p> 快速申请开通官网，也可联系我们，400-0000-8888</p>
            <div class="inner1">
              <p > 美玉秀秀是全国最大最权威的和田玉鉴定、社交、交易平台，倾力打造的大师官网正虚位以待，期待您的加入。</p>
            </div>
            <div class="title">
                <p>开通官网优势</p>
                <hr style="border-top:1px ridge #d9d9d9;"></hr>
            </div>
            <div class="text">
                <p>汇聚海量高端用户
                    <br>领略大师风采尽在美玉秀秀</p>
                <p>海量用户</p>
                <img src="/static/images/open/os1.png" />
            </div>
            <div class="text">
                <p>私人定制，精雕细琢
                    <br>全方位打造玉界明星</p>
                <p>个性定制</p>
                <img src="/static/images/open/os2.png" />
            </div>
            <div class="text">
                <p>入驻美玉秀秀，获得鉴宝权限
                    <br>突显您渊博的学识和丰富的经验</p>
                <p>鉴宝权限</p>
                <img src="/static/images/open/os3.png" />
            </div>
            <div class="text">
                <p>多种运营方式，精准推广大师
                    <br>全面提升您的知名度</p>
                <p>精准推广</p>
                <img src="/static/images/open/os4.png" />
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
                <img src="/static/images/open/os5.png" />
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'SelfEvaluation',
        data() {
            return {
                avatar: '/static/images/open/osbanner.png',
                nickname: '【人人皆可拥有】'
            };
        },
        methods: {
          submit() {
              this.toast("申请官网");
          }
        }
    }
</script>
