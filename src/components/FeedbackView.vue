<template>
    <div class="feedback-view bg-default">
        <div class="info">
            <textarea class="font-30 border-default" placeholder="写下你对美玉秀秀的建议吧" v-model="content" maxlength="200"></textarea>
            <p class="font-30">联系方式</p>
            <input class="font-30 border-default" type="text" placeholder="留下您的邮箱或电话号码" v-model="contact" maxlength="60">
            <button @click="submit" class="white font-30" :class="{ 'bg-red': checked, 'bg-gray': !checked}" :disabled="!checked">
                <span>提交</span>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FeedbackView',
    data() {
        return {
            content: '',
            contact: '',
            mail: '',
            phone: '',
            type: 'feedback',
            checked: false
        }
    },
    created() {
        this.$watch('merge', (data) => {
            let mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            let phoneReg = /^[1]\d{10}$/i;
            if(phoneReg.test(this.contact)){
                this.phone = this.contact;
            }else if(mailReg.test(this.contact)){
                this.mail = this.contact;
            } else {
                this.phone = '';
                this.mail = '';
            }
            if(data.content === ''){
                this.checked = false;
            } else if(data.contact === '') {
                this.checked = true;
            } else if(this.phone !== '' || this.mail !== '') {
                this.checked = true;
            } else {
                this.checked = false;
            }
        });
    },
    computed: {
        result(){
            return {
                type: this.type,
                mail: this.mail,
                phone: this.phone,
                name: this.name,
                content: this.content
            };
        },
        merge() {
            return {
                contact: this.contact,
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
        }
    }
}
</script>
<style lang="sass">
.feedback-view {
    min-height: 100%;
    padding: 20px 32px;
    position: relative;
    .info {
        width: 100%;
        textarea {
            width: 100%;
            height: 280px;
            border-radius: 8px;
            padding-left: 30px;
            padding-top: 30px;
            resize: none;
            border-width: 1px;
            overflow: hidden;
        }
        p {
            margin-top: 40px;
            margin-bottom: 24px;
        }
        input {
            width: 100%;
            border-radius: 8px;
            border-style: solid;
            border-width: 1px;
            height: 90px;
            padding: 32px;
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
            margin-top: 40px;
        }
    }
    ::-webkit-input-placeholder {
        color: #c6c6c6;
    }
    ::-webkit-textarea-placeholder {
        color: #c6c6c6;
    }
}
</style>
