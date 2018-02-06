import Q from 'q'
import bridge from '../bridge'
import config from '../config'
import _ from 'lodash'

const mixin = {
    data() {
        return {
            config,
            lodash: _
        }
    },

    computed: {
        env() {
            // IMPROVE 计算数学依赖$route,页面切换时this为null，导致出错
            return this && this.$root.env
        },

        self() {
            return this && this.$root.user
        },

        hasUniversalLinkSupport() {
            return this && this.env.isIOS && _.get(navigator.userAgent.match(/OS (\d+)/), 1) >= 9
        }
    },

    http: {
        root: config.api,
        emulateJSON: true
    },

    route: {
        waitForData: true,
        deactivate({ to, from, next }) {
            if (this.$route.detail && !to.list) {
                this.$store.set(this._detailCacheKey(), this._scrollTop())
            }
            next()
        }
    },

    created() {
        if(this.$root === this.$parent) {
            if(this.$options.route.data) {
                this.$watch('$loadingRouteData', loading => (this.$root.loading = loading))
            } else {
                this.$root.loading = false
            }
        }
    },

    methods: {
        /**
         * 调用接口，返回 promise
         * @param  {String} handler         接口名称，参考 wiki 文档
         * @param  {String|Object} params   接口参数
         * @return {Promise}                Q的promise
         */
        action(handler, params = '') {
            const guard = (needsLogin, appOnly, since, hasConfirm=false) => {
                let fb = undefined
                if(appOnly && !this.env.isApp) {
                    if(hasConfirm) {
                        fb = () => {
                            this.action('confirm', {
                                text: '与商家私聊、下单交易请下载美玉秀秀App——最大的和田玉线上交流App',
                                labels: ['稍后再说', '立即下载']
                            }).then((data) => {
                                if(data === '1') {
                                    this.gotoDownload()
                                }
                            })
                        }
                    } else {
                        fb = this.gotoDownload
                    }
                } else if(since && this.env.version < since) {
                    fb = () => {this.action('toast', {success: 0, text: '请更新至最新版'})}
                } else if(needsLogin && !this.self) {
                    fb = () => {this.action('login')}
                }
                return fb
            }
            let [defer, callback, fallback] = [Q.defer(), undefined, undefined]
            switch(handler) {
                case 'user':
                    callback = resp => {
                        if (resp) {
                            const user = _.update(_.isObject(resp) ? resp : JSON.parse(resp), 'id', id => +id)
                            this.$root.user = user
                            defer.resolve(user)
                            // 微信新用户登录时，跳转绑定手机号页面
                            const needBind = user.is_new && !user.phone
                            if (needBind && this.$store.get('bindPhone') !== false) {
                                this.action('bindPhone')
                            }
                        } else {
                            defer.resolve()
                        }
                    }
                    break
                case 'keyboard':
                    callback = resp => resp.trim() ? defer.resolve(resp) : defer.reject()
                    fallback = guard(true)
                    break
                case 'login':
                case 'confirm':
                case 'delete':
                case 'version':
                case 'region':
                case 'upload':
                case 'action':
                case 'cache':
                case 'bindPhone':
                    callback = resp => defer.resolve(resp)
                    break
                case 'chat':
                case 'orderConfirm':
                    fallback = guard(true, true, 1.5, true)
                    break;
                case 'newPurchase':
                case 'newJade':
                case 'newBid':
                    fallback = guard(true, true, 2.0)
                    break
                case 'newSale':
                case 'newDemand':
                    fallback = guard(true, true, 2.1)
                    break
                case 'couponList':
                    fallback = guard(false, true, 3.3)
                    break
            }
            if(fallback) {
                fallback()
            } else {
                // 所有参数采用字符串形式传递
                if(_.isObject(params)) {
                    Object.keys(params).forEach(k => params[k] = _.isObjectLike(params[k]) ? params[k] : _.toString(params[k]))
                } else {
                    params = _.toString(params)
                }
                bridge.then((bridge) => {
                    bridge.callHandler.apply(this, [handler, params, callback].filter(arg => arg !== undefined))
                })
            }

            return defer.promise
        },

        /**
         * 封装 vue-resource，对业务错误进行统一处理
         * @param  {String} url     api path,无需前缀
         * @param  {String} method  可选值为 get|post|delete 等
         * @param  {Object} data    请求数据
         * @return {Promise}        Q的promise
         */
        $req(url, method, data = {}) {
            let defer = Q.defer()
            this.action('user')
                .then(user => { // user可能为 undefined 或 object
                    if(user || method === 'get') {
                        const [path, version] = url.split('|')
                        let headers = _.fromPairs([ // 处理请求头
                                ['X-Auth-Token', _.get(user, 'token')],
                                ['X-Api-Version', version || 'v30']
                            ].filter(header => header[1]))
                        let noData = (method === 'get' || method === 'delete')
                        this.$http[method](path, (noData ? {headers, params: _.omitBy(data, _.isNull), body: data, emulateJSON: true} : data), (noData ? '' : {headers}))
                            .then(({data: resp}) => {
                                if(resp.status === 200) {
                                    resp.data = resp.data || {}
                                    resp.data.timestamp = resp.timestamp
                                    defer.resolve(resp.data)
                                } else {    // 业务异常处理
                                    if([605, 608].indexOf(resp.status) !== -1) {
                                        this.action('login')
                                    } else {
                                        defer.reject(resp)
                                        if([3002, 5004, 2001, 2000, 2100, 2104, 17001].indexOf(resp.status) !== -1) {
                                            if(this.env.isApp) {
                                                this.$route.router.replace({'name': '404'})
                                            } else {
                                                console.warn(404, path)
                                            }
                                        } else if ([12009, 1001, 1006, 2203].indexOf(resp.status) !== -1) { // ignore error
                                        } else {
                                            this.action('toast', {success: '0', text: resp.message || '出错了'})
                                            console.warn(`[${resp.status}]${path}\n${resp.message}`)
                                        }
                                    }
                                }
                            })
                    } else { // token缺失，无法进行数据请求
                        this.action('login')
                    }
                })
            return defer.promise
        },
        // 覆盖了默认的$get，待改进
        $fetch(url, data) {
            return this.$req(url, 'get', data)
        },
        $put(url, data) {
            return this.$req(url, 'put', data)
        },
        $post(url, data) {
            return this.$req(url, 'post', data)
        },
        $delete(url, data) {
            return this.$req(url, 'delete', data)
        },

        $cms(path, params = {}, method = 'get') {
            let defer = Q.defer()
            this.$http[method](`https://cms.meiyuxiuxiu.com/wp-json/wp/v2/${path}`,
                { params }).then(response => {
                if (response.status === 200) {
                    defer.resolve(response.body)
                } else {
                    console.error('Cms Request Error ', JSON.stringify(response))
                    defer.reject()
                }
            })
            return defer.promise
        },

        play(video) {
            let args = {
                id: video,
                targetId: this.$route.params.id,
                targetType: _.chain(this.config.types).find({route: this.$route.name}).get('biz').value() || this.$route.name
            }
            if(this.env.isApp) {
                this.action('play', args)
            } else if (this.env.isWechat) {
                bridge.then((bridge) => {
                    bridge.callHandler.call(this, 'play', args, fn => fn())
                })
            } else {
                this.$router.go({name: 'video', params: { id: video }})
            }
        },

        coverflow(ids, index=0) {
            if(!_.isEmpty(ids) && _.every(ids, id => id)) {
                this.action('coverflow', {ids: ids.join(','), index})
            }
        },

        gotoDownload() {
            if(!/myxx/i.test(window.navigator.userAgent)) {
                window.location.href = config.download
            }
        },

        deepOpen() {
            if(!this.$root.deep) {
                this.$root.popup = {handler: 'browser'}
            }
        },

        touchStart(event) {
            this.env.isIOS && !this.env.isTest && event.preventDefault()
        },

        toYuan(price) {
            return (price/100).toFixed(2).replace(/\.00$/, '')
        },

        truncate(str='', length) {
            return _.truncate(str, {length})
        },

        checkDetailLeavePosition() {
            const leavePosition = this.$store.get(this._detailCacheKey())
            if (leavePosition) {
                setTimeout(() => {
                    window.scroll(0, leavePosition)
                    this.$store.remove(this._detailCacheKey())
                }, 0)
            } else {
                window.scroll(0, 0)
            }
        },

        saveDetailLeavePosition() {
            this.$store.set(this._detailCacheKey(), this._scrollTop())
        },

        checkUser() {
            this.action('user').then(user => {
                if (!user) {
                    this.action('login')
                    return
                }
                this.$set('self', user)
            })
        },

        _detailCacheKey() {
            return `detail-leave-position-${this.$route.name}-${this.$route.params.id}`
        },

        _scrollTop() {
            return document.documentElement.scrollTop || document.body.scrollTop
        },

        track(eventId) {
            this.env.isApp && !this.env.isTest && window.MobclickAgent.onEvent(eventId)
        },

        precision(num, precision = 4) {
            if (!_.isNumber(num) || num === 0) return 0
            return num.toPrecision(precision).replace(/\.00$/, '')
        },

        goCmsLink(url) {
            !/^http/.test(url) && (url = `https://cms.meiyuxiuxiu.com/${url}`)
            if (this.env.isApp) {
                this.action('go', {url, target: 'blank' })
            } else {
                location.href = url
            }
        },

        duration(duration = 0) {
            const padZero = val => _.padStart(val, 2, '0')
            return `${padZero(parseInt(duration/60))}'${padZero(duration%60)}''`
        },

        actionToApp(to) {
            if (!this.env.isApp) return false // 非app
            let action = to.native && to.native(this.env.version)
            if (!action) return false
            action = _.isObject(action) ? _.merge(to, action) : to
            this.action(action.name, action.params)
            this.$router.replace('/transition')
            return true
        }
    }
}
export default mixin
