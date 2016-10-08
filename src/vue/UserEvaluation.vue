<style lang="stylus">
.user-evaluation {
    min-height: inherit
    .list {
        padding: 10px 0 0 15px
    }
}
</style>
<template lang="jade">
.user-evaluation
    evaluation-list(path='dc/sns/search', :params="{owner_id: $route.params.id, doc_type: 'jb'}")
</template>
<script>
import List from 'component/List.vue'
export default {
    name: 'user-evaluation',

    components: {
        EvaluationList: new List('Card')
    }
}
</script>
