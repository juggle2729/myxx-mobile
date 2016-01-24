<style lang="sass">
    .master-special-view {
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

                .detail {
                    overflow: hidden;
                }
            }

            .cover {
                height: 576px;
                width: 100%;
            }
        }
    }
</style>
<template>
    <div class="master-special-view">
        <div class="separator-20"></div>
        <div class="simple-intro bg-white">
            <div class="block-title font-22 gray">
                <span class="line-yellow"></span>
                <span class="title">人物简介</span>
            </div>
            <div class="info border-top">
                <div class="name font-30">{{masterBaseData.name}}</div>
                <div class="desc font-26">{{masterBaseData.brief}}</div>
                <div class="titles font-26" v-if="resumes && resumes.length > 0">
                    <div class="title-item" v-for="resume in resumes" v-show="$index < titleLimit || isExpand" v-text="resumeContent($index)"></div>
                </div>
                <div class="expand font-22 gray center" @click="expandTitle" v-show="resumes && resumes.length > 3">
                    <span class="arrow" :class="[isExpand ? 'arrow-up' : '']"></span>
                    <span class="text">{{isExpand ? '收起' : '展开'}}</span>
                </div>
            </div>
        </div>
        <div class="separator-20" v-if="masterBaseData.interview_id"></div>
        <div class="interview bg-white" v-if="masterBaseData.interview_id">
            <div class="block-title font-22 gray">
                <span class="line-yellow"></span>
                <span class="title">大师专访</span>
            </div>
            <div ng-if="interview.img" class="cover img" v-bg.lg="interview.img"></div>
            <div class="info border-top">
                <div class="title font-30">{{interview.title}}</div>
                <div class="sub-title font-30">
                    专访{{masterBaseData.titles.length > 0 ? masterBaseData.titles[0].name: ''}}{{masterBaseData.name}}先生
                </div>
                <div class="publish-date font-26 gray" v-show="!!interview.date">{{interview.date}}</div>
                <div class="content">
                    <div class="detail">
                        <rich-text :medias="interview.content || ''"></rich-text>
                    </div>
                </div>
            </div>
        </div>
        <master-tab :master-info="masterBaseData" :current-tab="'special'"></master-tab>
    </div>
</template>
<script>
    import masterMixin from './mixin/Master.vue';
    import RichText from './RichTextView.vue';

    export default {
        name: 'MasterSpecialView',
        mixins: [masterMixin],
        components: { RichText },
        data() {
            return {
                titleLimit: 3,
                isExpand: false,
                interview: {},
                resumes: []
            };
        },
        activate(done) {
            this.checkShare();
            this.loadMasterOtherData().then(() => {
                done();
            });
        },
        methods: {
            resumeContent(index) {
                const curResume = this.resumes[index];
                if (!curResume) {
                    return '';
                }

                let dateStr = curResume.occur_at;
                const year = dateStr.substr(0, dateStr.indexOf('-'));

                return [year + '年 ', curResume.description].join('');
            },
            expandTitle() {
                this.isExpand = !this.isExpand;
            },
            loadMasterOtherData: function() {
                this.fetchMasterResumes();
                return this.fetchMasterInterviewInfo();
            },
            fetchMasterResumes: (function () {
                return function () {
                    return this.$get(`sites/${this.id}/resumes`, {}).then((data) => {
                        this.resumes = data.resumes;
                    });
                };
            })(),
            fetchMasterInterviewInfo: (function () {
                return function () {
                    return this.$get(`sites/${this.id}/articles/${this.masterBaseData.interview_id}`, {}).then((data) => {
                        this.interview = data;
                    });
                }
            })()
        }
    };
</script>
