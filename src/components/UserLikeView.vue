<template>
<div class="userlike-view bg-default">
    <template v-for="thumb in thumbs">
        <div :class="{'separator-20': $index !=0 , 'separator': $index === 0}"></div>
        <div class="notice bg-white">
            <div class="sender flex">
                <p class="font-30 gray">
                    赞了一个{{thumb.title}}
                </p>
            </div>
            <div class="info flex" v-link="{ name: thumb.link, params: { id: thumb.post_id }}">
                <div class="left">
                    <div class="flex">
                        <div v-bg.sm="thumb.user.photo" class="avatar-50"></div>
                        <p class="font-26 gray">{{thumb.user.name}}</p>
                    </div>
                    <p class="font-30">{{{thumb.description}}}</p>
                    <p v-if="thumb.result" class="font-22 gray">{{{thumb.result}}}</p>
                </div>
                <div v-if="thumb.photo1" v-bg.sm="thumb.photo1" class="right"></div>
                <div v-if="thumb.photo2" v-bg.video="thumb.photo2" class="right"></div>
            </div>
        </div>
    </template>
    <div class="border-top" v-if="total"></div>
    <empty-page v-else title="你还没有赞"></empty-page>
    <div class="loadmore center font-22 gray" v-if="hasMore">
        <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
    </div>
</div>
</template>
<script>
import EmptyPage from './EmptyPage.vue';
export default {
    name: 'thumb',
    data() {
        return {
            thumbs: [],
            hasMore: true,
            loading: true,
            total: 0
        };
    },
    components: {
        EmptyPage
    },
    route: {
        data() {
            return this.fetch();
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
                return this.$get('users/' + userId + '/like_list', {offset, limit})
                        .then((data) => {
                            this.total = data.total;
                            data.entries.forEach((item) => {
                                if (item.type === 10) {//picture
                                    item.entry.link = 'evaluation';
                                    item.entry.photo1 = item.entry.picture;
                                    item.entry.description = item.entry.description;
                                    item.entry.result = item.entry.status + '条鉴定结果';
                                } else if (item.type === 20) {//video
                                    item.entry.link = 'evaluation';
                                    item.entry.photo2 = item.entry.video;
                                    item.entry.user = item.entry.identifier;
                                    item.entry.description = '鉴定了 ' + item.entry.jianbao.applier.nickname + ' 的宝贝';
                                    item.entry.result = '鉴定结果为 ' + item.entry.result;
                                } else if (item.type === 30) {//media
                                    item.entry.link = 'story';
                                    item.entry.description = '分享了一个话题';
                                    item.entry.photo1 = item.entry.media[0].id;
                                }
                                else if (item.type === 40) { //宝贝
                                    // item.entry.link = 'jade';
                                    // item.entry.post_id = item.entry.id;
                                    // item.entry.description = item.entry.name + ' ' + item.entry.moral.name;
                                    // item.entry.user.name = item.entry.user.nickname;
                                    // item.entry.photo1 = item.entry.imgs[0];
                                    // if(item.entry.product_rewards.length > 0){
                                    //     item.entry.result = item.entry.product_rewards[0].reward.name;
                                    // }
                                    return;
                                }
                                item.entry.title = types[item.type / 10];
                                this.thumbs.push(item.entry);
                            });
                            this.loading = true;
                            if (data.entries.length < limit || offset + limit >= this.total || data.entries.length === data.total) {
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
    height: 100%;
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
            .right {
                background-size: cover;
                background-position: center;
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
