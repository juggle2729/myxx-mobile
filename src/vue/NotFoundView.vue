<style lang="stylus">
.not-found-view
    img
        width: 70%
        margin-top: 150px
</style>
<<<<<<< d29dec60130867405c7800a6689a408afeaefd72
<template lang="jade">
.not-found-view.center
    img(:src="'placeholder/notfound.png' | qn")
    .text.fz-30.gray 内容不存在
</template>
<script>
export default {
    name: 'not-found'
}
</script>
=======
<template lang="pug">
.not-found-view
    .content
    .img.center-h
        .text.fz-30 内容不存在
</template>
>>>>>>> 发布求购、升级jade到pug
