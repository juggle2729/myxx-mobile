import Q from 'q';
export default {
    data() {
        return {
            items: []
        }
    },
    ready() {
        const cacheItems = this.$store.get(this._listItemsCacheKey())
        if (cacheItems && this.$route.list) {
            this.items = cacheItems
            this.$nextTick(() => {
                const leavePosition = this.$store.get(this._listCacheKey())
                window.scrollTo(0, leavePosition);

                this.$store.remove(this._listCacheKey())
            })
            this.$store.remove(this._listItemsCacheKey())
        } else {
            this.fetch(true);
        }
    },
    events: {
        scrollToBottom(e) {
            // 避免两个子组件切换时该事件分别执行一次
            if(this.$options.events.scrollToBottom.length === 1) {
                // auto 可以为 undefined 或者 true
                if (this.paging.auto !== false) {
                    this.fetch()
                }
            }
        }
    },
    methods: {
        fetch(fresh) {
            if(this.items.loading) {
                console.debug('loading in progress, skip...');
                return Q(true);
            } else if(fresh || this.items.hasMore !== false) {
                this.items.loading = true;
                this.$root.loading = fresh && this.paging.loading !== false;
                const opts = {
                    limit: 10,
                    offset: fresh ? 0 : this.items.length,
                    cursor: this.items.cursor,
                    ...this.paging.params
                };

                // show more loading icon
                let moreEle = null
                if (this.items.length && !fresh) {
                    moreEle = this._moreEle()
                    this.$el.appendChild(moreEle)
                }

                return this.$fetch(this.paging.path, opts)
                    .then(data => {
                        let items = data[this.paging.list || 'entries'];
                        if(_.isFunction(this.paging.transform)) {
                            items = this.paging.transform.bind(this)(items);
                        }
                        if(fresh) {
                            this.items.splice(0, this.items.length, ...items);
                        } else {
                            this.items.splice(this.items.length, 0, ...items);
                        }
                        this.items.loading = false;
                        this.$root.loading = false;
                        _.merge(this.items, {
                            total: data.total,
                            cursor: data.cursor,
                            hasMore: this.items.length < (data.total || 999999),
                            isEmpty: this.items.length === 0
                        })

                        // 处理返回的一些特殊字段
                        if (_.isArray(this.paging.specials) && !opts.offset) { // 第一页数据的时候才需要更新
                            const specialObj = {}
                            this.paging.specials.forEach(special => {
                                specialObj[special] = data[_.snakeCase(special)]
                            })
                            _.merge(this.items, specialObj)
                        }

                        // remove more loading icon
                        moreEle && this.$el.removeChild(moreEle)
                }, () => {
                        this.items.loading = false
                        this.$root.loading = false

                        // remove more loading icon
                        moreEle && this.$el.removeChild(moreEle)
                    });
            }
        },
        _listCacheKey() {
            return `list-leave-position-${this.$route.name}`
        },
        _listItemsCacheKey() {
            return `cache-items-${this.$route.name}`
        },
        _moreEle() {
            const ele = document.createElement('div')
            ele.style.background = 'white url(\'https://o0x80w5li.qnssl.com/more.gif\') no-repeat center'
            ele.style.backgroundSize = '60px 10px'
            ele.style.height = '48px'
            return ele
        }
    },
    route: {
        deactivate({to, next}) {
            if (this.$route.list && to && to.detail) { // 跳转至详情页才需要缓存
                this.$store.set(this._listCacheKey(), this._scrollTop())
                this.$store.set(this._listItemsCacheKey(), this.items)
            }
            next()
        }
    }
};