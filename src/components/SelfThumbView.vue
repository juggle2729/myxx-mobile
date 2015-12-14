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
                        > img {
                            height: 50px;
                            width: 50px;
                            border-radius: 50%;
                        }
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
<template>
    <div class="thumbs">
        <template v-for="thumb in thumbs">
            <div class="notice">
                <div class="sender">
                    <p class="font-30 txt-black">
                        赞了一个{{thumb.title}}
                    </p>
                </div>
                <div class="info" v-link="{ name: 'evaluation-detail', params: { id: thumb.post_id }}">
                    <div>
                        <div>
                            <img :src="thumb.applier.photo | img" />
                            <p class="font-26 gray">{{thumb.applier.name}}</p>
                        </div>
                        <p class="font-30">{{{thumb.description}}}</p>
                        <p v-if="thumb.result" class="font-22 gray">{{{thumb.result}}}</p>
                    </div>
                    <img :src="thumb.pictures[0] | img" :title="thumb.pictures[0]" />
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
                    .get('users/likes')
                    .success(function(resp) {
                        var entries = resp.data.entries;
                        var index = 0;
                        //this.thumbs = new Array(entries.length);
                        for (var x in entries) {
                            this.thumbs[index] = {};
                            this.thumbs[index].pictures = {};
                            this.thumbs[index].title = titles[entries[x].type/10];
                            if (entries[x].type === 10) {
                                this.thumbs[index].description = entries[x].entry.description;
                                this.thumbs[index].applier = entries[x].entry.applier;
                                this.thumbs[index].result = entries[x].entry.status+'条鉴定结果';
                                index++;
                            }else if(entries[x].type === 20){
                                this.thumbs[index].applier = entries[x].entry.identifier;
                                this.thumbs[index].description = '鉴定了 '
                                    +entries[x].entry.jianbao.applier.nickname+' 的宝贝';
                                this.thumbs[index].result = '鉴定结果为 '+entries[x].entry.result;
                                index++;
                            }else if(entries[x].type === 30){
                                if(entries[x].entry.applier == undefined)
                                    continue;
                                else
                                    this.thumbs[index].applier  = entries[x].entry.applier;
                                this.thumbs[index].description = entries[x].entry.title;
                                index++;
                            }else if(entries[x].type === 80){
                                this.thumbs[index].applier = entries[x].entry.identifier;
                                this.thumbs[index].result = 1106;
                                index++;
                            }
                        }
                    });
            }
        }
    }
</script>
