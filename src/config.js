// hosts设置
const UA = navigator.userAgent
const IsAPP = /myxx/i.test(UA)
let [api, img, video, download] = ((env='test') => {
    env = /meiyuxiuxiu\.com$/.test(location.hostname) ? 'prod' : (/meiyuxiuxiu\.net$/.test(location.hostname) ? 'test' : env)
    const hosts = {
        api: {
            test: '//test.api.meiyuxiuxiu.net',
            prod: '//api.meiyuxiuxiu.com'
        },
        img: {
            test: 'http://img.meiyuxiuxiu.net/',
            prod: 'http://img.meiyuxiuxiu.com/'
        },
        video: {
            test: 'http://video.meiyuxiuxiu.net/',
            prod: 'http://video.meiyuxiuxiu.com/'
        },
        download: {
            test: 'http://build.meiyuxiuxiu.net/',
            prod: /android/.test(navigator.userAgent) ? 'https://o0xal1l6l.qnssl.com/jenkins-myxx-Android-latest.apk' : 'http://activity.meiyuxiuxiu.com/stat?source=app&way=share'
        }
    }
    return _.map(hosts, env)
})('test')

export default {
    api,
    img,
    video,
    download,
    IsAPP,
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
    category: { 'jb': 'question', 'tp': 'topic', 'rt': 'post', 'jd': 'answer', 'cl': 'collection', 'ct': 'tag', 'lv': 'live'},
    jdResult: {
        genuine: '真', fake: '假', unsure: '疑'
    },
    jdPrice: {
        sfour: '小四', mfour: '中四', lfour: '大四', sfive: '小五', mfive: '中五', lfive: '大五', ssix: '小六', msix: '中六', lsix: '大六'
    },
    payBizType: { auction: 'auction', order: 'order' },
    payTypes: ['wx_pub', 'balance'],
    emoji: ['微笑', '伤心', '美女', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '愉快', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '悠闲', '奋斗', '咒骂', '疑问', '嘘', '晕', '疯了', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '嘴唇', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '幸运', '礼品', '魔鬼', '幽灵', '商务', '收音机', '电视', '奖杯', '比赛', '赌博', '真', '假', '疑'],
    orderStatus: {
        no_price: 'np', // 面议待改价
        wait_pay: 'wp', // 未付款
        unpaid_cancelled: 'up_cc', // 未支付已取消
        unpaid_timeout: 'up_to', // 未支付超时已自动取消
        wait_send: 'ws', // 待发货
        refund: 'rf', // 退款
        refund_requested: 'rf_rq', // 退款申请已受理
        refund_accepted: 'rf_ac', // 退款卖家已同意,退款中,
        refund_approved: 'rf_ap', // 退款已通过平台审核,退款中
        refund_proposed: 'rf_pp', // 退款已通过财务操作,退款中
        refund_completed: 'rf_cm', // 已退款
        refund_rejected: 'rf_rj', // 退款争议
        wait_goods: 'wg', // 待收货
        back: 'rt', // 退货
        back_requested: 'rt_rq', // 退货申请已受理
        back_rejected: 'rt_rj', // 退货争议
        back_accepted: 'rt_ac', // 卖家同意退货， 等待买家寄回退货
        back_goods: 'rt_gd', // 买家确认已寄回退货, 退货中
        back_received: 'rt_rc', // 卖家收到退货,退款中
        back_approved: 'rt_ap', // 退款已通过平台审核,退款中
        back_proposed: 'rt_pp', // 退款已通过财务操作,退款中
        back_completed: 'rt_cm', // 已退货退款
        back_timeout: 'rt_to', // 卖家确认退货超时
        back_failed: 'rt_fa', // 退款失败
        confirm_goods: 'cg', // 已收货
        success: 'ss', // 交易成功
        refund_return: 'rr', // 退款退货
        trading_done: 'cl', // 交易完成
        trading_closed: 'cm' // 交易关闭
    }
}
