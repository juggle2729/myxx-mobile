// hosts设置
let [api, img, video] = ['http://dev.api.meiyuxiuxiu.net', 'http://img.meiyuxiuxiu.net/', 'http://video.meiyuxiuxiu.net/'];
if(/^app/.test(location.hostname)) {
    [api, img, video] = ['//api.meiyuxiuxiu.com', 'http://img.meiyuxiuxiu.com/', 'http://video.meiyuxiuxiu.com/'];
} else if(/^test/.test(location.hostname)) {
    [api, img, video] = ['http://test.api.meiyuxiuxiu.net', 'http://img.meiyuxiuxiu.net/', 'http://video.meiyuxiuxiu.net/'];
}
// let [api, img, video] = ['http://test.api.meiyuxiuxiu.net', 'http://img.meiyuxiuxiu.net/', 'http://video.meiyuxiuxiu.net/'];
export default {
    api,
    img,
    video,
    www: '//o0x80w5li.qnssl.com/',
    roles: {0: '普通用户', 1: '商家', 2: '藏家', 4: '大师', 8: '权威'},
    types: [
        {
            id: 10,
            name: '鉴宝',
            route: 'evaluation'
        }, {
            id: 20,
            name: '大师鉴定',
            route: 'evaluation'
        }, {
            id: 30,
            name: '话题',
            route: 'story'
        }, {
            id: 40,
            name: '宝贝',
            route: 'jade'
        }, {
            id: 50,
            name: '官网',
            route: 'master'
        }
    ]
};
