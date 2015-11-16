const data = {
    slides: [
        {
            owner: '落水三千丈',
            desc: '新疆和田玉帮忙看看品质吧，从一个朋友那骗来的',
            bg: '/images/1.jpg'
        }, {
            owner: '二胡卵子',
            desc: '不知道能值多少钱',
            bg: '/images/2.jpg'
        }, {
            owner: '克里姆林',
            desc: '新手，大家帮忙看看是不是要发？',
            bg: '/images/3.jpg'
        }
    ],
    list: [
        {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '/images/1.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '/images/2.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '/images/3.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '/images/4.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '/images/5.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '/images/2.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '/images/1.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '/images/2.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '/images/3.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '/images/4.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '/images/5.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '/images/2.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '/images/1.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '/images/2.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '/images/3.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '/images/4.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '/images/5.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '/images/2.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '/images/1.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '/images/2.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '/images/3.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '/images/4.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '/images/5.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '/images/2.jpg'
        }
    ]
};

const hSlidesTemplate = Handlebars.compile($('#h-slides-template').html())(data);
$('.swiper-container-h .swiper-wrapper').append($(hSlidesTemplate));

const jadeTemplate = Handlebars.compile($('#jade-template').html())(data);
$('.swiper-container-scroll .swiper-slide').append($(jadeTemplate));

const swiperH = new Swiper('.swiper-container-h', {
    paginationClickable: true,
    spaceBetween: 0,
    slidesPerView: 1.1
});
const swiperV = new Swiper('.swiper-container-v', {
    paginationClickable: true,
    direction: 'vertical',
    initialSlide: 0,
    spaceBetween: 0
});
const swiperS = new Swiper('.swiper-container-scroll', {
    scrollbar: '.swiper-scrollbar',
    direction: 'vertical',
    slidesPerView: 'auto',
    mousewheelControl: true,
    freeMode: true,
    onSetTranslate: (swiper, translate) => {
        if(translate > 70) {
            swiperV.slidePrev();
        }
    }
});
