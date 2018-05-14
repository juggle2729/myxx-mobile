export default {
    ready() {
        if(this.env.isShare) {
            _.delay(() => { // 分享统计
                const type = {question: 'jianbao', answer: 'jianbaoresult', topic: 'topic', post: 'topic',product: 'product', jade: 'product', master: 'website', user: 'profile'}
                this.$fetch('log/content_readings', {
                            channel: _.get(this, '$route.query.channel', 'pc'),
                            id: this.$route.params.id,
                            type: _.get(type, this.$route.name, this.$route.name)
                        }).then(_.noop)
            }, 3000)
        } else if(this.env.isApp && this.env.isIOS) {
            this.$on('restore', () => {
                this.action('shareable', this.$root.shareData)
            })
        }
    },
    methods: {
        setShareData(entry) {
            let data = {
                // url: location.origin + location.pathname
                url: location.href,
                ...entry
            }
            // entry.desc = entry.desc.replace(/\[\:(\d+)_([^\]]+?)\]/g, '@$2')
            switch(this.$route.name) {
                case 'topic':
                    data.title = entry.content
                    data.desc = entry.content
                    data.icon = entry.medias[0].media
                    if(entry.medias[0].media_type !== 'picture') {
                        data.icon = this.config.video + data.icon + '?vframe/jpg/offset/0/rotate/auto'
                    }
                    break
                case 'product':
                case 'jade':
                    data.title = `【限量】${entry.title}`
                    data.desc = '玉友的新品上线啦！'
                    data.icon = entry.pictures[0]
                    data.userId = entry.owner.id
                    data.productId = entry.id
                    break
                case 'auction':
                    data.title = `【拍卖】${entry.title}正在拍卖中，赶快来围观`
                    data.desc = '你觉得这个宝贝能拍到多少？'
                    data.icon = entry.pictures[0]
                    break
                case 'auction-special':
                    data.title = `【专场拍卖】${entry.title}正在拍卖中，赶快来围观`
                    data.desc = `${entry.auction_count}件拍品，${entry.min_upset_price / 100}元起拍`
                    data.icon = entry.picture
                    break
                case 'master':
                    data.title = entry.interview.title
                    data.desc = entry.baseData.name + ' ' + _.get(entry, '.baseData.titles.0.name', '')
                    data.icon = entry.baseData.photo
                    break
                case 'user':
                    data.title = `${entry.name}的主页`
                    data.desc = entry.title || `我在美玉秀秀中认识了${entry.name}，推荐大家关注。`
                    data.icon = entry.photo
                    break
                case 'top-master':
                    data.title = '【专业】鉴宝大神排行榜，你看服不服？'
                    data.icon = 'https://o0x80w5li.qnssl.com/ranking_share.jpg'
                    data.desc = '和田玉界琅琊榜不慎泄露'
                    data.text = '我也来施展鉴宝'
                    break
                case 'shop':
                    data.title = entry.name
                    data.desc = `刚刚在美玉秀秀看到一个不错的${entry.type}，快来看看吧！`
                    data.icon = entry.logo
                    break
                case 'works':
                    data.title = `${entry.name}的作品展`
                    data.desc = `${entry.name}的作品正在展出，邀您来共赏`
                    data.icon = entry.photo
                    break
                case 'work':
                    data.title = `${entry.name} ${entry.title}`
                    data.desc = `${entry.name}的作品正在展出，邀您来共赏`
                    data.icon = entry.logo
                    break
                case 'purchase':
                    data.title = entry.title
                    data.desc = '你发需求，商家竞标，上手对比，买得放心！'
                    data.icon = entry.icon
                    break
                case 'post':
                    data.title = entry.title
                    data.desc = '分享自[美玉秀秀]'
                    data.icon = entry.icon
                    break
                case 'answer':
                    data.title = entry.title
                    data.desc = `${entry.master}的观点，你觉得有道理吗？`
                    data.icon = entry.icon || 'https://o0x80w5li.qnssl.com/question.png'
                    break
                case 'question':
                    data.title = entry.title
                    data.desc = '玉友的这个问题，你有什么见解吗？'
                    data.icon = entry.icon || 'https://o0x80w5li.qnssl.com/share/question.png'
                    break
                case 'tag':
                    data.title = `推荐一个不错的话题 ${entry.title}`
                    data.desc = entry.desc
                    data.icon = 'https://o0x80w5li.qnssl.com/share/topic.png'
                    break
                case 'collection':
                    data.title = entry.title
                    data.desc = '推荐一个不错的美玉专辑，喜欢就关注吧！'
                    data.icon = entry.icon || 'https://o0x80w5li.qnssl.com/user/collection.jpg'
                    break
                case 'activity':
                    data.title = entry.title
                    data.desc = entry.desc
                    data.icon = entry.icon || 'http://o0x80w5li.qnssl.com/logo.jpg'
                    break
                case 'shop-guide':
                    data.title = '美玉秀秀开店攻略'
                    data.desc = '美玉秀秀-最大的和田玉线上交流App'
                    data.icon = 'http://o0x80w5li.qnssl.com/logo.jpg'
                    break
                case 'help-media':
                    data.title = entry.title
                    data.desc = '美玉秀秀-最大的和田玉线上交流App'
                    data.icon = 'http://o0x80w5li.qnssl.com/logo.jpg'
                    break
                case 'live':
                    data.title = `【直播】 ${entry.share.title}`
                    data.desc = `更多珠宝玉石精彩直播，尽在美玉秀秀。`
                    data.icon = entry.picture
                    break
            }
            data = {title: '美玉秀秀', desc: '最大的和田玉线上交流App', icon: 'http://o0x80w5li.qnssl.com/logo.jpg', ...data}
            // data.title = _.truncate(data.title, {
            //     length: /[\uD800-\uDBFF]/.test(data.title.charAt(40)) ? 39 : 40
            // })
            // 截取描述文字前20字符,防止emoji表情被截断导致iOS平台无法识别
            // data.desc = _.truncate(data.desc, {
            //     length: /[\uD800-\uDBFF]/.test(data.desc.charAt(25)) ? 24 : 25
            // })

            // 解析title和desc中包含的@
            data.title = _.replace(data.title, /\[\:(\d+)_([^\]]+?)\]/g, '@$2')
            data.desc = _.replace(data.desc, /\[\:(\d+)_([^\]]+?)\]/g, '@$2')

            // 拼接分享落地页地址
            // let query = {...this.$route.query}

            // data.url = _.reduce(query, (r, v, k) => r + `${k}=${v}&`, data.url + "?").replace(/[\?|\&]$/, '')

            // 分享信息暂存起来
            this.$root.shareData = _.pick(_.merge({shopId: 0}, data), 'title', 'desc', 'icon', 'url', 'userId', 'shopId', 'productId')

            this.action('shareable', {...this.$root.shareData, id: this.$route.params.id ,type: _.get(_.find(this.config.types, {route: this.$route.name}), 'id')})

            // 设置页面标题
            if(!this.env.isApp) {
                document.title = data.title
            }

            // 注册微信分享接口
            if(this.env.isWechat && !this.env.isTest) {
                const img = new Image()
                img.src = /^http/.test(data.icon) ? data.icon : this.config.img + data.icon + '?imageView2/1/w/310'
                img.onload = this._shareInit.bind(this, data, img.src)
                img.onerror = this._shareInit.bind(this, data, 'http://o0x80w5li.qnssl.com/logo.jpg')
            }
        },

        _shareInit(data, imgUrl) {
            this.wechatShareInit({
                title: data.title,
                desc: data.desc,
                link: data.url,
                imgUrl
            })
        },

        share() {
            this.action('share', this.$root.shareData)
        },

        wechatShareInit(opts) {
            const script = document.createElement('script')
            script.setAttribute('type', 'text/javascript')
            script.setAttribute('src', '//res.wx.qq.com/open/js/jweixin-1.0.0.js')
            document.getElementsByTagName('head')[0].appendChild(script)

            script.onload = () => {
                const [noncestr, timestamp] = ['myxx-!@#$#', Math.round(Date.now() / 1000)]
                const formData = new FormData()
                formData.append('noncestr', noncestr)
                formData.append('timestamp', timestamp)
                formData.append('url', location.href)

                // 不要使用封装后的$post,只有采用$http
                this.$http.post('wx/jsapisignature', formData)
                    .then(result => {
                        // 注册微信错误处理，防止页面白屏
                        wx.error(res => console.log('wx.error', res))
                        wx.config({
                            appId: 'wxcc40bf300d6200a3',
                            timestamp: timestamp,
                            nonceStr: noncestr,
                            signature: result.data.data.signature,
                            jsApiList: [
                                'checkJsApi',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeibo',
                                'onMenuShareQZone'
                            ]
                        })
                        // share list
                        wx.ready(() => {
                            wx.onMenuShareAppMessage(opts)
                            wx.onMenuShareTimeline(opts)
                            wx.onMenuShareQQ(opts)
                            wx.onMenuShareWeibo(opts)
                            wx.onMenuShareQZone(opts)
                        })
                })
            }
        }
    }
}
