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
        [type='radio'] {
            display: none;
        }
    }
    .item {
        padding: 24px 32px;
        margin-bottom: 40px;
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
    table {
        width: 670px;
        td {
            padding: 5px;
        }
        div {
            height: 200%;
            width: 100%;
            padding-top: 100%;
            background-size: cover;
            background-position: center;
            &.video {
                padding-top: calc(200% + 10px);
            }
        }
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
        }
        &:nth-of-type(2n+1) {   
            // FIXME this rule will be swallowed somehow,
            // use v-for $index as a walkaround
            @extend .border-top;
        }
    }
    .social {
        height: 60px;
        @extend .border-top;
    }
}
</style>
<template>
    <div class="evaluation">
    <div class="tabs">
        <div :class="{'txt-red': tab=='time'}" class="font-26 txt-primary txt-center border-right">
            <label for="tab-time">最新</label><input id="tab-time" type="radio" value="time" v-model="tab">
        </div>
        <div :class="{'txt-red': tab=='popularity'}" class="txt-primary font-26 txt-center">
            <label for="tab-popularity">热门</label><input id="tab-popularity" value="popularity" type="radio" v-model="tab">
        </div>
    </div>
    <template v-for="item in items">
        <div class="separator"></div>
        <div class="item">     
            <div class="header">
                <div class="user">
                    <div class="avatar" v-bg.sm="item.applier.photo"></div>
                    <div class="name">
                        <p class="font-26 txt-primary">{{item.applier.name}}</p>
                        <p class="moment font-22 txt-gray">{{item.create_at | moment}}</p>
                  </div>
                </div>
                <div class="desc font-30">{{item.description}}</div>
            </div>
            <table v-link="{name: 'evaluation-detail', params: {id: item.id}}">
                <tr>
                    <td>
                        <div v-bg.lg="item.pictures[0]"></div>
                    </td>
                    <td>
                        <div v-bg.lg="item.pictures[1]"></div>
                    </td>
                    <td rowspan='2'>
                        <div class="video" v-bg.video="item.video">
                    </td>
                </tr>
                <tr>
                    <td>
                        <div v-bg.lg="item.pictures[2]"></div>
                    </td>
                    <td>
                        <div v-bg.lg="item.pictures[3]"></div>
                    </td>
                </tr>
            </table>
            <div v-for="result in item.results" class="result">
                <div class="avatar" v-bg.sm="result.identifier.photo"></div>
                <div class="master">
                    <p class="name font-26 txt-black">{{result.identifier.name}}</p>
                    <p class="title font-22 txt-gray">{{result.identifier.title}}</p>
                </div>
                <div class="mark font-22">已鉴定</div>
            </div>
            <div class="social border-top"></div>
        </div>
    </template>
    </div>
</template>
<script>
export default {
    name: 'EvaluationView',
    data() {
        return {
            tab: 'time',
            items: [],
            total: 0
        };
    },
    route: {
        data() {
            return this.fetch();
        }
    },
    created() {
        this.$watch('tab', this.fetch);
    },
    methods: {
        fetch() {
            const params = {[this.tab]: 1, offset: 0, limit: 5};
            return this.$http
                    .get('jianbao/applies', params, ({data}) => {
                        this.items = data.applies;
                        this.total = data.total;
                    });
        }
    }
}
</script>
