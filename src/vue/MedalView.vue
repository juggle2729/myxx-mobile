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
</style>
<template  lang="pug">
.medal-view.pdt-48
    img.pic.center(:src="(pic || 'placeholder/img.png') | qn")
    .name.flex.center.mgt-28.mgh-32
        .line.flex-1
        .fz-34.bold.mgh-28 {{heading}}
        .line.flex-1
    help-desc(:type="$route.params.type")
</template>
<script>
import HelpDesc from 'component/HelpDesc.vue'
export default {
    name: 'medal-view',

    components: {
        HelpDesc
    },

    computed: {
        heading() {
            return this.$route.params.type === 'identity' ? '身份认证' : '精华内容作者'
        },

        pic() {
            if(this.self) {
                return (this.$route.params.type === 'author') ? (this.self.star_author ? 'medal/author.png' : 'medal/unstar.png') : (this.$root.user.vip_flag ? `medal/${this.self.role}.png` : 'medal/unauthorized.png')
            }
        }
    },

    ready() {
        this.action('user').then(user => this.$set('self', user))
        this.action('updateTitle', {text: this.heading})
    }
}
</script>