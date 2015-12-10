<style lang="sass">
    .topics {
        .notice {
            padding-left: 32px;
            position: relative;
            .sender {
                display: -webkit-box;
                height: 114px;
                position: relative;
                img {
                    position: absolute;
                    height: 68px;
                    width: 68px;
                    top: 26px;
                    border-radius: 50%;
                }
                > p:nth-of-type(1) {
                    position: absolute;
                    top: 47px;
                    left: 88px;
                }
                > p:nth-of-type(2) {
                    position: absolute;
                    top: 48px;
                    right: 32px;
                    font-size: 24px;
                }
            }
            .info {
                display: -webkit-box;
                position: relative;
                margin-bottom: 30px;
                margin-top: 6px;
                margin-right: 32px;
                height: 149px;
                background-color: #efeff4;
                img {
                    position: absolute;
                    margin: 12px 0 12px 12px;
                    height: 125px;
                    width: 125px;
                }
                p:nth-of-type(1) {
                    position: absolute;
                    font-size: 30px;
                    left: 173px;
                    margin-top: 38px;
                    width: 500px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                p:nth-of-type(2) {
                    position: absolute;
                    font-size: 26px;
                    margin-top: 84px;
                    left: 173px;
                }
            }
        }
    }
</style>
<template>
    <div class="topics">
        <template v-for="jade in jades">
            <div class="notice">
                <div class="sender">
                    <img :src="photo | img" />
                    <p class="font-26 txt-primary" v-bind:class="{ 'font-red': jade.title, 'font-blue': !jade.title}">
                        {{jade.title? '我发起的鉴宝':'我参与的鉴宝'}}
                    </p>
                    <p class="font-26 light">{{jade.date}}</p>
                </div>
                <div class="info" v-link="{ name: 'evaluation-detail', params: { id: jade.id }}">
                    <img :src="jade.imgUrl | img" :title="jade.imgUrl" />
                    <p class="font-26 txt-primary">{{{jade.description}}}</p>
                    <p class="font-26 light">{{{jade.resultTotal}}}条鉴定结果</p>
                </div>
            </div>
            <div class="separator-20"></div>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'Topic',
        data() {
            return {
                photo: '',
                jades: []
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
                        this.jades = applies;
                        for (var x in applies) {
                            if (applies[x].applier.id === userId) {
                                this.$data.jades[x].title = true;
                                if (this.photo === '') {
                                    this.photo = applies[x].applier.photo;
                                }
                            } else {
                                this.$data.jades[x].title = false;
                                if (this.photo === '') {
                                    for (var n in applies[x].results) {
                                        if (applies[x].results[n].identifier.id === userId)
                                            this.photo = applies[x].results[0].identifier.photo;
                                    }
                                }
                            }
                            this.jades[x].id = applies[x].id;
                            this.jades[x].imgUrl = applies[x].pictures[0];
                            this.jades[x].resultTotal = applies[x].results.length;
                            this.jades[x].date = applies[x].create_at.substring(5, 10);
                        }
                    });
            }
        }
    }
</script>
