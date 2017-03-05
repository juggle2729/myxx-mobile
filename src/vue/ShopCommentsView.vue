<template lang="pug">
.shop-comments-view
    opinion-list(:items="items")
</template>
<script>
import paging from 'paging'
import OpinionList from 'component/OpinionList.vue'
export default {
    name: 'shop-comments-view',

    mixins: [paging],

    components: {
        OpinionList
    },

    computed: {
        paging() {
            return {
                path: `mall/shop/${this.$route.params.id}/comments`,
                list: 'comments'
            }
        }
    }
}
</script>