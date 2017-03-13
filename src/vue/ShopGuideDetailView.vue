<style lang="stylus">
.guide-detail-view
	img
		width: 100%
</style>
<template lang="pug">
.guide-detail-view
	img(:src="'shop/guide/'+$route.params.id+'.png?v2' | qn")
</template>
<script>
const items = {
	1: '这样发布商品可以获得大量曝光！',
	2: '想要更多关注和订单？教你几招',
	3: '评价是店铺的“最强代言人”',
	4: '店铺积分对我来说有何用？',
	5: '如何打造个性化店铺？',
	6: '买家付的钱去哪里了？如何提现？',
	7: '平台交易规则是怎样的？',
	8: '平台退货规则是怎样的？'
}
import shareable from 'shareable'
export default {
	name: 'guide-detail-view',

	mixins: [shareable],
	
	ready() {
		this.setShareData({title: items[this.$route.params.id]})
	}
}
</script>