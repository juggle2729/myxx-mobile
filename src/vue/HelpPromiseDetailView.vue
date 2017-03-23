<style lang="stylus">
.promise-detail
    .btn
        border-radius: 8px
    .icon-selected
        display: block
        margin: 160px auto 40px
</style>
<template lang="pug">
.promise-detail
    template(v-if="!result")
        help-desc(:type="$route.params.type", :title="true")
        .btn.line-height-90.mgh-32.fz-30.center.mgt-36.bg-gray.white(:class="{'bg-red': !isOpen}", @click="apply") {{isOpen ? '已开通' : '申请开通'}}
    template(v-else)
        icon.mgt-160.center(name="selected")
        .fz-40.bold.center 申请已提交
        .mgt-48.gray.fz-26.user-txt.center.pdh-32 管理员将对您之前发布的商品进行审核，符合要求将开通对应权限
        .btn.line-height-90.mgh-32.fz-30.center.mgt-36.bg-red.white 我知道了
</template>
<script>
import HelpDesc from 'component/HelpDesc.vue'
export default {
    name: 'promise-detail',

    components: {
        HelpDesc
    },

    data() {
        return {
            result: false // 是否显示结果页面
        }
    },

    computed: {
        isOpen() {
            return this.$route.query.isOpen === 'true'
        }
    },

    methods: {
        apply() {
            // 请求开通接口
            (!this.isOpen) && (this.result = true)
        }
    }
}
</script>