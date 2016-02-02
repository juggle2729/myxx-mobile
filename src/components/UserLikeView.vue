<template>
<div class="userlike-view bg-default">
    <template v-for="thumb in items">
        <div v-if="$index === 0" class="separator"></div>
        <div v-else class="separator-20"></div>
        <div class="notice bg-white">
            <div class="sender flex">
                <p class="font-30 gray">
                    赞了一个{{thumb.title}}
                </p>
            </div>
            <div class="info flex" v-if="!thumb.isEmpty" v-link="{ name: thumb.route, params: { id: thumb.post_id }}">
                <div class="left">
                    <div class="flex">
                        <div v-bg.sm="thumb.user.photo" class="avatar-50"></div>
                        <p class="font-26 gray">{{thumb.user.name}}</p>
                    </div>
                    <p class="font-30">{{{thumb.description}}}</p>
                    <p v-if="thumb.result" class="font-22 gray">{{{thumb.result}}}</p>
                </div>
                <div v-if="thumb.imgPreview" v-bg.sm="thumb.imgPreview" class="right"></div>
                <div v-if="thumb.videoPreview" v-bg.video="thumb.videoPreview" class="right"></div>
            </div>
            <div class="info flex font-30" v-else>
                <span style="margin-left:32px;">该{{thumb.title}}已被删除!</span>
            </div>
        </div>
    </template>
    <div class="border-top" v-if="!items.isEmpty"></div>
    <partial v-else name="empty-page"></partial>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import PagingMixin from './mixin/Paging.vue';
export default {
    name: 'UserLikeView',
    mixins: [PagingMixin],
    data() {
        return {
            emptyTitle: '你还没有赞'
        }
    },
    computed: {
        currentUserId() {
            return _.get(this, 'self.id');
        },
        paging() {
            return {
                path: 'users/'+ this.$route.params.id +'/like_list',
                list: 'entries',
                params: {
                    limit: 10
                },
                transform(items) {
                    return items.map((item) => {
                        let entry = item.entry;
                        if(JSON.stringify(entry) === '{}' || item.entry === null || item.entry === undefined){
                            entry.isEmpty = true;
                        } else {
                            entry.isEmpty = false;
                        }
                        const type = _.find(this.config.types, {'id': item.type});
                        entry.route = type.route;
                        entry.title = type.name;
                        if(!entry.isEmpty){
                            if (item.type === 10) {//picture
                                entry.imgPreview = entry.picture;
                                entry.description = entry.description;
                                entry.result = entry.status + '条鉴定结果';
                            } else if (item.type === 20) {//video
                                entry.videoPreview = entry.video;
                                entry.user = entry.identifier;
                                entry.description = '鉴定了 ' + entry.jianbao.applier.nickname + ' 的宝贝';
                                entry.result = '鉴定结果为 ' + entry.result;
                            } else if (item.type === 30) {//media
                                entry.description = '发布的话题';
                                if(entry.content_type === 'short_text' && entry.content !== ''){
                                    entry.description = entry.content;
                                }
                                entry.imgPreview = entry.media[0].id;
                            } else if (item.type === 40) {
                                entry.post_id = entry.id;
                                entry.description = entry.name + ' ' + (entry.moral? entry.moral.name: '');
                                entry.user.name = entry.user.nickname;
                                entry.imgPreview = entry.imgs[0];
                                if(entry.product_rewards.length > 0){
                                    entry.result = entry.product_rewards[0].reward.name;
                                }
                            }
                            entry.isEmpty = false;
                        }
                        return entry;
                    });
                }
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
}
</style>
