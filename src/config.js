// hosts设置
const hosts = {
    api: {
        dev: '//dev.api.meiyuxiuxiu.net',
        test: '//test.api.meiyuxiuxiu.net',
        prod: '//api.meiyuxiuxiu.com'
    },
    img: {
        dev: 'http://img.meiyuxiuxiu.net/',
        test: 'http://img.meiyuxiuxiu.net/',
        prod: 'http://img.meiyuxiuxiu.com/'
    },
    video: {
        dev: 'http://video.meiyuxiuxiu.net/',
        test: 'http://video.meiyuxiuxiu.net/',
        prod: 'http://video.meiyuxiuxiu.com/'
    },
    download: {
        dev: 'http://build.meiyuxiuxiu.net/',
        test: 'http://build.meiyuxiuxiu.net/',
        prod: 'http://activity.meiyuxiuxiu.com/stat?source=app&way=share'
    }
};

const env = 'test' || (/^app/.test(location.hostname) ? 'prod' : (/^test/.test(location.hostname) ? 'test' : 'dev'));
let [api, img, video, download] = [hosts.api[env], hosts.img[env], hosts.video[env], hosts.download[env]];

export default {
    api,
    img,
    video,
    download,
    www: '//o0x80w5li.qnssl.com/',
    roles: {0: '普通用户', 1: '商家', 2: '藏家', 4: '大师', 8: '权威'},
    shareables: {   //分享 type 和 route 的对应关系
        'evaluation': 'jianbao',
        'story': 'topic',
        'jade': 'product',
        'master': 'website',
        'user': 'profile',
        'result': 'result'
    },
    types: [
        {
            id: 10,
            name: '鉴宝',
            route: 'evaluation'
        }, {
            id: 20,
            name: '鉴定结果',
            route: 'result'
        }, {
            id: 30,
            name: '晒宝',
            route: 'story'
        }, {
            id: 40,
            name: '宝贝',
            route: 'jade'
        }, {
            id: 50,
            name: '人物志',
            route: 'master'
        }
    ]
};
