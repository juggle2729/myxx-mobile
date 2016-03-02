<template>
<div class="homepage-view">
    <div class="account flex">
        <div class="title flex">
            <div class="avatar-90" v-bg.sm="photo"></div>
            <div class="white flex-1">
                <p class="font-30 margin-bottom"><span>{{nickname}}</span><span class="font-26">{{titles.length? titles[0].name:''}}</span></p>
                <p class="font-26"><span v-link="{name:'following', params: {id: userId}}">关注&nbsp;&nbsp;{{follow_count}}</span><span v-link="{name:'follower', params: {id: userId}}">粉丝&nbsp;&nbsp;{{fans_count}}</span></p>
            </div>
            <div class="button bg-white font-26 red" v-if="!(follow || isSelf)" @click="toggleFollow">
                <span class="icon-follow">关注</span>
            </div>
            <div class="button font-26 white bg-disable" v-if="follow && !isSelf" @click="toggleFollow">
                <span>已关注</span>
            </div>
        </div>
    </div>
    <div class="site flex font-26 border-bottom bg-white" v-if="website_status" v-link="{name: 'master', params:{id: userId}}">
        <div class="icon bg-red white">官网</div>
        <div class="flex-1 red margin-left">{{website_interview_title}}</div>
        <div class="icon-enter"></div>
    </div>
    <div class="community bg-white flex border-bottom">
        <div v-link="link('Jade')" class="border-right three" v-if="shop_status" :class="{'red': isActive('Jade')}">
            <p class="font-30" align="center">{{products_count}}</p>
            <p class="font-26" :class="{'gray': !isActive('Jade')}" align="center">{{role===4? '作品': '商品'}}</p>
        </div>
        <div v-link="link('Story')" class="border-right" :class="{'three': shop_status, 'two': !shop_status, 'red': isActive('Story')}">
            <p class="font-30" align="center">{{topic_count}}</p>
            <p class="font-26" :class="{'gray': !isActive('Story')}" align="center">晒宝</p>
        </div>
        <div v-link="link('Evaluation')"  :class="{'three': shop_status, 'two': !shop_status, 'red': isActive('Evaluation')}">
            <p class="font-30" align="center">{{jianbao_count + jianbao_request_count}}</p>
            <p class="font-26" :class="{'gray': !isActive('Evaluation')}" align="center">鉴宝</p>
        </div>
    </div>
    <div class="content">
        <component :is="currentView" :id="userId" :role="role" :params="params" :from-params="fromParams" transition="fade"
                   transition-mode="out-in"></component>
    </div>
</div>
</template>
<script>
import HomePageJade from './HomePageJade.vue'
import HomePageStory from './HomePageStory.vue'
import HomePageEvaluation from './HomePageEvaluation.vue'
export default {
    name: 'HomePageView',
    components: {
        HomePageJade,
        HomePageStory,
        HomePageEvaluation
    },
    data() {
        return {
            titles: [],
            tab: 'Story'
        }
    },
    route: {
        data({to}) {
            this.userId = this.$route.params.id;
            this.tab = to.query.tab? to.query.tab: 'Story';
            return this.$get('users/'+ this.userId +'/profile')
                .then((data) => {
                    this.isSelf = (this.self && this.self.id == this.userId);
                    this.$data = data;
                    this.tab = to.query.tab? to.query.tab: 'Story';
                    this.currentView = this.tab ? 'HomePage' + this.tab: (data.shop_status? 'HomePageJade': 'HomePageStory');
                    this.setShare();
                });
        }
    },
    methods: {
        toggleFollow() {
            if (this.follow) {
                this.$delete('users/follow/'+ this.userId)
                    .then(() => {
                        this.follow = false;
                        this.action('toast', {success: 1, text: '取消关注成功'});
                    });
            } else {
                this.$post('users/follow/' + this.userId)
                    .then(() => {
                        this.follow = true;
                        this.action('toast', {success: 1, text: '关注成功'});
                    });
            }
        },
        coverflow(index) {
            if(this.photo != '') {
                this.action('coverflow', {ids: [this.photo], index: 0});
            } else {
                console.log('头像为空');
            }
        },
        link(tab) {
            const linkObj = {
                name: 'user-profile',
                replace: true,
                params: { id: this.$route.params.id },
                query: _.merge({}, this.$route.query, {
                    tab: tab,
                    replace: true
                })
            };

            return linkObj;
        },
        isActive(tab) {
            return tab === this.tab;
        },
        setShare() {
            const [title, desc, icon] = [`这是${this.nickname}在【美玉秀秀】的主页，一起开启玉石生活吧！`, this.nickname, this.photo];
            let url = location.origin + location.pathname;
            let query = _.merge({}, this.$route.query, {
                id: this.userId,
                replace: true,
                tab: this.tab,
                type: 'homepage'
            });
            url += ('?' + Object.keys(query).map((k) => `${k}=${query[k]}`).join('&'));
            this.action('shareable', {title, desc, icon, url});
        },
    }
}
</script>
<style lang="sass">
@import '../styles/partials/var';
.homepage-view {
    height: 100%;
    .account {
        height: 630px;
        padding: 20px 32px;
        background-image: url('#{$qn}/homepage/top.png');
        background-size: cover;
        -webkit-box-align: end;
        .title {
            width: 100%;
            .avatar-90 {
                border: 1px white solid;
            }
            .flex-1 {
                margin-left: 30px;
                >p span+span {
                    margin-left: 50px;
                }
            }
            .button {
                height: 56px;
                width: 117px;
                border-width: 0;
                border-radius: 10px;
                text-align: center;
                line-height: 56px;
            }
        }

    }
    .site {
        height: 120px;
        width: 100%;
        padding-left: 40px;
        padding-right: 10px;
        .icon {
            width: 82px;
            height: 46px;
            line-height: 46px;
            text-align: center;
            border-radius: 5px;
        }
    }
    .community {
        height: 100px;
        width: 100%;
        padding: 18px 0;
        .two {
            width: 50%;
            p + p {
                margin-top: 10px;
            }
        }
        .three {
            width: 33.3%;
            p + p {
                margin-top: 10px;
            }
        }
    }
    .content {
        position: relative;
        height: 50%;
    }
}
</style>
