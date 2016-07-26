<template>
<div class="user-evaluation bg-white">
    <recommend :data="items"></recommend>
</div>
</template>
<script>
import paging from 'paging';
import recommend from 'component/Recommend.vue';
export default {
    name: 'UserEvaluation',
    mixins: [paging],
    components: {
        recommend
    },
    ready() {
        this.fetch();
    },
    computed: {
        paging() {
            return {
                path: 'dc/sns/search',
                list: 'entries',
                params: {
                    owner_id: this.$route.params.id,
                    doc_type: 'jb'
                }
            }
        }
    }
}
</script>
