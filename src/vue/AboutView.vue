<style lang="sass">
.about-view {
    .imgs {
        padding-top: 162px;
        padding-bottom: 113px;
        > img {
            width: 178px;
            height: 178px;
        }
        .default {
            margin-top: 36px;
        }
        .gray {
            margin-top: 20px;
        }
    }
    .text {
        padding: 0 92px;
        > p {
            margin-top: 36px;
            line-height: 56px;
        }
    }
}
</style>
<template lang="jade">
.about-view
    .imgs.center
        img(:src="'profile/about.png' | qn", v-link="!isProd ? {name: 'api'} : ''")
        p.font-34.default 美玉秀秀
        p.font-22.gray v{{version}}
        .text
            p.font-30 美玉秀秀是国内最大的和田玉爱好者平台，高品质和田玉资源集合地。
            p.font-30 美玉秀秀移动端是为全国各地的和田玉爱好者、藏家、商家、相关领域的大师以及权威人士提供专业和田玉鉴定、社交、交易的综合性平台。
            p.font-30 客服电话：
                a.red(href="tel:4000587266") 400-0587-266
</template>
<script>
export default {
    name: 'AboutView',
    data() {
        return {
            version: '1.0'
        };
    },
    computed: {
        isProd() { // 在非生产环境才可以进入客户端接口测试页面
           return _.includes(this.config.api, 'com');
        }
    },
    ready() {
        this.action('version')
            .then(v => this.version = v);
    }
}
</script>