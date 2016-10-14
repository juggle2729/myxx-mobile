<template lang="jade">
.evaluation-item.bg-white.pdt(v-link="{name: 'question', params: {id: item.entry.post_id || item.entry.jianbao.post_id}}")
    div(v-if="item.type == 3")
        question(:item = "item.entry")
    div(v-else)
        answer(:item = "item.entry")
</template>
<script>
import question from 'component/item/Question.vue'
import answer from 'component/item/Answer.vue'
export default {
    name: 'evaluation-item',
    props: {
        item: Object
    },
    components: {
        question,
        answer
    }
}
</script>
