<style lang="sass">
.jade-detail {
	.desc {
		padding: 32px;
		line-height: 1.5;
	}
	.img {
		line-height: 1;
		img {
			width: 100%;
		}
	}
	.tags-component {
		padding: 32px;
	}
}
</style>
<template>
<div class="jade-detail bg-white">
	<div class="desc font-30">{{jade.detail}}</div>
	<div class="img">
      	<img :src="config.img + img + '?imageView2'" v-for="img in jade.pictures" @click="coverflow(jade.pictures, $index)"/>
    </div>
    <tags :tags="jade.tags"></tags>
    <product-recommend></product-recommend>
    <recommend></recommend>
</div>
</template>
<script>
import Tags from './component/Tags.vue';
import Recommend from './component/Recommend.vue';
import ProductRecommend from './component/ProductRecommend.vue';
export default {
	name: 'JadeDetail',
	props: {
		jade: {
			type: Object
		}
	},
	components: {
		Tags,
		Recommend,
		ProductRecommend
	}
}
</script>
