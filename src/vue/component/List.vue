<style lang="stylus">
@import '~style/partials/var'
.list
    >div.story-item
        margin-bottom: 20px
    &.empty
        background-image: url($qn + 'placeholder/empty-2.png')
        background-size: 160px 160px
        background-position: 50% calc(50% - 160px)
    // 全部评论页面及我的粉丝页面展示不合适，暂时去掉（pm-sxl）
    // &.loading::after
    //     content: '加载中...'
    //     display: block
    //     line-height: 80px
    //     text-align: center
    //     font-size: 24px
    //     color: $colors.light
</style>
<template  lang="pug">
.list.bg-white(:class="{'empty': hasMore===false && items.length===0, 'loading': isFetching}")
    component(:is="comp", :item="lodash.merge(item.entry || item, {type: item.type})", v-for="item in items")
</template>
<script>
const opts = {
    props: {
        path: String,
        params: Object,
        transform: [String, Function]
    },

    computed: {
        ds() {
            return this.req || _.pick(this, 'path', 'params', 'transform')
        }
    },

    ready() {
        this.fetch()
        if(!_.get(this, 'ds.params.freeze')) {
            this.$on('scrollToBottom', this.fetch)
        }
        // _.delay(() => {
        //     this.$el.style.minHeight = Math.max(window.innerHeight - this.$el.offsetTop, 50) + 'px'
        // }, 100)
    },

    methods: {
        fetch() {
            if(!this.isFetching && this.hasMore!==false) {
                this.isFetching = true
                const data = {
                    limit: 10,
                    offset: this.items.length,
                    cursor: this.cursor,
                    ...this.ds.params
                }
                this.$fetch(this.ds.path, data)
                    .then(resp => {
                        let items = []
                        if(_.isString(this.ds.transform)) {
                            items = resp[this.ds.transform]
                        } else if(_.isFunction(this.ds.transform)){
                            items = this.ds.transform.bind(this)(items)
                        } else {
                            items = resp.entries
                        }
                        this.total = resp.total
                        this.items.splice(this.items.length, 0, ...items)
                        this.cursor = resp.cursor
                        this.hasMore = items.length === data.limit && this.items.length < (this.total || 999999)
                        this.isFetching = false
                    })
            }
        }
    }
}

export default class List {
    constructor(comp, req) {
        return {
            name: `${comp}-list`,
            ...this.constructor.options,
            ...opts,
            components: {
                [comp]: require('component/item/' + comp + '.vue')
            },
            data: () => ({comp, req, items: [], total: null, isFetching: null, hasMore: null, cursor: null})
        }
    }
}
</script>