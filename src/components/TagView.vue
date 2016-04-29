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
            }
        }
        .desc {
            height: 114px;
            padding: 20px 22px 0;
            p+p {
                margin-top: 14px;
            }
            .omit {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .omit-2 {
                display: -webkit-box;
                overflow: hidden;
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
    <div class="tag-detail">
        <div class="cell" v-for="(index, item) in items" :class="{'space': (index % 2 === 0)}" v-if="category === 'pd'" v-link="{ name: 'jade', params: {id: item.id }}" >
            <div class="img" v-bg.lg="item.first_picture"></div>
            <div class="desc font-30 center">
                <p class="omit">{{item.title}}</p>
                <p class="red">{{item.price | price}}</p>
            </div>
        </div>
        <div class="cell" v-for="(index, item) in items" :class="{'space': (index % 2 === 0)}" v-if="category === 'oc'" v-link="{ name: 'lesson', params: {id: item.id }}" >
            <div class="img lesson" v-bg.lg="item.picture"></div>
            <div class="desc font-30 center">
                <p class="omit">{{item.title}}</p>
                <p class="gray">{{item.author.name}}</p>
            </div>
        </div>
        <div class="cell" v-for="(index, item) in items" :class="{'space': (index % 2 === 0)}" v-if="category === 'jb'" @click="goToEvaluation(item.id)">
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
            this.loadPageTitle();
            [this.type, this.tag, this.category] = [to.params.type, to.params.tag, to.params.category];
            return this.fetch();
        }
    },
    methods: {
        goToEvaluation(id) {
            if(this.env.version >= '1.1') {
                this.action('evaluation', {id});
            } else {
                this.$router.go({name: 'evaluation', params: {id}});
            }
        },
        setTitle() {
            const tags = this.config.tags;
            const category = (this.category === tags.product.id ? tags.product.name : (this.category === tags.lesson.id ? tags.lesson.name : tags.evaluation.name));
            document.title = '标签-' + category;
        },
        loadPageTitle() {
            setTimeout(this.setTitle, 100);
        }
    }
}
</script>