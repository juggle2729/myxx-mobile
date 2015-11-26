const data = {
    promotes: [],
    list: [],
    x: 0
};

const vm = new Vue({
    el: '#app',
    data,
    created() {
        this.$watch('x', function(x) {
            if(x === 2) {
                this.render();
            }
        });
        this.$http.get(`http://192.168.199.205:8001/cms/promotes?section=cy031`, resp => {
            this.promotes = resp.data.promotes;
            this.x += 1;
        });
        this.$http.get(`http://192.168.199.205:8001/cms/promotes?section=cy051`, resp => {
            this.list = resp.data.exbition;
            this.x += 1;
        });
    },
    methods: {
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
