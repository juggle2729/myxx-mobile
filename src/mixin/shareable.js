export default {
    ready() {
        if(this.env.isShare) {
            _.delay(() => { // 分享统计
                const type = {question: 'jianbao', answer: 'jianbaoresult', story: 'topic', post: 'topic', jade: 'product', master: 'website'}
                this.$fetch('log/content_readings', {
                            ...this.$route.query,
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
                hasDownloadLink: true,
                url: location.origin + location.pathname
            }
            switch(this.$route.name) {
                case 'evaluation':
                    const result = _.get(entry, 'results[0]')
                    if(!this.$route.query.result) {
                        data.title = '【求鉴定】此玉如何，看官给个说法呗？'
                    } else if(result){
                        if(result.result === 'unsure') {
                            data.title = '【疑】这块玉让人拿不准，你来挑战下？'
                        } else if(result.identifier.id == this.$route.query.user) {
                            data.title = '我给出的鉴定结果为' + (result.result === 'fake' ? '假' : '真') + '，你看怎样'
                        } else {
                            data.title = result.identifier.name + '鉴定这块玉为真，你看怎样'
                        }
                    }
                    data.desc = entry.description
                    data.icon = entry.pictures[0]
                    data.text = '免费找大师看看我的宝贝'
                    break
                case 'story':
                    data.title = entry.content
                    data.desc = entry.content

                    if (entry.topic_type.code === 'wjx') {
                        data.title = '终于找到组织啦！千万玉友等你来秀'
                        data.text = '秀出我与美玉'
                    } else if (entry.topic_type.code === 'gy') {
                        data.desc = '雕工原来如此神奇！你见过这种工艺吗？'
                        data.text = '查看更多工艺秀'
                    } else if (entry.topic_type.code === 'zs') {
                        data.title = `【涨知识】${entry.content}`
                        data.desc = '美玉秀秀，最大和田玉视频知识分享社区'
                        data.text = '查看更多玉知识'
                    } else if (entry.topic_type.code === 'sb') {
                        data.title = `【值得一看】${entry.content}`
                        data.desc = '玩玉多年，私藏宝玉，晒给你看！'
                        data.text = '秀出我的宝贝'
                    } else if (entry.topic_type.code === 'xt') {
                        data.desc = '和田玉友的趣事，我看这挺有意思'
                        data.text = '秀出我的趣事'
                    } else if (entry.topic_type.code === 'hd') {
                        data.desc = '美玉秀秀，最大的和田玉视频鉴赏交易平台'
                        data.text = '下载美玉秀秀参与活动'
                    } else {
                        data.desc = '美玉秀秀，最大和田玉视频鉴赏交易社区'
                        data.text = '查看更多话题'
                    }

                    data.icon = entry.medias[0].id
                    if(entry.medias[0].type !== 'picture') {
                        data.icon = this.config.video + data.icon + '?vframe/jpg/offset/0/rotate/auto'
                    }
                    break
                case 'jade':
                    data.title = `【限量】${entry.title}`
                    data.desc = '玉友的新品上线啦！'
                    data.icon = entry.pictures[0]
                    data.hasDownloadLink = false
                    break
                case 'auction':
                    data.title = `美玉秀秀拍卖：${entry.title}`;
                    data.desc = `${entry.name}向您推荐美玉秀秀拍品！`;
                    data.icon = entry.pictures[0];
                    data.targets = '0,1';
                    break;
                case 'master':
                    data.title = entry.interview.title
                    data.desc = entry.baseData.name + ' ' + _.get(entry, '.baseData.titles.0.name', '')
                    data.icon = entry.baseData.photo
                    data.hasDownloadLink = false
                    break
                case 'user':
                    data.title = `${entry.name}的主页`
                    data.desc = entry.title || `我在美玉秀秀中认识了${entry.name}，推荐大家关注。`
                    data.icon = entry.photo
                    data.hasDownloadLink = false
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
                    data.hasDownloadLink = false
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
                    data.icon = entry.icon || 'https://o0x80w5li.qnssl.com/question.png'
                    break
            }
            data = {title: '美玉秀秀', desc: '大师在线视频鉴宝', icon: 'http://o0x80w5li.qnssl.com/logo.jpg', ...data}
            data.title = _.truncate(data.title, {
                length: /[\uD800-\uDBFF]/.test(data.title.charAt(40)) ? 39 : 40
            })
            // 截取描述文字前20字符,防止emoji表情被截断导致iOS平台无法识别
            data.desc = _.truncate(data.desc, {
                length: /[\uD800-\uDBFF]/.test(data.desc.charAt(25)) ? 24 : 25
            })

            // 拼接分享落地页地址
            let query = {...this.$route.query, user: _.get(this, 'self.id', -1), time: Date.now()}

            data.url = _.reduce(query, (r, v, k) => r + `${k}=${v}&`, data.url + "?").replace(/[\?|\&]$/, '')

            // 分享信息暂存起来
            this.$root.shareData = _.pick(data, 'title', 'desc', 'icon', 'url')

            this.action('shareable', this.$root.shareData)

            // 设置页面标题
            if(!this.env.isApp) {
                document.title = data.title
            }

            // 注册微信分享接口
            if(this.env.isWechat && !this.env.isTest) {
                this.wechatShareInit({
                    title: data.title,
                    desc: data.desc,
                    link: data.url,
                    imgUrl: /^http/.test(data.icon) ? data.icon : this.config.img + data.icon + '?imageView2/1/w/310'
                })
            }
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
                const [noncestr, timeStamp] = ['myxx-!@#$#', Math.round(Date.now() / 1000)]
                const formData = new FormData()
                formData.append('noncestr', noncestr)
                formData.append('timestamp', timestamp)
                formData.append('url', location.href)

                // 不要使用封装后的$post,只有采用$http
                this.$http.post('wx/jsapisignature', formData)
                    .then(result => {
                        wx.config({
                            appId: 'wxcc40bf300d6200a3',
                            timestamp: timeStamp,
                            nonceStr: nonceStr,
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
