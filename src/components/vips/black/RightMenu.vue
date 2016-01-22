<template>
    <nav class="right-menu" :class="{fixed: fixed}">
        <nav class="menu toggle-leave">
            <li v-link="{name: 'master', replace: true, params: {id: id}, query: {replace: true, tab: 'store'}}">工作室</li>
            <li v-link="{name: 'master', replace: true, params: {id: id}, query: {replace: true, tab: 'special'}}">人物志</li>
            <li v-link="{name: 'master', replace: true, params: {id: id}, query: {replace: true, tab: 'works'}}">精品</li>
            <li v-link="{name: 'master', replace: true, params: {id: id}, query: {replace: true, tab: 'home'}}">首页</li>
            <li></li>
        </nav>
        <li class="toggle open" @click="toggleMenu"></li>
    </nav>
</template>

<script>
    export default {
        name: 'RightMenu',

        props: {
            id: {
                type: String,
                required: true
            },
            fixed: {
                type: Boolean,
                default: true
            },
            show: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                interval: null
            };
        },

        methods: {
            toggleMenu() {
                this.show = !this.show;
                this.showMenus(this.show);
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
    @import '../../../styles/partials/_var.scss';

    @mixin toggleIcon($bgName) {
        position: relative;
        bottom: 0;
        right: 0;
        z-index: 2;
        background: url('#{$qn}/artist/#{$bgName}.png') center center no-repeat #d79f60;
        background-size: 24px 24px;
    }

    .right-menu {
        position: absolute;

        right: 42px;
        bottom: 36px;
        z-index: 99;

        .menu {
            transition: all 0.4s ease;
            -webkit-transition: all 0.4s ease;

            overflow: hidden;

            position: relative;
            right: 0;
            z-index: 1;

            li:not(:first-child){
                margin-top: 14px;
            }

            li:last-child {
                background: transparent;
            }
        }

        li {
            color: #fff;
            font-size: 24px;
            background-color: #898989;
            width: 96px;
            height: 96px;
            border-radius: 96px;
            text-align: center;
            line-height: 96px;
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
        bottom: -37px;
    }

    .toggle-enter {
        height: 440px;
        bottom: 0;
    }
</style>
