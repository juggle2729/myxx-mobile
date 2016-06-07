<style lang="sass">
@import '~style/partials/var';
.empty-component {
    background-image: url('#{$qn}/placeholder/empty.png');
    background-size: 160px 160px;
    background-position: center 60px;
    min-height: 300px;
    padding-top: 260px;
    .title {
        text-align: center;
    }
}
</style>
<template>
<div class="empty-component font-30 gray bg-white">
    <slot><div class="title">{{title || '暂无数据'}}</div></slot>
</div>
</template>
<script>
export default {
    name: 'Empty',
    props: {
        title: {
            type: String
        }
    }
}
</script>