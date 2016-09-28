import Q from 'q';
export default {
    data() {
        return {
            items: []
        };
    },
    ready() {
        this.fetch();
    },
    events: {
        scrollToBottom(e) {
            // auto 可以为 undefined 或者 true
            if (this.paging.auto !== false) {
                this.fetch();
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
                const opts = {
                    limit: 10,
                    offset: fresh ? 0 : this.items.length,
                    cursor: this.items.cursor,
                    ...this.paging.params
                };

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
                        _.merge(this.items, {
                            total: data.total,
                            cursor: data.cursor,
                            hasMore: items.length === opts.limit && this.items.length < (data.total || 999999),
                            isEmpty: this.items.length === 0,
                        });
                });
            }
        }
    }
};
