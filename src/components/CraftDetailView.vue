<style lang="sass">
    .craft-detail-view {
        .title {
            width: 100%;
            height: 576px;
            position: relative;

            .text {
                text-align: center;
                width: 520px;
                display: inline-block;
                opacity: 0.5;
                line-height: 120px;

                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -260px;
                transform: translateY(-50%);
            }
        }

        .content {
            padding: 50px 32px;
        }
    }
</style>
<template>
    <div class="craft-detail-view border-top">
        <div class="title img font-44 white"><span class="text bg-black">{{craft.title}}</span></div>
        <div class="content">
            <rich-text :medias="craft.medias || []"></rich-text>
        </div>
    </div>
</template>
<script>
    import RichText from './RichTextView.vue';

    export default {
        name: 'CraftDetail',
        components: { RichText },
        data() {
            return {
                id: '',
                craftId: '',
                craft: {}
            };
        },
        route: {
            data({ to }) {
                this.id = to.params.id;
                this.craftId = to.params.craftId;

                return this.fetchCraftDetail();
            }
        },
        methods: {
            fetchCraftDetail: (function () {
                return function () {
                    return this.$get(`sites/${this.id}/articles/${this.craftId}`, {}).then((data) => {
                        this.craft = data;
                    });
                }
            })()
        }
    };
</script>
