<template>
<div class="user-evaluation bg-default">
    <evaluation-list :items="items"></evaluation-list>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <partial v-else name="empty-page"></partial>
</div>
</template>
<script>
import EvaluationList from './EvaluationList.vue';
import PagingMixin from './PagingMixin.vue';
export default {
    name: 'UserEvaluationView',
    mixins: [PagingMixin],
    components: {
        EvaluationList
    },
    data() {
        return {
            emptyTitle: '你还没有鉴宝'
        }
    },
    computed: {
        paging() {
            return {
                path: 'sns/users/'+ this.$route.params.id +'/jianbao',
                list: 'jianbaos'
            }
        }
    },
    route: {
        data() {
            return this.fetch();
        }
    }
}
</script>
<style lang="sass">
@import '../styles/partials/var';
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
            background-image: url('#{$qn}/ico_identify.png');
            background-position: left center;
            background-size: 26px;
        }
    }
}
</style>
