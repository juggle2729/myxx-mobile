<style lang="sass">
.jade-view {
    padding-bottom: 80px;
    .jade-video {
        height: 577px;
        background-size: contain;
        background-color: #000000;

    }
    .titles {
        .header {
            min-height: 190px;
            padding: 32px;
        }
        .title {
            margin-bottom: 32px;
            line-height: 1.5;
        }
        .icon-price::before {
            position: relative;
            bottom: -3px;
            font-size: 36px;
            margin-right: 16px;
        }
        .button {
            padding: 0 20px 0 20px;
            height: 72px;
            border-width: 0;
            border-radius: 10px;
            text-align: center;
            line-height: 56px;
        }
        .footer {
            height: 80px;
            padding: 0 60px;
            -webkit-box-pack: justify;
        }
    }
    .master {
        height: 144px;
        padding: 32px;
        .avatar-90 {
            position: relative;
            bottom: 4px;
            margin-right: 20px;
        }
        .icon-enter-slim {
            position: relative;
            top: 2px;
            margin-left: 16px;
        }
        .master-name {
            margin-bottom: 14px;
        }
    }
    .tabs {
        height: 90px;
        position: relative;
        top: 0;
        >div {
            width: 33.3%;
            .desc {
                margin: 38px 0 22px 0;
            }
            &>div {
                text-align: center;
                margin: 0 auto;
            }
            .dash {
                display: block;
                width: 180px;
                height: 4px;
            }
            &.v-link-active {
                color: #cc3f4f;
                .dash {
                    background-color: #cc3f4f;
                }
            }
        }
        &.default {
            > div:first-child {
                color: #cc3f4f;
                .dash {
                    display: block;
                    width: 180px;
                    height: 4px;
                    background-color: #cc3f4f;
                }
            };
        }
        &.fixed {
            position: fixed;
            z-index: 99;
            width: 100%;
            top: 0;
            background-color: white;
        }
    }
    .float-box {
        bottom: 0;
        height: 98px;
        -webkit-box-align: stretch;
        width: 100%;
        .contact-btn,.comment-btn {
            -webkit-box-orient: vertical;
            -webkit-box-pack: center;
            div[class^=icon] {
                margin-bottom: 14px;
                padding: 0;
            }
        }
        .buy-btn {
            text-align: center;
            line-height: 98px;
        }
    }
    .placeholder {
        height: 90px;
    }
}
</style>
<template>
<div class="jade-view bg-default">
    <div class="jade-video play" v-bg="jade.video" @click="play(jade.video)" query="vframe/jpg/offset/0/rotate/auto|imageView2/2/w/750">
    </div>
    <div class="titles bg-white">
        <div class="header">
            <div class="title font-32">{{jade.title}}</div>
            <div class="flex">
                <p class="red font-32 flex-1">{{jade.price | price}}</p>
                <template v-if="isSelf">
                    <div v-link="{name: 'addAuction'}" class="button bg-red flex font-32 white"><div class="center-horizontal">微信拍卖</div></div>
                </template>
            </div>
        </div>
        <div class="footer flex font-26 light border-top">
            <div class="flex">
                <span class="icon-pay-guarantee"></span>
                <span>付款担保</span>
            </div>
            <div class="flex">
                <span class="icon-seven-day"></span>
                <span>七天退货</span>
            </div>
            <div class="flex">
                <span class="icon-unchecked"></span>
                <span>顺丰包邮</span>
            </div>
        </div>
    </div>
    <div class="separator-20"></div>
    <div class="master flex bg-white" v-link="{name: 'user', params: {id: jade.owner.id, tab: 'story'}}">
        <avatar :user="jade.owner" :size="90"></avatar>
        <div class="flex-1">
            <p class="font-32" :class="{'master-name': jade.owner.title}">{{jade.owner.name}}</p>
            <p class="font-26 gray">{{jade.owner.title}}</p>
        </div>
        <div class="font-26 icon-enter-slim gray"></div>
    </div>
    <div class="separator-20"></div>
    <div class="tabs border-bottom flex font-26 bg-white" :class="{'default': isDefaultView, 'fixed': fixed}">
        <div v-link="{name: 'jade', params: {id: $route.params.id, tab: 'detail'}, replace: true}">
            <div class="desc border-right">详情</div>
            <div class="dash"></div>
        </div>
        <div v-link="{name: 'jade', params: {id: $route.params.id, tab: 'attribute'}, replace: true}">
            <div class="desc border-right">属性</div>
            <div class="dash"></div>
        </div>
        <div v-link="{name: 'jade', params: {id: $route.params.id, tab: 'problem'}, replace: true}">
            <div class="desc">常见问题</div>
            <div class="dash"></div>
        </div>
    </div>
    <div class="placeholder bg-white" v-if="fixed"></div>
    <div class="bg-default">
        <!-- TODO use keep-alive -->
        <component :is="view" keep-alive transition-mode="out-in" :jade="jade"></component>
    </div>
    <div v-if="!env.isShare" class="float-box flex fixed font-30 bg-white border-top">
        <div class="font-22 flex flex-1 gray contact-btn border-right" @click="contact">
            <div class="icon-contact"></div>
            <div>联系商家</div>
        </div>
        <div class="font-22 flex flex-1 gray comment-btn" v-link="{name: 'comments', params: {id: jade.id, type: '40'}}">
            <div class="icon-comment"></div>
            <div>评论</div>
        </div>
        <div class="font-30 flex-2 buy-btn bg-red white" @click="buy()">
            立即购买
        </div>
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
                tags: [],
                gifts: [],
                themes: [],
                morals: [],
                prizes: [],
                owner: {}
            },
            recommend: {},
            isSelf: false,
            isDefaultView: false,
            view: undefined,
            fixed: false
        };
    },
    ready() {
        this.$on('restore', () => {
            this.setShareData(this.jade, true);
        });
        this.tabHeight = document.querySelector('.tabs').offsetTop;
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
                        this.isSelf = (_.get(this, 'self.id') === jade.owner.id);
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
            if(!this.env.isApp || this.env.version >= 1.5) {
                // 先确保用户登录，然后再跳转至订单页面
                Q.promise((resolve) => {
                    if(this.self) {
                        resolve();
                    } else {
                        this.action('login').then(resolve);
                    }
                }).then(() => {
                    this.$router.go({name: 'order-confirm', params: {product: this.jade.id}});
                });
            } else {
                this.action('toast', {success: 0, text: '请将应用更新至v1.5版'});
            }
         },
        contact() {
            if(this.env.version >= 1.5) {
                this.action('chat', {id: this.jade.owner.id, product: this.jade.id});
            } else {
                this.action('toast', {success: 0, text: '请将应用更新至v1.5版'});
            }
        }
    },
    events: {
        scroll() {
            this.fixed = (window.scrollY - this.tabHeight) >= -20;
        }
    }
}
</script>
