const userId = _.query('id') || 1;
const roles = ['普通用户', '商家', '藏家', '大师', '权威'];
const data = {
    photo: null,
    role: 0,
    roleName: '',
    locale: null,
    has_shop: false,
    nickname: '',
    gender: 0,
    has_jianbao_permission: false,
    has_website: false
};
const vm = new Vue({
    el: '#app',
    data,
    created() {
        this.$http.get(`users/info/${userId}`, resp => {
            this.$data = resp.data;
            this.roleName = roles[this.role];
        });
    }
});
