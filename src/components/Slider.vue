<style lang="sass">
.slider {
    position: relative;
    width: 100%;
    height: 577px;
    overflow: hidden;
    .slide-container {
        display: -webkit-box;
        transition: transform .3s linear;
        height: 100%;
        min-height: 100%;
    }
    .slide {
        background-size: cover;
        background-position: center;
        background-color: red;
        width: 100%;
        min-height: 100%;
        height: 100%;
    }
    .paging {
        position: absolute;
        bottom: 0;
        display: block;
        width: 100%;
        .dot {
            display: inline-block;
            margin: 10px;
            width: 20px;
            height: 20px;
            border-radius: 100%;
            border: 2px solid #d9d9d9;
            &.active {
                background-color: white;
            }
        }
    }
}
</style>
<template>
<div class="slider">
    <div class="slide-container">
        <div v-for="id in ids" data-index={{$index}} class="slide" v-bg="id"></div>
    </div>
    <div class="paging center">
        <div class="dot" :class="{'active': !$index}" data-index={{$index}} v-for="id in ids"></div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Slider',
    props: {
        ids: {
            default: []
        }
    },
    ready() {
        this.$watch('ids', (ids) => {
            const threshold = 50;
            let pageX = 0;
            let slides = [...document.querySelectorAll('.slide')];
            slides.forEach((slide) => {
                slide.addEventListener('touchstart', (e) => {
                    pageX = e.pageX;
                }, false);
                slide.addEventListener('touchend', (e) => {
                    let diff = e.pageX - pageX;
                    if(Math.abs(diff) > threshold) {
                        if(diff < 0) {
                            this.transform(1, e.target.dataset.index);
                        } else {
                            this.transform(-1, e.target.dataset.index);
                        }
                    } else {
                        e.preventDefault();
                    }
                }, false);
            });
        });
    },
    methods: {
        transform(step, index) {
            let nextSlideIndex = step + Number.parseInt(index);
            if(nextSlideIndex >= 0 && nextSlideIndex < this.ids.length) {
                const container = document.querySelector('.slide-container');
                container.style.transform = `translate3d(-${nextSlideIndex*100}%, 0px, 0px)`;
                let dots = [...document.querySelectorAll('.dot[data-index]')];
                dots.forEach((dot) => {
                    if(dot.dataset.index == nextSlideIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            } 
        }
    }
}
</script>