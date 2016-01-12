// hosts设置
let [api, img, video] = ['http://dev.api.meiyuxiuxiu.net', 'http://img.meiyuxiuxiu.net/', 'http://video.meiyuxiuxiu.net/'];
if(/^app/.test(location.hostname)) {
    [api, img, video] = ['http://api.meiyuxiuxiu.com', 'http://img.meiyuxiuxiu.com/', 'http://video.meiyuxiuxiu.com/'];
} else if(/^test/.test(location.hostname)) {
    [api, img, video] = ['http://test.api.meiyuxiuxiu.net', 'http://img.meiyuxiuxiu.net/', 'http://video.meiyuxiuxiu.net/'];
}

export default {
    api,
    img,
    video,
    www: 'http://7xp1h7.com2.z0.glb.qiniucdn.com/',
    types: [
        'xxx',
        {
            name: '大师',
            route: ''
        }, {
            name: '权威',
            route: ''
        }, {
            name: '鉴宝',
            route: 'evaluation'
        }, {
            name: '玉石',
            route: ''
        }, {
            name: '商家',
            route: ''
        }, {
            name: '话题',
            route: 'story'
        }
    ],
    roles: {0: '普通用户', 1: '商家', 2: '藏家', 4: '大师', 8: '权威'},
    likes: [
        {
            id: 10,
            name: '鉴宝',
        }, {
            id: 20,
            name: '结果',
        }, {
            id: 30,
            name: '话题',
        }, {
            id: 40,
            name: '宝贝',
        }, {
            id: 50,
            name: '官网',
        }
    ]
};
