<style lang="sass">
@import '../styles/partials/var';
.tag-list {
    .item {
        .header {
            height: 90px;
            padding: 20px 0;
            .user {
                margin-left: 20px;
            }
            .follow-cnt {
                margin-right: 30px;
                color: #959595;
                .cnt-text {
                    .icon {
                        color: #cc3f4f;
                        padding-right: 0;
                    }
                }
                &.followed {
                    color: #cc3f4f;
                }
            }
        }

        .content {
            padding: 0 16px;
            .cover {
                width: 100%;
                padding-top: 100%;
                background-size: cover;
                background-position: center;
                background-image: url('#{$qn}/placeholder/img.png');
            }
            .title {
                width: 100%;
                padding: 40px 60px;
                text-align: center;
                .user-input {
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    line-height: 1.5;
                }
            }
        }

        .social {
            width: 100%;
            height: 80px;
            border-top: 1px solid #d9d9d9;
            padding: 12px 0;
            color: #d9d9d9;
            text-align: center;
            > div {
                display: inline-block;
                height: 56px;
                width: 33.3%;
                line-height: 56px;
                float: left;
            }
            .like-cnt > .cnt-text {
                padding-top: 3px;
                display: inline-block;
            }
        }

        &.product {
            .tag {
                position: relative;
                background-size: cover;
                background-color: #e0e0e0;
            }
            .tag::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background-size: 1rem;
                background: transparent url('#{$qn}/product.png') no-repeat right 0.4rem top 0.4rem;
                background-size: 1.5rem;
            }
            .social > div {
                width: 50%;
            }
        }

        &.evaluation {
            .cover {
                width: 100%;
                padding-top: percentage(1/1.15);
                background-size: cover;
                position: relative;
                &[data-genuine='genuine'] {
                    &::after {
                         content: '';
                         position: absolute;
                         right: 0;
                         bottom: 0;
                         height: 144px;
                         width: 144px;
                         background: transparent url('#{$qn}/result-true.png') center;
                         background-size: contain;
                     }
                }
                &[data-genuine='fake'] {
                    &::after {
                         content: '';
                         position: absolute;
                         right: 0;
                         bottom: 0;
                         height: 144px;
                         width: 144px;
                         background: transparent url('#{$qn}/result-false.png') center;
                         background-size: contain;
                     }
                }
                &[data-genuine='unsure'] {
                    &::after {
                         content: '';
                         position: absolute;
                         right: 0;
                         bottom: 0;
                         height: 144px;
                         width: 144px;
                         background: transparent url('#{$qn}/result-unknow.png') center;
                         background-size: contain;
                     }
                }
            }
        }
    }
    .masters {
        padding: 10px 10px 24px;
        .left, .right {
            width: 204px;
            height: 204px;
            background-size: cover;
            background-image: url('#{$qn}/placeholder/portrait.png');
            img {
                width: 100%;
                height: 100%;
            }
        }
        .middle {
            height: 204px;
            margin: 0 24px;
            > div {
                  height: 76px;
            }
            .hr {
                height: 1px;
                margin: 26px 0;
            }
            .l {
                padding-top: 12px;
                .margin-top {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 100%;
                    overflow: hidden;
                }
            }
            .r {
                text-align: right;
                .margin-top {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 100%;
                    overflow: hidden;
                }
            }
        }
    }
    .results-empty {
        height: 102px;
        > div {
              display: inline-block;
              height: 66px;
              width: 306px;
              background-color: #a6a6a6;
              border-radius: 50px;
              line-height: 66px;
        }
    }
    .empty-page {
        height: 700px;
    }
}
</style>
<template>
    <div class="tag-list bg-default">
        <div v-for="item in items">
            <template v-if="item.type === 6">
                <div class="item bg-white" v-link="{name: 'story', params: {id: item.entry.post_id}}">
                    <div class="header flex">
                        <div class="user flex-1 flex">
                            <avatar :user="item.entry.user" :size="50"></avatar>
                            <div class="name margin-left font-26">{{item.entry.user.name}}</div>
                        </div>
                        <div class="follow-cnt font-26" @click.stop="follow(item)">
                            <span class="cnt-text">
                                <span class="icon icon-follow-big font-22" v-if="!item.entry.user.is_followed"></span>
                                {{item.entry.user.is_followed ? '已关注' : '关注'}}
                            </span>
                        </div>
                    </div>
                    <div class="content">
                        <template v-if="item.entry.cover_type === 'picture'">
                            <div class="cover" v-bg="item.entry.cover"></div>
                        </template>
                        <template v-if="item.entry.cover_type === 'video'">
                            <div class="cover" v-bg.video="item.entry.cover"></div>
                        </template>
                        <div class="title font-30"><span class="user-input">{{item.entry.content}}</span></div>
                    </div>
                    <div class="social font-30 clearfix">
                        <div class="border-right">
                            <i class="icon-comment-solid"></i>
                            <span>{{item.entry.comment}}</span>
                        </div>
                        <div class="like-cnt border-right" :class="{ 'red': item.entry.liked }" @click.stop="like(item)">
                            <i class="icon-like-solid"></i>
                            <span class="cnt-text">{{item.entry.like}}</span>
                        </div>
                        <div class="font-30">
                            <i class="icon-share-social"></i>
                            <span>分享</span>
                        </div>
                    </div>
                </div>
                <div class="separator-20"></div>
            </template>
            <template v-if="item.type === 8">
                <div class="item product bg-white" v-link="{name: 'jade', params: {id: item.entry.id}}">
                    <div class="header flex">
                        <div class="user flex-1 flex">
                            <avatar :user="item.entry.user" :size="50"></avatar>
                            <div class="name margin-left font-26">{{item.entry.user.name}}</div>
                        </div>
                    </div>
                    <div class="content">
                        <div v-if="item.entry.video" class="cover tag" v-bg.video="item.entry.video"></div>
                        <div class="title font-30"><span class="user-input">{{item.entry.title}}</span></div>
                    </div>
                    <div class="social font-30 clearfix">
                        <div class="border-right">
                            <i class="icon-comment-solid"></i>
                            <span>{{item.entry.comment}}</span>
                        </div>
                        <div class="font-30">
                            <i class="icon-share-social"></i>
                            <span>分享</span>
                        </div>
                    </div>
                </div>
                <div class="separator-20"></div>
            </template>
            <template v-if="item.type === 3">
                <div class="item evaluation bg-white" v-link="{name: 'evaluation', params: {id: item.entry.post_id}}">
                    <div class="header flex">
                        <div class="user flex-1 flex">
                            <avatar :user="item.entry.user" :size="50"></avatar>
                            <div class="name margin-left font-26">{{item.entry.user.name}}</div>
                        </div>
                        <div class="follow-cnt font-26" @click.stop="follow(item)">
                            <span class="cnt-text">
                                <span class="icon icon-follow-big font-22" v-if="!item.entry.user.is_followed"></span>
                                {{item.entry.user.is_followed ? '已关注' : '关注'}}
                            </span>
                        </div>
                    </div>
                    <div class="content">
                        <div class="cover" v-bg="item.entry.picture" data-genuine="{{genuine(item.entry)}}"></div>
                    </div>
                    <div v-if="item.entry.results.length">
                        <div class="masters flex bg-white">
                            <div class="left" @click.stop.stop="goToProfile(item.entry.results[0].identifier)" v-bg.sm="item.entry.results[0].identifier.portrait"></div>
                            <div class="middle flex-1">
                                <div class="l font-26">
                                    <div>{{item.entry.results[0].identifier.name}}</div>
                                    <div class="light margin-top">{{item.entry.results[0].identifier.title}}</div>
                                </div>
                                <div class="hr border-bottom"></div>
                                <div v-if="item.entry.results[1]" class="r font-26">
                                    <div>{{item.entry.results[1].identifier.name}}</div>
                                    <div class="light margin-top">{{item.entry.results[1].identifier.title}}</div>
                                </div>
                            </div>
                            <div v-if="item.entry.results[1]" class="right" @click.stop.stop="goToProfile(item.entry.results[1].identifier)" v-bg.sm="item.entry.results[1].identifier.portrait"></div>
                            <div v-else class="right">
                                <img :class="size" :src="'invite-master.png' | qn">
                            </div>
                        </div>
                    </div>
                    <div v-else class="results-empty white font-30 center">
                        <div class="center-vertical">- 邀请鉴定师 -</div>
                    </div>
                </div>
                <div class="separator-20"></div>
            </template>
        </div>
        <partial name="load-more" v-if="items.hasMore"></partial>
        <partial v-if="items.isEmpty" name="empty-page"></partial>
    </div>
</template>
<script>
    import paging from 'paging';
    export default {
        name: 'Tag',
        mixins: [paging],
        computed: {
            paging() {
                return {
                    path: 'cms/promotes|v4',
                    list: 'entries',
                    params: {
                        tag_id: this.tagId,
                        limit: 10
                    }
                }
            }
        },
        route: {
            data({to}) {
                this.updateTitle(to.params.name);
                this.tagId = to.params.id;

                return this.fetch();
            }
        },
        methods: {
            genuine(item) {
                let result = '';
                if(item.results.length === 1) {
                    result = item.results[0].result;
                } else if(item.results.length > 1) {
                    let results = item.results.map((result) => result.result).join('');
                    if(results.replace(/genuine/g, '').length === 0) {
                        result = 'genuine';
                    } else if(results.replace(/fake/g, '').length === 0) {
                        result = 'fake';
                    } else {
                        result = 'unsure';
                    }
                }
                return result;
            },
            goToProfile(user) {
                const [id, tab] = [user.id, user.shop_status ? 'jade' : 'story'];
                this.$router.go({name: 'user', params: {id, tab}});
            },
            follow(item) {
                const followApi = `users/follow/${item.entry.user.id}`;
                if(item.entry.user.is_followed) {
                    this.$delete(followApi).then(() => {
                        item.entry.user.is_followed = false;
                        this.action('toast', {
                            text: '已取消关注',
                            success: '0'
                        });
                    });
                } else {
                    this.$post(followApi).then(() => {
                        item.entry.user.is_followed = true;
                        this.action('toast', {
                            text: '已关注',
                            success: '1'
                        });
                    });
                }
            },
            like(item) {
                const likeApi = `users/target/${item.entry.post_id}/type/30/like`;
                if (item.entry.liked) {
                    this.$delete(likeApi).then(() => {
                        item.entry.liked = false;
                        item.entry.like -= 1;
                    });
                } else {
                    this.$post(likeApi).then(() => {
                        item.entry.liked = true;
                        item.entry.like += 1;
                    });
                }
            }
        }
    }
</script>