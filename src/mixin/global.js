import Q from 'q'
import lodash from 'lodash'
import bridge from '../bridge'
import config from '../config'
import _ from 'lodash'

const mixin = {
    data() {
        return {
            config,
            lodash
        }
    },

    computed: {
        env() {
            // IMPROVE 计算数学依赖$route,页面切换时this为null，导致出错
            return this && this.$root.env
        },

        self() {
            return this && this.$root.user
        }
    },

    http: {
        root: config.api,
        emulateJSON: true
    },

    route: {
        waitForData: true
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
                                text: '与商家私聊、下单交易请下载美玉秀秀App——最大的和田玉交流平台',
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
                            if(resp) {
                                const user = _.update(_.isObject(resp) ? resp : JSON.parse(resp), 'id', id => +id)
                                this.$root.user = user
                                defer.resolve(user)
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
                                ['X-Api-Version', version || 'v17']
                            ].filter(header => header[1]))
                        let noData = (method === 'get' || method === 'delete')
                        this.$http[method](path, (noData ? {headers, params: _.omitBy(data, _.isNull), body: data, emulateJSON: true} : data), (noData ? '' : {headers}))
                            .then(({data: resp}) => {
                                if(resp.status === 200) {
                                    defer.resolve(resp.data)
                                } else {    // 业务异常处理
                                    if([605, 608].indexOf(resp.status) !== -1) {
                                        this.action('login')
                                    } else {
                                        defer.reject(resp)
                                        if([3002, 5004, 2001, 2000, 2100, 2104].indexOf(resp.status) !== -1) {
                                            if(this.env.isApp) {
                                                this.$route.router.replace({'name': '404'})
                                            } else {
                                                console.debug(404, path)
                                            }
                                        } else {
                                            this.action('toast', {success: '0', text: resp.message || '出错了'})
                                            console.debug(`[${resp.status}]${path}\n${resp.message}`)
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

        play(video) {
            let args = {
                id: video,
                targetId: this.$route.params.id,
                targetType: _.chain(this.config.types).find({route: this.$route.name}).get('biz').value() || this.$route.name
            }
            if(this.env.isApp) {
                this.action('play', args)
            } else {
                bridge.then((bridge) => {
                    bridge.callHandler.call(this, 'play', args, fn => fn())
                })
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
        }
    }
}
export default mixin
