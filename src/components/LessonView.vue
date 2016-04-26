<template>
    <div class="lesson-view">
        <div class="course-video" @click="playCourse" v-bg="course.video" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/750/h/580/interlace/1"></div>
        <div class="course-user">
            <div class="head avatar-68" v-bg="course.user.photo" v-link="course.user | profile"></div>
            <div class="info">
                <div class="name font-26">{{course.user.name}}</div>
                <div class="title font-26">{{course.user.title}}</div>
            </div>
            <div class="like font-26" @click="likeUser">
                <span class="icon icon-like-solid"></span>
                <span class="count">{{course.like}}</span>
            </div>
        </div>
        <div class="tags">
            <div class="tag-list" v-if="course.tags && course.tags.length">
                <div class="tag-item font-26" :class="{'first-line' : $index < 3}" v-for="tag in course.tags">{{tag.title}}</div>
            </div>
            <a class="his-course font-30" v-link="{name: 'lecturer', params: {userId: course.user.id}}">他的课堂</a>
        </div>
        <div class="separator"></div>
        <comment type="60" :id="course.id || 0" has-input="true"></comment>
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
                    user: {},
                    column: {}
                },
                recommendGoods: []
            };
        },
        route: {
            data({to}) {
                const courseId = to.params.id;
                this.loadRecommendGoods(courseId);
                return this.$get(`cms/opencourse/${courseId}|v3`)
                        .then(course => {
                        this.course = course;
                        this.setShareData(course, true);
                });
            }
        },
        methods: {
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
                    portraitId: this.course.user.id
                });
            },
            loadRecommendGoods(courseId) {
                return this.$get(`dc/rd|v3`, {
                    obj_id: courseId,
                    biz_type: 'oc'
                }).then(data => {
                    this.recommendGoods = data.recommend_data;
                });
            },
            likeUser() {
                if (this.liking) {
                    return;
                }

                const url = `users/target/${this.course.user.id}/type/60/like`;
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
            }

            .icon {
                color: #c9c9c9;
            }

            .count {
                color: #c9c9c9;
                vertical-align: text-top;
            }
        }

        .tags {
            @include border(bottom, #d9d9d9);
            position: relative;
            min-height: 108px;

            .tag-list {
                width: -webkit-calc(100% - 246px);
            }

            .tag-item {
                @include border(all, #979797);
                    display: inline-block;
                    margin: 28px 0;
                    line-height: 60px;
                    padding: 0 26px;
                    border-radius: 26px;

                &:nth-child(3n+1) {
                     margin-left: 32px;
                 }

                &:not(:nth-child(3n+1)) {
                     margin-left: 20px;
                 }

                &:not(.first-line) {
                     margin-top: 0;
                 }
            }
        }

        .his-course {
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);

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
    }
</style>