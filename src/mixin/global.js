import Q from 'q'
import bridge from '../bridge'
import config from '../config'
import Avatar from 'component/Avatar.vue'
import Empty from 'component/Empty.vue'
import PriceTag from 'component/PriceTag.vue'

const mixin = {
    components: [Avatar, Empty, PriceTag],

    data() {
        return {
            config
        }
    },

    computed: {
        env() {
            return this.$root.env
        },

        self() {
            return this.$root.user
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
        action(handler, params = '', callback) {
            // 所有参数采用字符串形式传递
            if(_.isObject(params)) {
                Object.keys(params).forEach(k => params[k] = _.isObjectLike(params[k]) ? params[k] : _.toString(params[k]))
            } else {
                params = _.toString(params)
            }
            let defer = Q.defer()
            bridge.then((bridge) => {
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
                        if(this.self) {
                            callback = resp => resp.trim() ? defer.resolve(resp) : defer.reject()
                        } else {
                            return this.action('login')
                        }
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
                    case 'newPurchase':
                    case 'newJade':
                    case 'newBid':
                        if(this.env.version < 2.0) {
                            this.action('toast', {success: 0, text: '请更新至最新版'})
                        }
                        break
                    case 'newSale':
                    case 'newDemand':
                        if(this.env.version < 2.1) {
                            this.action('toast', {success: 0, text: '请更新至最新版'})
                        }
                        break
                }
                bridge.callHandler.apply(this, [handler, params, callback].filter(arg => arg !== undefined))
            })
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
                                ['X-Api-Version', version || 'v9']
                            ].filter(header => header[1]))
                        this.$http[method](path, data, {headers})
                            .then(({data: resp}) => {
                                if(resp.status === 200) {
                                    defer.resolve(resp.data)
                                } else {    // 业务异常处理
                                    if([605, 608].indexOf(resp.status) !== -1) {
                                        this.action('login')
                                    } else {
                                        defer.reject(resp.message)
                                        if([3002, 5004, 2001, 2000, 2100, 2104].indexOf(resp.status) !== -1) {
                                            if(this.env.isApp) {
                                                this.$route.router.replace({'name': '404'})
                                            } else {
                                                console.debug(404, this.$route.path)
                                            }
                                        } else {
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
                targetType: this.config.shareables[this.$route.name] || this.$route.name
            }
            if(_.isObject(video)) {
                _.merge(args, video)
            }
            if(this.env.isApp) {
                this.action('play', args)
            } else {    // 在非App环境，采用回调来触发视频自动播放！
                let medias = [{id: args.id, type: 'video'}]
                if(!_.isEmpty(args.ads) && _.every(args.ads, id => id)) {
                    medias = medias.concat({id: args.ads[0], type: 'img'}, {id: args.ads[1], type: 'video'})
                }
                this.action('play', {medias} , fn => fn())
            }
        },

        coverflow(ids, index=0) {
            if(!_.isEmpty(ids) && _.every(ids, id => id)) {
                this.action('coverflow', {ids: ids.join(','), index})
            }
        }
    }
}
export default mixin
