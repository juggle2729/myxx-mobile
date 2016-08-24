<style lang="sass">
@import '~style/partials/var';
.purchase-item {
    padding: 24px 0 32px;
    header, .desc, ul, footer {
        margin-left: 32px;
        margin-right: 32px;
    }
    header {
        .name {
            margin: 0 14px 0 20px;
        }
        img {
            width: 24px;
            height: 30px;
            vertical-align: bottom;
        }
        .red {
            text-align: right;
        }
    }
    .desc {
        margin-top: 24px;
        line-height: 1.3;
        margin-bottom: 24px;
    }
    .medias {
        li {
            height: 222px;
            width: 222px;
            &:not(:last-child) {
                margin-right: 10px;
            }
        }
    }
    .tags {
        margin-top: 24px;
        margin-bottom: 32px;
        li {
            display: inline-block;
            background-color: #f5f5f5;
            border-radius: 6px;
            padding: 8px 12px;
            margin-right: 8px;
        }
    }
    footer {
        .flex-1::before {
            content: '•';
            margin: 0 14px;
        }
    }
    .btns {
        margin-top: 32px;
        margin-bottom: -12px;
        padding: 20px 32px 0;
        text-align: right;
        .operation {
            display: inline-block;
            padding: 0 1em;
            height: 68px;
            line-height: 68px;
            border-radius: 8px;
            text-align: center;
        }
    }
}
</style>
<template lang="jade">
.purchase-item.bg-white(v-link="{name: 'purchase', params: {id: item.id}}")
    header.flex.font-26
        avatar(:user='item.owner', :size='50')
        .name.gray {{item.owner.nickname}}
        img(v-if="paid", :src="'icon/guarantee.png' | qn")
        .red.flex-1(v-else) 未支付保证金
    .desc.font-30.omit-2
        span.red 预算￥{{Math.round(this.item.price_max/100)}}左右
        |   {{item.description}}
    ul.medias.flex
        li.img(v-for="pic in item.pictures", track-by="$index", v-bg="pic")
    ul.tags.font-22.gray
        li(v-for='attr in item.attributes') {{attr}}
    footer.font-26.flex.light
        div
            span(:class="{'red': item.total_count, 'gray': !item.total_count}") {{item.total_count}}
            span.gray  个竞标
        .flex-1(v-if='item.total_count')
            span(:class="{'red': item.win_count, 'gray': !item.win_count}") {{item.win_count}}
            span.gray  个中标
    .btns.border-top.font-30(v-if="!paid")
        .operation.margin-right.border-gray(@click.stop="delete(item.id)") 删除此求购
        .operation.white.bg-red(@click.stop="action('pay', {id: item.id, price: this.item.pledge, type: 'purchase'})") 立即支付保证金
</div>
</template>
<script>
export default {
    name: 'PurchaseItem',
    props: {
        item: Object
    },
    computed: {
        paid() {
            return this.item.status !=='np';
        }
    },
    methods: {
        delete(id) {
            this.action('confirm', {
                text: '确定删除此求购？',
                labels: ['取消', '删除']
            }).then((data) => {
                if(data === '1') {
                    this.$delete(`mall/purchase/${id}`)
                        .then(() => {
                            this.action('toast', {success: 1, text: '删除成功'});
                            this.env.isIOS ? location.reload(true) : this.action('reloadUrl');
                        });
                }
            });
        }
    }
}
</script>
