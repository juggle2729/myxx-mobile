<style lang="stylus">
.swiper-container
    .swiper-slide
        padding-top 100%
    &.live .swiper-slide
        padding-top 75.07%
    .swiper-pagination
        display inline
        font-size 22px
        color white
        left auto
        right 32px
        bottom 24px
        border-radius 4px
        width auto
        background-color rgba(0, 0, 0, 0.3)
        padding 10px
</style>
<template lang="pug">
swiper(:options="swiperOption", :class="type")
    swiper-slide.flex.video(v-if='item.video && item.first_picture', v-bg.lg='item.cover || item.first_picture', @click='play(item.video)')
    template(v-if="pictures.length")
        swiper-slide.flex(v-for="picture in pictures", v-bg.lg='picture', track-by='$index', @click='coverflow(pictures, $index)')
    .swiper-pagination(slot='pagination')
</template>
<script>
export default {
    name: 'CustomSwiper',

    props: {
        item: {
            type: Object,
            required: true
        },
        type: String
    },

    data() {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                direction: 'horizontal',
                paginationType: 'custom',
                paginationCustomRender(swiper, current, total) {
                    return `<span class="swiper-pagination-active">${current}</span
                            >/<span class="swiper-pagination-total">${total}</span>`
                }
            }
        }
    },

    computed: {
        pictures() {
            if (this.item.pictures && this.item.pictures.length) {
                this.item.first_picture = this.item.pictures.splice(0, 1)
                return this.item.pictures
            } else {
                return []
            }
        }
    }
}
</script>