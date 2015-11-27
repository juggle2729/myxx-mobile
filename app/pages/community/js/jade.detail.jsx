const jadeId = _.query('id') || 1;
const data = {
    detail: {
        'click': 0,
        'applier': {
            'photo': '',
            'name': '',
            'id': 1
        },
        'create_at': '',
        'status': 2,
        'identifiable': false,
        'comment': 13,
        'description': '',
        'isFollowed': true,
        'pictures': [],
        'isMaster': true,
        'id': 1,
        'follow': 3,
        'results': [],
        'video': 'a5ad0094-487a-4d3f-ae8a-499ec2354e5e'
    },
    comments: {
        total: 0,
        list: [],
        loading: false,
        hasMore: true
    },
    scroll: {
        down: false,
        up: false
    }
};
const vm = new Vue({
    el: '#app',
    data,
    created() {
    },
    events: {
        scroll(direction, position) {
            if(position > 100) {
                this.scroll.down = direction === 'down';
            }
            const indicator = this.$el.querySelector('#more');
            if(this.$el.clientHeight + window.pageYOffset > indicator.offsetTop) {
                this._loadComments();
            }
        }
    },
    methods: {
        _loadComments: (function() {
            let offset = 0;
            const limit = 5;
            return function() {
                if(this.comments.loading) {
                    return false;
                }
                this.comments.loading = true;
                return this.$http.get(`jianbao/applies/${jadeId}/comments?offset=${offset}&limit=${limit}`, function(resp) {
                    this.comments.list.splice(this.comments.list.length - 1, 0, ...resp.data.comments);
                    this.comments.total = resp.data.total;
                    offset = offset + limit;
                    if (resp.data.comments.length < limit || offset > resp.data.total) {
                        this.comments.hasMore = false;
                    } else {
                        this.comments.loading = false;
                    }
                });
            };
        })(),
        init() {
            const getDetail = this.$http.get(`jianbao/applies/${jadeId}`, detail => {
                this.$data.detail = detail.data;
            });
            return Promise.all([getDetail, this._loadComments()]);
        },
        play(videoId) {
            this.toast(`播放视频${videoId}`);
        },
        toggleThumb(resultId) {
            const result = this.detail.results.filter(r => r.id === resultId).pop();
            if (result.isLike) {
                this.$http.delete(`jianbao/results/${resultId}/like`, (resp) => {
                    if (resp.status === 200) {
                        result.isLike = false;
                        result.like = result.like - 1;
                    } else {
                        this.toast(resp.message);
                    }
                });
            } else {
                this.$http.post(`jianbao/results/${resultId}/like`, (resp) => {
                    if (resp.status === 200) {
                        result.isLike = true;
                        result.like = result.like + 1;
                    } else {
                        this.toast(resp.message);
                    }
                });
            }
        },
        toggleFollow() {
            if (this.detail.isFollowed) {
                this.$http.delete(`jianbao/applies/${jadeId}/follows`, () => {
                    this.detail.isFollowed = false;
                    this.detail.follow = this.detail.follow - 1;
                });
            } else {
                this.$http.post(`jianbao/applies/${jadeId}/follows`, () => {
                    this.detail.isFollowed = true;
                    this.detail.follow = this.detail.follow + 1;
                });
            }
        },
        share() {
            this.toast('分享');
        },
        comment(userId) {
            this.toast(typeof userId === 'number' ? '回复' : '评论');
        },
        evaluate() {
            this.toast(this.detail.isMaster ? '鉴宝' : '菜鸟不能鉴宝');
        }
    }
});
