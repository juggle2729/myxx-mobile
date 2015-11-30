const data = {
    avatar: '/images/ic_default_avatar.jpg',
    nickname: '这个页面暂时先不做，不管'
};
const HomepageTemplate = Handlebars.compile($('#homepage-template').html())(data);
$('.homepage').append($(HomepageTemplate));
