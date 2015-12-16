<template>
<div class="homepage">
    <div class="account border-bottom">
        <div class="avatar-240" v-bg.md="photo"></div>
        <p class="font-30 red">{{nickname}}</p>
        <button class="bg-red font-26 white icon-favor-active">关注</button>
    </div>
    <div class="community bg-white flex">
      <div v-link="{name: 'story', params: {id: userid}}" class="border-right">
        <p class="font-30" align="center">16</p>
        <p class="font-26 gray" align="center">话题</p>
      </div>
      <div v-link="{name: 'following'}" class="border-right">
        <p class="font-30" align="center">314</p>
        <p class="font-26 gray" align="center">关注</p>
      </div>
      <div v-link="{name: 'follower'}" class="border-right">
        <p class="font-30" align="center" >234</p>
        <p class="font-26 gray" align="center">粉丝</p>
      </div>
    </div>
    <div class="separator" style="height:30px"></div>
    <div class="his border-bottom">
        <div class="row font-30 border-bottom" v-link="{name: 'favor'}">
            <span class="red icon-my-favor"></span>
            <span>TA的赞</span>
            <span class="icon-enter gray"></span>
        </div>
        <div class="row font-30 border-bottom">
            <span class="red icon-review"></span>
            <span>TA的鉴宝</span>
            <span class="icon-enter gray"></span>
        </div>
        <div class="row font-30">
            <span class="red icon-my-shop"></span>
            <span>TA的店铺</span>
            <span class="icon-enter gray"></span>
        </div>
    </div>
</div>
</template>
<script>
import config from '../config';
export default {
    name: 'HomePageView',
    data() {
        return {
            userid: 0
        };
    },
    route: {
        data() {
            this.userid = this.$route.params.id;
            return this.$http
                .get('users/info/'+this.userid)
                .success(function({data}) {
                    data.roleName = config.roles[data.role];
                    this.$data = Object.assign(this.$data, data);
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
            width: 33.3%;
        }
    }
    .his {
        padding-left: 32px;
        .row {
            padding-left: 0;
        }
    }
    .icon-enter {
        transform: rotate(-90deg);
    }
}
</style>
