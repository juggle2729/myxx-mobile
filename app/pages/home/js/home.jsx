const data = {
    promotes: [],
    list: []
};

const vm = new Vue({
    el: '#app',
    data,
    created() {
    },
    methods: {
        init() {
            const getBanners = this.$http.get(`cms/promotes?section=cy031`, resp => {
                this.promotes = resp.data.promotes;
            });
            const getJades = this.$http.get(`cms/promotes?section=cy051`, resp => {
                this.list = resp.data.exbition;
            });
            return Promise.all([getBanners, getJades]).then(this.render);
        },
        render() {
            const swiperH = new Swiper('.swiper-container-h', {
                paginationClickable: true,
                spaceBetween: 0,
                initialSlide: 0,
                centeredSlides: true,
                slidesPerView: 'auto'
            });
            const swiperV = new Swiper('.swiper-container-v', {
                paginationClickable: true,
                direction: 'vertical',
                initialSlide: 0,
                spaceBetween: 0
            });
            let delta = 0;
            const swiperS = new Swiper('.swiper-container-scroll', {
                scrollbar: '.swiper-scrollbar',
                direction: 'vertical',
                slidesPerView: 'auto',
                mousewheelControl: true,
                freeMode: true,
                onSetTranslate: (swiper, translate) => {
                    delta = translate;
                },
                onTouchEnd: () => {
                    if(delta > 70) {
                        swiperV.slidePrev();
                    }
                }
            });
        }
    }
});
