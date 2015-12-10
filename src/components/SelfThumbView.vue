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
                        赞了一个鉴宝
                    </p>
                </div>
                <div class="info" v-link="{ name: 'evaluation-detail', params: { id: thumb.id }}">
                    <div>
                        <div>
                            <img :src="thumb.applier.photo | img" />
                            <p class="font-26 txt-black">{{thumb.applier.name}}</p>
                        </div>
                        <p class="font-30 txt-primary">{{{thumb.description}}}</p>
                        <p class="font-22 txt-black">{{{thumb.resultTotal}}}条鉴定结果</p>
                    </div>
                    <img :src="thumb.imgUrl | img" :title="thumb.imgUrl" />
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
                return this.$http
                    .get('jianbao/users/' + userId + '/applies')
                    .success(function(resp) {
                        var applies = resp.data.applies;
                        this.thumbs = applies;
                        for (var x in applies) {
                            if (applies[x].applier.id === userId) {
                                this.$data.thumbs[x].title = true;
                                if (this.photo === '') {
                                    this.photo = applies[x].applier.photo;
                                }
                            } else {
                                this.$data.thumbs[x].title = false;
                                if (this.photo === '') {
                                    for (var n in applies[x].results) {
                                        if (applies[x].results[n].identifier.id === userId)
                                            this.photo = applies[x].results[0].identifier.photo;
                                    }
                                }
                            }
                            this.thumbs[x].id = applies[x].id;
                            this.thumbs[x].imgUrl = applies[x].pictures[0];
                            this.thumbs[x].resultTotal = applies[x].results.length;
                            this.thumbs[x].date = applies[x].create_at.substring(5, 10);
                            this.thumbs[x].applier = applies[x].applier;
                        }
                    });
            }
        }
    }
</script>
