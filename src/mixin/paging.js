import Q from 'q';
export default {
    data() {
        return {
            items: []
        };
    },
    events: {
        scrollToBottom(e) {
            this.paging.list !== 'comments' && this.fetch();
        }
    },
    methods: {
        fetch(fresh) {
            if(this.items.loading) {
                console.debug('loading in progress, skip...');
                return Q(true);
            } else if(fresh || this.items.hasMore !== false) {
                this.items.loading = true;
                let options = {};

                if(this.paging.id) { // cursor即以前的last_id, 目前仅部分更新为cursor
                    if(!fresh && this.items.length) {
                        this.cursor ? (options.cursor = this.cursor) : (options.last_id = _.get(this.items[this.items.length-1], this.paging.id));
                    }
                } else {
                    options.limit = 5;
                    options.offset = fresh ? 0 : this.items.length;
                }
                return this.$get(this.paging.path, _.merge(options, this.paging.params)).then((data) => {
                        this.cursor = data.cursor; // 采用last_id方式时需要的分页参数
                        let items = data[this.paging.list];
                        if(typeof this.paging.transform === 'function') {
                            items = this.paging.transform.call(this, items);
                        }
                        if(fresh) {
                            this.items.splice(0, this.items.length, ...items);
                        } else {
                            this.items.splice(this.items.length, 0, ...items);
                        }
                        this.items.loading = false;
                        _.merge(this.items, {
                            total: data.total,
                            hasMore: ((items.length === (this.paging.limit || options.limit)) && (this.items.length < data.total)),
                            isEmpty: items.length === 0
                        });
                });
            }
        }
    }
};
