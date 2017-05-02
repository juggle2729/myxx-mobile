// hosts设置
let [api, img, video, download] = ((env='test') => {
    env = /meiyuxiuxiu\.com$/.test(location.hostname) ? 'prod' : (/meiyuxiuxiu\.net$/.test(location.hostname) ? 'test' : env)
    const hosts = {
        api: {
            test: '//test.api.meiyuxiuxiu.net',
            prod: '//api.meiyuxiuxiu.com'
        },
        img: {
            test: '//img.meiyuxiuxiu.net/',
            prod: '//o0w8taeuo.qnssl.com/'
        },
        video: {
            test: '//video.meiyuxiuxiu.net/',
            prod: '//obu4fsz3c.qnssl.com/'
        },
        download: {
            test: 'http://build.meiyuxiuxiu.net/',
            prod: /android/.test(navigator.userAgent) ? 'https://o0xal1l6l.qnssl.com/jenkins-myxx-Android-latest.apk' : 'http://activity.meiyuxiuxiu.com/stat?source=app&way=share'
        }
    }
    return _.map(hosts, env)
})('prod')

export default {
    api,
    img,
    video,
    download,
    www: '//o0x80w5li.qnssl.com/',
    types: [
        {
            id: 'jb', // 10
            name: '问答',
            route: 'question'
        }, {
            id: 'jd', // 20
            name: '回答',
            route: 'answer'
        }, {
            id: 'tp', // 30
            name: '帖子',
            route: 'topic'
        }, {
            id: 'pd', // 40
            name: '宝贝',
            route: 'product'
        }, {
            id: 'ws', // 50
            name: '人物志',
            route: 'master'
        }, {
            id: 'cm', // 70
            name: '评论',
            route: ''
        }, {
            id: 'wk', // 90
            name: '作品',
            route: 'work'
        }, {
            id: 'rt', // 100
            name: '长图文',
            route: 'post'
        }
    ],
    role: {normal: '普通用户', engraver: '雕刻师', merchant: '商户', enterprise: '企业'},
    shopType: {studio: '工作室', store: '商铺', enterprise: '商铺', person: '个人'},
    category: { 'jb': 'question', 'tp': 'topic', 'rt': 'post', 'jd': 'answer', 'cl': 'collection', 'ct': 'tag'},
    jdResult: {
        genuine: '真', fake: '假', unsure: '疑'
    },
    jdPrice: {
        sfour: '小四', mfour: '中四', lfour: '大四', sfive: '小五', mfive: '中五', lfive: '大五', ssix: '小六', msix: '中六', lsix: '大六'
    },
    emoji: ['微笑', '伤心', '美女', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '愉快', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '悠闲', '奋斗', '咒骂', '疑问', '嘘', '晕', '疯了', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '嘴唇', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '幸运', '礼品', '魔鬼', '幽灵', '商务', '收音机', '电视', '奖杯', '比赛', '赌博', '真', '假', '疑']
}
