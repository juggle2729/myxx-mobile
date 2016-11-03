<style lang="stylus">
.user-collection
    min-height: inherit
    .header
        height: 90px
        line-height: 90px
        span
            border-left: 6px solid #cc3f4f
    .item .img, img
        height: 148px
        width: 148px
</style>
<template lang="jade">
.user-collection.bg-white
    .hr
    .header.fz-26.gray.pdl
        span.pdl-12 创建的专辑
    .item.mgl.pdb.flex(:class="{'bdb': ccs.length > 0}", v-link="{name: 'collection-self', params: {uid: $route.params.id}}")
        img.mgr(:src="'user/collection.jpg' | qn")
        .info.fz-26
            .fz-34 {{user}}赞过的内容
            .gray.mgt-16 {{user}}
    .item.mgl.pdb.flex.pdv(v-for="cc in ccs", :class="{'bdb': $index<(ccs.length-1)}", v-link="{name: 'collection', params: {id: cc.id}}")
        .img.mgr(v-bg="cc.cover")
        .info.fz-26
            .fz-34 {{cc.name}}
            .gray.mgt-16.mgb-24 {{cc.author.nickname}}
            .gray(v-if="cc.followed_count > 0") 关注 {{cc.followed_count}}

    template(v-if="items.length")
        .hr
        .header.fz-26.gray.pdl
            span.pdl-12 关注的专辑
        .item.mgl.pdb.flex(v-for="item in items", :class="{'bdb': $index<(items.length-1), 'pdv': $index > 0}", v-link="{name: 'collection', params: {id: item.id}}")
            .img.mgr(v-bg="item.entry.cover")
            .info.fz-26
                .fz-34 {{item.entry.name}}
                .gray.mgt-16.mgb-24 {{item.entry.author.nickname}}
                .gray 关注 {{item.entry.followed_count}}
    .hr
</template>
<script>
import paging from 'paging'
import List from 'component/List.vue'
export default {
    name: 'user-collection',
    mixins: [paging],
    data() {
        return {
            ccs: [],
            user: ''
        }
    },
    computed: {
        paging() {
            return {
                path: `users/${this.$route.params.id}/follow_list`,
                list: 'entries',
                params: {
                    target_type: 'cl',
                    limit: 10
                }
            }
        }
    },
    activate(done) {
        return this.$fetch(`sns/users/${this.$route.params.id}/collections`).then((data) => {
                this.ccs = data.collections
                this.user = _.get(this, 'ccs.0.author.nickname', this.$parent.user.nickname)
            }).then(done)
    }
}
</script>
