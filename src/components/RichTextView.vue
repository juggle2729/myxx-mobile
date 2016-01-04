/**
 * Created by chunzujun on 12/29/15.
 */
<template>
    <div class="media-list font-30 gray">
        <template v-for="media in medias">
            <div class="media-item media-text" v-if="media.media_type === 'text'">{{{media.media_content}}}</div>
            <div class="media-item media-inner-img" v-if="media.media_type === 'inner_img'" @click="coverflow($index)" v-bg.lg="media.media_content"></div>
            <div class="media-item media-outer-img" v-if="media.media_type === 'outer_img'" @click="coverflow($index)" v-bg.lg="media.media_content">
                <img :src="media.media_content"/>
            </div>
            <div class="media-item media-inner-video" v-if="media.media_type === 'inner_video'" @click="play(media.media_content)" v-bg.video="media.media_content"></div>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'RichText',
        props: {
            medias: {
                type: Array,
                default: []
            }
        },
        methods: {
            play(id) {
                this.action('play', {id});
            },
            coverflow(fromIndex) {
                const imgIndexArr = [];
                let ids = this.medias.filter((media, index) => {
                    const isImg = (media.media_type === 'inner_img' || media.media_type === 'outer_img');
                    if (isImg) {
                        imgIndexArr.push(index);
                    }
                    return isImg;
                }).map(media => media.media_content);

                const index = imgIndexArr.indexOf(fromIndex);
                this.action('coverflow', {ids, index});
            }
        }
    };
</script>
<style lang="sass">
    .media-list {
        .media-item {
            background-size: cover;
        }

        .media-text {
            text-indent: 15px;
            line-height: 40px;
        }

        .media-inner-img, .media-inner-video {
            height: 576px;
        }

        object {
            width: 100%;
        }

        .media-item:not(:first-child) {
            margin-top: 32px;
        }
    }
</style>

