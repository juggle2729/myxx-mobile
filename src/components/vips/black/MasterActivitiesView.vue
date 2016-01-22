<style lang="sass" scoped>
    @import '../../../styles/partials/_var.scss';
    .master-vip-black-activities {
        width: 100%;
        position: relative;
        background-color: #030102;
        overflow: hidden;

        .cover {
            position: absolute;
            top: 0;
            left: 0;
            height: 573px;
            width: 750px;
            z-index: 77;
            background-image: url('#{$qn}/artist/activity_head.png');
        }

        .dynamic-list {
            margin-top: 613px;
            padding: 0 24px;
        }

        .dynamic-item:not(:first-child) {
            margin-top: 22px;
        }

        .dynamic-item {
            border-radius: 10px;
            padding-top: 25px;

            .person {
                padding-left: 20px;
                display: -webkit-box;
            }

            .name-time {
                margin-left: 20px;
                margin-top: -6px;
            }

            .time {
                margin-top: 12px;
            }

            .description {
                margin: 24px 20px;
                line-height: 42px;
            }

            .social-bar {
                border-radius: 8px;
            }

            .eval {
                height: 548px;
                background-size: cover;
                background-position: center;
                position: relative;
                .result {
                    padding: 12px 0 9px 19px;
                    width: 240px;
                    height: 45px;
                    position: relative;
                    border-radius: 25px;
                    left: 25px;
                    top: 25px;
                    background-color: rgba(80, 80, 80, .5);
                }
                .svg {
                    position: absolute;
                    right: 20px;
                    top: 25px;
                    width: 62px;
                    height: 40px;
                    border-radius: 25px;
                    background-color: rgba(80, 80, 80, .5);
                > img {
                      width: 28px;
                  }
                }
            }
        }

        .medias {
            .media {
                vertical-align: top;
                display: inline-block;
                width: percentage(1/3);
                padding-top: percentage(1/3);
                border: thick solid white;
                background-size: cover;
                background-position: center;
            }

            .media:first-child:nth-last-child(4) ~ .media:nth-of-type(2) {
                margin-right: percentage(1/3);
            }

            .unique {
                width: 100%;
                padding-top: 60%;
                background-size: cover;
            }
        }
    }
</style>
<template>
    <div class="master-vip-black-activities">
        <div class="cover img"></div>
        <div class="dynamic-list">
            <div class="dynamic-item bg-white" v-for="dynamic in items"
                 v-link="{name: dynamic.event_type === 'jianbao_add' ? 'evaluation' : (dynamic.event_type === 'topic_add' ? 'story' : ''), params: {id: dynamic.event.post_id}}">
                <div class="person">
                    <div class="photo avatar-50" v-bg.sm="dynamic.event.user.photo"></div>
                    <div class="name-time">
                        <div class="font-26">{{dynamic.event.user.name}}</div>
                        <div class="time font-22 light">{{dynamic.event.create_at | moment}}</div>
                    </div>
                </div>
                <div class="description font-30">{{(dynamic.event.description || dynamic.event.content) | truncate 62}}</div>
                <div v-if="dynamic.event_type === 'jianbao_add'">
                    <!-- <div class="media video" @click.stop="play(dynamic.event.video)" v-bg.lg="dynamic.event.picture"></div> -->
                    <div class="eval" v-bg.lg="dynamic.event.picture">
                        <div class="result white font-22" v-if="dynamic.event.results.length">
                            <i class="icon-eval"></i><span class="">已有{{dynamic.event.results.length}}位大师鉴定</span>
                        </div>
                        <div class="svg flex">
                            <img :src="'placeholder/video.svg' | qn" class="flex center-horizontal">
                        </div>
                    </div>
                </div>

                <div v-if="dynamic.event_type === 'topic_add'">
                    <div class="medias">
                        <div class="unique" v-if="dynamic.event.media.length === 1" @click.stop="coverflow(dynamic.event.media, 0)" v-bg.lg="dynamic.event.media[0].id"></div>
                        <template v-else="dynamic.event.media.length !== 1">
                            <template v-for="media in dynamic.event.media">
                                <div class="media picture" @click.stop="coverflow(dynamic.event.media, $index)" v-if="media.type==='picture'" v-bg.md="media.id"></div>
                                <div class="media play" @click.stop="play(media.id)" v-if="media.type==='video'" v-bg.video="media.id"></div>
                            </template>
                        </template>
                    </div>
                </div>
                <social-bar :id="dynamic.event.post_id" :type="likeType(dynamic.event_type)" :active="dynamic.event.liked"
                            :total="dynamic.event.like" :list="dynamic.event.likes" class="border-top social bg-white">
                    <div class="border-left gray extra-action center" v-link="{name: 'evaluation', params: {id: dynamic.event.post_id}}">
                        <i class="icon-comment"></i><span>{{dynamic.event.comment}}</span>
                    </div>
                </social-bar>
            </div>
        </div>
        <right-menu :show="showMenu" :id="id" :fixed="true"></right-menu>
        <div class="no-more light font-22 center" v-if="!items.hasMore">没有更多了</div>
        <partial name="load-more" v-if="items.hasMore"></partial>
    </div>
</template>
<script>
    import MasterMixin from '../../mixin/Master.vue';
    import PagingMixin from '../../mixin/Paging.vue';
    import RightMenu from './RightMenu.vue';
    import SocialBar from '../../SocialBar.vue';

    export default{
        name: 'MasterActivitiesView',
        components: { RightMenu, SocialBar },
        mixins: [ MasterMixin, PagingMixin ],
        data(){
            return {
                masterBaseData: this.data,
                showMenu: false
            };
        },
        activate(done) {
            this.checkShare();
            this.fetch().then(() => {
                done();
            });
        },
        computed: {
            paging() {
                return {
                    path: `sites/${this.id}/timeline`,
                    list: 'events'
                }
            }
        },
        methods: {
            likeType(eventType) {
                if (eventType === 'jianbao_add') {
                    return 10;
                } else if (eventType === 'topic_add') {
                    return 30;
                } else {
                    return 40;
                }
            }
        }
    }
</script>
