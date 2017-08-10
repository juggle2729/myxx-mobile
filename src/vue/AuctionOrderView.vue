<template lang="pug">
.auction-order-view
    tabs(:tabs="views", :current="'all'")
</template>
<script>
import tabs from 'component/Tabs.vue'
export default {
    name: 'auction-order-view',
    components: [ tabs ],

    data() {
        return {
            views: {all: '全部', wait: '待付款', send: '待发货', receive: '待收货', 'done': '售后'}
        }
    }
}
</script>