<style lang="sass">
.featured-view {
    padding: 20px;
    .item {
        height: 438px;
        margin-bottom: 20px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border-radius: 8px;
        position: relative;
        padding: 24px 20px 20px;
    }
    .title {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .user {
        margin-top: 16px;
    }
    .social {
        position: absolute;
        bottom: 20px;
        .favor {
            display: inline-block;
        }
        .comment {
            display: inline-block;
            margin-left: 20px;
        }
    }
    .type {
        position: absolute;
        right: 20px;
        bottom: 20px;
        width: 36px;
        padding: 10px 5px;
        border-radius: 18px;
    }
}
</style>
<template>
    <div class="featured-view bg-default">
        <div class="item white" v-link="{name: item.type.route, params: {id: item.item.id}}" v-for="item in items" v-bg.lg='item.image'>
            <div class="title font-30 bold">{{item.item.title}}</div>
            <div class="user flex">
                <div class="avatar-36" v-bg.sm='item.item.user.photo'></div>
                <div class="font-26 padding-left">{{item.item.user.name}}</div>
            </div>
            <div class="social font-22">
                <div class="favor">
                    <i class="icon-like"></i>
                    <span>{{item.item.likes}}</span>
                </div>
                <div class="comment">
                    <i class="icon-comment"></i>
                    <span>{{item.item.comments}}</span>
                </div>
            </div>
            <div class="type bg-red font-22">{{item.type.name}}</div>
        </div>
    </div>
</template>
<script>
import config from '../config';
export default {
    name: 'FeaturedView',
    data() {
        return {
            items: []
        };
    },
    route: {
        data() {
            return this.$get('cms/promotes?section=cy031').then(({promotes: items}) => {
                    this.items = items.map((item) => {
                        item.type = config.types[item.type];
                        return item;
                    });
                });
        }
    }
}
</script>
