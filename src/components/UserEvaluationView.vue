<template>
<div class="user-evaluation bg-default">
    <evaluation-list :items="items"></evaluation-list>
    <div class="loadmore center font-22 gray padding-vertical border-top">
        <img v-show="hasMore" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
    </div>
</div>
</template>
<script>
import EvaluationList from './EvaluationList.vue';
export default {
    name: 'UserEvaluationView',
    data() {
        return {
            user:'',
            userId: 0,
            loading: true,
            hasMore: true,
            items: [],
        };
    },
    components: {
        EvaluationList
    },
    route: {
        data() {
            this.userId = this.$route.params.id;
            this.fetch();
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
            return function() {
                let offset = this.items.length;
                if(this.loading) {
                    this.loading = false;
                    const params = {offset, limit};
                    return this.$get('sns/users/'+ this.userId +'/jianbao', params)
                        .then((data) => {
                            this.items.splice(this.items.length - 1, 0, ...data.jianbaos);
                            this.loading = true;
                            if (data.jianbaos.length < limit) {
                                this.hasMore = false;
                                this.loading = false;
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
    .social {
        padding: 0 32px;
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
