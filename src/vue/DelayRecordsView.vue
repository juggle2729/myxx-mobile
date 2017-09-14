<style lang="stylus">
.delay-records
    height 100%
</style>
<template lang="pug">
.delay-records.bg
    .pdl-32.pdb-32.bg-white.fz-26
        .title.gray.line-height-90.bdb 延时记录 {{ delayBids.length }}
        .delay-records.mgt-32.black(v-for="bid in delayBids") {{ bid.create_at | date 'mm-dd HH:MM:ss' }}有人出价，拍卖延时至{{ bid.delay_to | date 'HH:MM:ss' }}结束
</template>
<script>
import dateformat from 'dateformat'
export default {
    name: 'delay-records',

    data() {
        return {
            delayBids: []
        }
    },

    route: {
        data() {
            this.$fetch(`mall/auctions/${this.$route.params.id}/bids`).then(({bids}) => {
                this.delayBids = bids.filter(bid => {
                    return bid.delay_to
                })
            })
        }
    }
}
</script>
