<template>
<div class="user-evaluation bg">
    <div v-for="item in items"></div>
    <evaluation-item :item="item"></evaluation-item>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <empty v-if="items.isEmpty"></empty>
</div>
</template>
<script>
import EvaluationItem from 'component/EvaluationItem.vue'
import paging from 'paging'
export default {
    name: 'UserEvaluationView',
    mixins: [paging],
    components: {
        EvaluationItem
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
    }
}
</script>
<style lang="stylus">
@import '~style/partials/var'
.user-evaluation {
    .tabs {
        display: -webkit-box
        height: 80px
        > div {
            -webkit-box-flex: 1
            margin: 24px 0
        }
        label {
            width: 100%
            display: inline-block
        }
        input {
            display: none
        }
    }
    .item {
        padding: 24px 0
    }
    .user {
        display: -webkit-box
        -webkit-box-align: center
        .avatar {
            height: 68px
            width: 68px
            border-radius: 50%
            background-size: cover
            vertical-align: middle
        }
        .name {
            margin-left: 20px
            .moment {
                margin-top: 12px
            }
        }
    }
    .desc {
        margin: 30px 0 24px
    }
    .video {
        height: 500px
    }
    .result {
        height: 116px
        display: -webkit-box
        -webkit-box-align: center
        .avatar {
            height: 68px
            width: 68px
            border-radius: 50%
            background-size: cover
            vertical-align: middle
        }
        .master {
            -webkit-box-flex: 1
            padding-left: 20px
            .title {
                margin-top: 12px
            }
        }
        .mark {
            padding: 5px 0 5px 35px
            background-image: url($qn + 'ico_identify.png')
            background-position: left center
            background-size: 26px
        }
    }
}
</style>
