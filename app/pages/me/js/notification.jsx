const data = {
    notificationList: [
        {
            name: '美玉秀秀小秘书',
            userId: '7',
            time: '11-13',
            type: 'system',
            hrefImg: '/images/1.jpg',
            hrefTitle: '新一届美玉秀秀鉴宝大赛开始！',
            avatar: '/images/ic_default_avatar.jpg'
        }, {
            name: '美玉秀秀小秘书',
            userId: '7',
            time: '11-10',
            type: 'system',
            text: '欢迎加入美玉秀秀！<br>您可以在这里发起鉴宝，查看大师官网。<br>祝您生活愉快！',
            avatar: '/images/ic_default_avatar.jpg'
        }, {
            name: '小山',
            userId: '6',
            time: '11-08',
            type: 'notice',
            text: '对您的宝贝进行了鉴定',
            hrefImg: '/images/1.jpg',
            hrefTitle: '刚入手一块和田玉，求大师看看',
            hrefText: '3条鉴定结果',
            jadeId: '1',
            avatar: '/images/logo.jpeg'
        }, {
            name: '蠢蠢',
            userId: '5',
            time: '11-08',
            type: 'notice',
            text: '评论了您的鉴定',
            hrefImg: '/images/1.jpg',
            hrefTitle: '淘到一块玉，求大师鉴定，值多少钱！',
            hrefText: '2条鉴定结果',
            jadeId: '2',
            avatar: '/images/logo.jpeg'
        }, {
            name: '小美',
            userId: '4',
            time: '11-10',
            type: 'system',
            text: '关注了您，请查看详情！',
            avatar: '/images/logo.jpeg'
        }, {
            name: '美玉秀秀小秘书',
            userId: '7',
            time: '11-08',
            type: 'success',
            text: '恭喜您！您的鉴宝已成功发布！',
            hrefImg: '/images/1.jpg',
            hrefTitle: '刚入手一块和田玉，求大师鉴定',
            hrefText: '0条鉴定结果',
            jadeId: '1',
            avatar: '/images/ic_default_avatar.jpg'
        }
    ]
};
const vm = new Vue({
    el: '#app',
    data
});
