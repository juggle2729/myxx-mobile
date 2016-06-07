<style lang="sass">
	.recommend-follwer-view {
		width: 100%;
		padding-top: 20px;
		.item {
			position: relative;
			padding: 32px 32px 32px 0;
			margin-left: 32px;
			-webkit-box-align: inherit;
			.main {
				margin-left: 20px;
			}
			.name {
				margin-top: 2px;
				>div {
					margin-top: 12px;
				}
			}
			.follow-cnt {
				position: absolute;
				top:36px;
				right: 32px;
				width: 122px;
			    height: 62px;
			    line-height: 60px;
			    text-align: center;
			    border: 1px solid #cc3f4f;
			    border-radius: 12px;
			    &.followed {
			         color: #888888;
			         border-color: #eeeeee;
			         background: #eeeeee;
			    }
			    .cnt-text {
			        color: #696969;
			        .icon {
			            color: #cc3f4f;
			            padding-right: 0;
			        }
			    }
			}
			.content {
				margin-top: 20px;
				line-height: 39px;
			}
		}
	}
</style>
<template>
	<div class="recommend-follwer-view bg-default">
		<div class="bg-white">
			<div class="item flex border-bottom clearfix" v-for="item in items">
				<avatar :user="item" :size="120"></avatar>
				<div class="main flex-1">
					<div class="name">
						<p class="font-30">{{item.name}}</p>
						<div class="font-26 light">粉丝{{item.fans_count}}</div>
					</div>
					<div class="follow-cnt font-26" @click="follow(item)" :class="{ 'followed': item.is_followed }">
				    	<span class="cnt-text">
				   			<span class="icon icon-follow-big font-22 red" v-if="!item.is_followed"></span>
				    		{{item.is_followed ? '已关注' : '关注'}}
				        </span>
				    </div>
					<div class="content font-26 gray">
						{{item.desc}}
					</div>
				</div>
			</div>
			<partial name="load-more" v-if="items.hasMore"></partial>
        	<empty v-if="items.isEmpty"></empty>
		</div>
	</div>
</template>
<script>
import paging from 'paging';
export default {
	name: 'RecommendFollowerView',
	mixins: [paging],
	computed: {
        paging() {
            return {
                path: 'cms/promotes/follow_list',
                list: 'entries',
                params: {
                    limit: 5
                }
            }
        }
    },
    route: {
        data() {
            return this.fetch();
        }
    },
	methods: {
		follow(item) {
			this.$post(`users/follow/${item.id}`).then(() => {
                	item.is_followed = true;
                	this.action('toast', {
	                	text: '已关注',
	                	success: '1'
            	});
        	});
		}
	}
}
</script>