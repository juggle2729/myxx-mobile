<template>
    <nav class="right-menu" :class="{fixed: fixed}">
        <nav class="menu toggle-leave">
            <li v-link="{ path: linkPage('studio') }">工作室</li>
            <li v-link="{ path: linkPage('personal') }">人物志</li>
            <li v-link="{ path: linkPage('works') }">精品</li>
            <li v-link="{ path: linkPage('home') }">首页</li>
            <li></li>
        </nav>
        <li class="toggle open" @click="toggleMenu"></li>
    </nav>
</template>

<script>

    import Scroll from '../../scripts/scroll.js';

    export default {
        name: 'RightMenu',

        props: {
            id: Number,
            fixed: {
                type: Boolean,
                default: true
            },
        },

        data() {
            return {
                interval: null
            };
        },

        methods: {
            toggleMenu() {
                this.showMenus(this.show);
            },
            linkPage(pageName) {
                return '/artist/' + this.id + (pageName ? '/' + pageName : '');
            },
            showMenus(flag) {
                if (this.interval) {
                    return;
                }

                this.interval = setTimeout(() => {
                        const menuDom = document.querySelector('.right-menu .menu');
                const toggleDom = document.querySelector('.right-menu .toggle');
                if (!menuDom || !toggleDom) {
                    return;
                }

                const menuClasslist = menuDom.classList;
                const toggleClasslist = toggleDom.classList;

                if (flag) {
                    menuClasslist.remove('toggle-leave');
                    menuClasslist.add('toggle-enter');

                    toggleClasslist.add('close');
                    toggleClasslist.remove('open');
                } else {
                    menuClasslist.remove('toggle-enter');
                    menuClasslist.add('toggle-leave');

                    toggleClasslist.add('open');
                    toggleClasslist.remove('close');
                }

                this.interval = null;
            }, 10);
            }
        }
    }
</script>

<style lang="sass" scoped>

    @import '../../styles/partials/_function.scss';

    @mixin toggleIcon($bgName) {
        position: relative;
        bottom: 0;
        right: 0;
        z-index: 2;
        background: url('/src/images/#{$bgName}.png') center center no-repeat #d79f60;
        background-size: rem(24) rem(24);
    }

    .right-menu {
        position: absolute;

        right: rem(30);
        bottom: rem(102);
        z-index: 99;

    .menu {
        transition: all 0.4s ease;
        overflow: hidden;

        position: relative;
        right: 0;
        z-index: 1;
    li:not(:first-child){
        margin-top: rem(14);
    }
    li:last-child {
        background: transparent;
    }
    }

    li {
        color: #fff;
        font-size: rem(24);
        background-color: #898989;
        width: rem(96);
        height: rem(96);
        border-radius: rem(96);
        text-align: center;
        line-height: rem(96);
        position: relative;

    &.v-link-active {
         background-color: #d26c1a;
     }

    &.close {
     @include toggleIcon(menu_close);
     }

    &.open {
     @include toggleIcon(menu_icon);
     }
    }
    }

    .right-menu.fixed {
        position: fixed;
    }

    .toggle-leave {
        height: 0;
        bottom: rem(-37);
    }

    .toggle-enter {
        height: rem(440);
        bottom: 0;
    }
</style>
