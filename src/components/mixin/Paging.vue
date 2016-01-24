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
                let offset = fresh ? 0 : this.items.length;
                let limit =  5;
                return this.$get(this.paging.path, _.merge({offset, limit}, this.paging.params)).then((data) => {
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
                        this.items.total = data.total;

                        _.merge(this.items, {
                            total: data.total,
                            hasMore: this.items.length < data.total,
                            isEmpty: data.total === 0
                        });
                });
            }
        }
    }
};
</script>
