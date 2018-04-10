<template lang="pug">
.opinion-list.bg-white(:class="items.isEmpty ? '' : ['pdh-32', 'bdb']")
    opinion(v-for="item in items", :item="item", :seller="seller")
    empty(v-if="items.isEmpty")
</template>
<script>
import Opinion from './Opinion.vue'
export default {
    name: 'opinion-list',
    components: { Opinion },
    props: {
        items: Array,
        seller: {
            type: Boolean,
            default: false
        }
    },
}
</script>