/**
 * Created by chunzujun on 11/18/15.
 */

const data = {
    bg: '/images/artist/theme.jpg',
    avatar: '/images/artist/head.png',
    name: '杨曦',
    alias: '南石',
    views: 3089,
    titles: ['江苏省工艺大师', '江苏省工艺大师', '江苏省工艺大师'],
    operList: [
        {
            iconName: 'favor',
            label: 300
        }, {
            iconName: 'edit',
            label: 'TA的关注'
        }, {
            iconName: 'shop',
            label: '进入店铺'
        }
    ],
    desc: '作为当今苏作玉雕工艺创新、探索代表人物, 其作品具有浓厚的时代气息和强烈的现代感.',
    prizes: [
        {
            text: '2005年被苏州市宣传部授苏州民间工艺家称号',
            show: true
        }, {
            text: '2006年被授予中国玉石雕刻大师称号',
            show: true
        }, {
            text: '2007年被授予中国玉石雕刻大师称号',
            show: false
        }, {
            text: '2008年被授予中国玉石雕刻大师称号',
            show: false
        }, {
            text: '2009年被授予中国玉石雕刻大师称号',
            show: false
        }
    ],
    jades: [
        {
            url: '/images/artist/jade-one.png',
            link: '',
            identificationResult: '真',
            likedCount: 126
        }, {
            url: '/images/artist/jade-two.png',
            link: '',
            identificationResult: '假',
            likedCount: 126
        }
    ],
    crafts: [
        {
            url: '/images/artist/craft-one.jpg',
            link: ''
        }, {
            url: '/images/artist/craft-two.jpg',
            link: ''
        }
    ],
    articles: [
        {
            url: '/images/artist/article-one.jpg',
            link: '',
            name: '和田玉雕琢工艺全展示'
        }, {
            url: '/images/artist/article-two.jpg',
            link: '',
            name: '雕琢工艺记录'
        }
    ],
    store: {
        url: '/images/artist/store.jpg',
        name: '听松玉石店',
        desc: '工作室以传承玉石文化和打造玉器品牌相结合,以满足广大玉石爱好者的需求',
        address: '苏州市相王路199-9号',
        phone: '18011112222'
    },
    treasures: [
        '/images/artist/treasure.jpg', '/images/artist/treasure.jpg', '/images/artist/treasure.jpg'
    ],
    comment: {
        count: 33,
        data: [
            {
                head: '/images/artist/message-one.png',
                name: '苗宇轩',
                date: '2015-11-19 12:01:00',
                content: '东西产自新疆和田,水料,皮肉较好,质地三品,市场估价在2.5W左右,很不错!'
            }, {
                head: '/images/artist/message-two.png',
                name: '苗宇轩',
                date: '2015-11-18 12:01:00',
                content: '东西很不错哦,是真品,2W左右'
            }, {
                head: '/images/artist/message-three.jpg',
                name: '苗宇轩',
                date: '2015-11-19 11:01:00',
                reply: {
                    name: '北方的狼',
                    content: '呵呵,是的么?感谢啦'
                }
            }
        ]
    }
};
const vm = new Vue({
    el: '#app',
    data,
    methods: {
    }
// const officialArtistTemplate = Handlebars.compile($('#official-artist-template').html())(officialArtistData);
// const container = $('.official-artist');
//
// container.append($(officialArtistTemplate));
// container.find('.expand').on(_.clickOrTap, function() {
//     const restItems = container.find('.rest');
//     if (restItems.hasClass('hide')) {
//         restItems.removeClass('hide');
//     } else {
//         restItems.addClass('hide');
//     }
});
