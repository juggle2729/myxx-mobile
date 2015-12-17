<template>
    <div class="thumbs">
        <template v-for="thumb in thumbs">
            <div class="notice">
                <div class="sender">
                    <p class="font-30 gray">
                        赞了一个{{thumb.title}}
                    </p>
                </div>
                <div class="info" v-link="{ name: 'evaluation', params: { id: thumb.post_id }}">
                    <div>
                        <div>
                            <img :src="thumb.user.photo | img" class="avatar-50"/>
                            <p class="font-26 gray">{{thumb.user.name}}</p>
                        </div>
                        <p class="font-30">{{{thumb.description}}}</p>
                        <p v-if="thumb.result" class="font-22 gray">{{{thumb.result}}}</p>
                    </div>
                    <img :src="thumb.photo |img" :title.video="thumb.video" />
                </div>
            </div>
            <div class="separator-20"></div>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'thumb',
        data() {
            return {
                thumbs: []
            };
        },
        route: {
            data({
                to
            }) {
                const userId = to.query.id || 1;
                const titles = ['xxx', '鉴宝', '大师鉴定', '话题', '宝贝'];
                return this.$http
                    .get('users/my_like')
                    .success(function(resp) {
                        resp.data.entries.forEach((item) => {
                            if (item.type === 10) {
                                item.entry.description = item.entry.description;
                                item.entry.result = item.entry.status+'条鉴定结果';
                            }else if(item.type === 20){
                                item.entry.user = item.entry.identifier;
                                item.entry.description = '鉴定了 '
                                    +item.entry.jianbao.applier.nickname+' 的宝贝';
                                item.entry.result = '鉴定结果为 '+item.entry.result;
                            }else if(item.type === 30){
                                item.entry.user  = item.entry.applier;
                                if(item.entry.title){
                                    item.entry.description = item.entry.title;
                                } else {
                                    item.entry.description = '分享了一个话题';
                                }
                            }else if(item.type === 80){
                                item.entry.user = item.entry.identifier;
                                item.entry.result = 1106;
                            }
                            item.entry.title = titles[item.type/10];
                            this.thumbs.push(item.entry);
                        });
                    });
            }
        }
    }
</script>
<style lang="sass">
    .thumbs {
        .notice {
            padding-left: 32px;
            padding-right: 32px;
            height: 270px;
            position: relative;
            .sender {
                display: flex;
                height: 82px;
                position: relative;
                align-items: center;
            }
            .info {
                display: flex; //-webkit-box
                align-items: center;
                position: relative;
                height: 168px;
                background-color: #efeff4;
                > img {
                    height: 125px;
                    width: 125px;
                    margin-left: 28px;
                }
                > div {
                    display: -webkit-box-;
                    padding-left: 24px;
                    width: 510px;
                    > div {
                        display: flex;
                        align-items: center;
                        height: 50px;
                        position: relative;
                        > p {
                            margin-left: 16px;
                        }
                    }
                    > p:nth-of-type(1) {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin-top: 16px;
                    }
                    > p:nth-of-type(2) {
                        margin-top: 12px;
                    }
                }
            }
        }
    }
</style>
