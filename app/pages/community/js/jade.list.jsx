const data = {
    posts: [
        {
            avatar: '',
            publisher: '苏沐风',
            publishTime: '30分钟前',
            content: '朋友刚入的和田玉，帮忙看看，急',
            bgs: [
                '/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg'
            ],
            video: '/images/5.jpg',
            master: [
                {
                    avatar: '',
                    name: '张志忠',
                    title: '国家级雕刻大师',
                    status: '已鉴定'
                }, {
                    avatar: '',
                    name: '林晓',
                    title: '美工大师',
                    status: '已鉴定'
                }, {
                    avatar: '',
                    name: '张志忠',
                    title: '国家级雕刻大师',
                    status: '已鉴定'
                }
            ],
            attention: 3,
            comment: 6
        }, {
            avatar: '',
            publisher: '苏沐风',
            publishTime: '30分钟前',
            content: '朋友刚入的和田玉，帮忙看看，急',
            bgs: [
                '/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg'
            ],
            video: '/images/5.jpg',
            master: [],
            attention: 3,
            comment: 6
        }, {
            avatar: '',
            publisher: '苏沐风',
            publishTime: '30分钟前',
            content: '朋友刚入的和田玉，帮忙看看，急',
            bgs: [
                '/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg'
            ],
            video: '/images/5.jpg',
            master: [],
            attention: 3,
            comment: 6
        }
    ]
};

const TreasuresTemplate = Handlebars.compile($('#treasures-template').html())(data);
$('body').append($(TreasuresTemplate));
$('.hot').on(_.clickOrTap, function() {
    $('.new').removeClass('dark-red');
    $(this).addClass('dark-red');
});
$('.new').on(_.clickOrTap, function() {
    $('.hot').removeClass('dark-red');
    $(this).addClass('dark-red');
});
