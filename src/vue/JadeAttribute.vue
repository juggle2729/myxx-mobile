<style lang="sass">
.jade-attribute {
	.params {
		padding-left: 32px;
        ul > li {
            padding: 26px 0;
            line-height: 1.5;
            border-bottom: 1px solid #eee;
        }
        ul > li > p:nth-child(2) {
            line-height: 1.5;
            padding-right: 32px;
        }
        .label {
            width: 178px;
        }
	}
}
</style>
<template>
<div class="jade-attribute bg-default">
	<div class="params bg-white">
        <ul>
            <li v-if="jade.category" class="flex font-26">
                <p class="label gray">分类</p>
                <p class="flex-1">{{jade.category | tree}}</p>
            </li>
            <li v-if="jade.size" class="flex font-26">
                <p class="label gray">尺寸</p>
                <p class="flex-1">{{jade.size}}</p>
            </li>
            <li v-if="jade.weight" class="flex font-26">
                <p class="label gray">重量</p>
                <p class="flex-1">{{jade.weight}}g</p>
            </li>
            <li v-if="jade.variety" class="flex font-26">
                <p class="label gray">种类</p>
                <p class="flex-1">{{jade.variety | tree}}</p>
            </li>
            <li v-if="jade.place" class="flex font-26">
                <p class="label gray">产地</p>
                <p class="flex-1">{{jade.place | tree}}</p>
            </li>
            <li v-if="jade.skin" class="flex font-26">
                <p class="label gray">皮色</p>
                <p class="flex-1">{{jade.skin | tree}}</p>
            </li>
            <li v-if="jade.material" class="flex font-26">
                <p class="label gray">产状</p>
                <p class="flex-1">{{jade.material | tree}}</p>
            </li>
            <li v-if="jade.certificate" class="flex font-26">
                <p class="label gray">证书</p>
                <p class="flex-1">{{jade.certificate | tree}}</p>
            </li>
            <li v-if="jade.gift_to" class="flex font-26">
                <p class="label gray">赠送对象</p>
                <p class="flex-1">{{jade.gift_to | tree}}</p>
            </li>
            <li v-if="jade.gift_when" class="flex font-26">
                <p class="label gray">赠送场合</p>
                <p class="flex-1">{{jade.gift_when | tree}}</p>
            </li>
            <li v-if="jade.theme" class="flex font-26">
                <p class="label gray">题材</p>
                <p class="flex-1">{{jade.theme | tree}}</p>
            </li>
            <li v-if="jade.moral" class="flex font-26">
                <p class="label gray">寓意</p>
                <p class="flex-1">{{jade.moral | tree}}</p>
            </li>
            <li v-if="jade.genre" class="flex font-26">
                <p class="label gray">流派</p>
                <p class="flex-1">{{jade.genre | tree}}</p>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
	name: 'JadeAttribute',
	props: {
		jade: {
			type: Object
		}
	}
}
</script>
</template>
