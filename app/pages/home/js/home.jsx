// _.request('jianbao/applies/2')
//     .then(resp => {
//         console.log(resp);
//     });
const data = {
    slides: [
        {
            owner: '落水三千丈',
            desc: '新疆和田玉帮忙看看品质吧，从一个朋友那骗来的',
            bg: '1.jpg'
        }, {
            owner: '二胡卵子',
            desc: '不知道能值多少钱',
            bg: '2.jpg'
        }, {
            owner: '克里姆林',
            desc: '新手，大家帮忙看看是不是要发？',
            bg: '3.jpg'
        }
    ],
    list: [
        {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '1.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '2.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '3.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '4.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '5.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '2.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '1.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '2.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '3.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '4.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '5.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '2.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '1.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '2.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '3.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '4.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '5.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '2.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '1.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '2.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '3.jpg'
        }, {
            owner: '貔貅',
            desc: '和田玉手把件',
            price: 20000,
            img: '4.jpg'
        }, {
            owner: '二胡卵子',
            desc: '砖头一块',
            price: 18000,
            img: '5.jpg'
        }, {
            owner: '克里姆林',
            desc: '狮子头',
            price: 4133,
            img: '2.jpg'
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
