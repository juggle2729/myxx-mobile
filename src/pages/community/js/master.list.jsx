const jadeId = _.query('id') || 1;
const data = {
    masters: [
        {
            name: '芦苇',
            homepage: 'home',
            honor: [
                '中国近代海派玉雕设计师', '近代和田玉收藏专家', '浙江省工美艺术大师'
            ],
            identifyNumber: 5,
            fans: 10
        }, {
            name: '沥青烟',
            homepage: '',
            honor: [
                '中国近代海派玉雕设计师', '近代和田玉收藏专家', '浙江省工美艺术大师'
            ],
            identifyNumber: 5,
            fans: 10
        }, {
            name: '芦苇',
            homepage: 'home',
            honor: [
                '中国近代海派玉雕设计师', '近代和田玉收藏专家', '浙江省工美艺术大师'
            ],
            identifyNumber: 5,
            fans: 10
        }, {
            name: '沥青烟',
            homepage: '',
            honor: [
                '中国近代海派玉雕设计师', '近代和田玉收藏专家', '浙江省工美艺术大师'
            ],
            identifyNumber: 5,
            fans: 10
        }
    ],
    results: [
        {
            phone: '111111',
            nickname: '二卵子'
        }, {
            phone: '10000',
            nickname: 'xxx'
        }
    ],
    comments: {
        total: 0,
        list: [],
        loading: false,
        hasMore: true
    },
    searchText: ''
};

const vm = new Vue({
    el: '#app',
    methods: {
        searchEnter: function() {
            let text;
            text = this.searchText.replace(/\s/g, '');
            if (text && text !== ' ') {
                // this.$http.get(`users/my_follow`, function(resp) {
                //     if (resp.status === 200) {
                //         this.results = resp.data;
                //         this.toast(this.comments.total);
                //     } else {
                //         this.toast(200);
                //     }
                // });
                this.toast(text);
            }
        }
    },
    data
});
// const searchInput = $('.search input');
// const filter = $('.filter');
// const shopIcon = $('.icon-shop');
// searchInput.on(_.clickOrTap, function() {
//     filter.css('display', 'block');
//     shopIcon.css('display', 'block').on(_.clickOrTap, function() {
//         searchInput.val('');
//     });
// });
//
// filter.on(_.clickOrTap, function() {
//     $(this).css('display', 'none');
//     shopIcon.css('display', 'none');
// });
