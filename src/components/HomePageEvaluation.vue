<style lang="sass">
.homepage-evaluation {
    height: 100%;
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
    }
    .masters {
        margin: 10px 10px 24px;
        .left, .right {
            width: 204px;
            height: 204px;
            background-size: cover;
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
            }
            .r {
                text-align: right;
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
}
</style>
<template>
<div class="homepage-evaluation bg-white">
    <div v-for="item in items" v-link="{name: 'evaluation', params: {id: item.post_id}}">
        <div class="head flex">
            <div class="avatar-50" v-bg.sm="item.user.photo"></div>
            <div class="font-26 margin-left">{{item.user.name}}</div>
            <div class="flex-1 font-22 light margin-left">{{item.create_at | moment}}</div>
            <div class="gray font-26"><i class="icon-comment"></i><span>{{item.comment}}</span></div>
        </div>
        <div class="cover" v-bg="item.picture"></div>
        <div v-if="item.results.length">
            <div class="masters flex">
                <div class="left" v-link="item.results[0].identifier | profile" v-bg.sm="item.results[0].identifier.portrait"></div>
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
                <div v-if="item.results[1]" class="right" v-link="item.results[1].identifier | profile" v-bg.sm="item.results[1].identifier.portrait"></div>
                <div v-else class="right">
                    <img @click.stop="invite(item)" :class="size" :src="'invite-master.png' | qn">
                </div>
            </div>
        </div>
        <div v-else class="results-empty white font-30 center">
            <div class="center-vertical" @click.stop="invite(item)">- 邀请鉴定师 -</div>
        </div>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <partial v-if="items.isEmpty" name="empty-page"></partial>
</div>
</template>
<script>
import PagingMixin from './mixin/Paging.vue';
export default {
    name: 'HomePageEvaluation',
    mixins: [PagingMixin],
    props: {
        id: {
            type: String,
            required: true
        }
    },
    created() {
        this.fetch();
    },
    computed: {
        paging() {
            return {
                path: 'sns/users/'+ this.$route.params.id +'/jianbao|v2',
                list: 'jianbaos'
            }
        }
    },
    methods: {
        invite(evaluation) {
            this.action('show', {view: 'invite-master', data: {id: evaluation.post_id}});
        }
    }
}
</script>
