<style lang="stylus">
.masters-view
    .photo
        height: 330px
        background-size: cover
        background-position: center
    footer
        height: 112px
        padding: 22px 0 18px 30px
        .title
            margin-bottom: 12px
    & > div:last-child .hr
        display: none
</style>
<template>
.masters-view
    div(v-for='master in items', v-link="{name: 'master', params: {id: master.entry.user_id}}")
        .photo(v-bg='master.entry.logo')
        footer.fz-30
            .title.gray {{master.entry.title}}
            div {{master.entry.sub_title}}
        .hr
</template>
<script>
import paging from 'paging'
export default {
    name: 'MastersView',
    mixins: [paging],
    computed: {
        paging() {
            return {
                path: 'cms/promotes',
                params: {
                    section: 'website'
                }
            }
        }
    }
}
</script>
