<style lang="stylus">
.shop-operating-status-view
    .status
        padding 50px 24px 0 24px
        .status-now
            padding 0 6px 50px 16px
        .btn
            border-radius 25px
        .desc
            line-height 36px
        .reason
            padding 42px 6px 40px 16px
    .explanation
        padding 40px 40px 0
        p
            line-height 36px
    .gray-b3
        border-color #b3b3b3
    .red-e6
        border-color #e61717
</style>
<template  lang="pug">
.shop-operating-status-view.bg
    .status.bg-white
        .status-now
            .fz-30.black-24 当前状态：
            .mgt-30.flex
                .fz-60(:class="profile.audit_status === 'succeed' ? 'green-a1' : 'red-e6'") {{ shopAuditStatus }}
                .flex-1
                .btn.center.bd.fz-24.line-height-50.pdh-36(v-if="profile.audit_status !== 'succeed'", :class="profile.process_audit_status === 'unaudited' ? 'gray-b3' : 'red-e6'", @click="askForAudit") {{ shopProcessStatus }}
        template(v-if="profile.audit_status !== 'succeed'")
            .reason.bdt(v-if="profile.audit_reason")
                .title.fz-30.black-24 审核未通过：
                .desc.fz-24.black-47.mgt-20 {{ profile.audit_reason }}
            .reason.bdt(v-if="profile.remove_mall_reason && !profile.audit_reason")
                .title.fz-30.black-24 暂停营业原因：
                .desc.fz-24.black-47.mgt-20 {{ profile.remove_mall_reason }}
    .explanation.bdt.fz-24.gray-8f(v-if="profile.audit_status === 'succeed'")
        p 美玉秀秀入驻状态分为：试营业、正式营业、暂停营业。试营业和暂停营业的店铺，无法在平台内被用户浏览到。
    .explanation.bdt.fz-24.gray-8f(v-if="profile.audit_status === 'unaudited'")
        p 美玉秀秀入驻状态分为：试营业、正式营业、暂停营业。试营业和暂停营业的店铺，无法在平台内被用户浏览到。
        p.mgt-30 如何通过试营业？
        p 1. 商品数量达到20个系统将会自动发起申请；
        p 2. 管理员会对店铺进行审核，通过审核的店铺将转为正式营业，未通过审核的店铺请根据审核结果反馈进行对应的修改，并再次提交申请。
    .explanation.bdt.fz-24.gray-8f(v-if="profile.audit_status === 'failed'")
        p 美玉秀秀入驻状态分为：试营业、正式营业、暂停营业。试营业和暂停营业的店铺，无法在平台内被用户浏览到。
        p.mgt-30 如何结束暂停营业？
        p 1. 请按照暂停营业原因对店铺进行修改，管理员会对店铺进行审核，通过审核的店铺将转为正式营业，未通过审核的店铺请根据审核结果反馈进行对应的修改，并再次提交申请。
</template>
<script>
export default {
    name: 'shop-operating-status-view',

    data() {
        return {
            profile: {
                audit_status: '',
                process_audit_status: '',
                audit_reason: '',
                remove_mall_reason: ''
            }
        }
    },

    route: {
        data() {
            return this.fetch()
        }
    },

    computed: {
        shopAuditStatus() {
            switch (this.profile.audit_status) {
                case 'unaudited':
                    return '试营业'
                case 'failed':
                    return '暂停营业'
                case 'succeed':
                    return '正式营业'
            }
        },

        shopProcessStatus() {
            return this.profile.process_audit_status === 'unaudited' ? '审核中' : '申请正式营业'
        }
    },

    methods: {
        askForAudit() {
            this.processAuditStatus !== 'unaudited' &&
            this.$post('users/shop_certs', { cert_type: 'audit' }).then(() => {
                this.action('toast', {success: 1, text: '已发出申请'})
                this.fetch()
            })
        },

        fetch() {
            this.$fetch('mall/shop/profile').then(resp => {
                this.profile = resp
            })
        }
    }
}
</script>