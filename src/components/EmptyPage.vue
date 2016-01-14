<style lang="sass">
@import '../styles/partials/var';
.empty-page {
    height: 100%;
    .empty-img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        background-image: url('#{$qn}/placeholder/empty.png');
        background-size: cover;
        margin-bottom: 40px;
    }
}
</style>
<template>
<div class="empty-page font-30 gray bg-white">
    <div class="center-vertical">
        <div class="empty-img center-horizontal"></div>
        <div class="center">{{title}}</div>
    </div>
</div>
</template>
<script>
export default {
    name: 'EmptyPage',
    props: {
        title: {
            required: true,
            default: '你还没有粉丝'
        }
    }
}
</script>
