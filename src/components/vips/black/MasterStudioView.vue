<template>
    <div class="master-vip-black-store">
        <div class="cover img" v-bg="masterBaseData.vip_shop_img" query="imageView2/1/w/750/h/820/interlace/1"></div>
        <div class="enter-store">
            <span class="button" v-link="{name: 'master', params: {id: id}, query: {tab: 'store'}}">进入工作室</span>
        </div>
        <div class="content">
            <div class="title">{{shop.shop_name}}简介</div>
            <div class="detail">{{shop.shop_about}}</div>
        </div>
        <div class="contacts">
            <div class="title"><span class="text">联系方式</span></div>
            <div class="contact-list">
                <div class="contact-item" v-for="contact in contacts">
                    <div class="label">{{contact.name}}</div>
                    <div class="data"
                         :class="{'wrap-row': $index === contacts.length - 1 || $index === contacts.length - 2}">
                        {{contact.value}}
                    </div>
                </div>
            </div>
        </div>
        <div class="qrcode center">
            <span class="code-img" v-bg="masterBaseData.website_2d_img" @click.stop="coverflow(masterBaseData.website_2d_img, 0)" query="imageView2/1/w/300/h/300/interlace/1"></span>
            <p class="font-30">官网二维码</p>
        </div>
        <comment :id="id" type="50"></comment>
    </div>
</template>
<script>
    import MasterMixin from '../../mixin/Master.vue';
    import Comment from '../../Comment.vue';

    export default {
        name: 'MasterWorksView',
        components: { Comment },
        mixins: [ MasterMixin ],
        data(){
            return {
                masterBaseData: this.data,
                showMenu: false,
                shop: {}
            };
        },
        activate(done) {
            this.checkShare();
            this.fetchMasterShopInfo().then(() => {
                done();
            });
        },
        ready() {
            window.scrollTo(0, 0);
        },
        computed: {
            contacts() {
                const contacts = [];
                if (this.masterBaseData.phone) {
                    contacts.push({
                        name: '电话',
                        value: this.masterBaseData.phone
                    });
                }

                if (this.masterBaseData.weixin) {
                    contacts.push({
                        name: '微信',
                        value: this.masterBaseData.weixin
                    });
                }

                if (this.masterBaseData.qq) {
                    contacts.push({
                        name: 'QQ',
                        value: this.masterBaseData.qq
                    });
                }

                if (this.masterBaseData.email) {
                    contacts.push({
                        name: 'Email',
                        value: this.masterBaseData.email
                    });
                }

                if (this.masterBaseData.address) {
                    contacts.push({
                        name: '地址',
                        value: this.masterBaseData.address
                    });
                }

                return contacts;
            }
        },
        methods: {
            coverflow(ids, index) {
                this.action('coverflow', {ids, index});
            },
            expandTitle() {
                this.isExpand = !this.isExpand;
            },
            fetchMasterShopInfo: (function() {
                let loading = false;
                return function() {
                    if(loading) {
                        return console.debug('master studio!!!!!!!!');
                    }
                    loading = true;
                    console.debug('fetch shop info', 'master ' + this.id);

                    return this.$get(`mall/shops/${this.id}`).then((data) => {
                        this.shop = data;
                        loading = false;
                    });
                }
            })()
        }
    }
</script>

<style lang="sass">
    @import '../../../styles/partials/_var.scss';

    .master-vip-black-store {

        width: 100%;
        position: relative;
        background-color: #030102;
        overflow: hidden;
        color: #fff;
        font-size: 28px;

        .cover {
            position: absolute;
            top: 0;
            left: 0;
            height: 820px;
            width: 750px;
            z-index: 77;
        }

        .enter-store {
            margin-top: 864px;
            text-align: center;
            font-size: 28px;

            .button {
                display: inline-block;
                width: 440px;
                line-height: 100px;
                background: #b92d2d;
                color: #fff;
                border-radius: 8px;
            }
        }

        img {
            display: block;
            width: 100%;
        }

        .content {
            padding: 72px 60px 0;
            .title {
                text-align: center;
            }
        }

        .detail {
            margin-top: 72px;
            line-height: 50px;
        }

        .contacts {
            margin-top: 118px;
            text-align: center;

            .title {
                padding: 0 40px;
            }

            .text {
                border: 9px solid #3b3b3b;
                padding: 35px;
                display: block;
            }

            .label {
                font-size: 30px;
            }

            .data {
                margin-top: 35px;
                color: #f5a242;
                font-size: 60px;
            }
        }

        .contact-list {
            margin-top: 72px;
            padding: 0 50px;
        }

        .contact-item:not(:first-child) {
            margin-top: 62px;
        }

        .qrcode {
            padding: 72px 0 50px 0;
            .code-img {
                display: inline-block;
                width: 300px;
                height: 300px;
                margin-bottom: 32px;
                background-size: cover;
            }
        }

        .comment-component {
            background-color: #030102;
            .red, .blue, .light {
                color: #888888;
            }
        }

        .wrap-row {
            word-break: break-all;
            word-wrap:break-word;
        }
    }
</style>
