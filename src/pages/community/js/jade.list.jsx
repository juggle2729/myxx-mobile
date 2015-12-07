const data = {
    tab: 'time',
    applies: [],
    total: 12
};
const vm = new Vue({
    el: '#app',
    data,
    created() {
        this.$watch('tab', this.fetch);
    },
    methods: {
        init() {
            return this.fetch();
        },
        fetch() {
            return this.$http.get('jianbao/applies', {[this.tab]: 1, offset: 0, limit: 3}, resp => {
                this.applies = resp.data.applies;
                this.total = resp.data.total;
            });
        },
        toggleFollow(applyId, followed) {
            const apply = this.applies.filter(a => a.id === applyId).pop();
            if (followed) {
                this.$http.delete(` jianbao/applies/${applyId}/follows`, () => {
                    apply.isFollowed = false;
                    apply.follow -= 1;
                });
            } else {
                this.$http.post(`jianbao/applies/${applyId}/follows`, () => {
                    apply.isFollowed = true;
                    apply.follow += 1;
                });
            }
        },
        share() {
            _.toast('分享');
        },
        comment(userId) {
            this.toast('cookie:' + appCookie.user_id);
        },
        evaluate() {
            _.toast(this.detail.isMaster ? '鉴宝' : '菜鸟不能鉴宝');
        }
    }
});
