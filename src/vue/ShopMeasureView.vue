<style lang="stylus">
.shop-measure-view
    line-height: 0
    img
        width: 100%
</style>
<template lang="pug">
.shop-measure-view
    img(:src="'shop/measure/cover.png' | qn")
    template(v-for="item in 7")
        img(v-if="$index>0", :src="'shop/measure/'+item+'.png' | qn")
</template>