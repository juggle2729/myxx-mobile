<style lang="sass">
@import '~style/partials/var';
.purchase-item {
    padding: 24px 32px 32px;
    header {
        .name {
            margin: 0 14px 0 20px;
        }
        .guarantee {
            color: white;
            background-color: #7ec3fd;
            width: 24px;
            height: 30px;
            font-size: 24px;
            line-height: 30px;
            font-weight: bolder;
            border-radius: 100% / 30% 30% 100% 100%;
        }
    }
    .desc {
        margin: 24px 0;
    }
    .medias {
        li {
            margin-right: 10px;
        }
        img {
            height: 4rem;
        }
    }
    .tags {
        margin: 24px 0 32px 0;
        li {
            display: inline-block;
            color: #c6c6c6;
            background-color: #f5f5f5;
            border-radius: 12px;
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
}
</style>
<template>
<div class="purchase-item" v-link="{name: 'purchase', params: {id: item.id}}">
    <header class="flex font-26">
        <avatar :user="item.owner" :size="50"></avatar>
        <div class="name gray">{{item.owner.nickname}}</div>
        <div class="guarantee">￥</div>
    </header>
    <div class="desc font-30"><span class="red">预算￥{{Math.round(item.price_max/100)}}左右</span>{{item.description}}</div>
    <ul class="medias scrollable">
        <li v-for="pic in item.pictures">
            <img :src="config.img+pic+'?imageView2/2/h/450'" />
        </li>
        <!-- <li v-for="media in item.medias">
            <img v-if="media.type==='picture'" :src="config.img+media.id+'?imageView2/2/h/450'" />
            <img v-else :src="config.video+media.id+'?vframe/jpg/offset/0/rotate/auto|imageView2/2/h/450'" />
        </li> -->
    </ul>
    <ul class="tags font-22">
        <li v-for="attr in item.attributes">{{attr}}</li>
    </ul>
    <footer class="font-26 flex light">
        <div><span class="red">{{item.bid_count}}</span>个竞标</div>
        <div class="flex-1"><span class="red">{{item.win_count}}</span>个中标</div>
    </footer>
</div>
</template>
<script>
export default {
    name: 'PurchaseItem',
    props: {
        item: Object
    }
}
</script>
