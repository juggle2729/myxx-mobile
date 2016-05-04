<style lang="sass">
.tags-view {
   &::after {
       content: '';
       display: table;
       clear: both;
   }
   >div {
        padding: 0 16px;
        .title {
            height: 80px;
            line-height: 80px;
            clear: both;
            .line {
                width: 6px;
                height: 26px;
                margin-right: 12px;
            }
            .more {
                width: 120px;
                line-height: 50px;
                border-radius: 25px;
            }
        }
        .cell {
            float: left;
            &.space {
                margin-right: 14px;
            }
            .img {
                height: 352px;
                width: 352px;
                &.lesson {
                    height: 286px;
                    position: relative;
                    > div {
                         position: absolute;
                         right: 16px;
                         bottom: 12px;
                      }
                }
                .icon-like-solid {
                    vertical-align: 3px;
                }
            }
            .desc {
                height: 114px;
                width: 352px;
                padding: 20px 22px;
                p + p {
                    margin-top: 14px;
                }
                .omit {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .omit-2 {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    line-height: 37px;
                }
            }
        }
    }
}
</style>
<template>
<div class="tags-view">
    <div class="mall">
        <div class="title flex">
            <div class="line bg-red"></div>
            <div class="flex-1 font-30 red">{{mall.title}}</div>
            <div class="more font-26 border-all center" v-link="{ name: 'tag', params: { type: type, tag: tag, category: mall.biz_type }}">更多</div>
        </div>
        <div class="cell" v-for="(idx, item) in mall.items" :class="{'space': (idx % 2 === 0)}" v-link="{ name: 'jade', params: {id: item.id }}">
            <div class="img" v-bg.lg="item.first_picture"></div>
            <div class="desc font-30 center">
                <p class="omit">{{item.title}}</p>
                <p class="red">{{item.price | price}}</p>
            </div>
        </div>
    </div>
    <div class="lesson">
        <div class="title flex">
            <div class="line bg-red"></div>
            <div class="flex-1 font-30 red">{{lesson.title}}</div>
            <div class="more font-26 border-all center" v-link="{ name: 'tag', params: { type: type, tag: tag, category: lesson.biz_type }}">更多</div>
        </div>
        <div class="cell" v-for="(idx, item) in lesson.items" :class="{'space': (idx % 2 === 0)}" v-link="{ name: 'lesson', params: {id: item.id }}">
            <div class="img lesson" v-bg.lg="item.picture">
                <div class="white font-22">
                    <span class="icon icon-like-solid"></span>
                    <span class="margin-right">{{item.like || 0}}</span>
                    <span class="icon icon-comment-solid"></span>
                    <span>{{item.comment || 0}}</span>
                </div>
            </div>
            <div class="desc font-30">
                <p class="omit">{{item.title}}</p>
                <p class="gray">{{item.author.name}}</p>
            </div>
        </div>
    </div>
    <div class="evaluation">
        <div class="title flex">
            <div class="line bg-red"></div>
            <div class="flex-1 font-30 red">{{evaluation.title}}</div>
            <div class="more font-26 border-all center" v-link="{ name: 'tag', params: { type: type, tag: tag, category: evaluation.biz_type }}">更多</div>
        </div>
        <div class="cell" v-for="(idx, item) in evaluation.items" :class="{'space': (idx % 2 === 0)}" @click="goToEvaluation(item.id)">
            <div class="img" v-bg.lg="item.picture"></div>
            <div class="desc font-30">
                <p class="omit-2">{{item.description}}</p>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'LeadTagView',
    data() {
        return {
            mall: {},
            evaluation: {},
            lesson: {}
        }
    },
    route: {
        data({to}) {
            const tags = this.config.tags;
            [this.type, this.tag] = [to.params.type, to.params.tag];
            return this.$get('dc/tag/tops', { tag_name: this.type, tag_value: this.tag }).then((data) => {
                _.forEach(data.tops, (item) => {
                    (item.biz_type === tags.product.id) && (this.mall = item) && (this.mall.title = tags.product.name);
                    (item.biz_type === tags.lesson.id) && (this.lesson = item) && (this.lesson.title = tags.lesson.name);
                    (item.biz_type === tags.evaluation.id) && (this.evaluation = item) && (this.evaluation.title = tags.evaluation.name);
                });
            });
        }
    },
    methods: {
        goToEvaluation(id) {
            if(this.env.version >= '1.1') {
                this.action('evaluation', {id});
            } else {
                this.$router.go({name: 'evaluation', params: {id}});
            }
        }
    }
}
</script>
