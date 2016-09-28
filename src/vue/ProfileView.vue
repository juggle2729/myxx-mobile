<style lang="stylus">
.profile-view {
    height: 100%
    .account {
        height: 200px
        padding: 0 32px
        position: relative
        .user {
            margin-left: 30px
            > p:nth-of-type(2) {
                margin-top: 16px
            }
        }
    }
    .community {
        height: 120px
        width: 100%
        padding: 25px 0
        > div {
            width: 33.3%
            > p:nth-of-type(2) {
                margin-top: 14px
            }
        }
    }
}
</style>
<template>
<div class="profile-view bg" v-if="!$loadingRouteData">
    <div class="hr"></div>
    <div class="account bg-white bdb flex" v-link="self | profile">
        <div class="avatar-120" v-bg.sm="profile.photo"></div>
        <div class="user flex-1">
            <p class="fz-30">{{nickname}}</p>
            <p class="fz-26 gray">{{profile.role}}</p>
        </div>
        <span class="fz-26 red flex">进入个人主页<i class="icon-enter gray margin-left"></i></span>
    </div>
    <div class="community bg-white flex">
        <div v-link="{name: 'user-like', params: {id: self.id}}" class="bdr">
            <p class="fz-30" align="center">{{profile.like_count || 0}}</p>
            <p class="fz-26 gray" align="center">我的赞</p>
        </div>
        <div v-link="{name: 'user-following', params: {id: self.id}}" class="bdr">
            <p class="fz-30" align="center">{{profile.follow_count}}</p>
            <p class="fz-26 gray" align="center">关注</p>
        </div>
        <div v-link="{name: 'user-follower', params: {id: self.id}}">
            <p class="fz-30" align="center">{{profile.fans_count}}</p>
            <p class="fz-26 gray" align="center">粉丝</p>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Profile',
    data() {
        return {
            profile: {}
        }
    },
    route: {
        data() {
            const id = _.get(this, 'self.id')
            if(id) {
                return this.$fetch(`users/${id}/profile`)
                    .then(profile => {
                        this.profile = profile
                    })
            } else {
                return this.action('login')
            }
        }
    }
}
</script>
