<style lang="stylus">
.topic-view
    .scrollable
        .item
            height: 72px
            line-height: 72px
            border-radius: 8px
</style>
<template  lang="pug">
.topic-view.bg.pdb-36
    section.bg-white
        .scrollable.mgl-32.bdb.pdv-24(v-if="topics.relate_categories && topics.relate_categories.length")
            .item.pdh-24.mgr.fz-26.bg(v-for="topic in topics.relate_categories", v-link="{name: 'tag', params: {id: topic.id}}") {{topic.name}}
        .flex.pdh-32.pdt-40(:class="{'pdb-32': !hasDesc}")
            .fz-34.bold.flex-1 {{topics.name}}
            .bdl.pdl-32.flex.red.fz-26(@click="gotoDownload")
                icon(name="plus")
                span 关注话题
        .fz-26.gray.user-txt.pd-32(v-if="hasDesc") {{{topics.desc | input}}}
    .hr
    template(v-for="item in items")
        component(:is="config.category[item.type]", keep-alive, :item="item")
        .hr
    deep-link(v-if="!items.hasMore") 打开美玉秀秀，查看更多话题内容
    empty(v-if='items.isEmpty', title='暂无内容')
</template>
<script>
import paging from 'paging'
import shareable from 'shareable'
import topic from 'component/item/Topic.vue'
import post from 'component/item/Post.vue'
import question from 'component/item/Question.vue'
export default {
    name: 'TopicView',
    mixins: [paging, shareable],
    components: {
        topic,
        post,
        question
    },
    data() {
        return {
            topics: {}
        }
    },
    route: {
        data({to}) {
            return this.$fetch(`dc/sns/categories/${to.params.id}`).then((topics) => {
                this.topics = topics
                this.action('updateTitle', {text: topics.name})
                this.setShareData({
                    title: topics.name,
                    desc: topics.desc
                })
            })
        },

        canReuse({from, to}) {
            return from.name !== to.name
        }
    },
    computed: {
        paging() {
            return {
                path: `dc/sns/categories/${this.$route.params.id}/posts`,
                list: 'entries',
                params: {
                    limit: 10
                }
            }
        },
        hasDesc() {
            return this.topics.desc && this.topics.desc.length
        }
    }
}
</script>