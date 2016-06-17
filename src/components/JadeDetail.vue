<style lang="sass">
.jade-detail {
	.desc {
		padding: 32px;
		line-height: 1.5;
	}
	.img img {
		width: 100%;
		&:not(:last-child) {
			margin-bottom: 6px;
		}
	}
	.tags {
		background: none;
	}
}
</style>
<template>
<div class="jade-detail bg-white">
	<div class="desc font-30">{{jade.detail}}</div>
	<div v-for="img in jade.pictures" class="img">
      	<img :src="config.img + img + '?imageView2'" @click="coverflow(jade.pictures, $index)"/>
    </div>
    <tags :tags="jade.tags"></tags>
    <div class="separator-20"></div>
    <recommend></recommend>
</div>
</template>
<script>
import Tags from './Tags.vue';
import Recommend from './Recommend.vue';
export default {
	name: 'JadeDetail',
	props: {
		jade: {
			type: Object
		}
	},
	components: {
		Tags,
		Recommend
	}
}
</script>
