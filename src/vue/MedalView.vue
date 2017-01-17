<style lang="stylus">
.medal-view
    img.pic
        display: block
        margin: 0 auto
        height: 160px
        width: 160px
    .name
        -webkit-box-pack: center
        .line
            background-color: #d9d9d9
            height: 1px
    .instruction
        .dot
            display: block
            height: 10px
            width: 10px
        .content
            padding: 0 32px 0 54px
</style>
<template lang="jade">
.medal-view.pdt-48
    img.pic.center(:src="(pic || 'placeholder/img.png') | qn")
    .name.flex.center.mgt-28.mgh-32
        .line.flex-1
        .fz-34.bold.mgh-28 {{current.name}}
        .line.flex-1
    .instruction.mgt-36(v-for="item in current.items")
        .flex.mgh-32.mgb
            img.dot.mgr-12(:src="'red_dot.png' | qn")
            .fz-30.bold {{item.title}}
        .content.fz-26.gray.user-txt {{{item.content | input}}}
</template>
<script>
const identity = {
    name: '身份认证',
    items: [
        {
            title: '身份认证',
            content: '对用户账号信息的真实性进行审核后，会在账号主页以及用户名旁边带上的认证标识'
        }, {
            title: '对象',
            content: '1. 工作室负责人\n2. 商铺负责人\n3. 有正规资质的组织机构'
        }, {
            title: '如何申请认证？',
            content: '美玉秀秀管理委员会采用邀请制的方式对以上类别用户进行认证。身份认证必须经过实名认证'
        }, {
            title: '认证的账号是否会拥有额外权限',
            content: '对账号的认证仅意味着美玉秀秀已对用户提交的资料和信息进行了合理、谨慎的形式审查和核实。认证本身不包含差异化的用户权限或权益'
        }, {
            title: '什么情况下会取消认证？',
            content: '身份、资质不实，包括夸大或伪造、认证信息过期或失效，美玉秀秀会取消认证'
        }
    ]
}
const author = {
    name: '精华内容作者',
    items: [
        {
            title: '精华内容作者',
            content: '精华内容作者是指活跃在美玉秀秀的一批高质量原创内容贡献者，他们无私、积极地分享自己的知识、经验和见解，为玉友提供眼界、鉴赏、知识相关的优质内容'
        }, {
            title: '勋章获取条件',
            content: '在美玉秀秀发布10篇以上视频或长图文精华帖\n精华帖：获赞数超过100、浏览数超过10000、点赞率超过15%'
        }, {
            title: '如何申请认证？',
            content: '1. 美玉秀秀管理委员会采用邀请制的方式对以上类别用户进行认证\n2. 满足认证对象的情况下，用户可通过联系客服主动申请认证'
        }
    ]
}
export default {
    name: 'medal-view',

    computed: {
        isAuthor() {
            return this.$route.name === 'author-medal'
        },

        current() {
            return this.isAuthor ? author : identity
        },

        pic() {
            if(this.self) {
                return this.isAuthor ? (this.self.star_author ? 'medal/author.png' : 'medal/unstar.png') : (this.$root.user.vip_flag ? `medal/${this.self.role}.png` : 'medal/unauthorized.png')
            }
        }
    },

    ready() {
        this.action('user').then(user => this.$set('self', user))
    }
}
</script>