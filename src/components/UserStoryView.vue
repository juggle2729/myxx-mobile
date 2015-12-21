<template>
    <div class="topics">
        <div class="tabs">
            <div :class="{'red': tab=='time'}" class="font-26 center border-right">
                <label for="tab-time">最新</label>
                <input id="tab-time" type="radio" value="time" v-model="tab">
            </div>
            <div :class="{'red': tab=='popularity'}" class="font-26 center">
                <label for="tab-popularity">热门</label>
                <input id="tab-popularity" value="popularity" type="radio" v-model="tab">
            </div>
        </div>
        <template v-for="item in items">
            <div class="separator"></div>
            <div class="item">
                <div class="header">
                    <div class="user">
                        <div class="avatar" v-bg.sm="item.user.photo"></div>
                        <div class="name">
                            <p class="font-26">{{item.user.name}}</p>
                            <p class="moment font-22 light">{{item.create_at | moment}}</p>
                        </div>
                    </div>
                    <div class="desc font-30">{{item.description}}</div>
                </div>
                <table v-link="{name: 'story', params: {id: item.id}}">
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
                <div class="social border-top"></div>
                </div>
        </template>
        </div>
</template>
<script>
    export default {
        name: 'StoryView',
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
                const params = {
                    [this.tab]: 1, offset: 0, limit: 5
                };
                return this.$get('sns/users/topics', (data) => {
                        this.items = data.topics;
                        data.topics.forEach((topic) =>{
                            topic.pictures = [];
                            topic.medias.forEach((media) => {
                                console.log(media);
                                if(media.type === 'picture'){
                                    topic.pictures.push(media.id);
                                }else {
                                    topic.video = media.id;
                                }
                            });
                        });
                        this.total = data.total;
                    });
            }
        }
    }
</script>
<style lang="sass">
    .topics {
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
        .social {
            height: 60px;
            @extend .border-top;
        }
    }
</style>
