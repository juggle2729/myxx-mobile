<style lang="sass">
.comment-component {
    font-size: 30px;
    i {
        transform: scale(1.2) translate3d(0, 2px, 0);
    }
}
</style>
<template>
<div class="comment-component">
    <i class="icon-comment"></i><span>{{count}}</span>
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
