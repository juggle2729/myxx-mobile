<style lang="sass">
.comment-component {
    font-size: 30px;
    color: #888888;
    i {
        transform: scale(1.5) translate3d(0, 2px, 0);
    }
}
</style>
<template>
<div class="comment-component">
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
