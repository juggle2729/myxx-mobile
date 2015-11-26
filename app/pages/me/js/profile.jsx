const userId = _.query('id') || 1;
_.request(`users/info/${userId}`).then(resp => {
    const data = resp.data;
    const roles = ['普通用户', '商家', '藏家', '大师', '权威'];
    data.roleDesc = roles[data.role];
    const ProfileTemplate = Handlebars.compile($('#profile-template').html())(data);
    $('.profile').append($(ProfileTemplate));
});
