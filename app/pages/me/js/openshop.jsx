const data = {
    avatar: '/images/open/odbanner.png',
    nickname: '【人人皆可拥有】'
};
const vm = new Vue({
    el: '#app',
    methods: {
        submit() {
            this.toast("申请店铺");
        }
    },
    data
});
