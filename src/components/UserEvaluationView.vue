<template>
<div class="user-evaluation bg-default">
    <evaluation-list :items="items"></evaluation-list>
    <div v-if="items.length" class="loadmore center font-22 gray padding-vertical border-top">
        <img v-show="hasMore" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
    </div>
    <empty-page v-else title="你还没有鉴宝"></empty-page>
</div>
</template>
<script>
import EvaluationList from './EvaluationList.vue';
import EmptyPage from './EmptyPage.vue';
export default {
    name: 'UserEvaluationView',
    data() {
        return {
            hasMore: true,
            items: []
        };
    },
    components: {
        EvaluationList,
        EmptyPage
    },
    route: {
        data() {
            return this.fetch();
        }
    },
    events: {
        scrollToBottom(e) {
            this.fetch();
        }
    },
    methods: {
        fetch: (() => {
            const limit = 2;
            let loading = true;
            return function() {
                let offset = this.items.length;
                let userId = this.$route.params.id;
                if(loading) {
                    loading = false;
                    const params = {offset, limit};
                    return this.$get(`sns/users/${userId}/jianbao`, params)
                        .then((data) => {
                            this.items.splice(this.items.length, 0, ...data.jianbaos);
                            loading = true;
                            if (data.jianbaos.length < limit || offset + limit >= data.total) {
                                this.hasMore = false;
                                loading = false;
                            }
                        });
                }
            }
        })()
    }
}
</script>
<style lang="sass">
.user-evaluation {
    height: 100%;
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
        padding: 24px 0;
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
    .loadmore {
        img {
            width: 120px;
            height: 68px;
        }
    }
}
</style>
