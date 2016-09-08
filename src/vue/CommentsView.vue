<style lang="stylus">
.comments-view
    padding-bottom: 80px
</style>
<template lang="jade">
    .comments-view
        comments(:type="type", :id="id", :limit="10", :auto="true")
</template>
<script>
import Comments from './component/Comments.vue'
export default {
    name: 'CommentsView',
    components: {
        Comments
    },
    data(){
        return {
            id: +this.$route.params.id,
            type: +this.$route.params.type
        }
    }
}
</script>
