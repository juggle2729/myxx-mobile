<template>
<div class="evaluation">
    <div class="tabs">
        <div :class="{'red': tab=='time'}" class="font-26 center border-right">
            <label for="tab-time">最新</label><input name="tab" v-model="tab" type="radio" id="tab-time" value="time" />
        </div>
        <div :class="{'red': tab=='popularity'}" class="font-26 center">
            <label for="tab-popularity">热门</label><input name="tab" v-model="tab" type="radio" id="tab-popularity" value="popularity"/>
        </div>
    </div>
    <div class="separator" v-show="tab"></div>
    <template v-for="item in current.items">
        <div class="item">
            <div class="header">
                <div class="user">
                    <div class="avatar" v-bg.sm="item.applier.photo"></div>
                    <div class="name">
                        <p class="font-26">{{item.applier.name}}</p>
                        <p class="moment font-22 gray">{{item.create_at | moment}}</p>
                  </div>
                </div>
                <div class="desc font-30">{{item.description}}</div>
            </div>
            <div class="video" v-bg.video="item.video" v-link="{name: 'evaluation-detail', params: {id: item.id}}"></div>
            <div v-for="result in item.results" class="result border-top">
                <div class="avatar" v-bg.sm="result.identifier.photo"></div>
                <div class="master">
                    <p class="name font-26">{{result.identifier.name}}</p>
                    <p class="title font-22 gray">{{result.identifier.title}}</p>
                </div>
                <div class="mark font-22">已鉴定</div>
            </div>
        </div>
        <div class="social border-top white font-30 center">{{tab}}  #{{$index + 1}}</div>
        <div class="separator"></div>
    </template>
    <div class="loadmore center font-22 gray padding-vertical">
        <img v-show="current.hasMore" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
        <span v-show="!current.hasMore">没有了</span>
    </div>
</div>
</template>
<script>
import emitter from '../utils/emitter';
export default {
    name: 'EvaluationView',
    data() {
        // 不同tab的数据要隔离
        return {
            tab: '',
            user:'',
            time: {
                items: [],
                total: 0,
                hasMore: true,
                hasNew: false,
            },
            popularity: {
                items: [],
                total: 0,
                hasMore: true,
                hasNew: false
            },
        };
    },
    route: {
        data({ to }) {
            // if(to.params.user) {    // 我的鉴宝
            //     this.user = to.params.user;
            //     this.fetch();
            // } else {
            //     this.tab = to.query.tab || 'time';
            // }
            // return this.fetch();
        }
    },
    computed: {
        current() {
            return this[this.tab];
        }
    },
    created() {
        this.$watch('tab', (() => {
            const tabs = [];
            return (tab) => {
                this.tab = tab;
                this.$route.router.replace('?tab=' + tab);
                if(tabs.indexOf(tab) === -1) {//tab第一次切换到时，首次加载
                    this.fetch();
                    tabs.push(tab);
                }
            }
        })());
        if(!this.tab) {
            this.tab = this.$route.query.tab || 'time';
        }
        emitter.on('scroll-to-bottom', (e) => {
            this.fetch();
        });
    },
    methods: {
        fetch: (function() {
            const limit = 2;
            let loading = false;
            return function() {
                let offset = this.current.items.length;
                if(loading) {
                    return console.debug('skip!!!!!!!!');
                }
                console.debug('fetch', this.tab, offset);
                loading = true;
                const params = {[this.tab]: 1, offset, limit};
                return this.$http
                    .get('jianbao/applies', params, ({data}) => {
                        setTimeout(() => {
                            this.current.items.splice(this.current.items.length - 1, 0, ...data.applies);
                            this.current.total = data.total;
                            loading = false;
                            if (data.applies.length < limit) {
                                this.hasMore = false;
                            }
                        }, 2000);
                    });
            }
        })()
    }
}
</script>
<style lang="sass">
.evaluation {
    .tabs {
        display: -webkit-box;
        height: 80px;
        > div {
            -webkit-box-flex: 1;
            margin: 24px 0;
        }
        label {
            width: 100%;
            display: inline-block;
        }
    }
    .item {
        padding: 24px 32px;
    }
    .user {
        display: -webkit-box;
        -webkit-box-align: center;
        .avatar {
            height: 68px;
            width: 68px;
            border-radius: 50%;
            background-size: cover;
            vertical-align: middle;
        }
        .name {
            margin-left: 20px;
            .moment {
                margin-top: 12px;
            }
        }
    }
    .desc {
        margin: 30px 0 24px;
    }
    .video {
        height: 500px;
    }
    .result {
        height: 116px;
        display: -webkit-box;
        -webkit-box-align: center;
        .avatar {
            height: 68px;
            width: 68px;
            border-radius: 50%;
            background-size: cover;
            vertical-align: middle;
        }
        .master {
            -webkit-box-flex: 1;
            padding-left: 20px;
            .title {
                margin-top: 12px;
            }
        }
        .mark {
            padding: 5px 0 5px 35px;
            background-image: url('http://7xp1h7.com2.z0.glb.qiniucdn.com/ico_identify.png');
            background-position: left center;
            background-size: 26px;
        }
    }
    .social {
        height: 60px;
        background-color: tomato;
    }
    .loadmore {
        img {
            width: 120px;
            height: 68px;
        }
    }
}
</style>