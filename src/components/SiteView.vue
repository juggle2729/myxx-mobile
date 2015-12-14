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
<template>
    <div class="site bg-default">
        <template v-for="item in list">
            <div class="cell bg-white" :style="{ backgroundImage: 'url('+item.background_img+')'}">
                <div class="txt">
                    <p class="font-34 white">{{item.name}}</p>
                    <div>
                        <p class="font-26 white">{{item.brief}}</p>
                        <p class="font-26 white">
                            <span style="margin-right:72px;">粉丝:{{item.fans}}</span>
                            <span>鉴宝数:{{item.jades}}</span>
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
                        name: '程克元',
                        background_img: '/static/images/artist/theme.jpg',
                        brief: '中国工艺美术大师',
                        fans: '1367',
                        jades: '24'
                    },
                    {
                        name: '李佐龙',
                        background_img: '/static/images/artist/theme.jpg',
                        brief: '中国玉石雕刻大师',
                        fans: '1367',
                        jades: '24'
                    },
                    {
                        name: '蒋天养',
                        background_img: '/static/images/artist/theme.jpg',
                        brief: '中国著名程序员',
                        fans: '1367',
                        jades: '24'
                    },
                    {
                        name: '真实姓名',
                        background_img: '/static/images/artist/theme.jpg',
                        brief: '这个字段是简介',
                        fans: '粉丝数',
                        jades: '鉴宝数'
                    }
                ]
            };
        },
        route: {}
    }
</script>
