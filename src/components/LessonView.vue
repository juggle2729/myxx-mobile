<template>
    <div class="lesson-view">
        <div class="course-video" @click="playCourse" v-bg="course.video" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/750/h/580/interlace/1">
            <a class="his-course font-30" v-link="{name: 'lecturer', params: {userId: course.user.id}}">他的课堂</a>
        </div>
        <div class="course-user">
            <div class="head avatar-68" v-bg="course.user.photo" v-link="course.user | profile"></div>
            <div class="info">
                <div class="name font-26">{{course.user.name}}</div>
                <div class="title font-26">{{course.user.title}}</div>
            </div>
            <div class="like font-26" :class="{'liked': course.liked}" @click="likeUser" v-if="config.isApp">
                <span class="icon icon-like-solid"></span>
                <span class="count">{{course.like}}</span>
            </div>
        </div>
        <div class="tags" v-if="course.tags && course.tags.length">
            <div class="tag-list">
                <template v-for="tag in course.tags">
                    <div class="row-separator" v-if="$index % 4 === 0"></div>
                    <div class="tag-item font-26" :class="{'first-line' : $index < 4}"
                         v-link="{name: 'tags', params: tagParam(tag)}" >{{tagName(tag)}}</div>
                </template>
            </div>
        </div>
        <template v-if="recommendGoods.length">
            <div class="separator"></div>
            <div class="recommend-goods">
                <div class="title font-22">商品推荐</div>
                <div class="goods-list">
                    <div class="good-item" v-link="{name: 'jade', params: {id: good.item.id}}" v-for="good in recommendGoods">
                        <div class="good-img" v-bg.md="good.item.first_picture"></div>
                        <div class="good-title">{{good.item.title}}</div>
                        <div class="good-price">{{good.item.price | price}}</div>
                    </div>
                </div>
            </div>
        </template>
        <div class="separator"></div>
        <comment type="60" :id="course.id"></comment>
    </div>
</template>
<script>
    import shareable from 'shareable';
    import Comment from './Comment.vue';

    export default {
        name: 'LessonView',
        mixins: [shareable],
        components: {
            Comment
        },
        data(){
            return {
                course: {
                    id: 0,
                    user: {},
                    column: {}
                },
                recommendGoods: []
            };
        },
        route: {
            data({to}) {
                this.course.id = Number(to.params.id);
                this.loadRecommendGoods(this.course.id);

                return this.$get(`cms/opencourse/${this.course.id}|v3`)
                        .then(course => {
                        this.course = course;
                        this.setShareData(course, true);
                });
            }
        },
        methods: {
            tagParam(tag) {
                if(_.isObject(tag.tag)) {
                    return {
                        type: tag.type,
                        tag: tag.tag.id
                    };
                } else {
                    return {
                        type: tag.type,
                        tag: tag.tag
                    };
                }
            },
            tagName(tag) {
                if(_.isObject(tag.tag)) {
                    return tag.tag.name;
                } else {
                    return tag.tag;
                }
            },
            playCourse() {
                let shareUrl = location.origin + location.pathname;
                let query = _.merge({}, this.$route.query, {
                    user: _.get(this, 'self.id', -1),
                    time: Date.now(),
                    id: this.course.id,
                    type: 'open_course'
                });
                shareUrl += ('?' + _.map(query, (v, k) => `${k}=${v}`).join('&'));

                this.action('playCourses', {
                    courseUrl: this.course.article,
                    courseName: this.course.title,
                    courseVideoId: this.course.video,
                    targetId: this.course.id,
                    targetType: 'open_course',
                    productId: this.course.product_id,
                    productVideoId: this.course.product_video_id,
                    courseShareUrl: shareUrl,
                    userId: this.course.user.id,
                    portraitId: this.course.user.photo
                });
            },
            loadRecommendGoods(courseId) {
                return this.$get(`dc/rd|v3`, {
                    obj_id: courseId,
                    biz_type: 'pd' // 推荐商品
                }).then(data => {
                    this.recommendGoods = data.recommend_data;
                });
            },
            likeUser() {
                if (this.liking) {
                    return;
                }

                const url = `users/target/${this.course.id}/type/60/like`;
                this.liking = true;
                if (this.course.liked) {
                    this.$delete(url, {}).then((data) => {
                        this.liking = false;
                        this.course.liked = false;
                        this.action('toast', {success: 1, text: '已取消赞'});
                    }).catch(() => {
                        this.liking = false;
                    });
                } else {
                    this.$post(url, {}).then((data) => {
                        this.liking = false;
                        this.course.liked = true;
                        this.action('toast', {success: 1, text: '已赞'});
                    }).catch(() => {
                        this.liking = false;
                    });
                }

                setTimeout(() => {
                    this.liking = false;
                }, 200);
            }
        }
    }
</script>
<style lang="sass">
    @import '../styles/partials/_var.scss';
    @import '../styles/partials/_mixin.scss';

    .lesson-view {
        position: relative;
        min-height: 100%;
        background-color: #fff;

        .course-video {
            width: 100%;
            padding-top: 77.33%;
            position: relative;
            background-size: cover;

            &:before {
                 @include border(all, #fff);
                 border-radius: 100px;
                 content: '';
                 display: block;

                 position: absolute;
                 left: 32px;
                 bottom: 26px;

                 background: url('#{$qn}/icon/play.png');
                 background-size: cover;
                 width: 100px;
                 height: 100px;
             }
        }

        .course-user {
            @include border(vertical, #d9d9d9);
            position: relative;
            height: 114px;

            > div {
                  display: inline-block;
                  position: absolute;
              }

            .head {
                left: 40px;
                top: 50%;
                margin-top: -34px;
            }

            .info {
                left: 126px;
                top: 50%;
                transform: translateY(-50%);

                .title {
                    color: #9c9c9c;
                    margin-top: 10px;
                }
            }

            .like {
                right: 35px;
                top: 50%;
                transform: translateY(-50%);

                .icon {
                    vertical-align: 3px;
                }

                > span {
                    color: #c9c9c9;
                }
            }

            .liked {
                > span {
                    color: #e23d3d;
                }
            }

            .count {
                vertical-align: text-top;
            }
        }

        .tags {
            @include border(bottom, #d9d9d9);
            min-height: 108px;

            .tag-item {
                display: inline-block;
                margin: 28px 0 28px 16px;
                line-height: 60px;
                padding: 0 26px;
                border-radius: 26px;
                background-color: #ffecea;

                &:not(.first-line) {
                     margin-top: 0;
                 }
            }

            .row-separator + .tag-item {
                margin-left: 32px;
            }
        }

        .his-course {
            position: absolute;
            right: 30px;
            bottom: 28px;

            display: inline-block;
            line-height: 70px;
            padding: 0 30px;
            background-color: #e23d3d;
            border-radius: 10px;
            color: #fff;
        }

        .separator {
            background-color: #f1f1f1;
            width: 100%;
            height: 20px;
        }

        .recommend-goods {
            @include border(bottom);
            .title {
                color: #979797;
                line-height: 78px;
                text-align: left;
                margin-left: 32px;
            }

            .goods-list {
                padding:0 32px 32px;
                overflow-x: auto;
                overflow-y: hidden;
                white-space: nowrap;
                -webkit-overflow-scrolling: touch;
            }

            .good-item {
                @include border();
                width: 300px;
                display: inline-block;
            }

            .good-item:not(:first-child) {
                margin-left: 20px;
            }

            .good-img {
                width: 100%;
                height: 300px;
            }

            .good-title {
                font-size: 24px;
                padding: 17px 18px 20px;
                line-height: 36px;
                color: #393939;
                white-space: normal;
                text-align: center;
            }

            .good-price {
                text-align: center;
                font-size: 20px;
                color: #cc3f4f;
                padding-bottom: 22px;
            }
        }
    }
</style>