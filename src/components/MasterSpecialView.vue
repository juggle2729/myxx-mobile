<style lang="sass">
    .master-special-view {
        .block-title {
            line-height: 80px;
            padding-left: 32px;
        }

        .info {
            padding: 22px 32px 32px;
        }

        .name {
            line-height: 30px;
        }

        .desc {
            margin-top: 18px;
            line-height: 38px;
        }

        .titles {
            margin-top: 32px;
            padding-left: 33px;
            position: relative;

            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                height: 100%;
                width: 1px;
                background: #888888;
             }
        }

        .title-item:not(:first-child) {
            margin-top: 20px;
        }

        .expand {
            margin-top: 32px;
            .text {
                margin-left: 12px;
            }
        }

        .interview {
            padding-bottom: 100px;
            .title, .sub-title {
                text-align: center;
            }

            .sub-title {
                margin-top: 12px;
                &:before {
                    content: '';
                    width: 50px;
                    height: 1px;
                    border-top: 1px solid #393939;
                    display: inline-block;
                    padding-bottom: 10px;
                 }
            }

            .publish-date {
                margin-top: 18px;
            }

            .content {
                margin-top: 22px;
                .title {
                    text-align: center;
                    width: 140px;
                    line-height: 44px;
                }

                .abstract {
                    margin-top: 6px;
                    line-height: 38px;
                    padding: 16px 0;
                }

                .detail {
                    padding-top: 32px;
                }

                .media-text {
                    text-indent: 15px;
                    line-height: 40px;
                }

                .media-inner-img, .media-inner-video {
                    height: 576px;
                }

                .media-item:not(:first-child) {
                    margin-top: 32px;
                }
    }
        }
    }
</style>
<template>
    <div class="master-special-view">
        <div class="separator-20"></div>
        <div class="simple-intro">
            <div class="block-title font-22 gray">
                <span class="line-yellow"></span>
                <span class="title">人物简介</span>
            </div>
            <div class="info border-top">
                <div class="name font-30">{{masterBaseData.name}}</div>
                <div class="desc font-26">{{masterBaseData.brief}}</div>
                <div class="titles font-26" v-if="masterBaseData && masterBaseData.titles">
                    <div class="title-item" v-for="title in masterBaseData.titles" v-show="$index < titleLimit || isExpand">{{title.name}}</div>
                </div>
                <div class="expand font-22 gray center" @click="expandTitle" v-show="masterBaseData && masterBaseData.titles && masterBaseData.titles.length > 3">
                    <span class="arrow" :class="[isExpand ? 'arrow-up' : '']"></span>
                    <span class="text">{{isExpand ? '收起' : '展开'}}</span>
                </div>
            </div>
        </div>
        <div class="separator-20" v-if="masterBaseData.interview_id"></div>
        <div class="interview" v-if="masterBaseData.interview_id">
            <div class="block-title font-22 gray">
                <span class="line-yellow"></span>
                <span class="title">大师专访</span>
            </div>
            <div class="info border-top">
                <div class="title font-30">{{interview.title}}</div>
                <div class="sub-title font-30">
                    专访{{masterBaseData.titles.length > 0 ? masterBaseData.titles[0].name: ''}}{{masterBaseData.name}}先生
                </div>
                <div class="publish-date font-26 gray" v-show="!!interview.date">{{interview.date}}</div>
                <div class="content">
                    <div class="title font-26 white bg-gray">文章导读</div>
                    <div class="abstract border-vertical font-26 light">{{{interview.abstract}}}</div>
                    <div class="detail font-30 gray">
                        <template v-for="media in interview.medias">
                            <div class="media-item media-text" v-if="media.media_type === 'text'">{{{media.media_content}}}</div>
                            <div class="media-item media-inner-img" v-if="media.media_type === 'inner_img'" v-bg.lg="media.media_content"></div>
                            <div class="media-item media-outer-img" v-if="media.media_type === 'outer_img'" v-bg.lg="media.media_content">
                                <img src="{{media.media_content}}"/>
                            </div>
                            <div class="media-item media-inner-video" v-if="media.media_type === 'inner_video'" v-bg.video="media.media_content"></div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <master-tab :master-info="masterBaseData" :current-tab="'master-special'"></master-tab>
    </div>
</template>
<script>
    import masterMixin from '../mixins/MasterMixin.vue';
    export default {
        name: 'MasterSpecialView',
        mixins: [masterMixin],
        data() {
            return {
                titleLimit: 3,
                isExpand: false,
                interview: {}
            };
        },
        methods: {
            expandTitle() {
                this.isExpand = !this.isExpand;
            },
            loadMasterOtherData: function() {
                this.fetchMasterInterviewInfo();
            },
            fetchMasterInterviewInfo: (function () {
                return function () {
                    this.$get(`sites/${this.id}/articles/${this.masterBaseData.interview_id}`, {}).then((data) => {
                        this.interview = data;
                    });
                }
            })()
        }
    };
</script>
