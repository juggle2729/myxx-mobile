<style lang="stylus">
.shop-instruction-view
    line-height: 0
    img
        width: 100%
</style>
<template lang="pug">
.shop-instruction-view
    img(:src="'shop/instruction/cover.png' | qn")
    template(v-for="item in 7")
        img(v-if="$index>0", :src="'shop/instruction/'+item+'.png' | qn")
</template>