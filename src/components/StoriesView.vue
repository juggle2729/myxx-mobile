<style lang="sass">
.stories-view {
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
        input {
            display: none;
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
    .medias {
        .media {
            vertical-align: top;
            display: inline-block;
            width: percentage(1/3);
            padding-top: percentage(1/3);
            border: thick solid white;
            background-size: cover;
            background-position: center;
        }
        .media:first-child:nth-last-child(4) ~ .media:nth-of-type(2) {
            margin-right: percentage(1/3);
        }
    }
    .social {
        padding: 0 32px;
    }
    .loadmore {
        img {
            width: 120px;
            height: 68px;
        }
    }
}
</style>
<template>
<div class="stories-view">
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
        <div class="item" v-link="{name: 'story', params: {id: item.post_id}}">
            <div class="header">
                <div class="user">
                    <div class="avatar" v-link="{name: item.user.role=='3' ? 'user-site' : 'user-profile', params: {id: item.user.id}}" v-bg.sm="item.user.photo"></div>
                    <div class="name">
                        <p class="font-26">{{item.user.name}}</p>
                        <p class="moment font-22 gray">{{item.create_at | moment}}</p>
                  </div>
                </div>
                <div class="desc font-30">{{item.content}}</div>
            </div>
            <div class="medias">
                <div class="unique" v-if="item.medias.length===1"></div>
                <template v-if="item.medias.length!==1">
                    <template v-for="media in item.medias"
                        ><div class="media picture" @click.stop="coverflow(item, $index)" v-if="media.type==='picture'" v-bg.md="media.id"></div
                        ><div class="media play" v-if="media.type==='video'" v-bg.video="media.id"></div
                    ></template>
                </template>
            </div>
        </div>
        <social-bar :id="item.post_id" type="3" :active="item.liked" :total="item.like" :list="item.likes" class="border-top social bg-white">
            <div class="center border-left light extra-action">
                <i class="icon-comment"></i><span>{{item.comment}}</span>
            </div>
        </social-bar>
        <div class="separator"></div>
    </template>
    <div class="loadmore center font-22 gray padding-vertical">
        <img v-show="current.hasMore" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
        <span v-show="!current.hasMore">没有了</span>
    </div>
</div>
</template>
<script>
import SocialBar from './SocialBar.vue';
export default {
    name: 'StoriesView',
    data() {
        return {
            tab: '',
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
    components: {
        SocialBar
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
                this.$route.router.replace({name: 'stories', params: {tab}});
                if(tabs.indexOf(tab) === -1) {//tab第一次切换到时，首次加载
                    this.fetch();
                    tabs.push(tab);
                }
            }
        })());
        if(!this.tab) {
            this.tab = this.$route.params.tab || 'time';
        }
    },
    events: {
        scrollToBottom(e) {
          this.fetch();
        }
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
                    .get('sns/topics', params, ({data}) => {
                        this.current.items.splice(this.current.items.length - 1, 0, ...data.topics);
                        this.current.total = data.total;
                        loading = false;
                        if (data.topics.length < limit) {
                            this.current.hasMore = false;
                        }
                    });
            }
        })(),
        coverflow(story, index) {
            let ids = story.medias
                        .filter(media => media.type==='picture')
                        .map(media => media.id);
            this.action('coverflow', {ids, index});
        }
    }
}
</script>