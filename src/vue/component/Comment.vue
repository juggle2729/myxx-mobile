<style lang="sass">
.comment-component {
    i {
        transform: scale(1.5);
    }
}
</style>
<template>
<div class="comment-component font-30 gray">
    <i class="icon-comment-solid"></i><span>{{count}}</span>
</div>
</template>
<script>
export default {
    name: 'Comment',
    props: {
        count: [Number]
    }
}
</script>
