<template>
    <div class="homepage">
            <div class="account border-bottom">
                <img :src="photo | img" class="avatar-240"/>
                <p class="font-30 red">{{nickname}}</p>
                <button class="bg-red font-26 white icon-favor-active"> 关注</button>
            </div>
            <div class="community bg-white">
              <div v-link="{name: 'topic'}" class="border-right">
                <p class="font-30" align="center">16</p>
                <p class="font-26 gray" align="center">话题</p>
              </div>
              <div v-link="{name: 'following'}" class="border-right">
                <p class="font-30" align="center">314</p>
                <p class="font-26 gray" align="center">关注</p>
              </div>
              <div v-link="{name: 'follower'}" class="border-right">
                <p class="font-30"align="center" >234</p>
                <p class="font-26 gray" align="center">粉丝</p>
              </div>
            </div>
            <div class="separator" style="height:30px"></div>
            <div class="his border-bottom">
                <div class="row font-30 border-bottom" v-link="{name: 'thumb'}">
                    <span class="icon icon-my-favor"></span>
                    <span class="">TA的赞</span>
                    <span class="icon icon-enter gray"></span>
                </div>
                <div class="row font-30 border-bottom">
                    <span class="icon icon-review"></span>
                    <span class="text">TA的鉴宝{{$route.params.id}}</span>
                    <span class="icon icon-enter gray"></span>
                </div>
                <div class="row font-30">
                    <span class="icon icon-my-shop"></span>
                    <span class="text">TA的店铺</span>
                    <span class="icon icon-enter gray"></span>
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
                .get('users/info/'+this.$route.params.id)
                .success(function(res) {
                this.$data = res.data;
                this.roleName = roles[this.role];
            });
        }
    }
}
</script>
<style lang="sass">
.homepage {
    .account {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 420px;
        padding-top: 20px;
        > p {
            margin-top: 36px;
        }
        > button {
            margin-top: 20px;
            height: 44px;
            width: 124px;
            border-width: 0;
            border-radius: 22px;
        }
    }
    .community {
        height: 120px;
        width: 100%;
        padding: 25px 0;
        > div {
            float: left;
            width: 33.3%;
            height: 100%;
            > p:nth-of-type(2) {
                margin-top:14px;
            }
        }
        /*> div {
            display:table;
            width: 33.3%;
            height: 100%;
            float: left;
            position: relative;
            padding-top: 25px;
            padding-bottom: 25px;
            > div {
                display: table-cell;
                vertical-align: middle;
            }
        }*/
    }
    .his {
        padding-left: 32px;
        .row {
            padding-left: 0;
        }
    }
    .icon:not(.icon-enter) {
        color: #cc3f4f
    }
}
</style>
