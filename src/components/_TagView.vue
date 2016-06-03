<style lang="sass">
.tag-detail {
    padding: 0 16px;
    .cell {
        width: 352px;
        margin-top: 12px;
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
            padding: 20px 22px 0;
            p+p {
                margin-top: 14px;
            }
            .omit {
                overflow-x: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .omit-2 {
                display: -webkit-box;
                overflow-x: hidden;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                line-height: 37px;
            }
        }
    }
}
</style>
<template>
    <div class="tag-detail" v-if="!$loadingRouteData">
        <div class="cell" v-for="(index, item) in items" :class="{'space': (index % 2 === 0)}" v-if="category === 'pd'" v-link="{ name: 'jade', params: {id: item.id }}" >
            <div class="img" v-bg.lg="item.first_picture"></div>
            <div class="desc font-30 center">
                <p class="omit">{{item.title}}</p>
                <p class="red">{{item.price | price}}</p>
            </div>
        </div>
        <div class="cell" v-for="(index, item) in items" :class="{'space': (index % 2 === 0)}" v-if="category === 'oc'" v-link="{ name: 'lesson', params: {id: item.id }}" >
            <div class="img lesson" v-bg.lg="item.video" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/600/h/440/interlace/1">
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
        <div class="cell" v-for="(index, item) in items" :class="{'space': (index % 2 === 0)}" v-if="category === 'jb'" v-link="{name: 'evaluation', params: {id: item.id}}">
            <div class="img" v-bg.lg="item.picture"></div>
            <div class="desc font-30">
                <p class="omit-2">{{item.description}}</p>
            </div>
        </div>
        <partial name="load-more" v-if="items.hasMore"></partial>
    </div>
</template>
<script>
import paging from 'paging';
export default {
    name: 'TagView',
    mixins: [paging],
    computed: {
        paging() {
            return {
                path: 'dc/tag',
                list: 'items',
                params: {
                    tag_name: this.type,
                    tag_value: this.tag,
                    biz_type: this.category,
                    limit: 10
                }
            }
        }
    },
    route: {
        data({to}) {
            [this.type, this.tag, this.category] = [to.params.type, to.params.tag, to.params.category];
            const tags = this.config.tags;
            const category = (this.category === tags.product.id ? tags.product.name : (this.category === tags.lesson.id ? tags.lesson.name : tags.evaluation.name));
            this.updateTitle(decodeURIComponent(to.params.name) + '-' + category);
            return this.fetch();
        }
    }
}
</script>