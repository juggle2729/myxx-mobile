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
        <div class="title img font-44 white" v-bg.lg="craft.img"><span class="text bg-black">{{craft.title}}</span></div>
        <div class="content">
            <rich-text :medias="craft.content || ''"></rich-text>
        </div>
    </div>
</template>
<script>
    import RichText from './RichTextView.vue';
    import masterMixin from '../mixins/MasterMixin.vue';

    export default {
        name: 'CraftDetail',
        components: { RichText },
        mixins: [ masterMixin ],
        data() {
            return {
                craftId: '',
                craft: {}
            };
        },
        activate(done) {
            document.title = '工艺展示详情';

            this.checkShare();
            this.fetchCraftDetail().then(() => {
                done();
            });
        },
        methods: {
            fetchCraftDetail: function () {
                return this.$get(`sites/${this.id}/articles/${this.params.craftId}`, {}).then((data) => {
                    this.craft = data;
                });
            }
        }
    };
</script>
