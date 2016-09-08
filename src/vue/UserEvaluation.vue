<style lang="stylus">
.user-evaluation {
    min-height: inherit
    .list {
        padding: 10px 0 0 15px
    }
}
</style>
<template>
<div class="user-evaluation" :class="{'bg-white': items.isEmpty}">
    <div class="list">
        <card v-for="item in items" :entry="item.entry" :type="item.type"></card>
    </div>
    <empty v-if="items.isEmpty" title="暂无鉴宝"></empty>
</div>
</template>
<script>
import paging from 'paging'
import Card from 'component/Card.vue'
export default {
    name: 'UserEvaluation',
    mixins: [paging],
    components: [Card],
    computed: {
        paging() {
            return {
                path: 'dc/sns/search',
                params: {
                    owner_id: this.$route.params.id,
                    doc_type: 'jb'
                }
            }
        }
    }
}
</script>
