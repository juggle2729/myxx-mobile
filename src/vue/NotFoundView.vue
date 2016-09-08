<style lang="stylus">
@import '~style/partials/var'
.not-found-view
    .content
        position: relative
        top: 118px
        text-align: center
        .img
            width: 537px
            height: 320px
            background-image: url($qn + 'placeholder/notfound.png')
        .text
            margin-top: 118px
</style>
<template lang="jade">
.not-found-view
    .content
    .img.center-h
        .text.fz-30 内容不存在
</template>