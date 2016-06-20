<style lang="sass">
.comments-view {
    padding-bottom: 80px;
}
</style>
<template>
    <div class="comments-view">
        <comments :type="type" :id="id"></comments>
    </div>
</template>
<script>
import Comments from './component/Comments.vue';
export default {
    name: 'CommentsView',
    components: {
        Comments
    },
    data(){
        return {
            id: +this.$route.params.id,
            type: this.$route.params.type
        };
    }
}
</script>
