const data = {
    name: '泰勒',
    userType: '普通用户',
    type: '用户',
    advice: '',
    contact: ''
};

const vm = new Vue({
    el: '#app',
    methods: {
        adviceEnter() {
            this.toast(this.advice);
        },
        contactEnter() {
            this.toast(this.contact);
        },
        submit() {
            this.toast(this.advice + this.contact);
        }
    },
    data
});
