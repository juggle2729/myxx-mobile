<template>
    <div class="profile">
      <div class="account bg-white border-bottom">
        <img :src="photo | img"/>
        <div class="user">
            <p class="font-30">{{nickname}}</p>
            <p class="font-26 gray">{{roleName}}</p>
        </div>
        <span class="icon-enter font-26 gray"></span>
      </div>
      <div class="community bg-white">
        <div v-link="{name: 'topic'}">
            <div class="border-right">
                <p class="font-30" align="center">16</p>
                <p class="font-26 gray" align="center">话题</p>
            </div>
        </div>
        <div v-link="{name: 'following'}">
            <div class="border-right">
                <p class="font-30" align="center">314</p>
                <p class="font-26 gray" align="center">关注</p>
            </div>
        </div>
        <div v-link="{name: 'follower'}">
            <div>
                <p class="font-30"align="center" >234</p>
                <p class="font-26 gray" align="center">粉丝</p>
            </div>
        </div>
      </div>
      <div class="separator-40"></div>
      <div class="rows">
          <div class="row bg-white font-30 border-bottom" v-link="{path: '/self/evaluation'}">
              <span class="red icon-review"></span>
              <span>我的鉴宝</span>
              <span class="icon-enter gray font-26"></span>
          </div>
          <div class="row bg-white font-30" v-link="{name: 'thumb'}">
              <span class="icon-favor red"></span>
              <span>我的赞</span>
              <span class="icon-enter gray font-26"></span>
          </div>
      </div>
      <div class="separator-40"></div>

      <div class="rows">
          <div class="row bg-white font-30 border-bottom" v-link="{name: 'openshop'}" >
              <span class="icon-my-shop red "></span>
              <span>{{has_shop ? '我的店铺' : '申请开通店铺'}}</span>
              <span class="icon-enter gray font-26"></span>
          </div>
          <div class="row bg-white font-30" v-link="{name: 'opensite'}" >
              <span class="icon-my-site red"></span>
              <span>{{has_website ? '我的官网' : '申请开通官网'}}</span>
              <span class="icon-enter gray font-26"></span>
          </div>
      </div>
      <div class="separator-40"></div>
      <div class="row bg-white font-30 border-bottom">
          <span class="red icon-settings"></span>
          <span>设置</span>
          <span class="icon-enter gray"></span>
      </div>
  </div>
</template>
<script>
import request from 'superagent';
const roles = ['普通用户', '商家', '藏家', '大师', '权威'];
export default {
  name: 'Profile',
  data() {
    return {
        photo: null,
        role: 0,
        roleName: '',
        locale: null,
        has_shop: false,
        nickname: '',
        gender: 0,
        has_jianbao_permission: false,
        has_website: false
    };
  },
  route: {
    data({ to }) {
        const userId = to.query.id || 1;
        return this.$http
            .get('users/info/'+userId)
            .success(function(res) {
            this.$data = res.data;
            this.roleName = roles[this.role];
        });
    }
  }
}
</script>
<style lang="sass">
.profile {
    .account {
        display: flex;
        height: 200px;
        padding-left: 32px;
        align-items: center;
        position: relative;
        img {
            height: 120px;
            width: 120px;
            border-radius: 50%;
            top: 50%;
        }
        .user {
            margin-left: 30px;
            > p:nth-of-type(2) {
                margin-top: 16px;
            }
        }
        .icon-enter {
            position: absolute;
            right: 32px;
            top: 50%;
            margin-top: -16px;
        }
    }
    .community {
        height: 120px;
        > div {
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
                > p:nth-of-type(2) {
                    margin-top: 14px;
                }
            }
        }
    }
    .rows {
        padding-left: 32px;
        .row {
            padding-left: 0;
        }
    }
}
</style>
