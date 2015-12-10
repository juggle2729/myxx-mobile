<style lang="sass">
    .jades {
        .notice {
            padding-left: 32px;
            padding-right: 32px;
            position: relative;
            .sender {
                display: flex;
                height: 120px;
                align-items: center;
                > img {
                    height: 68px;
                    width: 68px;
                    border-radius: 50%;
                }
                > div {
                    margin-left: 24px;
                    > p:nth-of-type(1) {
                        font-size: 26px;
                    }
                    > p:nth-of-type(2) {
                        margin-top: 10px;
                        font-size: 24px;
                    }
                }
            }
            .info {
                position: relative;
                .result {
                    display: flex;
                    height: 100px;
                    align-items: center;
                    > img {
                        height: 60px;
                        width: 60px;
                        border-radius: 50%;
                    }
                    > p {
                        font-size: 26px;
                        margin-left: 300px;
                    }
                    > div {
                        margin-left: 24px;
                        > p:nth-of-type(1) {
                            font-size: 26px;
                        }
                        > p:nth-of-type(2) {
                            margin-top: 10px;
                            font-size: 24px;
                        }
                    }
                }
            }
            .image {
                position: relative;
                width: 100%;
                height: 350px;
                > div {
                    width: 33.3%;
                    height: 100%;
                    float: left;
                    display: inline;
                    padding-right: 6px;
                }
                .video {
                    position: relative;
                    background-size: cover;
                    background-position: center;
                    &::after {
                        content: '';
                        background-position: center;
                        background-repeat: no-repeat;
                        position: absolute;
                        left: 0;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        background-size: 120px;
                        mix-blend-mode: overlay;
                        background-image: url('/static/images/icon/ico_video.png');
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="jades">
        <template v-for="jade in jades">
            <div class="notice ">
                <div class="sender">
                    <img :src="photo | img" />
                    <div>
                        <p class="font-26 txt-primary">
                            小玉小
                        </p>
                        <p class="txt-gray">{{jade.date | moment}}</p>
                    </div>
                </div>
                <div class="image">
                    <div>
                        <img :src="jade.pictures[0] | img" style="width:100%;height:48%;" />
                        <img :src="jade.pictures[1] | img" style="width:100%;height:48%;" />
                    </div>
                    <div>
                        <img :src="jade.pictures[2] | img" style="width:100%;height:48%;" />
                        <img :src="jade.pictures[3] | img" style="width:100%;height:48%;" />
                    </div>
                    <div class="video clickable" @click="play(jade.video)" v-bg.video="jade.video">
                    </div>
                </div>
                <div class="info">
                    <template v-for="result in jade.results">
                        <div class="result border-bottom" v-link="{ name: 'homepage', params: { id: result.id }}">
                            <img :src="photo | img" />
                            <div>
                                <p class="font-26 txt-primary">
                                    {{result.identifier.name}}
                                </p>
                                <p class="txt-gray">{{result.identifier.title}}</p>
                            </div>
                            <p>已鉴定</p>
                        </div>
                    </template>
                </div>
            </div>
            <div class="separator-20"></div>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'SelfEvaluation',
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
                            this.jades[x].resultTotal = applies[x].results.length;
                            this.jades[x].results = applies[x].results;
                            //this.jades[x].date = applies[x].create_at.substring(5, 10);
                            this.jades[x].date = applies[x].create_at;
                            this.jades[x].pictures = applies[x].pictures;
                            this.jades[x].video = applies[x].video;
                        }
                    });
            }
        },
        methods: {
            play(video) {
                this.toast(video);
                if (window.WebViewJavascriptBridge) {
                    window.WebViewJavascriptBridge.callHandler('play', videoId, x => x);
                }
            }
        }
    }
</script>
