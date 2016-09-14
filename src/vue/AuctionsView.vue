<style lang="stylus">
</style>
<template lang="jade">
.auctions-view auctions
</template>
<script>
export default {
    name: 'auctions',

    data() {
        return {
            tabs: [
                {
                    label: '拍卖',
                    value: 'auction'
                }, {
                    label: '预展',
                    value: 'auction'
                }
            ]
        }
    }
}
</script>