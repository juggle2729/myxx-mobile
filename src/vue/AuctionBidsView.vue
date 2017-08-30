<template lang="pug">
.auction-bids-view
    auction-bids(:id='+$route.params.id', :status="$route.params.status")
</template>
<script>
import AuctionBids from 'component/AuctionBids.vue'
export default {
    name: 'auction-bids-view',
    components: [ AuctionBids ]
}
</script>