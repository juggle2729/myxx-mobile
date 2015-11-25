const data = {
    avatar: '/images/ic_default_avatar.jpg',
    nickname: '沥青烟',
    type: '普通用户'
}
const ProfileTemplate = Handlebars.compile($('#profile-template').html())(data);
$('.profile').append($(ProfileTemplate));

// _.request('users/1').then(resp => {
//     const data = resp.data;
//     //console.log(data);
//     const ProfileTemplate = Handlebars.compile($('#profile-template').html())(data);
//     $('.profile').append($(ProfileTemplate));
// });
