const data = {
    avatar: '/images/ic_default_avatar.jpg',
    name: '沥青烟',
    type: '普通用户'
}
const ProfileTemplate = Handlebars.compile($('#profile-template').html())(data);
$('.profile').append($(ProfileTemplate));
