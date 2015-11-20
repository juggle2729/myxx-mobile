const data = {
    masters: [
        {
            avatar: '/images/ic_default_avatar.jpg',
            name: '芦苇',
            homepage: 'home',
            honor: [
                '中国近代海派玉雕设计师', '近代和田玉收藏专家', '浙江省工美艺术大师'
            ],
            identifyNumber: 5,
            fans: 10
        }, {
            avatar: '/images/ic_default_avatar.jpg',
            name: '沥青烟',
            homepage: '',
            honor: [
                '中国近代海派玉雕设计师', '近代和田玉收藏专家', '浙江省工美艺术大师'
            ],
            identifyNumber: 5,
            fans: 10
        }, {
            avatar: '/images/ic_default_avatar.jpg',
            name: '芦苇',
            homepage: 'home',
            honor: [
                '中国近代海派玉雕设计师', '近代和田玉收藏专家', '浙江省工美艺术大师'
            ],
            identifyNumber: 5,
            fans: 10
        }, {
            avatar: '/images/ic_default_avatar.jpg',
            name: '沥青烟',
            homepage: '',
            honor: [
                '中国近代海派玉雕设计师', '近代和田玉收藏专家', '浙江省工美艺术大师'
            ],
            identifyNumber: 5,
            fans: 10
        }
    ]
};

const MasterTemplate = Handlebars.compile($('#master-list-template').html())(data);
$('.master-list').append($(MasterTemplate));

const searchInput = $('.search input');
const filter = $('.filter');
const shopIcon = $('.icon-shop');
searchInput.on(_.clickOrTap, function() {
    filter.css('display', 'block');
    shopIcon.css('display', 'block').on(_.clickOrTap, function() {
        searchInput.val('');
    });
});

filter.on(_.clickOrTap, function() {
    $(this).css('display', 'none');
    shopIcon.css('display', 'none');
});
