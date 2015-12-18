<style lang="sass">
.media-view {
    width: 100%;
    .medias {
        margin: 20px;
    }
    .media {
        display: inline-block;
        vertical-align: top;
        margin: 0;
        padding: 5px;
        border: thick solid white;
        height: 200px;
        width: 33%;
        background-size: cover;
    }
    li:first-child:nth-last-child(4) ~ li:nth-of-type(2) {
        margin-right: 33%;
        border-color: red;
    }
}
</style>
<template>
<div class="media-view">
    <h1>media</h1>
    <ul class="medias only">
        <li class="media" v-for="media in medias1" v-bg.sm="media"></li>
    </ul>
    <ul class="medias">
        <li class="media" v-for="media in medias2" v-bg.sm="media"></li>
    </ul>
    <ul class="medias">
        <li class="media" v-for="media in medias3" v-bg.sm="media"></li>
    </ul>
    <ul class="medias">
        <li class="media" v-for="media in medias4" v-bg.sm="media"></li>
    </ul>
    <ul class="medias">
        <li class="media" v-for="media in medias5" v-bg.sm="media"></li>
    </ul>
    <ul class="medias">
        <li class="media" v-for="media in medias6" v-bg.sm="media"></li>
    </ul>
    <ul class="medias">
        <li class="media" v-for="media in medias7" v-bg.sm="media"></li>
    </ul>
    <ul class="medias">
        <li class="media" v-for="media in medias8" v-bg.sm="media"></li>
    </ul>
    <ul class="medias">
        <li class="media" v-for="media in medias9" v-bg.sm="media"></li>
    </ul>
</div>
</template>
<script>
export default {
    name: 'MediaView',
    data() {
        return {
            medias1: [
                '1207IMG_32061.JPG',
            ],medias2: [
                '1207IMG_32061.JPG', 
                '1207IMG_3231.JPG'
            ],medias3: [
                '1207IMG_32061.JPG', 
                '1207IMG_3231.JPG',
                '1207IMG_3218.JPG'
            ],medias4: [
                '1207IMG_32061.JPG', 
                '1207IMG_3231.JPG',
                '1207IMG_3218.JPG',
                '0edb210f-40bc-49ae-88c2-49a40b3a8e19'
            ],medias5: [
                '1207IMG_32061.JPG', 
                '1207IMG_3231.JPG',
                '1207IMG_3218.JPG',
                '0edb210f-40bc-49ae-88c2-49a40b3a8e19',
                '1207IMG_3226.JPG'
            ],medias6: [
                '1207IMG_32061.JPG', 
                '1207IMG_3231.JPG',
                '1207IMG_3218.JPG',
                '0edb210f-40bc-49ae-88c2-49a40b3a8e19',
                '1207IMG_3226.JPG',
                '1207IMG_3211.JPG'
            ],medias7: [
                '1207IMG_32061.JPG', 
                '1207IMG_3231.JPG',
                '1207IMG_3218.JPG',
                '0edb210f-40bc-49ae-88c2-49a40b3a8e19',
                '1207IMG_3226.JPG',
                '1207IMG_3211.JPG',
                '1207IMG_3224.JPG'
            ],medias8: [
                '1207IMG_32061.JPG', 
                '1207IMG_3231.JPG',
                '1207IMG_3218.JPG',
                '0edb210f-40bc-49ae-88c2-49a40b3a8e19',
                '1207IMG_3226.JPG',
                '1207IMG_3211.JPG',
                '1207IMG_3224.JPG',
                '1207videoshare1.mp4'
            ],medias9: [
                '1207IMG_32061.JPG', 
                '1207IMG_3231.JPG',
                '1207IMG_3218.JPG',
                '0edb210f-40bc-49ae-88c2-49a40b3a8e19',
                '1207IMG_3226.JPG',
                '1207IMG_3211.JPG',
                '1207IMG_3224.JPG',
                '6ae56301-e99d-494a-9da0-e171ac9adf33',
                '1207videoshare1.mp4'
            ],
        };
    }
}
</script>