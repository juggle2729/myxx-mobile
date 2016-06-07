<template>
    <div class="lesson-view">
        <div class="course-video" @click="playCourse" v-bg="course.video" query="vframe/jpg/offset/5/rotate/auto|imageView2/0/w/750/h/580/interlace/1">
            <a class="his-course font-30" @click.stop="gotoLecturer">他的课堂</a>
        </div>
        <div class="course-user">
            <avatar :user="course.user"></avatar>
            <div class="info">
                <div class="name font-26">{{course.user.name}}</div>
                <div class="title font-26">{{course.user.title}}</div>
            </div>
            <div class="like font-26" :class="{'liked': course.liked}" @click="likeUser">
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
        <template v-if="recommendData.length">
            <div class="separator"></div>
            <div class="recommend-data">
                <div class="title font-22">相关推荐</div>
                <div class="data-list">
                    <div class="data-item {{data.biz_type}}" @click="gotoDataUrl(data)" v-for="data in recommendData">
                        <div v-if="data.item.first_picture || data.item.picture" class="data-img" v-bg.md="data.item.first_picture || data.item.picture">
                            <div class="data-title" v-text="recommendTitle(data)"></div>
                        </div>
                        <div v-else class="data-img" v-bg.video="data.item.video" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/300/h/300">
                            <div class="data-title" v-text="recommendTitle(data)"></div>
                        </div>
                        <div class="data-info">
                            <div class="data-name">{{(data.item.title || data.item.description) | truncate 20}}</div>
                            <div v-if="data.biz_type === config.tags.product.id" class="data-price">{{data.item.price | price}}</div>
                            <div v-if="data.item.author" class="data-user-name">{{data.item.author.name}}</div>
                        </div>
                    </div>
                    <div class="data-item"></div>
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
                recommendData: []
            };
        },
        ready() {
            this.$on('restore', () => {
                this.updateTitle(this.course.title);
                this.setShareData(this.course, true);
            });
        },
        route: {
            data({to}) {
                this.course.id = Number(to.params.id);
                this.loadRecommendData(this.course.id);

                return this.$get(`cms/opencourse/${this.course.id}|v3`)
                        .then(course => {
                        this.course = course;

                        this.setShareData(course, true);
                        this.updateTitle(course.title);
                });
            }
        },
        methods: {
            gotoDataUrl(data) {
                const type = data.biz_type;
                let pathName = '';
                if (type === this.config.tags.lesson.id) {
                    pathName = 'lesson';
                } else if (type === this.config.tags.product.id) {
                    pathName = 'jade';
                } else if (type === this.config.tags.evaluation.id) {
                    pathName = 'evaluation';
                }

                this.$route.router.go({name: pathName, params: {id: data.item.id}});
            },
            gotoLecturer() {
                if (this.env.isShare) {
                    location.href = this.config.download;
                } else {
                    this.$route.router.go({name: 'lecturer', params: {userId: this.course.user.id}});
                }
            },
            recommendTitle(data) {
                for (const tagName in this.config.tags) {
                    const tag = this.config.tags[tagName];
                    if (tag.id === data.biz_type) {
                        return tag.name;
                    }
                }

                return '';
            },
            tagParam(tag) {
                if(_.isObject(tag.tag)) {
                    return {
                        type: tag.type,
                        tag: tag.tag.id,
                        name: tag.tag.name
                    };
                } else {
                    return {
                        type: tag.type,
                        tag: tag.tag,
                        name: tag.tag
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
                    productId: this.course.ad_product_id,
                    productVideoId: this.course.ad_video,
                    courseShareUrl: shareUrl,
                    userId: this.course.user.id,
                    portraitId: this.course.user.photo
                });
            },
            loadRecommendData(courseId) {
                return this.$get(`dc/rd|v3`, {
                    obj_id: courseId,
                    biz_type: 'oc' // 推荐商品
                }).then(data => {
                    this.recommendData = data.recommend_data;
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
                        this.course.like -= 1;

                        this.action('toast', {success: 1, text: '已取消赞'});
                    }).catch(() => {
                        this.liking = false;
                    });
                } else {
                    this.$post(url, {}).then((data) => {
                        this.liking = false;

                        this.course.liked = true;
                        this.course.like += 1;

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
    @import '~style/partials/_var.scss';
    @import '~style/partials/_mixin.scss';
    .lesson-view {
        position: relative;
        min-height: 100%;
        background-color: #fff;
        padding-bottom: 100px;

        .course-video {
            width: 100%;
            padding-top: 77.33%;
            position: relative;
            background-size: contain;
            background-position: center;
            background-color: #000;

            &:before {
                 @include border(all, #ffffff);
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
            @include border(vertical);
            position: relative;
            height: 114px;

            > div {
                  display: inline-block;
                  position: absolute;
              }

           .avatar-68 {
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
            @include border(bottom);
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

        .recommend-data {
            @include border(bottom);
            .title {
                color: #979797;
                line-height: 78px;
                text-align: left;
                margin-left: 32px;
            }

            .data-list {
                padding:0 32px 32px;
                overflow-x: auto;
                overflow-y: hidden;
                white-space: nowrap;
                -webkit-overflow-scrolling: touch;
                display: -webkit-box;
            }

            .data-item {
                width: 300px;
                -wekit-box-flex: 1;
            }

            .data-item:not(:first-child) {
                margin-left: 20px;
            }

            .data-item:not(:last-child) {
                /*@include border();*/
            }

            .data-item:last-child {
                width: 1px;
            }

            .data-img {
                width: 100%;
                height: 300px;
                background-size: cover;
            }

            .data-name {
                font-size: 24px;
                padding: 17px 18px 20px;
                line-height: 36px;
                color: #393939;
                white-space: normal;
                text-align: center;
            }

            .oc {
                .data-name {
                    text-align: left;
                }

                .data-user-name {
                    font-size: 24px;
                    color: #888;
                    padding: 0 0 17px 20px;
                }
            }

            .jb .data-name{
                height: 115px;
                text-align: left;
            }

            .data-title {
                font-size: 20px;
                text-align: center;
                color: #fff;
                background: rgba(0, 0, 0, 0.6);
                width: 100px;
                line-height: 44px;
            }

            .data-price {
                text-align: center;
                font-size: 20px;
                color: #cc3f4f;
                padding-bottom: 22px;
            }
        }
    }
</style>