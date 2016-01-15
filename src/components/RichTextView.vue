/**
 * Created by chunzujun on 12/29/15.
 */
<template>
    <div class="media-content font-30" v-html="medias"></div>
</template>
<script>
    export default {
        name: 'RichText',
        props: {
            medias: {
                type: String,
                default: ''
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
    .media-content {
        * {
            line-height: 42px;
        }

        img {
            width: 100% !important;
            margin: 50px 0;
        }
    }
</style>

