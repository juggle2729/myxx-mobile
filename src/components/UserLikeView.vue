<template>
<div class="userlike-view">
    <template v-for="thumb in thumbs">
        <div class="notice">
            <div class="sender flex">
                <p class="font-30 gray">
                    赞了一个{{thumb.title}}
                </p>
            </div>
            <div class="info flex" v-link="{ name: 'evaluation', params: { id: thumb.post_id }}">
                <div class="left">
                    <div class="flex">
                        <div v-bg.sm="thumb.user.photo" class="avatar-50"></div>
                        <p class="font-26 gray">{{thumb.user.name}}</p>
                    </div>
                    <p class="font-30">{{{thumb.description}}}</p>
                    <p v-if="thumb.result" class="font-22 gray">{{{thumb.result}}}</p>
                </div>
                <div v-if="thumb.photo1" v-bg="thumb.photo1" class="right"></div>
                <div v-if="thumb.photo2" v-bg.video="thumb.photo2" class="right"></div>
            </div>
        </div>
        <div class="separator-20"></div>
    </template>
    <div class="loadmore center font-22 gray">
        <img v-show="hasMore" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
        <span v-show="!hasMore" class="center-vertical">没有了</span>
    </div>
</div>
</template>
<script>
export default {
    name: 'thumb',
    data() {
        return {
            thumbs: [],
            hasMore: true,
            loading: true
        };
    },
    route: {
        data() {
            this.fetch();
        }
    },
    methods: {
        fetch() {
            const types = ['xxx', '鉴宝', '大师鉴定', '话题', '宝贝'];
            const userId = this.$route.params.id;
            const offset = this.thumbs.length;
            const limit = 10;
            if (this.loading) {
                this.loading = false;
                return this.$get('users/' + userId + '/like_list', {offset, limit},
                        (data) => {
                            data.entries.forEach((item) => {
                                if (item.type === 10) {//picture
                                    console.log(item.entry.picture);
                                    item.entry.photo1 = item.entry.picture;
                                    item.entry.description = item.entry.description;
                                    item.entry.result = item.entry.status + '条鉴定结果';
                                } else if (item.type === 20) {//video
                                    console.log(item.entry.video);
                                    item.entry.photo2 = item.entry.video;
                                    item.entry.user = item.entry.identifier;
                                    item.entry.description = '鉴定了 ' + item.entry.jianbao.applier.nickname + ' 的宝贝';
                                    item.entry.result = '鉴定结果为 ' + item.entry.result;
                                } else if (item.type === 30) {//media
                                    item.entry.user = item.entry.applier;
                                    if (item.entry.title) {
                                        item.entry.description = item.entry.title;
                                    } else {
                                        item.entry.description = '分享了一个话题';
                                    }
                                } else if (item.type === 80) { //商品现在没有数据
                                    item.entry.user = item.entry.identifier;
                                    item.entry.result = 1106;
                                }
                                item.entry.title = types[item.type / 10];
                                this.thumbs.push(item.entry);
                            });
                            this.loading = true;
                            if (data.entries.length < limit || data.entries.length === data.total) {
                                this.hasMore = false;
                                this.loading = false;
                            }
                        });
            }
        }
    },
    events: {
        scrollToBottom(e) {
            this.fetch();
        }
    }
}
</script>
<style lang="sass">
.userlike-view {
    .notice {
        padding-left: 32px;
        padding-right: 32px;
        height: 270px;
        position: relative;
        .sender {
            height: 82px;
            position: relative;
        }
        .info {
            position: relative;
            height: 168px;
            background-color: #efeff4;
            .right {
                height: 125px;
                width: 125px;
                margin-left: 28px;
            }
            .left {
                display: -webkit-box-;
                padding-left: 24px;
                width: 510px;
                > div {
                    height: 50px;
                    position: relative;
                    > p {
                        margin-left: 16px;
                    }
                }
                > p:nth-of-type(1) {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-top: 16px;
                }
                > p:nth-of-type(2) {
                    margin-top: 12px;
                }
            }
        }
    }
    .loadmore {
        height: 68px;
        img {
            width: 120px;
            height: 68px;
        }
    }
}
</style>
