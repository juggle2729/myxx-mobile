<style lang="sass">
.jade-problem {
	padding-bottom: 100px;
	.problem {
		padding: 32px;
		.bg-red {
			height: 8px;
			width: 8px;
			border-radius: 50%;
			margin-right: 12px;
		}
		.desc {
			line-height: 1.5;
			margin: 20px 0 50px 0;
		}
		.help {
			margin: 0 auto;
			margin-bottom: 40px;
			.icon-enter {
				position: relative;
				top: 3px;
			}
		}
	}
}
</style>
<template>
<div class="jade-problem bg-default">
   <div class="bg-white problem">
		<div class="flex">
			<div class="bg-red"></div>
			<div class="font-30">付款担保</div>
		</div>
		<div class="desc gray font-30">顾客付款后，所付钱款由美玉秀秀平台暂时保管，顾客收到商品后，点击确认收货，且没有申请退货，所付钱款才会转移给商家。</div>

		<div class="flex">
			<div class="bg-red"></div>
			<div class="font-30">物流和验货</div>
		</div>
		<div class="desc gray font-30">
			1. 商品的配送由商家负责，物流统一为顺丰速运。<br>
			2. 当顾客收到货物后，请当面验货，检查所购商品有无破损，是否和描述一致等，如商品有严重破损或其他明显质量问题，请拍照记录并拒绝收货。
		</div>

		<div class="flex">
			<div class="bg-red"></div>
			<div class="font-30">7天无理由退货</div>
		</div>
		<div class="desc gray font-30">
			1. 收到商品后的7天内（以确认收货日期为准），可以申请退货，平台和商家不会收取任何费用。<br>
			2. 退货的商品应不影响二次销售，相关附属配件齐全（比如：随商品的赠品或证书等）。<br>
			3. 为了保证退货商品的安全，物流请采用顺丰速运，运费由顾客先行垫付，退货完成后运费由平台报销。
		</div>
		<div class="help red font-30 center" v-link="{name: 'instructions'}"><span>查看帮助</span><span class="icon-enter"></span></div>
   </div>
</div>
</template>