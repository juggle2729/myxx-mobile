//分享 type 和 route 的对应关系

export default {
    ready() {
        if(this.env.isShare) {
            _.delay(() => { // 分享统计
                this.$get('log/content_readings',
                    _.merge(
                            {},
                            {id: this.$route.params.id, type: this.config.shareables[this.$route.name] || this.$route.name},
                            this.$route.query
                        )).then(_.noop);
            }, 3000);
        }
    },
    methods: {
        setShareData(entry, shareable) {
            let data = {
                hasDownloadLink: true,
                url: location.origin + location.pathname
            };
            let mergeDesc = false; // 分享朋友圈的时候, 是否需要合并描述到title
            switch(this.$route.name) {
                case 'evaluation':
                    const result = _.get(entry, 'results[0]');
                    if(this.$route.params.result === 'none' || this.$route.params.result === ':result') {
                        data.title = result ? result.identifier.name + '的视频鉴宝' : '大师在线视频鉴宝';
                    } else if(result){
                        if(result.result === 'unsure') {
                            data.title = '这块玉我拿不准，你来看看';
                        } else if(result.identifier.id == this.$route.query.user) {
                            data.title = '我给出的鉴定结果为' + (result.result === 'fake' ? '假' : '真') + '，你看怎样';
                        } else {
                            data.title = result.identifier.name + '鉴定这块玉为真，你看怎样';
                        }
                    }
                    data.desc = entry.description;
                    data.icon = entry.pictures[0];
                    data.text = '免费找大师看看我的宝贝';
                    break;
                case 'story':
                    data.title = entry.content;
                    data.desc = entry.content;

                    if (entry.topic_type.code === 'wjx') {
                        data.title = '终于找到组织啦！千万玉友等你来秀';
                        data.text = '秀出我与美玉';
                    } else if (entry.topic_type.code === 'gy') {
                        data.desc = '雕工原来如此神奇！你见过这种工艺吗？';
                        data.text = '查看更多工艺秀';
                    } else if (entry.topic_type.code === 'zs') {
                        data.title = `【涨知识】${entry.content}`;
                        data.desc = '美玉秀秀，最大和田玉视频知识分享社区';
                        data.text = '查看更多玉知识';
                    } else if (entry.topic_type.code === 'sb') {
                        data.title = `【值得一看】${entry.content}`;
                        data.desc = '玩玉多年，私藏宝玉，晒给你看！';
                        data.text = '秀出我的宝贝';
                    } else if (entry.topic_type.code === 'xt') {
                        data.desc = '和田玉友的趣事，我看这挺有意思';
                        data.text = '秀出我的趣事';
                    } else {
                        data.desc = '美玉秀秀，最大和田玉视频鉴赏交易社区';
                        data.text = '查看更多话题';
                    }

                    data.icon = entry.medias[0].id;
                    if(entry.medias[0].type !== 'picture') {
                        data.icon = this.config.video + data.icon + '?vframe/jpg/offset/0/rotate/auto';
                    }

                    break;
                case 'jade':
                    data.title = `【限量】${entry.title}`;
                    data.desc = '玉友的新品上线啦！';
                    data.icon = entry.pictures[0];
                    data.text = '查看更多新品';
                    break;
                case 'auction':
                    data.title = `${entry.title}正在拍卖`;
                    data.desc = `${entry.title}正在拍卖`;
                    data.icon = entry.pictures[0];
                    data.targets = '0,1';
                    break;
                case 'master':
                    data.title = entry.interview.title;
                    data.desc = entry.baseData.name + ' ' + _.get(entry.baseData.titles[0], 'name', '');
                    data.icon = entry.baseData.photo;
                    data.hasDownloadLink = false;
                    break;
                case 'user':
                    data.title = entry.isMaster ? `${entry.name}的官方主页` : `${entry.name}的个人主页`;
                    data.desc = '我在美玉秀秀晒了不少宝贝，你也来看看吧！';
                    data.icon = entry.photo;
                    data.text = '下载应用,查看更多详情';
                    break;
                case 'lesson':
                    data.title = '大师讲知识：' + entry.title;
                    data.desc = '我在美玉秀秀讲了这堂课，听听你的想法!';
                    data.icon = entry.user.photo;
                    data.text = '查看更多和田玉知识';
                    break;
                default:
                    data.title = '美玉秀秀';
                    data.desc = '大师在线视频鉴宝';
                    data.icon = 'http://o0x80w5li.qnssl.com/logo.png';
                    data.url = this.config.download;
            }
            data.title = _.truncate(data.title, {
                length: /[\uD800-\uDBFF]/.test(data.title.charAt(25)) ? 24 : 25
            });

            // 截取描述文字前20字符,防止emoji表情被截断导致iOS平台无法识别
            data.desc = _.truncate(data.desc, {
                length: /[\uD800-\uDBFF]/.test(data.desc.charAt(25)) ? 24 : 25
            });

            // 拼接分享落地页地址
            let query = _.merge({}, this.$route.query, {
                user: _.get(this, 'self.id', -1),
                time: Date.now()
            });
            data.url = data.url + '?' + _.map(query, (v, k) => `${k}=${v}`).join('&');

            // 分享信息暂存起来
            this.$root.shareData = data;

            if(shareable) {
                let {title, desc, icon, url, targets} = data;
                this.action('shareable', {title, desc, icon, url, targets});
            }

            // 设置页面标题
            if(!this.env.isApp) {
                document.title = data.title;
            }

            // 注册微信分享接口
            if(this.env.isWechat && /^app/.test(location.hostname)) {
                const shareData = {
                    title: data.title,
                    desc: data.desc,
                    link: data.url
                };

                if(/^http/.test(data.icon)) {
                    shareData.imgUrl = data.icon;
                } else {
                    shareData.imgUrl = this.config.img + data.icon + '?imageView2/1/w/310';
                }

                this.wechatShareInit(shareData, mergeDesc);
            }
        },
        share() {
            let {title, desc, icon, url, targets} = this.$root.shareData;
            this.action('share', {title, desc, icon, url, targets});
        },
        wechatShareInit(shareData, mergeDesc) {
            // load script
            const script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', '//res.wx.qq.com/open/js/jweixin-1.0.0.js');
            document.getElementsByTagName('head')[0].appendChild(script);

            script.onload = () => {
                const timeStamp = ~~(+new Date() / 1000);
                const nonceStr = this.randomWord();
                const url = location.href.split('#')[0];

                const formData = new FormData();
                formData.append('noncestr', nonceStr);
                formData.append('timestamp', timeStamp);
                formData.append('url', url);

                // 不要使用封装后的$post,只有采用$http
                this.$http.post('wx/jsapisignature', formData).then((result) => {
                    console.debug('sig');
                    wx.config({
                        debug: process.env.NODE_ENV !== 'production',
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
                    });
                    // share list
                    wx.ready(() => {
                        wx.onMenuShareAppMessage(shareData);
                        wx.onMenuShareTimeline(mergeDesc ? _.extend({}, shareData, {
                            title: shareData.title + (shareData.desc ? ' | ' + shareData.desc : '')
                        }) : shareData);
                        wx.onMenuShareQQ(shareData);
                        wx.onMenuShareWeibo(shareData);
                        wx.onMenuShareQZone(shareData);
                    });
                });
            }
        },
        randomWord: function(len) {
            var str = '',
                range,
                i = 0,
                o,
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            range = (len && typeof len === 'number') ? len : (Math.round(Math.random() * (32 - 8)) + 8);
            for (; i < range; i++) {
                o = Math.round(Math.random() * (arr.length - 1));
                str += arr[o];
            }
            return str;
        }
    }
};