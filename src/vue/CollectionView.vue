<style lang="stylus">
    .collection-view
        .upside
            .blur
                position:absolute;
                height: 282px
                width:100%;
                z-index: -1
                overflow: hidden
                filter: blur(20px)
                background-size: cover
                background-position: center
            .blur-fix
                position: absolute
                width: 100%
                z-index: 1
                padding-top: 282px
                background-color: rgba(0, 0, 0, 0.3)
                border-bottom: 100px solid white
                & + div
                    position: relative
                    z-index: 999
            .logo
                height: 200px
                width: 200px
            .icon-enter
                width: .5em
            .transparent
                color: rgba(255,255,255,0.7)
        .info
            height: 100px
            position: relative
            z-index: 999
            padding-top: 10px
            .follow
                height: 56px
                line-height: 56px
</style>
<template lang="pug">
    .collection-view
        .upside
            .blur.bd(:style="{backgroundImage: 'url(' + config.img + cc.media + ')'}")
            .blur-fix
            .pdh-32.flex.pdv-40.white
                .logo(v-bg="cc.media")
                .mgl-28
                    .fz-34.mgb-36.bold {{cc.name}}
                    .flex.fz-30.transparent
                        avatar(:user="cc.user")
                        .mgl {{cc.user.nickname}}
                        icon.mgl-16(name="enter")
        .info.flex.pdh-32.fz-26
            .gray.pdr.bdr 内容 2
            .gray.pdl.flex-1 关注 13
            .pdl-32.bdl.red.follow(@click="gotoDownload")
                icon(name="plus")
                span 关注专辑
        .hr
        template(v-for="item in cc.entries")
            component(:is="config.category[item.type]", keep-alive, :item="item.entry")
            .hr
</template>
<script>
import topic from 'component/item/Topic.vue'
import post from 'component/item/Post.vue'
import question from 'component/item/Question.vue'
import answer from 'component/item/Answer.vue'
export default {
    name: 'CollectionView',
    components: {
        topic,
        post,
        question,
        answer
    },
    data() {
        return {
            cc: {
                name: '直击第一现场',
                media: '2fd3d138-c3db-4863-819c-2c9abb71eb97',
                user: {
                    nickname: '飘飘然',
                    id: 1099,
                    is_followed: true,
                    photo: '80ac1723-27af-45cb-8c16-68983d8ad5a7',
                    role: 'engraver',
                    title: '中国珠宝玉石首饰协会',
                    vip_flag: true
                },
                entries: [
                    {
                        type: 6,
                        entry: {
                            activity: null,
                            comment_count: 0,
                            content: '发图片帖子',
                            cover: 'dfa8048e-e977-49da-8e87-a977a6f87d65',
                            cover_type: 'picture',
                            id: 1738,
                            like_count: 9,
                            liked: false,
                            medias: [
                                {
                                    media_type: 'picture',
                                    media: 'dfa8048e-e977-49da-8e87-a977a6f87d65'
                                }, {
                                    media_type: 'picture',
                                    media: 'dc7bd0cd-57c7-46d6-a8c6-5c488ce0047f'
                                }, {
                                    media_type: 'picture',
                                    media: '01fab043-fb1b-4878-b444-baa2dcc6100b'
                                }
                            ],
                            user: {
                                nickname: 'child1',
                                id: 1099,
                                is_followed: true,
                                photo: '80ac1723-27af-45cb-8c16-68983d8ad5a7',
                                role: 'engraver',
                                title: '中国珠宝玉石首饰协会',
                                vip_flag: true
                            }
                        }
                    }, {
                        type: 10,
                        entry: {
                            comment_count: 4,
                            cover: '467756eb-9c06-4f22-b443-a14f54876bf9',
                            description: '佛祖开始',
                            id: 230,
                            like_count: 7,
                            liked: false,
                            media_num: 4,
                            post_id: 3206,
                            title: '开始',
                            user: {
                                nickname: 'child2',
                                id: 1099,
                                is_followed: true,
                                photo: '80ac1723-27af-45cb-8c16-68983d8ad5a7',
                                role: 'engraver',
                                title: '中国珠宝玉石首饰协会',
                                vip_flag: true
                            }
                        }
                    }, {
                        type: 3,
                        entry: {
                            comment_count: 10,
                            description: '你啊民族搜狗鸡排今明你明明急急急嗯考虑前几次被你你几级本就是外婆回来的',
                            id: 1201,
                            identifiable: true,
                            picture: 'a9be351f-23c2-42c6-af50-687130953098',
                            pictures: ["a9be351f-23c2-42c6-af50-687130953098", "6c6f2357-34aa-4e31-b28a-2928cb98cdfd"],
                            post_id: 3210,
                            results: [],
                            status: 0,
                            user: {
                                nickname: 'child3',
                                id: 1099,
                                is_followed: true,
                                photo: '80ac1723-27af-45cb-8c16-68983d8ad5a7',
                                role: 'engraver',
                                title: '中国珠宝玉石首饰协会',
                                vip_flag: true
                            }
                        }
                    }, {
                        type: 11,
                        entry: {
                            comment_count: 2,
                            id: 1136,
                            identifier: {
                                id: 1297,
                                is_followed: false,
                                vip_flag: true,
                                nickname: 'xxx',
                                role: 'engraver',
                                title: '玉雕大师',
                                photo: 'bd68b139-9b39-4eb0-b3b9-4dfee87b3475'
                            },
                            jianbao: {
                                id: 1176,
                                description: '哈哈哈哈哈哈',
                                pictures: ['40fb3191-0ce4-4ebd-bcdc-e7edad024cb6', '1efb7f7d-ac2f-44ae-9371-52f8c3fd7dde',
                                '9d0127bf-a699-4cf2-ab8c-3fb0f0c5dc22', '2e1dfd62-47ff-4e4d-9822-88120a5406a6'],
                                post_id: 3068,
                                like_count: 3,
                                liked: false,
                                video: '14c660d9-d00c-4bf1-ac62-83e81568ed69',
                                result: null,
                                user: {
                                    nickname: 'child4',
                                    id: 1099,
                                    is_followed: true,
                                    photo: '80ac1723-27af-45cb-8c16-68983d8ad5a7',
                                    role: 'engraver',
                                    title: '中国珠宝玉石首饰协会',
                                    vip_flag: true
                                }
                            }
                        }
                    }
                ]
            }
        }
    }
}
</script>