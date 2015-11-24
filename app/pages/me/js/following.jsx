const data = {
    userList: [
        {
            name: '泰勒',
            userType: '普通用户',
            type: '用户',
            avatar: '/images/ic_default_avatar.jpg',
            t: 'user'
        }, {
            name: '这个和田玉是我无意间从古玩市场淘到的，请大...',
            userType: '2条鉴定结果',
            type: '鉴宝',
            avatar: '/images/ic_default_avatar.jpg',
            t: 'jianbao'
        }, {
            name: '龚克勤',
            userType: '工艺大师',
            type: '用户',
            avatar: '/images/ic_default_avatar.jpg',
            t: 'user'
        }, {
            name: '玉韵天成',
            userType: '店主：陈晓晓',
            type: '店铺',
            avatar: '/images/ic_default_avatar.jpg',
            t: 'store'
        }, {
            name: '和田玉把件-英明神武',
            userType: '店铺：玉韵天成',
            type: '宝贝',
            price: '367800',
            avatar: '/images/ic_default_avatar.jpg',
            t: 'baobei'
        }
    ]
};
const FollowingTemplate = Handlebars.compile($('#following-template').html())(data);
$('.following').append($(FollowingTemplate));