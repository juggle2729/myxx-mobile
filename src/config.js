// hosts设置

let [api, img, video, download] = ((env='dev') => {
    env = /^app/.test(location.hostname) ? 'prod' : (/^test/.test(location.hostname) ? 'test' : env);
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
    return _.map(hosts, env);
})('test');

export default {
    api,
    img,
    video,
    download,
    www: '//o0x80w5li.qnssl.com/',
    roles: {0: '普通用户', 1: '商家', 2: '藏家', 4: '大师', 8: '权威'},
    shareables: {'evaluation': 'jianbao', 'story': 'topic', 'jade': 'product', 'master': 'website', 'user': 'profile', 'lesson': 'open_course'},
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
        }, {
            id: 60,
            name: '公开课',
            route: 'lesson'
        }
    ],
    tags: {
        product: {
            id: 'pd',
            name: '商品'
        },
        lesson: {
            id: 'oc',
            name: '公开课'
        },
        evaluation: {
            id: 'jb',
            name: '求鉴宝'
        },
        topic: {
            id: 'tp',
            name: '话题'
        }
    }
};