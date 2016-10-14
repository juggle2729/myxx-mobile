<style lang="stylus">
.user-evaluation {
    min-height: inherit
}
</style>
<template lang="jade">
.user-evaluation
    evaluation-list(:path="'users/'+ $route.params.id + '/sns'", :params="{limit: 10, user_id: $route.params.id, doc_types: ['jb', 'jd']}")
</template>
<script>
import List from 'component/List.vue'
export default {
    name: 'user-evaluation',

    components: {
        evaluationList: new List('Evaluation')
    }
}
</script>
