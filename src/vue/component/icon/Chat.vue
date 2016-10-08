<template lang="jade">
.share-icon.fz-30.gray(@click.stop="chat(id, name, jade)")
    i.icon-chat
    span 私信
</div>
</template>
<script>
import Q from 'q'
export default {
    name: 'chat-icon',
    props: {
        id: [Number],
        name: [String],
        jade: [Number] // 商品id
    },
    computed: {
        isSelf() {
            return _.get(this, 'self.id') == this.id
        }
    },
    methods: {
        chat(id, name, jade) {
            if(this.env.isApp) {
                if(this.env.version >= 1.5 && !this.isSelf) {
                    Q.promise((resolve) => {
                        if(this.self) {
                            resolve()
                        } else if(!this.self){
                            this.action('login').then(resolve)
                        }
                    }).then(() => {
                        this.action('chat', {id: id, name: name, product: jade})
                    })
                } else if(this.isSelf) {
                    this.action('toast', {success: 0, text: '您不能和自己聊天'})
                } else {
                    this.action('toast', {success: 0, text: '请更新至最新版'})
                }
            } else {
                this.gotoDownload()
            }
        }
    }
}
</script>
