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
            switch(this.$route.name) {
                case 'evaluation':
                    data.title = entry.status ? entry.results[0].identifier.name+'的视频鉴宝' : '大师在线视频鉴宝';
                    data.desc = entry.description;
                    data.icon = entry.pictures[0];
                    data.text = '免费找大师看看我的宝贝';
                    break;
                case 'result':
                    const [result, identifier, isSelf] = [
                        entry.results[0],
                        entry.results[0].identifier.name,
                        entry.results[0].identifier.id == this.$route.query.user
                        ];

                    if(result.result === 'genuine') {
                        data.title = isSelf ? '我给出的鉴定结果为真，你看怎样' : (identifier + '鉴定这块玉为真，你看怎样');
                    } else if(result.result === 'fake') {
                        data.title = isSelf ? '我给出的鉴定结果为假，你看怎样' : (identifier + '鉴定这块玉为假，你看怎样');
                    } else {
                        data.title = '这块玉我拿不准，你来看看';
                    }
                    data.desc = entry.description;
                    data.icon = entry.pictures[0];
                    data.text = '免费找大师看看我的宝贝';
                    break;
                case 'story':
                    data.title = '我在美玉秀秀晒了个宝';
                    data.desc = entry.content;
                    data.icon = entry.cover;
                    if(entry.cover_type !== 'picture') {
                        data.icon = this.config.video + data.icon + '?vframe/jpg/offset/0/rotate/auto|imageView2/1/w/100';
                    }
                    data.text = '秀出我的宝贝';
                    break;
                case 'jade':
                    data.title = '我在 [美玉秀秀] 发现一个宝贝！';
                    data.desc = entry.name;
                    data.icon = entry.imgs[0];
                    data.text = '我要去逛逛';
                    break;
                case 'master':
                    data.title = entry.interview.title;
                    data.desc = entry.baseData.name + ' ' + _.get(entry.baseData.titles[0], 'name', '');
                    data.icon = entry.baseData.photo;
                    data.hasDownloadLink = false;
                    break;
                case 'user':
                    data.title = `${entry.name}的美玉秀show`;
                    data.desc = entry.name;
                    data.icon = entry.photo;
                    data.text = '下载应用,查看更多详情';
                    break;
                case 'lesson':
                    data.title = entry.title;
                    data.desc = '我在美玉秀秀讲了这堂课，听听你的想法!';
                    data.icon = entry.user.photo;
                    break;
                default:
                    data.title = '美玉秀秀';
                    data.desc = '大师在线视频鉴宝';
                    data.icon = 'http://o0x80w5li.qnssl.com/logo.png';
                    data.url = this.config.download;
            }
            // 截取描述文字前20字符,防止emoji表情被截断导致iOS平台无法识别
            data.desc = data.desc.substr(0, /([\uD800-\uDBFF])/.test(data.desc.charAt(19)) ? 19 : 20) + '...';

            // 拼接分享落地页地址
            let query = _.merge({}, this.$route.query, {
                user: _.get(this, 'self.id', -1),
                time: Date.now()
            });
            data.url = data.url + '?' + _.map(query, (v, k) => `${k}=${v}`).join('&');

            // 分享信息暂存起来
            this.$root.shareData = data;

            if(shareable) {
                let {title, desc, icon, url} = data;
                this.action('shareable', {title, desc, icon, url});
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
                    link: data.url,
                    imgUrl: this.config.img + data.icon + '?imageView2/1/w/310'
                };
                this.wechatShareInit(shareData);
            }
        },
        share() {
            let {title, desc, icon, url} = this.$root.shareData;
            this.action('share', {title, desc, icon, url});
        },
        wechatShareInit(shareData) {
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
                    // config
                    wx.config({
                        debug: process.env.NODE_ENV !== 'production',
                        appId: 'wxcc40bf300d6200a3',
                        timestamp: timeStamp,
                        nonceStr: nonceStr,
                        signature: result.signature,
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
                        wx.onMenuShareTimeline(shareData);
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