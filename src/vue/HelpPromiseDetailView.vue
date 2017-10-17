<style lang="stylus">
.promise-detail
    .btn
        border-radius: 45px
    .icon-selected
        display: block
        margin: 160px auto 40px
</style>
<template lang="pug">
.promise-detail.pdb
    template(v-if="!result")
        help-ziliao-feature(v-if="$route.params.type === 'ziliao_feature'")
        help-desc(v-else, :type="$route.params.type", :title="true")
        .btn.line-height-90.mgh-32.fz-30.center.mgt-36.bg-gray.white(:class="{'bg-red': !isOpen}", @click="apply($route.params.type)") {{isOpen ? '已开通' : '申请开通'}}
    template(v-else)
        icon.mgt-160.center(name="selected")
        .fz-40.bold.center 申请已提交
        .mgt-48.gray.fz-26.user-txt.center.pdh-32 管理员将对您之前发布的商品进行审核，符合要求将开通对应权限
        .btn.line-height-90.mgh-32.fz-30.center.mgt-36.bg-red.white(@click="action('back', {step: 1, refresh: true})") 我知道了
</template>
<script>
import HelpDesc from 'component/HelpDesc.vue'
import HelpZiliaoFeature from 'component/HelpZiliaoFeature.vue'
export default {
    name: 'promise-detail',

    components: {
        HelpDesc,
        HelpZiliaoFeature
    },

    data() {
        return {
            result: false // 是否显示结果页面
        }
    },

    computed: {
        isOpen() {
            return this.$route.query.isOpen === 'succeed'
        }
    },

    methods: {
        apply(type) {
            if(!this.isOpen) {
                if(this.$route.query.num - 20 > 0) {
                    this.$post('users/shop_certs', { cert_type: type}).then(resp => {
                        this.result = true
                    }, err => {
                        this.action('toast', {success: 0, text: err.message})
                    })
                } else {
                    this.action('toast', {text: '商品数量不足20个'})
                }
            }
        }
    }
}
</script>