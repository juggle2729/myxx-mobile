const data = {
    avatar: '/images/open/osbanner.png',
    nickname: '【人人皆可拥有】'
};
const vm = new Vue({
    el: '#app',
    methods: {
        submit() {
            this.toast("申请官网");
        }
    },
    data
});
