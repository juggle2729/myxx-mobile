<style lang="stylus">
.shop-operating-status-view
    .status
        padding 50px 24px 0 24px
        .status-now
            padding 0 6px 50px 16px
        .btn
            width 210px
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
                .fz-60(:class="auditStatus === 'succeed' ? 'green-a1' : 'red-e6'") {{ shopAuditStatus }}
                .flex-1
                .btn.center.bd.fz-24.line-height-50(v-if="auditStatus !== 'succeed'", :class="processAuditStatus === 'auditing' ? 'gray-b3' : 'red-e6'", @click="askForAudit") {{ shopProcessStatus }}
        .reason.bdt(v-if="auditStatus === 'unaudited' && processAuditStatus === 'audited'")
            .title.fz-30.black-24 审核未通过：
            .desc.fz-24.black-47.mgt-20 {{  }}
        .reason.bdt(v-if="auditStatus === 'failed'")
            .title.fz-30.black-24 原因：
            .desc.fz-24.black-47.mgt-20 {{  }}
    .explanation.bdt.fz-24.gray-8f(v-if="auditStatus === 'succeed'")
        p 美玉秀秀入驻状态分为：试营业、正式营业、暂停营业。试营业和暂停营业的店铺，无法在平台内被用户浏览到。
    .explanation.bdt.fz-24.gray-8f(v-if="auditStatus === 'unaudited'")
        p 美玉秀秀入驻状态分为：试营业、正式营业、暂停营业。试营业和暂停营业的店铺，无法在平台内被用户浏览到。
        p.mgt-30 如何通过试营业？
        p 1. 商品数量达到20个系统将会自动发起申请；
        p 2. 管理员会对店铺进行审核，通过审核的店铺将转为正式营业，未通过审核的店铺请根据审核结果反馈进行对应的修改，并再次提交申请。
    .explanation.bdt.fz-24.gray-8f(v-if="auditStatus === 'failed'")
        p 美玉秀秀入驻状态分为：试营业、正式营业、暂停营业。试营业和暂停营业的店铺，无法在平台内被用户浏览到。
        p.mgt-30 如何结束暂停营业？
        p 1. 请按照暂停营业原因对店铺进行修改，管理员会对店铺进行审核，通过审核的店铺将转为正式营业，未通过审核的店铺请根据审核结果反馈进行对应的修改，并再次提交申请。
</template>
<script>
export default {
    name: 'shop-operating-status-view',

    data() {
        return {
            auditStatus: '',
            processAuditStatus: ''
        }
    },

    route: {
        data() {
            return this.$fetch('mall/shop/profile').then(resp => {
                this.auditStatus = resp.audit_status
                this.processAuditStatus = resp.process_audit_status
            })
        }
    },

    computed: {
        shopAuditStatus() {
            switch (this.auditStatus) {
                case 'unaudited':
                    return '试营业'
                case 'failed':
                    return '暂停营业'
                case 'succeed':
                    return '正式营业'
            }
        },

        shopProcessStatus() {
            switch (this.processAuditStatus) {
                case 'auditing':
                    return '审核中'
                case 'audited':
                    return '已审核'
                default:
                    if (this.auditStatus === 'succeed') {
                        return ''
                    }
                    return '申请正式营业'
            }
        }
    },

    methods: {
        askForAudit() {
            this.$post('mall/shops/audit').then()
        }
    }
}
</script>