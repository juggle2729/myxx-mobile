<style lang="sass">
    .works-view {
        padding-bottom: 98px;
        .content {

            .font-center {
                text-align: center;
            }
            .title, .studio, .description{
                margin-top: 44px;
            }
            .description {
                padding: 0 32px;
                line-height: 1.5;
            }
            .sub-title {
                width: 686px;
                margin: 48px auto 40px;
                height: 26px;
                span {
                    vertical-align: text-top;
                }
                .line {
                    display: inline-block;
                    margin-top: 14px;
                    width: 268px;
                    height: 1px;
                    border: 0;
                    background: #d9d9d9;
                }
            }
            .video {
                height: 686px;
                margin: 0 32px;
            }
            .pictures {
                margin: 10px 27px 42px;
                .picture {
                    display: inline-block;
                    background-size: cover;
                    border: 5px solid white;
                }
                .picture:first-child:nth-last-child(1) {
                    width: 100%;
                    padding-top: 100%;
                }
                .picture:first-child:nth-last-child(2),
                .picture:first-child:nth-last-child(2) ~ .picture,
                .picture:first-child:nth-last-child(4),
                .picture:first-child:nth-last-child(4) ~ .picture {
                    width: 50%;
                    padding-top: 50%;
                }
                .picture:first-child:nth-last-child(3),
                .picture:first-child:nth-last-child(3) ~ .picture,
                .picture:first-child:nth-last-child(5),
                .picture:first-child:nth-last-child(5) ~ .picture,
                .picture:first-child:nth-last-child(6),
                .picture:first-child:nth-last-child(6) ~ .picture {
                    width: 33.3333%;
                    padding-top: 33.3333%;
                }

                .picture:first-child:nth-last-child(5),
                .picture:first-child:nth-last-child(5) ~ .picture {
                    &:first-child, &:nth-child(2) {
                        width: 50%;
                        padding-top: 50%;
                    }
                }
            }
            .photo {
                margin: 48px auto;
                padding: 18px;
                width: 310px;
                height: 310px;
                background-origin: content-box;
                background-size: 100% 100%;
                box-shadow: 0px 0px 40px 5px #eee;
            }
            .author-name {
                margin-bottom: 56px;
                text-align: center;
            }
            .author-desc {
                padding: 0 48px;
                margin-bottom: 100px;
            }
        }
        .float-box {
            position: fixed;
            bottom: 0;
            height: 98px;
            width: 100%;
            border-top: 1px solid #efefef;
            .comment, .vote, .all-works{
                -webkit-box-pack: center;
                text-align: center;
                height: 100%;
                width: 33%;
            }

            .comment span:nth-child(2) {
                position: relative;
                bottom: 6px;
            }
            .all-works span:nth-child(2) {
                position: relative;
                top: 5px;
            }

        }
    }
</style>
<template>
  <div class="works-view">
      <div class="content">
          <p class="title font-36 font-center">《{{works.title}}》</p>
          <p class="studio font-26 gray font-center">{{works.studio}}</p>
          <article class="description font-26 gray">
            {{works.desc}}
          </article>
          <div class="sub-title">
              <span class="line"></span>
              <span class="font-26">作品展示</span>
              <span class="line"></span>
          </div>
          <div class="video" @click.stop="play(works.video)" v-bg="works.video" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/600/h/600/interlace/1"></div>
          <div  class="pictures">
              <div v-for="pic in works.pictures" v-bg="pic" class="picture" @click="coverflow(works.pictures, $index)"></div>
          </div>
          <div class="sub-title">
              <span class="line"></span>
              <span class="font-26">作者介绍</span>
              <span class="line"></span>
          </div>
          <div class="photo" v-bg="works.author.portrait"></div>
          <p class="author-name font-30 gray">
              {{works.author.name}}
          </p>
          <p class="author-desc font-26 gray">
              {{works.author.desc}}
          </p>
      </div>
      <div class="separator-16"></div>
      <comments type="80" :id="works.id" :display-input="false" :enable-like="false" v-ref:comment></comments>
      <div class="float-box bg-white flex font-30">
          <div class="comment gray flex" @click="$refs.comment.comment()">
              <span class="icon-comment-solid font-44"></span>
              <span>评论</span>
          </div>
          <div v-if="!works.has_voted" class="vote bg-red white flex" v-on:click="vote()">
              <span>给他投票</span>
          </div>
          <div v-else class="vote bg-gray gray flex">
              <span>{{works.vote_count}}票</span>
          </div>
          <div class="all-works red flex">
              <a href="http://activity.meiyuxiuxiu.net/works/sg/">所有作品</a>
              <span class="icon-enter"></span>
          </div>
      </div>
  </div>
</template>

<script>
import Comments from './component/Comments.vue';
import shareable from 'shareable';
import emitter from '../util/emitter';
export default {
    name: 'WorksView',
    mixins: [shareable],
    components: {
        Comments
    },
    data() {
        return {
            works: {
                id: 0,
                author: {},
                pictures: [],
                has_voted: false
            }
        };
    },
    methods: {
        vote() {
            if (this.works.id) {
                this.$post(`activities/20160629/carvings/${this.works.id}/vote`).then(() => {
                    this.works.has_voted = true;
                    this.action('toast', {success: 1, text: '投票成功'});
                }).catch((e) => {
                    this.action('toast', {success: 0, text: e});
                });
            }
        }
    },
    ready() {
        // 浏览统计
        const postData = {
            code: 'popularWorks_sg',
            event: 'browser'
        };
        if (this.$route.query.timestamp) {
            postData.extra = this.$route.query.timestamp;
        }
        this.$http.post('log/activity/events', postData);

        // 监听
        emitter.on('checkShare', (response) => {
            const timestamp = this.$root.shareData.timestamp;
            this.$http.post('log/activity/events', {
                code: 'popularWorks_sg',
                event: 'share',
                extra: timestamp
            });
        })

    },
    route: {
        data({to}) {
            return this.$get(`activities/20160629/carvings/${to.params.id}`).then((works) => {
                this.works = works;
                this.setShareData(works, true);
            });
        }
    }
}
</script>
