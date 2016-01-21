<template>
    <div class="about-view">
        <div class="imgs center">
            <img :src="'profile/about.png' | qn">
            <p class="font-34">美玉秀秀</p>
        </div>
        <div class="text">
            <p class="font-30">美玉秀秀是国内最大的和田玉爱好者平台，高品质和田玉资源集合地。</p>
            <p class="font-30">美玉秀秀移动端是为全国各地的和田玉爱好者、藏家、商
                家、相关领域的大师以及权威人士提供专业和田玉鉴定、社交、交易的综合性平台。</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AboutView'
}
</script>
<style lang="sass">
.about-view {
    .imgs {
        padding-top: 162px;
        padding-bottom: 113px;
        > img {
            width: 178px;
            height: 178px;
        }
        > p {
            margin-top: 36px;
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
