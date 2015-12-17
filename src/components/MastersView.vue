<template>
    <div class="site bg-default">
        <template v-for="item in list">
            <div class="cell bg-white" v-link="{name: 'homepage', params: {id: item.id}}" :style="{ backgroundImage: 'url('+item.background_img+')'}">
                <div class="txt">
                    <p class="font-34 white">{{item.name}}</p>
                    <div>
                        <p class="font-26 white">{{item.title.name}}</p>
                        <p class="font-26 white">
                            <span style="margin-right:72px;">粉丝:{{item.fans_count}}</span>
                            <span>鉴宝数:{{item.jianbao_collection_count}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'SiteView',
        data() {
            return {
                list: [
                    {
                        id: 1,
                        name: '程克元',
                        background_img: '/static/images/artist/theme.jpg',
                        title: {
                            id: 1,
                            name: '中国工艺美术大师'
                        },
                        fans_count: '1367',
                        jianbao_collection_count: '24'
                    },
                    {
                        id: 2,
                        name: '李佐龙',
                        background_img: '/static/images/artist/theme.jpg',
                        title: {
                            id: 1,
                            name: '中国玉石雕刻大师'
                        },
                        fans_count: '1367',
                        jianbao_collection_count: '24'
                    },
                    {
                        id: 3,
                        name: '蒋天养',
                        background_img: '/static/images/artist/theme.jpg',
                        title: {
                            id: 1,
                            name: '中国著名程序员'
                        },
                        fans_count: '1367',
                        jianbao_collection_count: '24'
                    },
                    {
                        id: 4,
                        name: '真实姓名',
                        background_img: '/static/images/artist/theme.jpg',
                        title: {
                            id: 1,
                            name: '头衔'
                        },
                        fans_count: '粉丝数',
                        jianbao_collection_count: '鉴宝数'
                    }
                ]
            };
        },
        route: {}
    }
</script>
<style lang="sass">
    .site {
        padding: 20px;
        .cell {
            margin-bottom: 20px;
            width: 100%;
            height: 385px;
            border-radius: 8px;
            background-size: cover;
            display: flex;
            align-items: flex-end;
            padding-bottom: 28px;
            padding-left: 44px;
            padding-right: 22px;
            .txt {
                width: 100%;
                > div {
                    margin-top: 28px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
