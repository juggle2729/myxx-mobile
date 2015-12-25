<template>
    <div class="feedback-view bg-default">
        <div class="info">
            <textarea class="font-30 border-default" placeholder="写下你对美玉秀秀的建议吧" v-model="advice" v-on:keyup.enter="adviceEnter"></textarea>
            <p class="font-30">联系方式</p>
            <input class="font-30 border-default" type="text" placeholder="留下您的邮箱或电话号码" v-model="contact" v-on:keyup.enter="contactEnter">
            <button @click="submit" class="bg-red white font-30">
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
            advice: '',
            contact: ''
        }
    },
    methods: {
        adviceEnter() {
            this.toast(this.advice);
            this.advice = '';
        },
        contactEnter() {
            this.toast(this.contact);
            this.contact = '';
        },
        submit() {
            this.toast(this.advice + this.contact);
            this.advice = '';
            this.contact = '';
        }
    }
}
</script>
<style lang="sass">
.feedback-view {
    height: 100%;
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
        > input {
            width: 100%;
            border-radius: 8px;
            border-style: solid;
            border-width: 1px;
            height: 90px;
            padding: 32px;
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
