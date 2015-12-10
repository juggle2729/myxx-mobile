<style lang="sass">
.evaluation {
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
            height: 100%;
            img {
                margin-right: 12px;
            }
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
    <template v-for="item in items">
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
            <table>
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
            <div class="result">
                <div class="avatar" v-bg.sm="item.applier.photo"></div>
                <div class="master">
                    <p class="name font-26 txt-black">{{item.applier.name}}{{$index}}</p>
                    <p class="title font-22 txt-gray">{{item.applier.id}}</p>
                </div>
                <div class="mark">
                    <span class="font-22 txt-black"><img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/ico_identify.png" />已鉴定</span>
                </div>
            </div>
            <div class="result">
                <div class="avatar" v-bg.sm="item.applier.photo"></div>
                <div class="master">
                    <p class="font-26 txt-black">{{item.applier.name}}</p>
                    <p class="font-22 txt-gray">{{item.applier.id}}</p>
                </div>
                <div class="mark">
                    <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/ico_identify.png" /><span class="font-22 txt-black">已鉴定</span>
                </div>
            </div>
            <div class="social border-top"></div>
        </div>
        <div class="separator-80"></div>
    </template>
    </div>
</template>
<script>
export default {
    name: 'EvaluationView',
    data() {
        return {
            items: [],
            total: 0
        };
    },
    route: {
        data() {
            const params = {'hot': 1, offset: 0, limit: 5};
            return this.$http
                    .get('jianbao/applies', params, ({data}) => {
                        this.items = data.applies;
                        this.total = data.total;
                        console.log(this.items[0].applier);
                    });
        }
    }
}
</script>
