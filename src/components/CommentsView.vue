<style lang="sass">
    .comments-view {
        padding-bottom: 80px;
    }
</style>
<template>
    <div class="comments-view">
        <comment :type="type" :id="id"></comment>
    </div>
</template>
<script>
import Comment from './Comment.vue';
export default {
    name: 'CommentsView',
    components: {
        Comment
    },
    data(){
        return {
            id: Number(this.$route.params.id),
            type: String(this.$route.params.type)
        };
    }
}
</script>
