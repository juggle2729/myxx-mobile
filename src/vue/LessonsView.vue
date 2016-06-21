<template>
    <div class="lesson-home">
        <div class="lesson-list" v-for="lesson in items" v-if="lesson.courses && lesson.courses.length > 0">
            <div class="title font-30">
                <span>{{lesson.title}}</span>
            </div>
            <div class="course-list">
                <div class="course-item" v-for="course in lesson.courses" v-link="{name: 'lesson', params: {id: course.id}}">
                    <div class="video-bg" v-bg="course.video" query="vframe/jpg/offset/5/rotate/auto|imageView2/0/w/318/h/246/interlace/1">
                        <div class="like font-22">
                            <span class="icon icon-like"></span>
                            <span class="count">{{course.like || 0}}</span>
                        </div>
                        <div class="comment font-22">
                            <span class="icon icon-comment-solid"></span>
                            <span class="count">{{course.comment || 0}}</span>
                        </div>
                    </div>
                    <div class="course-title font-26">{{course.title | truncate 11}}</div>
                    <div class="course-user font-26">{{course.user.name}}</div>
                </div>
            </div>
        </div>
        <partial name="load-more" v-if="items.hasMore"></partial>
    </div>
</template>
<script>
    import paging from 'paging';
    export default {
        name: 'LessonsView',
        mixins: [paging],
        computed: {
            paging() {
                return {
                    path: 'cms/opencourses/all',
                    list: 'columns',
                    params: {
                        limit: 20,
                        offset: 0
                    }
                }
            }
        },
        route: {
            data({to}) {
                return this.fetch();
            }
        }
    }
</script>
<style lang="sass">
    .lesson-home {
        position: relative;
        min-height: 100%;
        background-color: #efefef;
        padding-bottom: 20px;

        .lesson-list {
            .title {
                span {
                    margin: 20px 0;
                    display: inline-block;
                    background-color: #e23d3d;
                    line-height: 60px;
                    padding: 0 28px;
                    color: #fff;
                }
            }

            .course-item {
                width: 318px;
                background-color: #fff;
                display: inline-block;
                margin-left: 10px;

                &:last-child {
                     margin-right: 10px;
                 }
            }

            .video-bg {
                width: 318px;
                height: 318px;
                background-size: contain;
                background-color: #000;
                background-position: center;
                position: relative;
            }

            .course-title {
                padding: 22px 0 0 12px;
                color: #000;
                white-space: initial;
            }

            .course-user {
                padding: 10px 0 14px 12px;
                color: #666;
            }
        }

        .course-list {
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
        }

        .like {
            position: absolute;
            right: 72px;
            bottom: 12px;

            .icon {
                vertical-align: 3px;
            }
        }

        .comment {
            position: absolute;
            right: 16px;
            bottom: 12px;
        }

        .icon {
            color: #c9c9c9;
            height: 22px;
            padding-right: 0;
        }

        .count {
            color: #fff;
            height: 22px;
            line-height: 22px;
        }
    }
</style>
