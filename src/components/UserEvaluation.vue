<style lang="sass">
@import '../styles/partials/var';
.user-evaluation {
    .head {
        padding: 20px;
        background-color: #f0f0f0;
        .name {
            color: #666666;
        }
    }
    .cover {
        width: 100%;
        padding-top: percentage(1/1.15);
        background-size: cover;
        position: relative;
        &[data-genuine='genuine'] {
            &::after {
                content: '';
                position: absolute;
                right: 0;
                bottom: 0;
                height: 144px;
                width: 144px;
                background: transparent url('#{$qn}/result-true.png') center;
                background-size: contain;
            }
        }
        &[data-genuine='fake'] {
            &::after {
                content: '';
                position: absolute;
                right: 0;
                bottom: 0;
                height: 144px;
                width: 144px;
                background: transparent url('#{$qn}/result-false.png') center;
                background-size: contain;
            }
        }
        &[data-genuine='unsure'] {
            &::after {
                content: '';
                position: absolute;
                right: 0;
                bottom: 0;
                height: 144px;
                width: 144px;
                background: transparent url('#{$qn}/result-unknow.png') center;
                background-size: contain;
            }
        }
    }
    .masters {
        padding: 10px 10px 24px;
        .left, .right {
            width: 204px;
            height: 204px;
            background-size: cover;
            background-image: url('#{$qn}/placeholder/portrait.png');
            img {
                width: 100%;
                height: 100%;
            }
        }
        .middle {
            height: 204px;
            margin: 0 24px;
            > div {
                height: 76px;
            }
            .hr {
                height: 1px;
                margin: 26px 0;
            }
            .l {
                padding-top: 12px;
                .margin-top {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 100%;
                    overflow: hidden;
                }
            }
            .r {
                text-align: right;
                .margin-top {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 100%;
                    overflow: hidden;
                }
            }
        }
    }

    .results-empty {
        height: 102px;
        > div {
            display: inline-block;
            height: 66px;
            width: 306px;
            background-color: #a6a6a6;
            border-radius: 50px;
            line-height: 66px;
        }
    }
    .empty-page {
        height: 700px;
    }
}
</style>
<template>
<div class="user-evaluation bg-white">
    <div v-for="item in items" v-link="{name: 'evaluation', params: {id: item.post_id}}" track-by="$index">
        <div class="head flex">
            <avatar :user="item.user" :is-self="false" :size="50"></avatar>
            <div class="font-26 margin-left">{{item.user.name}}</div>
            <div class="flex-1 font-22 light margin-left">{{item.create_at | moment}}</div>
            <div class="gray font-26"><i class="icon-comment-solid"></i><span>{{item.comment}}</span></div>
        </div>
        <div class="cover" v-bg="item.picture" data-genuine="{{genuine(item)}}"></div>
        <div v-if="item.results.length">
            <div class="masters flex bg-white">
                <div class="left" @click.stop="goToProfile(item.results[0].identifier)" v-bg.sm="item.results[0].identifier.portrait"></div>
                <div class="middle flex-1">
                    <div class="l font-26">
                        <div>{{item.results[0].identifier.name}}</div>
                        <div class="light margin-top">{{item.results[0].identifier.title}}</div>
                    </div>
                    <div class="hr border-bottom"></div>
                    <div v-if="item.results[1]" class="r font-26">
                        <div>{{item.results[1].identifier.name}}</div>
                        <div class="light margin-top">{{item.results[1].identifier.title}}</div>
                    </div>
                </div>
                <div v-if="item.results[1]" class="right" @click.stop="goToProfile(item.results[1].identifier)" v-bg.sm="item.results[1].identifier.portrait"></div>
                <div v-else class="right">
                    <img :class="size" :src="'invite-master.png' | qn">
                </div>
            </div>
        </div>
        <div v-else class="results-empty white font-30 center">
            <div class="center-vertical">- 邀请鉴定师 -</div>
        </div>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <partial v-if="items.isEmpty" name="empty-page"></partial>
</div>
</template>
<script>
import paging from 'paging';
import Avatar from './Avatar.vue';
export default {
    name: 'UserEvaluation',
    mixins: [paging],
    components: {
        Avatar
    },
    activate(done) {
        this.fetch().then(done);
    },
    computed: {
        paging() {
            return {
                path: 'sns/users/'+ this.$route.params.id +'/jianbao|v2',
                list: 'jianbaos',
                id: 'post_id'
            }
        }
    },
    methods: {
        genuine(item) {
            let result = '';
            if(item.results.length === 1) {
                result = item.results[0].result;
            } else if(item.results.length > 1) {
                let results = item.results.map((result) => result.result).join('');
                if(results.replace(/genuine/g, '').length === 0) {
                    result = 'genuine';
                } else if(results.replace(/fake/g, '').length === 0) {
                    result = 'fake';
                } else {
                    result = 'unsure';
                }
            }
            return result;
        },
        goToProfile(user) {
            const [id, tab] = [user.id, user.shop_status ? 'jade' : 'story'];
            this.$router.go({name: 'user', params: {id, tab}});
        }
    }
}
</script>
