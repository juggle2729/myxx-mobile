<style lang="sass">
.jade-view {
    .jade-video {
        height: 577px;
        background-size: contain;
        background-color: #000000;
        &.play::after {
            background-size: 144px 144px;
        };
    }
    .titles {
        .header {
            min-height: 164px;
            padding: 28px 32px;
            .font-44 {
                font-weight: bold;
                &:first-letter {
                    font-size: 32px;
                    font-weight: normal;
                }
            }
        }
        .title {
            margin-bottom: 18px;
            line-height: 1.5;
        }
        .button {
            padding: 0 20px 0 20px;
            height: 72px;
            border-width: 0;
            border-radius: 10px;
            text-align: center;
            line-height: 56px;
        }
        .guarantee {
            line-height: 0;
            img {
                height: 72px;
                width: 100%;
            }
        }
    }
    .master {
        height: 72px;
        line-height: 72px;
        margin-left: 32px;
        .name {
            height: 72px;
            line-height: 75px;
        }
    }
    .shop {
        height: 144px;
        padding: 0 32px;
        .img {
            height: 100px;
            width: 100px;
            border-radius: 6px;
            margin-right: 20px;
        }
        .icon-enter {
            position: relative;
            bottom: 8px;
        }
        .name {
            width: 500px;
            &.auth {
                width: 400px;
            }
            .omit {
                line-height: 1.2
            }
        }
        img {
            width: 110px;
            height: 36px;
            margin: 0 16px;
        }
    }

    .tabs {
        width: 100%;
        height: 90px;
        top: 0;
        > div {
            width: 33.3%;
            line-height: 54px;
            &.active {
                line-height: 54px; // FIXME: 临时方案
                color: #cc3f4f;
            }
        }
        &.default {
            > div:first-child {
                color: #cc3f4f;
            };
        }
    }
    .float-box {
        position: fixed;
        bottom: 0;
        height: 98px;
        width: 100%;
        &>div {
            height: 100%;
        }
        &>div:first-child {
            width: 450px;
        }
        .buy-btn {
            width: 300px;
        }
        .contact-btn,.collect-btn,.comment-btn {
            -webkit-box-orient: vertical;
            -webkit-box-pack: center;
            width: 50%;
            height: 100%;
            [class^='icon-'], [class*=' icon-'] {
                margin-bottom: 4px;
                padding: 0;
            }
        }
        .buy-btn {
            text-align: center;
            height: 98px;
            line-height: 98px;
        }
    }
    .tabs-fixed {
        will-change: visibility;
        position: fixed;
        visibility: hidden;
        width: 100%;
        z-index: 999;
    }
    .placeholder {
        height: 148px;
    }
}
</style>
<template>
<div class="jade-view">
    <div class="tabs tabs-fixed border-bottom flex font-26 bg-white center" :class="{'default': isDefaultView}">
        <div @click="go('detail')" :class="{'active': $route.params.tab === 'detail'}" class="border-right">详情</div>
         <div @click="go('attribute')" :class="{'active': $route.params.tab === 'attribute'}" class="border-right">属性</div>
        <div @click="go('problem')" :class="{'active': $route.params.tab === 'problem'}">常见问题</div>
    </div>
    <div class="jade-video video" v-bg="jade.video" @click="play(jade.video)" query="vframe/jpg/offset/0/rotate/auto|imageView2/2/w/750">
    </div>
    <div class="titles bg-white">
        <div class="header">
            <div class="title font-32">{{jade.title}}</div>
            <div class="flex"><p class="red font-44 flex-1">{{jade.price | price}}</p></div>
        </div>
        <div class="guarantee border-top"><img :src="'jade/guarantee.png' | qn" alt=""></div>
    </div>
    <div class="separator-20-no"></div>
    <div class="shop bg-white flex detail" v-link="{name: 'shop', params: {id: jade.shop.id}}">
        <div class="img" v-bg="jade.shop.logo"></div>
        <div class="flex-1">
            <div class="font-30 flex margin-bottom name" :class="{'auth': jade.shop.auth_flag}">
                <div class="omit">{{jade.shop.shop_name}}</div><img :src="'user/' + jade.shop.shop_type +'.png' | qn" v-if="jade.shop.auth_flag"/>
            </div>
            <div class="font-26 gray"><span class="icon-location"></span><span>{{jade.shop.locale_name}}</span></div>
        </div>
        <div class="icon-enter font-30 gray"></div>
    </div>
    <div class="master flex bg-white border-top" v-link="{name: 'user', params: {id: jade.owner.id}}">
        <avatar :user="jade.owner" :size="50"></avatar>
        <div class="name font-26 gray margin-left">{{jade.owner.name}}</div>
    </div>
    <div class="separator-20-no"></div>
    <div class="tabs tabs-static border-bottom flex font-26 bg-white center" :class="{'default': isDefaultView}">
        <div @click="go('detail')" :class="{'active': $route.params.tab === 'detail'}" class="border-right">详情</div>
        <div @click="go('attribute')" :class="{'active': $route.params.tab === 'attribute'}" class="border-right">属性</div>
        <div @click="go('problem')" :class="{'active': $route.params.tab === 'problem'}">常见问题</div>
    </div>
    <div class="bg-default tab-content">
        <component :is="view" keep-alive transition-mode="out-in" :jade="jade"></component>
    </div>
    <div class="bg-default placeholder"></div>
    <div class="float-box flex fixed font-30 bg-white">
        <div class="border-top flex-1 flex">
            <div class="font-22 flex flex-1 gray contact-btn border-right" @click="contact">
                <div class="icon-contact font-44"></div>
                <div>私信</div>
            </div>
            <div class="font-22 flex flex-1 gray collect-btn border-right" :class="{'red': isCollected}" @click="collect()">
                <div class="icon-contact font-44"></div>
                <div>{{isCollected ? '已收藏' : '收藏'}}</div>
            </div>
            <div class="font-22 flex flex-1 gray comment-btn" @click="gotoComments">
                <div class="icon-comment-solid font-44"></div>
                <div>评论  {{jade.comment_count}}</div>
            </div>
        </div>
        <div class="font-30 flex-2 buy-btn bg-gray white" :class="{'bg-red': !isSelf && jade.sell_status === 'selling'}" @click="buy()" >{{jade.sell_status === 'selling' ? '立即购买' : '已售出'}}</div>
    </div>
</div>
</template>
<script>
import Q from 'q';
import shareable from 'shareable';
import Comment from './JadeComment.vue';
import detail from './JadeDetail.vue';
import attribute from './JadeAttribute.vue';
import problem from './JadeProblem.vue';
export default {
    name: 'JadeView',
    mixins: [shareable],
    components: {
        Comment,
        detail,
        attribute,
        problem
    },
    data() {
        return {
            jade: {
                owner: {},
                shop: {}
            },
            isSelf: false,
            isDefaultView: false,
            view: undefined,
            isCollected: false
        };
    },
    ready() {
        this.$on('restore', () => {
            this.setShareData(this.jade, true);
        });
        this.staticTabs = this.$el.querySelector('.tabs-static');
        this.fixedTabs = this.$el.querySelector('.tabs-fixed');
        const tabContent = this.$el.querySelector('.tab-content');
        // FIXME: 采用css解决方案
        // tab内容最小高度为 window高度 - tabs高度 - $el的底部padding
        tabContent.style.minHeight = `calc(${window.innerHeight-this.staticTabs.clientHeight}px - ${window.getComputedStyle(this.$el)['padding-bottom']})`;
    },
    route: {
        canReuse({from, to}) {
            return from.name === to.name && from.params.id === to.params.id;
        },
        data({from, to}) {
            if(from.name !== to.name || from.params.id !== to.params.id) { // 初次进入商品详情页
                return this.$get('mall/products/'+ this.$route.params.id)
                    .then((jade) => {
                        this.setShareData(jade, true);
                        this.isSelf = (_.get(this, 'self.id') == (jade.owner.id || jade.default_admin.id));
                        this.isDefaultView = ['detail', 'attribute', 'problem'].indexOf(to.params.tab) === -1;
                        this.view = this.isDefaultView ? 'detail' : to.params.tab;
                        this.jade = jade;
                });
            } else {
                this.isDefaultView = false;
                this.view = to.params.tab;
            }
        }
    },
    methods: {
        buy() {
            if(this.env.isApp) {
                if(this.env.version >= 1.5 && this.jade.sell_status === 'selling') {
                    // 先确保用户登录，然后再跳转至订单页面
                    Q.promise(resolve => {
                        if(this.self) {
                            if(this.isSelf) {
                                this.action('toast', {success: 0, text: '您不能购买自己的商品'});
                            } else {
                                resolve();
                            }
                        } else {
                            this.action('login').then(resolve);
                        }
                    }).then(() => {
                        this.$router.go({name: 'order-confirm', params: {product: this.jade.id}});
                    });
                } else if(this.env.version < 1.5) {
                    this.action('toast', {success: 0, text: '请更新至最新版'});
                }
            } else {
                window.location.href = this.config.download;
            }
         },
        contact() {
            if(this.env.isApp) {
                if(this.env.version >= 1.5 && !this.isSelf) {
                    Q.promise((resolve) => {
                        if(this.self) {
                            resolve();
                        } else if(!this.self){
                            this.action('login').then(resolve);
                        }
                    }).then(() => {
                        this.action('chat', {id: this.jade.default_admin.id, name: this.jade.default_admin.nickname, product: this.jade.id});
                    });
                } else if(this.isSelf) {
                    this.action('toast', {success: 0, text: '您不能和自己聊天'});
                } else {
                    this.action('toast', {success: 0, text: '请更新至最新版'});
                }
            } else {
                window.location.href = this.config.download;
            }
        },
        gotoComments() {
            if(this.env.isApp) {
                this.$router.go({name: 'comments', params: {id: this.jade.id, type: '40'}});
            } else {
                window.location.href = this.config.download;
            }
        },
        go(tab) { // FIXME 采用v-link替代
            (this.$route.params.tab !== tab) && this.$router.replace(`/jade/${this.jade.id}/${tab}`);
        },
        collect(tab) {
            // TODO api
            const api = '';
            this[this.isCollected ? '$delete' : '$post'](api)
            .then(() => {
                this.isCollected = !this.isCollected;
                if (this.isCollected) {
                    this.action('toast', {
                        success: 1,
                        text: '收藏成功'
                    });
                } else {
                    this.action('toast', {
                        text: '收藏取消'
                    });
                }
            });
        }
    },
    events: {
        scroll() {
            if(!this.env.isWechat) {
                this.fixedTabs.style.visibility = window.scrollY - this.staticTabs.offsetTop > 0 ? 'visible' : 'hidden';
            }
        }
    }
}
</script>
