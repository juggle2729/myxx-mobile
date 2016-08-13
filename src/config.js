// hosts设置

let [api, img, video, download] = ((env='dev') => {
    env = /^app/.test(location.hostname) ? 'prod' : (/^test/.test(location.hostname) ? 'test' : env);
    const hosts = {
        api: {
            dev: '//dev.api.meiyuxiuxiu.net',
            test: '//test.api.meiyuxiuxiu.net',
            prod: '//api.meiyuxiuxiu.com',
            docker: '//192.168.0.150:18004' // docker环境的图片等其他配置同测试环境
        },
        img: {
            dev: 'http://img.meiyuxiuxiu.net/',
            test: 'http://img.meiyuxiuxiu.net/',
            prod: 'http://img.meiyuxiuxiu.com/',
            docker: 'http://img.meiyuxiuxiu.net/'
        },
        video: {
            dev: 'http://video.meiyuxiuxiu.net/',
            test: 'http://video.meiyuxiuxiu.net/',
            prod: 'http://video.meiyuxiuxiu.com/',
            docker: 'http://video.meiyuxiuxiu.net/'
        },
        download: {
            dev: 'http://build.meiyuxiuxiu.net/',
            test: 'http://build.meiyuxiuxiu.net/',
            prod: 'http://activity.meiyuxiuxiu.com/stat?source=app&way=share',
            docker: 'http://build.meiyuxiuxiu.net/'
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
    shareables: {'evaluation': 'jianbao', 'story': 'topic', 'jade': 'product', 'master': 'website', 'user': 'profile', 'lesson': 'open_course'},
    types: [
        {
            id: 10,
            name: '鉴宝',
            route: 'evaluation'
        }, {
            id: 20,
            name: '鉴定',
            route: 'result'
        }, {
            id: 30,
            name: '帖子',
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
            name: '玉知识',
            route: 'lesson'
        }, {
            id: 70,
            name: '评论',
            route: ''
        }, {
            id: 90,
            name: '作品',
            route: 'work'
        }, {
            id: 110,
            name: '竞标',
            route: 'purchase'
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
            name: '鉴宝'
        },
        topic: {
            id: 'tp',
            name: '话题'
        }
    },
    emoji: ['微笑', '伤心', '美女', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '愉快', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '悠闲', '奋斗', '咒骂', '疑问', '嘘', '晕', '疯了', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '嘴唇', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '幸运', '礼品', '魔鬼', '幽灵', '商务', '收音机', '电视', '奖杯', '比赛', '赌博', '真', '假', '疑']
};
