<template>
    <div class="lecturer-view">
        <div class="course-list">
            <div class="course-item" v-for="course in items" :class="{'first-line': $index < 2}" v-link="{name: 'lesson', params: {id: course.id}}">
                <div class="video-bg" v-bg="course.video" query="vframe/jpg/offset/5/rotate/auto|imageView2/0/w/364/h/290/interlace/1">
                    <div class="like font-22">
                        <span class="icon icon-like"></span>
                        <span class="count">{{course.like}}</span>
                    </div>
                    <div class="comment font-22">
                        <span class="icon icon-comment"></span>
                        <span class="count">{{course.comment}}</span>
                    </div>
                </div>
                <div class="course-title font-26">{{course.title}}</div>
                <div class="course-user font-26">{{course.user.name}}</div>
            </div>
        </div>
        <partial name="load-more" v-if="items.hasMore"></partial>
    </div>
</template>
<script>
    import paging from 'paging';
    export default {
        name: 'LecturerView',
        mixins: [paging],
        computed: {
            paging() {
                return {
                    path: 'cms/opencourses',
                    list: 'courses',
                    params: {
                        limit: 20,
                        offset: 0,
                        user_id: this.$route.params.id
                    }
                }
            }
        },
        route: {
            data({to}) {
                this.loadPageTitle();
                return this.fetch();
            }
        },
        methods: {
            setTitle() {
                if(this.items.length > 0) {
                    this.updateTitle(this.items[0].user.name + '的公开课');
                } else {
                    setTimeout(this.setTitle, 100);
                }
            },
            loadPageTitle() {
                setTimeout(this.setTitle, 100);
            }
        }
    }
</script>
<style lang="sass">
    .lecturer-view {
        position: relative;
        min-height: 100%;
        background-color: #efefef;
        padding: 8px;

        .course-list {
            .course-item {
                background-color: #fff;
                display: inline-block;
                width: -webkit-calc(50% - 3px);

                &:not(.first-line) {
                    margin-top: 8px;
                 }

                &:nth-child(2n) {
                    margin-left: 6px;
                 }
            }

            .video-bg {
                width: 364px;
                height: 290px;
                background-size: contain;
                background-position: center;
                background-color: #000;
                position: relative;
            }

            .course-title {
                padding: 22px 0 0 12px;
                color: #000;
            }

            .course-user {
                padding: 10px 0 14px 12px;
                color: #666;
            }
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
