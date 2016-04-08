<template>
<div class="masters-view bg-default">
    <template v-for="site in items">
        <div class="cell bg-white" v-link="{name: 'master', params: {id: site.id}}">
            <div class="head img" v-bg="site.user_info.portrait"></div>
            <div class="info">
                <div v-if="site.user_info.interview_video" class="video-icon img"></div>
                <div class="font-30 name">{{site.user_info.nickname}}</div>
                <div class="font-26 title gray" v-html="site.user_info.title.length > 0 ? site.user_info.title[0].name : '&nbsp;'"></div>
            </div>
        </div>
    </template>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import PagingMixin from './mixin/Paging.vue';
export default {
    name: 'MastersView',
    mixins: [PagingMixin],
    computed: {
        paging() {
            return {
                path: 'cms/discoveries?section=biography',
                list: 'promotes'
            }
        }
    },
    route: {
        data() {
            return this.fetch();
        }
    }
}
</script>
<style lang="sass">
    @import '../styles/partials/_var.scss';
    @import '../styles/partials/_mixin.scss';

    .masters-view {
        padding: 16px;
        .cell {
            @include border();
            text-align: center;
            display: inline-block;
            width: -webkit-calc(50% - 8px);

            .head {
                width: 100%;
                padding-top: 100%;
            }

            .info {
                position: relative;
                &:hover {
                    background-color: #d9d9d9;
                }
            }

            .video-icon {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);

                background-image: url('#{$qn}/artist/video_icon.png');
                width: 250px;
                height: 72px;
            }

            &:nth-child(even) {
                margin-left: 16px;
             }

             &:nth-child(odd):not(:first-child) {
                  margin-top: 16px;
              }

            .name {
                padding-top: 28px;
            }

            .title {
                margin-top: 20px;
                padding-bottom: 20px;
            }
        }
    }
</style>
