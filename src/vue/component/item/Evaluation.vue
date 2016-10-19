<template lang="jade">
.evaluation-item.bg-white
    component(:is="config.category[item.type]", keep-alive, :item="item.entry")
    .hr
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
