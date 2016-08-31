<style lang="sass">
.comment-help-view {
    padding: 0 50px;
    counter-reset: p-counter;
    p {
        counter-increment: p-counter;
        padding-top: 40px;
        line-height: 1.4;
        &::before {
            content: counter(p-counter) ".";
            display: inline-block;
            width: 30px;
        }
    }
}
</style>
<template lang="jade">
.comment-help-view.font-30
    p 您的评价将直接影响商家的积分和等级。
    p 只能在订单确认收货后5天内作出评价。
    p 5天内未评价系统将自动默认好评处理。
    p 您的评价会帮助美玉秀秀约束商家，提供更好的服务，但不会对其他用户显示。
    p 评价修改期：评价作出后的10天内，逾期将不能再更改。
    p 评价修改范围：仅限中差评的修改1次，好评不可再修改。
</template>
<script>
export default {
    name: 'CommentHelpView'
}
</script>