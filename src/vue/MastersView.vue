<style lang="sass">
.masters-view {
    .photo {
        height: 330px;
        background-size: cover;
        background-position: center;
    }
    footer {
        height: 112px;
        padding: 22px 0 18px 30px;
        .title {
            margin-bottom: 16px;
        }
    }
    & > div:last-child .separator {
        display: none;
    }
}
</style>
<template>
<div class="masters-view">
    <div v-for="master in items" v-link="{name: 'master', params: {id: master.id}}">
        <div class="photo" v-bg="master.photo"></div>
        <footer class="font-30">
            <div class="title gray">{{master.title}}</div>
            <div>{{master.name}}</div>
        </footer>
        <div class="separator"></div>
    </div>
</div>
</template>
<script>
import paging from 'paging';
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
