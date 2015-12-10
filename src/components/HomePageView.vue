<style lang="sass">
.homepage {
    .account {
        display: -webkit-box;
        height: 192px;
        padding-left: 32px;
        position: relative;
        img {
            height: 120px;
            width: 120px;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            margin-top: -60px;
        }
        .user {
            position: absolute;
            top: 50%;
            left: 180px;
            margin-top: -35px;
        }
        .icon-enter {
            position: absolute;
            right: 32px;
            top: 50%;
            margin-top: -16px;
            color: #c6c6c6
        }
    }
    .icon:not(.icon-enter) {
        color: #cc3f4f
    }
}
</style>
<template>
    <div class="homepage">
            <div class="account">
                <img :src="photo | img" />
                <div class="user">
                    <p class="font-30 dark-gray margin-right">{{nickname}}</p>
                    <p class="font-26 light-gray margin-top">{{roleName}}</p>
                </div>
            </div>
            <div class="separator-20"></div>
            <div class="row-block">
                <div class="row font-30">
                    <span class="icon icon-favor-active"></span>
                    <span class="text ">TA的关注</span>
                    <span class="icon icon-enter"></span>
                </div>
                <div class="row font-30">
                    <span class="icon icon-review"></span>
                    <span class="text">TA的鉴宝{{$route.params.id}}</span>
                    <span class="icon icon-enter"></span>
                </div>
                <div class="row font-30">
                    <span class="icon icon-shop"></span>
                    <span class="text">TA的店铺</span>
                    <span class="icon icon-enter"></span>
                </div>
            </div>
    </div>
</template>
<script>
import request from 'superagent';
const roles = ['普通用户', '商家', '藏家', '大师', '权威'];
export default {
    name: 'homepage',
    data() {
        return {
        };
    },
    route: {
        data(to, from) {
            return this.$http
                .get('users/info/1'+this.$route.params.id)
                .success(function(res) {
                this.$data = res.data;
                this.roleName = roles[this.role];
            });
        }
    }
}
</script>
