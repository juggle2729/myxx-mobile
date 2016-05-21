<template>
    <div class="datetime-action" v-show="show" @touchmove.stop>
        <div class="operation clearfix">
            <span class="cancel font-30 gray left" @click="cancelSelect">取消</span>
            <span class="confirm font-30 red right" @click="confirmSelect">确定</span>
        </div>
        <div class="content">
            <ul class="select date">
                <li v-for="date in dates" data="{{date.key}}">{{date.name}}</li>
            </ul>
            <ul class="select hour">
                <li v-for="hour in hours" data="{{hour.key}}">{{hour.name}}</li>
            </ul>
            <ul class="select minutes">
                <li v-for="minute in minutes" data="{{minute.key}}">{{minute.name}}</li>
            </ul>
        </div>
    </div>
</template>
<style lang="sass">

    %separator-line {
        content: '';
        width: 100%;
        height: 1px;
        display: block;
        position: absolute;
        left: 0;
        background-color: #d9d9d9;
    }

    @mixin separator-line($top) {
        @extend %separator-line;
        top: $top;
    }

    .datetime-action {
        position: fixed;
        bottom: 0;

        width: 100%;
        padding-top: 53.33%;

        .operation {
            background-color: #d9d9d9;
            > span {
                  line-height: 80px;
              }
        }

        .cancel {
            padding-left: 32px;
            float: left;
        }

        .confirm {
            padding-right: 32px;
            float: right;
        }

        .content {
            overflow: hidden;
            height: 300px;
            background-color: #fff;
            display: -webkit-box;
            position: relative;

            &:before {
                @include separator-line(118px);
             }

            &:after {
                @include separator-line(178px);
             }
        }

        ul {
            width: -webkit-calc(100% / 3);
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
        }

        li {
            line-height: 60px;
            height: 60px;
            font-size: 30px;
            text-align: center;
            color: #c6c6c6;
            transition: transform 1s;
        }

        li.active {
            color: #393939;
        }

        li.active-near-one {
            color: #888;
        }

        li.active-near-two {
            color: #c6c6c6;
        }
    }
</style>
<script>
    export default{
        name: 'DateTime',
        props: {
            params: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                currentYear: 0,
                currentMonth: 0,
                currentDay: 0,
                currentHour: 0,
                currentMinutes: 0,

                savedYear: 0,
                savedMonth: 0,
                savedDay: 0,
                savedHour: 0,
                savedMinutes: 0,

                show: false,
                adjustPosTimer: null,

                activeDay: 0 // 当前激活的日期,包括年月日
            }
        },
        computed: {
            dates() {
                if (!this.currentYear) {
                    return [];
                }

                const dates = [];
                dates.push({
                    key: [this.currentYear, this.zeroLeftPad(this.currentMonth), this.zeroLeftPad(this.currentDay)].join('-'),
                    name: '今天'
                });

                const currentMonthDays = this.getMonthDays(this.currentMonth);

                let [tomorrowYear, tomorrowMonth, tomorrowDay] = [0, 0, 0];
                let [afterYear, afterMonth, afterDay] = [0, 0, 0];
                let [nextYear, nextMonth, nextDay] = [0, 0, 0];

                if (this.currentMonth === 12) {
                    if (this.currentDay + 1 > 31) {
                        [tomorrowYear, tomorrowMonth, tomorrowDay] = [this.currentYear + 1, 1, 1];
                        [afterYear, afterMonth, afterDay] = [this.currentYear + 1, 1, 2];
                        [nextYear, nextMonth, nextDay] = [this.currentYear + 1, 1, 3];
                    } else if (this.currentDay + 2 > 31) {
                        [tomorrowYear, tomorrowMonth, tomorrowDay] = [this.currentYear, 12, this.currentDay + 1];
                        [afterYear, afterMonth, afterDay] = [this.currentYear + 1, 1, 1];
                        [nextYear, nextMonth, nextDay] = [this.currentYear + 1, 1, 2];
                    } else {
                        [tomorrowYear, tomorrowMonth, tomorrowDay] = [this.currentYear, this.currentMonth, this.currentDay + 1];
                        [afterYear, afterMonth, afterDay] = [this.currentYear, this.currentMonth, this.currentDay + 2];
                        [nextYear, nextMonth, nextDay] = [this.currentYear, this.currentMonth, this.currentDay + 3];
                    }
                } else if (this.currentDay + 1 > currentMonthDays) {
                    [tomorrowYear, tomorrowMonth, tomorrowDay] = [this.currentYear, this.currentMonth + 1, 1];
                    [afterYear, afterMonth, afterDay] = [this.currentYear, this.currentMonth + 1, 2];
                    [nextYear, nextMonth, nextDay] = [this.currentYear, this.currentMonth + 1, 3];
                } else if (this.currentDay + 2 > currentMonthDays) {
                    [tomorrowYear, tomorrowMonth, tomorrowDay] = [this.currentYear, this.currentMonth, this.currentDay + 1];
                    [afterYear, afterMonth, afterDay] = [this.currentYear, this.currentMonth + 1, 1];
                    [nextYear, nextMonth, nextDay] = [this.currentYear, this.currentMonth + 1, 2];
                } else {
                    [tomorrowYear, tomorrowMonth, tomorrowDay] = [this.currentYear, this.currentMonth, this.currentDay + 1];
                    [afterYear, afterMonth, afterDay] = [this.currentYear, this.currentMonth, this.currentDay + 2];
                    [nextYear, nextMonth, nextDay] = [this.currentYear, this.currentMonth, this.currentDay + 3];
                }

                dates.push({
                    key: [tomorrowYear, this.zeroLeftPad(tomorrowMonth), this.zeroLeftPad(tomorrowDay)].join('-'),
                    name: '明天'
                });

                dates.push({
                    key: [afterYear, this.zeroLeftPad(afterMonth), this.zeroLeftPad(afterDay)].join('-'),
                    name: '后天'
                });

                let nextMonthDays = this.getMonthDays(nextMonth);
                if (nextDay > nextMonthDays) {
                    nextMonth += 1;
                    nextDay = 1;
                }

                for (let i = 0; i < 12; i++) {
                    nextMonthDays = this.getMonthDays(nextMonth);
                    if(nextMonth === 12 && nextDay > nextMonthDays) {
                        nextYear += 1;
                        nextMonth = 1;
                        nextDay = 1;
                    } else if (nextDay > nextMonthDays) {
                        nextMonth += 1;
                        nextDay = 1;
                    }

                    dates.push({
                        key: [nextYear, this.zeroLeftPad(nextMonth), this.zeroLeftPad(nextDay)].join('-'),
                        name: nextMonth + '月' + nextDay + '日'
                    });

                    nextDay++;
                }

                return this.addPlaceholder(dates);
            },
            hours() {
                const hours = [];
                let start = 0;

                // 如果激活日期等于当前日期,则初始值为当前的小时
                if(this.activeDay === [this.currentYear, this.zeroLeftPad(this.currentMonth), this.zeroLeftPad(this.currentDay)].join('-')) {
                    start = this.currentHour;
                }

                for (let i = start; i < 24; i++) {
                    hours.push({
                        key: this.zeroLeftPad(i),
                        name: i + '点'
                    });
                }

                // 当小时改了之后,要有默认的选中
                setTimeout(() => {
                    this.addItemSelected('hour', this.zeroLeftPad(start));
                }, 50);

                return this.addPlaceholder(hours);
            },
            minutes() {
                const minutes = [];
                let perMinute = 0;
                for (let i = 0; i < 12; i++) {
                    perMinute = this.zeroLeftPad(i * 5);
                    minutes.push({
                        key: perMinute,
                        name: perMinute + '分'
                    });
                }

                return this.addPlaceholder(minutes);
            }
        },
        ready() {
            const now = new Date();

            this.currentYear = now.getFullYear();
            this.currentMonth = now.getMonth() + 1;
            this.currentDay = now.getDate();
            this.currentHour = now.getHours();
            this.currentMinutes = now.getMinutes();
            this.activeDay = [this.currentYear, this.zeroLeftPad(this.currentMonth), this.zeroLeftPad(this.currentDay)].join('-')

            const timestamp = Number(this.params.timestamp);
            const savedDate = new Date(timestamp);

            this.savedYear = timestamp > 0 ? savedDate.getFullYear() : 0;
            this.savedMonth = timestamp > 0 ? savedDate.getMonth() + 1 : 0;
            this.savedDay = timestamp > 0 ? savedDate.getDate() : 0;
            this.savedHour = timestamp > 0 ? savedDate.getHours() : 0;
            this.savedMinutes = timestamp > 0 ? savedDate.getMinutes() : 0;
            this.activeDay = timestamp > 0 ? [this.savedYear, this.zeroLeftPad(this.savedMonth), this.zeroLeftPad(this.savedDay)].join('-') : this.activeDay;

            setTimeout(() => {
                this.dataBack();
            }, 100);

            const itemContainers = document.querySelectorAll('.datetime-action ul');
            if(itemContainers.length > 0) {
                [].slice.call(itemContainers, 0).forEach(container => {
                    container.addEventListener('scroll', _.throttle(this.scrollDate, 500), false);
                });
            }

            this.show = true;
        },
        methods: {
            getMonthDays(month, year) {
                year = year || this.currentYear;
                month = Number(month);
                switch (month) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        return 31;
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        return 30;
                    case 2:
                        return this.isLeapYear(year) ? 29 : 28;
                    default:
                        return 0;
                }
            },
            isLeapYear(year) {
                year = Number(year);
                return year % 4 === 0 &&
                    (year % 100 !== 0 || year % 400 === 0);
            },
            zeroLeftPad(val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) {
                    val = '0' + val;
                }
                return val;
            },
            addPlaceholder(arrs, len = 2) {
                for (let i = 0; i < len; i++) {
                    arrs.unshift({});
                    arrs.push({});
                }
                return arrs;
            },
            scrollDate($event) {
                const target = $event.target;
                if(!target.isReady) {
                    target.isReady = true;
                    return;
                }

                const [scrollTop] = [target.scrollTop];
                const items = target.querySelectorAll('li');
                const itemHeight = items[0].offsetHeight;
                const placeholderHeight = itemHeight * 2;

                const scrollTargets = {};
                let itemClassList = {};
                [].slice.call(items, 0).forEach(function(item, index) {
                    if(index > 1 && index < items.length - 2) {
                        if(item.offsetTop - scrollTop - itemHeight / 2 <= placeholderHeight) {
                            scrollTargets[index] = index;
                        }

                        itemClassList = item.classList;
                        itemClassList.remove('active');
                        itemClassList.remove('active-near-one');
                        itemClassList.remove('active-near-two');
                    }
                });

                const keys = Object.keys(scrollTargets);
                let activeIndex = 2;
                if (keys.length > 0) {
                    activeIndex = scrollTargets[keys[keys.length - 1]];
                }

                // 表示更新了日期
                if(target.classList.contains('date')) {
                    this.activeDay = items[activeIndex].getAttribute('data');
                }

                this.addItemClass(items, activeIndex, true);
            },
            addItemClass(items, activeIndex, adjustPos = false) {
                items[activeIndex].classList.add('active');
                activeIndex - 1 > 1 && (items[activeIndex - 1].classList.add('active-near-one'));
                activeIndex - 2 > 1 && (items[activeIndex - 2].classList.add('active-near-two'));

                activeIndex + 1 < items.length - 2 && (items[activeIndex + 1].classList.add('active-near-one'));
                activeIndex + 2 < items.length - 2 && (items[activeIndex + 2].classList.add('active-near-two'));

                if (adjustPos) {
                    if (this.adjustPosTimer) {
                        clearTimeout(this.adjustPosTimer);
                    }

                    this.adjustPosTimer = setTimeout(function() {
                        const activeItem = items[activeIndex];
                        const itemHeight = activeItem.offsetHeight;

                        const parentScrollTop = activeItem.parentNode.scrollTop;
                        const predictPos = itemHeight * (activeIndex - 2);

                        let deltaY = 0;
                        if (parentScrollTop > predictPos) {
                            deltaY = parentScrollTop - predictPos;
                        } else {
                            deltaY = -1 * (predictPos - parentScrollTop);
                        }

                        if ((Math.abs(deltaY) < 3 && activeIndex !== 2) || activeIndex === items.length - 3) {
                            return;
                        } else if (activeIndex === 2) { // 如果是第一个的时候, 则恢复为默认位置
                            deltaY = 0;
                        }

                        [].slice.call(items, 0).forEach(function(item) {
                            item.style.webkitTransform = 'translateY(' + deltaY + 'px)';
                        });
                    }, 600);
                }
            },
            addSelected(type) {
                if(type === 'date') {
                    const activeData = [this.savedYear, this.zeroLeftPad(this.savedMonth), this.zeroLeftPad(this.savedDay)].join('-');
                    this.addItemSelected(type, activeData);
                } else if (type === 'hour') {
                    this.addItemSelected(type, this.zeroLeftPad(this.savedHour));
                } else if (type === 'minutes') {
                    this.addItemSelected(type, this.zeroLeftPad(this.savedMinutes));
                }
            },
            addItemSelected(type, activeData) {
                let activeIndex = 2;
                const items = document.querySelectorAll('ul.' + type + ' li');
                for(let i = 0; i < items.length; i++) {
                    if(items[i].getAttribute('data') === activeData) {
                        activeIndex = i;
                        break;
                    }
                }
                this.addItemClass(items, activeIndex);
                items[activeIndex - 2].scrollIntoView();
            },
            dataBack() {
                this.addSelected('date');
                this.addSelected('hour');
                this.addSelected('minutes');
            },
            cancelSelect() {
                this.show = false;
                this.params.handler = {};
            },
            confirmSelect() {
                const pageContainer = document.querySelector('.datetime-action');
                const activeDate = pageContainer.querySelector('ul.date li.active').getAttribute('data');
                const activeHour = pageContainer.querySelector('ul.hour li.active').getAttribute('data');
                const activeMinutes = pageContainer.querySelector('ul.minutes li.active').getAttribute('data');

                // 此处对 activeDate 做了兼容性处理  在 webview下，不支持'2016-05-19'格式的时间传入new Date()
                this.params.timestamp = new Date(`${activeDate.split('-').join('/')} ${activeHour}:${activeMinutes}:00`).getTime();
                this.params.cb(this.params.timestamp);

                this.cancelSelect();
            }
        }
    }
</script>
