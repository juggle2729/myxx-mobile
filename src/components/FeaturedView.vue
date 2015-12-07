<style>
html,
body,
main, 
mian > div {
    position: relative;
    height: 100%;
}

.swiper-container {
    width: 100%;
    height: 100%;
}
.swiper-slide {
    width: 90%;
    text-align: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    &:first-of-type, &:last-of-type {
        width: 705px;
    }
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 10px;
    position: absolute;
    left: 15px;
    top: 90px;
    right: 15px;
    bottom: 130px;
    background-size: cover;
    background-position: center;
    text-align: left;
    &::after {
        pointer-events: none;
        content: '';
        background-position: right 32px top 32px;
        background-repeat: no-repeat;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-size: 1.2rem;
        mix-blend-mode: overlay;
        background-image: url('/static/images/icon/ico_video.png');
    }
    .owner {
        display: flex;
        justify-content: space-around;
        padding: 0 32px;
        img {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            margin-right: 20px;
        }
        .desc {
            flex: 1;
            font-size: 32px;
            p {
                overflow: hidden;
                width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    .social-status {
        padding: 10px 0;
        display: flex;
        justify-content: space-around;
        font-size: 28px;
        margin: 0 32px 0 60px;
        .result {
            flex: 1;
            text-align: right;
        }
    }
}
</style>
<template>
    <div class="swiper-container swiper-container-banners">
        <div class="swiper-wrapper">
            <slide
              v-for="item in items"
              :item="item"
              track-by="id">
            </slide>
        </div>
    </div>
</template>
<script>
require('style!css!../styles/swiper.css');
require('../scripts/swiper.js');
import Slide from './Slide.vue';
export default {
  name: 'Home',
  components: {
    Slide
  },
  data() {
    return {
        items: []
    };
  },
  route: {
    data() {
        return this.$http
            .get('cms/promotes?section=cy031')
            .success(({data: {promotes: items}}) => {
                this.$data.items = items;
                // 添加延时，让vue渲染完成后，再做slider初始化
                setTimeout(this.render, 100);
            });
    }
  },
  methods: {
    render() {
        console.debug(this.items);
        const swiper = new Swiper('.swiper-container-banners', {
            spaceBetween: 0,
            initialSlide: 0,
            centeredSlides: true,
            slidesPerView: 'auto'
        });
    }
  }
}
</script>