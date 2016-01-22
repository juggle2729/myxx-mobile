<template>
    <div class="titles">
        <nav class="title-list">
            <li class="title-item" v-for="title in titleData" :class="countStyle($index, title)" track-by="$index">
                <span class="text">{{title}}</span>
            </li>
        </nav>
        <div class="date-container">
            <nav class="title-date-list">
                <div class="split"></div>
                <li class="title-date-item" v-for="date in dateData" :class="{active: !$index}" track-by="$index">
                    <div class="dot">
                        <span class="inner"></span>
                        <span class="text">{{date}}</span>
                    </div>
                </li>
            </nav>
        </div>
    </div>
</template>
<script>
    import Scroll from '../../../utils/scroll';
    export default {
        name: 'resumes',
        ready() {
            Scroll.on('scroll', (direction) = > {
                this.titleAnimate(direction);
                this.titleDateInit();
            });
        },
        props: {
            resumes: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                activeCount: 0,
                maxDisplayCount: 4,
                dateItemWidth: 172,
                dateMarginLeft: -14,
                dateInit: false
            }
        },
        computed: {
            titleData() {
                let resArr = [];
                this.resumes.reduce((res, resume) => {
                    res.push(resume.description);
                    return res;
                }, resArr);
                return resArr;
            },
            dateData() {
                let resArr = [];
                this.resumes.reduce((res, resume) => {
                    res.push(resume.occur_at.substr(0, 4));
                    return res;
                },resArr);
                return resArr;
            }
        },
        methods: {
            countStyle(index, content) {
                let cls = '';
                if (index === 0) {
                    cls += 'level-0 active';
                } else if (index === 1) {
                    cls += 'level-1';
                } else if (index === 2) {
                    cls += 'level-2';
                } else if (index === 3) {
                    cls += 'level-3';
                } else {
                    cls += 'level-least';
                }

                const [ len, rowCount ] = [content.length, 14];
                if (len < rowCount) {
                    cls += ' first-line';
                } else if (len < rowCount * 2) {
                    cls += ' second-line';
                } else if (len < rowCount * 3) {
                    cls += ' third-line';
                }
                return cls;
            },
            titleAnimate(direction) {
                let titleItems = document.querySelectorAll('.title-list .title-item');
                if (direction === 'left') {
                    let isRemove = false;
                    Array.prototype.slice.call(titleItems).forEach((item, index) => {
                        const itemClasslist = item.classList;
                        if (itemClasslist.contains('active')) {
                            if (index === titleItems.length - 1) {
                                return;
                            }

                            this.activeCount = index;
                            itemClasslist.add('level-remove');
                            itemClasslist.remove('level-0');
                            itemClasslist.remove('active');
                            isRemove = true;

                            this.titleDateAnimate(direction);
                        } else if (itemClasslist.contains('level-least')) {
                            if (isRemove) {
                                itemClasslist.remove('level-least');
                                itemClasslist.add('level-' + (this.maxDisplayCount - 1));
                                isRemove = false;
                            }
                        } else if (!itemClasslist.contains('level-remove')) {
                            if (index === this.activeCount + 1) {
                                itemClasslist.add('active');
                                itemClasslist.add('level-0');
                                itemClasslist.remove('level-1');
                            } else {
                                itemClasslist.add('level-' + (index - this.activeCount - 1));
                                itemClasslist.remove('level-' + (index - this.activeCount));
                            }
                        }
                    });
                } else if (direction === 'right') {
                    Array.prototype.slice.call(titleItems).forEach((item, index) = > {
                        const itemClasslist = item.classList;
                        if (index === this.activeCount) {
                            if (itemClasslist.contains('level-remove')) {
                                itemClasslist.remove('level-remove');
                                itemClasslist.add('level-0');
                                itemClasslist.add('active');
                            }
                        } else if (0 < index - this.activeCount) {
                            if (index - this.activeCount < this.maxDisplayCount) {
                                if (itemClasslist.contains('active')) {
                                    itemClasslist.remove('active');
                                    itemClasslist.remove('level-0');
                                    itemClasslist.add('level-1');
                                } else {
                                    itemClasslist.add('level-' + (index - this.activeCount));
                                    itemClasslist.remove('level-' + (index - this.activeCount - 1));
                                }
                            } else {
                                itemClasslist.remove('level-' + (this.maxDisplayCount - 1));
                                itemClasslist.add('level-least');
                            }
                        }
                    });

                    this.titleDateAnimate(direction);
                    this.activeCount = this.activeCount > 0 ? this.activeCount - 1 : 0;
                }
            },
            titleDateInit() {
                if (this.dateInit) {
                    return;
                }

                this.dateInit = true;

                const titleDateList = document.querySelector('.title-date-list');
                const titleDateItems = titleDateList.querySelectorAll('.title-date-item');

                titleDateList.style.width = this.remToPx(titleDateItems.length * this.dateItemWidth);
                titleDateList.style.marginLeft = this.remToPx(this.dateMarginLeft);

                Array.prototype.slice.call(titleDateItems).forEach((item) = > {
                    item.style.width = this.remToPx(this.dateItemWidth);
                });
            },
            titleDateAnimate(direction) {
                if (direction !== 'left' && direction !== 'right') {
                    return;
                }

                const titleDateList = document.querySelector('.title-date-list');
                const titleDateItems = titleDateList.querySelectorAll('.title-date-item');

                if (direction === 'left') {
                    titleDateList.style.marginLeft = this.remToPx(this.dateMarginLeft - (this.activeCount + 1) * this.dateItemWidth);
                } else if (direction === 'right') {
                    titleDateList.style.marginLeft = this.remToPx(this.dateMarginLeft - (this.activeCount - 1 >= 0 ? this.activeCount : 0) * this.dateItemWidth);
                }

                const titleDateArray = Array.prototype.slice.call(titleDateItems);
                let activeIndex = 0;
                for (let i = 0; i < titleDateArray.length; i++) {
                    const itemClasslist = titleDateArray[i].classList;
                    if (itemClasslist.contains('active')) {
                        itemClasslist.remove('active');
                        activeIndex = i;
                        break;
                    }
                }

                titleDateList.classList.add('activing');

                setTimeout(() => {
                    titleDateList.classList.remove('activing');

                    let targetItem = null;
                    if (direction === 'left') {
                        targetItem = titleDateArray[activeIndex + 1];
                    } else if (direction === 'right') {
                        targetItem = titleDateArray[activeIndex - 1 >= 0 ? activeIndex - 1 : 0];
                    }

                    targetItem && targetItem.classList.add('active');
                },100);
            },
            remToPx(px, specSize = 750) {
                if (!px) {
                    return 0;
                }
                return px / ((specSize / 320) * 16) + 'rem';
            }
        }
    }
</script>
<style lang="sass" scoped>
    @import '../../../styles/partials/_var.scss';

    @mixin listBg($bgColor, $iconColor) {
        &:after {
            content: '';
            background-color: $ bgColor;
            position: absolute;
            top: 0;
            left: 1px;
            z-index: 1;
            display: block;
            width: 100%;
            height: 100%;
        }

        &:before {
             content: '';
             display: inline-block;
             width: 11px;
             height: 23px;
             background: $ iconColor;
             position: absolute;
             top: 15px;
             right: 18px;
             z-index: 2;
         }
    }

    li {
        display: inline-block;
    }

    .titles {
        position: absolute;
        top: 100%;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 88;

        background-image: url('#{$qn}/artist/resume_cover.png');
        background-repeat: no-repeat;
        background-size: 100% 344px;
        padding-top: 224px;
        color: #fff;
    }

    .title-list {
        text-align: center;
        position: relative;
        width: 100%;
        height: 624px;

        .title-item.level-remove {
            left: -199px;
        }

        .title-item.level-0 {
            z-index: 10;
        }

        .title-item.level-1 {
            z-index: 8;
            transform: scale(0.95, 0.95) translateX(72px);
            background-color: #4d3616;
            @include listBg(#4d3616, #3a2810);
        }

        .title-item.level-2 {
            z-index: 6;
            transform: scale(0.90, 0.90) translateX(144px);
            @include listBg(#3b2911, #2d1e0b);
        }

        .title-item.level-3 {
            z-index: 4;
            transform: scale(0.85, 0.85) translateX(216px);
            @include listBg(#261a0c, #2d1e0b);
        }

        .title-item.level-least {
            z-index: 2;
            transform: scale(0.85, 0.85) translateX(216px);
            @include listBg(#261a0c, #2d1e0b);
        }

        .title-item.active.second-line {
            .text {
                position: relative;
                left: -1px;
            }
        }

        .title-item.active.third-line {
            padding-right: 1.1px;
        }
    }

    .title-item {
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -100px;
        background: url('#{$qn}/artist/title_bg.jpg') no-repeat;
        background-size: cover;
        font-size: 30px;
        height: 644px;
        width: 200px;

        word-wrap: break-word;
        letter-spacing: 10px;
        text-align: justify;

        -webkit-writing-mode: vertical-rl;
        writing-mode: tb-rl;
        writing-mode: vertical-rl;

        transition: all 0.4s ease;
        -webkit-transition: all 0.4s ease;

        .text {
            padding: 62px 42px 62px 55px;
            line-height: 40px;
            display: inline-block;
        }
    }

    .date-container {
        margin-top: 60px;
        position: relative;
    }

    .title-date-list {
        font-size: 18px;
        clear: both;
        position: absolute;
        top: 0;
        left: 50%;

        transition: all 0.4s ease;
        -webkit-transition: all 0.4s ease;

        .split {
            position: absolute;
            top: 42px;
            left: 10px;
            z-index: 1;
            background-color: #fff;
            width: 95%;
            height: 1px;
        }

        .dot {
            background: #000;
            border-radius: 30px;
            width: 30px;
            height: 30px;
            text-align: center;
            position: relative;
            z-index: 2;
        }

        .inner {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -6px;
            margin-left: -6px;
            background: #c18f4a;
            width: 12px;
            height: 12px;
            border-radius: 12px;
            display: inline-block;
        }

        .text {
            position: absolute;
            bottom: -25px;
            left: 0;
            font-size: 13px;
        }

        .title-date-item.active {
            .dot {
                position: relative;
                top: 16px;

                width: 58px;
                height: 58px;
                border-radius: 58px;
            }

            .inner {
                width: 40px;
                height: 40px;
                border-radius: 40px;
                margin-top: -20px;
                margin-left: -20px;
            }

            .text {
                left: 8px;
                font-size: 18px;
            }
        }
    }

    .title-date-list.activing {
        .dot {
            top: 30px;
        }
    }
</style>
