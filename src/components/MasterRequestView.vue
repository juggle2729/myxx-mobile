<template>
<div class="master-request">
      <p class="text font-30">
          申请和田玉鉴定权限————需要您是玉石行业的匠师、雕刻师、资深藏家。<br>
          如果您有意向请填写以下信息，美玉秀秀客服人员会在两个工作日内联系您！
      </p>
      <div class="input">
          <input class="font-30 border-default" type="text" placeholder="手机号" v-model="contact" maxlength="20">
          <input class="font-30 border-default" type="text" placeholder="姓名" v-model="name" maxlength="20">
          <textarea class="font-30 border-default" placeholder="申请说明，50字以内(选填)" maxlength="50" v-model="content"></textarea>
          <button @click="submit" class="white font-30" :class="{ 'bg-red': checked, 'bg-gray': !checked}" :disabled="!checked">
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
            return {
                type: 'jianbao',
                contact: 0,
                phone: 0,
                name: '',
                content: '',
                checked: false
            }
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
                        this.action('modal', {text: '您的申请已成功提交！请耐心等待客服联系。'});
                    });
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
        input {
            width: 100%;
            border-radius: 6px;
            border-style: solid;
            border-width: 1px;
            height: 80px;
            padding: 30px 20px;
        }
        input:nth-of-type(2) {
            margin-top: 30px;
        }
        textarea {
            margin-top: 30px;
            width: 100%;
            padding: 30px 20px;
            height: 180px;
            resize: none;
            border-radius: 6px;
        }
        input:active, input:focus ,
        textarea:active, textarea:focus{
            border-color: #cc3f4f;
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
