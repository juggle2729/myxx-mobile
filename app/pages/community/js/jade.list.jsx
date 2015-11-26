const data = {
    tab: 'time',
    applies: [],
    total: 12
};
const vm = new Vue({
    el: '#app',
    data,
    created() {
        this.$http.get(`jianbao/applies?${this.tab}=1`, resp => {
            this.applies = resp.data.applies;
            this.total = resp.data.total;
        });
        this.$watch('tab', function(tab) {
            this.$http.get(`jianbao/applies?${this.tab}=1`, resp => {
                this.applies = resp.data.applies;
                this.total = resp.data.total;
            });
        });
    },
    methods: {
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
            _.toast(typeof userId === 'number' ? '回复' : '评论');
        },
        evaluate() {
            _.toast(this.detail.isMaster ? '鉴宝' : '菜鸟不能鉴宝');
        }
    }
});
