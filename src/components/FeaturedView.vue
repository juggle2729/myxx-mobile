<style lang="sass">
.featured-view {
    .item {
        height: 350px;
        margin: 20px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border-radius: 8px;
        position: relative;
        padding: 24px 20px 20px;
    }
    .user {
        height: 36px;
        padding-top: 16px;
        .avatar {
            display: inline-block;
            height: 36px;
            width: 36px;
            border-radius: 50%;
            background-size: cover;
            vertical-align: middle;
        }
        .name {
            display: inline-block;
            line-height: 36px;
        }
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
        i {
            vertical-align: middle;
        }
    }
    .type {
        position: absolute;
        right: 20px;
        bottom: 20px;
        width: 36px;
        padding: 10px 5px;
        border-radius: 15px;
    }
}
</style>
<template>
    <div class="featured-view">
        <div class="item white" v-for="item in items" v-bg.lg='item.image'>
            <div class="title font-30 bold">{{item.item.desc}}</div>
            <div class="user font-26 gray">
                <div class="avatar" v-bg.sm='item.item.user.photo'></div>
                <div class="name">{{item.item.user.name}}</div>
            </div>
            <div class="social font-22">
                <div class="favor">
                    <i class="icon-favor"></i>
                    <span>{{item.item.follow}}</span>
                </div>
                <div class="comment">
                    <i class="icon-comment"></i>
                    <span>{{item.item.reviews}}</span>
                </div>
            </div>
            <div class="type bg-red font-26">{{item.type}}</div>
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
            return this.$http
                .get('cms/promotes?section=cy031')
                .success(({data: {promotes: items}}) => {
                    this.items = items.map((item) => {
                        item.type = config.types[item.type];
                        return item;
                    });
                });
        }
    },
    computed: {
        tag() {
            console.debug(arguments);
            return 'tagx';
        }
    },
    methods: {
        render() {
            console.log(this.items);
        }
    }
}
</script>
