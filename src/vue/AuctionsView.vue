<style lang="stylus">
@import '~style/partials/mixin'
@import '~style/partials/var'
.auctions-view
    .tabs
        height: 100px
        > div
            line-height: 50px
</style>
<template lang="pug">
.auctions-view
    .tabs.flex.fz-30.bdb
        .flex-1.center(v-for="t in tabs", :class="{'bdl': $index, 'red': t.key===tab}", @click="load(t.key)") {{t.label}}
    template(v-for="item in items")
        auction-item(:item="item")
    empty(v-if="items.isEmpty", title="暂无拍卖")
</template>
<script>
import paging from 'paging'
import AuctionItem from 'component/AuctionItem.vue'
export default {
    name: 'auctions-view',
    mixins: [paging],
    components: {
        AuctionItem
    },
    data() {
        // id存在，表示页面为我的拍卖
        const userId = this.$route.params.id
        if(!!userId) {
            return {
                tab: 'mine',
                tabs: [
                    {
                        label: '我的参拍',
                        key: 'mine'
                    }, {
                        label: '结拍提醒',
                        key: 'end'
                    }
                ],
                list: {
                    mine: [],
                    end: []
                },
                isMine: true,
                userId
            }
        } else {
            return {
                tab: 'auctioning',
                tabs: [
                    {
                        label: '拍卖',
                        key: 'auctioning'
                    }, {
                        label: '预展',
                        key: 'preview'
                    }
                ],
                list: {
                    auctioning: [],
                    preview: []
                }
            }
        }
    },

    ready() {
        this.action('action', {icon: 'question-2x.png'})
            .then(() => {
                this.$router.go({name: 'auction-help'})
            })

        this.$on('restore', () => {
            this.action('action', {icon: 'question-2x.png'})
                .then(() => {
                    this.$router.go({name: 'auction-help'})
                })
        })
    },

    computed: {
        paging() {
            if(this.isMine) {
                const params = {}
                if(this.tab === 'mine') {
                    params.bidder_id = this.userId
                } else if (this.tab === 'end') {
                    params.reminder_id = this.userId
                }

                return {
                    path: 'mall/user_auctions',
                    list: 'auctions',
                    params
                }
            }

            return {
                path: 'mall/auctions',
                list: 'auctions',
                params: {
                    status: this.tab
                }
            }
        },
        items() {
            return this.list[this.tab]
        }
    },

    methods: {
        load(tab) {
            this.tab = tab
            if(!this.items.length) {
                this.fetch(true)
            }
        }
    }
}
</script>