<style lang="sass">
@import '~style/partials/var';
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
<div class="tag-list">
    <div v-for="item in items">
        <div class="separator"></div>
        <story-item v-if="item.type===6" :item="item.entry"></story-item>
        <evaluation-item v-if="item.type===3" :item="item.entry"></evaluation-item>
        <jade-item v-if="item.type===8" :item="item.entry"></evaluation-item>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import paging from 'paging';
import StoryItem from 'component/StoryItem.vue';
import EvaluationItem from 'component/EvaluationItem.vue';
import JadeItem from 'component/JadeItem.vue';
export default {
    name: 'TagView',
    mixins: [paging],
    components: {
        StoryItem,
        EvaluationItem,
        JadeItem
    },
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
            this.action('updateTitle', {text: to.params.name});
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
                        text: '已取消关注'
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
        }
    }
}
</script>
