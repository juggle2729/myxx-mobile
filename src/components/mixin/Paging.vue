<script>
import Q from 'q';
export default {
    data() {
        return {
            items: []
        };
    },
    events: {
        scrollToBottom(e) {
            this.fetch();
        }
    },
    methods: {
        fetch(fresh) {
            if(this.items.loading) {
                console.debug('loading in progress, skip...');
                return Q(true);
            } else if(fresh || this.items.hasMore !== false) {
                this.items.loading = true;
                let options = {limit: 10};
                
                if(this.paging.path.substr(-2) === 'v2') { // v2列表，采用last_id
                    if(!fresh && this.items.length) {
                        options.last_id = this.items[this.items.length-1].post_id || this.items[this.items.length-1].id;
                    }
                } else {
                    options.offset = fresh ? 0 : this.items.length;
                }
                return this.$get(this.paging.path, _.merge(options, this.paging.params)).then((data) => {
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

                        if(options.offset !== undefined) {
                            _.merge(this.items, {
                                total: data.total,
                                hasMore: this.items.length < data.total,
                                isEmpty: data.total === 0
                            });
                        } else {
                            _.merge(this.items, {
                                hasMore: data.total > 0 && items.length >= options.limit,
                                isEmpty: data.total === 0 && this.items.length === 0
                            });
                        }
                });
            }
        }
    }
};
</script>
