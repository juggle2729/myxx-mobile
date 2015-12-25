<template>
<div class="master-request">
      <p class="text font-30">
          申请和田玉鉴定权限——需要您是玉石行业的匠师、雕刻师、资深藏家。<br>
          如果您有意向请天下以下信息，美玉秀秀客服人员会在二个工作日内联系您！
      </p>
      <div class="input">
          <input class="font-30 border-default" type="text" placeholder="手机号" value="15012345678">
          <input class="font-30 border-default" type="text" placeholder="姓名">
          <textarea class="font-30 border-default"  placeholder="申请说明，50字以内(选填)"></textarea>
          <button @click="submit" class="bg-red white font-30">
              <span>提交</span>
          </button>
      </div>
      <div class="title font-30 border-bottom">
          <p>大师特权</p>
      </div>
      <div class="imgs font-26">
          <div class="tr">
              <div class="tb flex">
                  <img src="/static/images/open/os1.png" />
                  <span class="flex">大师官网</span>
                  <img src="/static/images/open/os1.png" />
                  <span class="flex">鉴宝权限</span>
              </div>
          </div>
          <div class="tr">
              <div class="tb flex">
                  <img src="/static/images/open/os1.png" />
                  <span class="flex">专属店铺</span>
                  <img src="/static/images/open/os4.png" />
                  <span class="flex">精准推广</span>
              </div>
          </div>
      </div>
      <div class="bottom font-26 gray center">美玉秀秀客服：400-058-7266</div>
</div>
</template>
<script>
    export default {
        name: 'MasterRequest',
        data() {
        },
        methods: {
            submit() {
                this.toast('提交成功');
            }
        }
    }
</script>
<style lang="sass">
.master-request {
    padding: 39px 32px;
    position: relative;
    .text {
        line-height: 48px;
    }
    .input {
        width: 100%;
        margin-top:15px;
        > input {
            width: 100%;
            border-radius: 4px;
            border-style: solid;
            border-width: 1px;
            height: 80px;
            padding: 32px;
        }
        > input:nth-of-type(2) {
            margin-top: 30px;
        }
        > textarea {
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
            margin-top: 30px;
        }
    }
    .title {
        margin-top: 56px;
        padding-bottom: 24px;
    }
    .imgs {
        height: 224px;
        padding: 56px 80px;
        .tr {
            .tb {
                > span {
                    margin-left: 32px;
                }
                > img:nth-of-type(2) {
                    margin-left: 120px;
                }
            }
        }
        > .tr:nth-of-type(2){
            margin-top: 44px;
        }
        img {
            width: 60px;
            height: 60px;
        }
    }
    .bottom {
        margin-top: 56px;
    }
    ::-webkit-input-placeholder {
        color: #c6c6c6;
    }
    ::-webkit-textarea-placeholder {
        color: #c6c6c6;
    }
  }
</style>
