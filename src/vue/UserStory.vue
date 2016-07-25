<style lang="sass">
@import '~style/partials/var';
.user-story {
    .topic-type {
        height: 100px;
        padding: 0 40px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        > div {
            line-height: 56px;
            padding: 0 18px;
            border-radius: 28px;
            margin: 0 20px;
            &.active {
                color: white;
                background-color: #cc3f4f;
            };
        }
    }
}
</style>
<template>
<div class="user-story">
    <div class="topic-type flex bg-white" v-if="items && items.length > 0">
        <div class="font-26 gray border-all center" @click="classify()" :class="{'active': !selected}">全部 {{types.topic_count}}</div>
        <div v-for="tab in types.topic_types" class="font-26 gray border-all center"
        @click="classify(tab.code)" :class="{'active': selected === tab.code}">{{tab.name}} {{tab.count}}</div>
    </div>
    <recommend :data="items"></recommend>
</div>
</template>
<script>
import paging from 'paging';
import recommend from 'component/Recommend.vue';
export default {
    name: 'UserStory',
    mixins: [paging],
    components: {
        recommend
    },
    ready() {
        this.classify();
    },
    data() {
        return {
            types: {},
            selected: ''
        }
    },
    activate(done) {
        return this.$get('sns/topics/base', {
            user_id: this.$route.params.id
        }).then((data) => {
            this.types = data;
        }).then(done);
    },
    computed: {
        paging() {
            return {
                path: 'dc/sns/search',
                list: 'entries',
                params: {
                    owner_id: this.$route.params.id,
                    doc_type: 'tp',
                    topic_type: this.selected,
                    limit: 10
                }
            }
        }
    },
    methods: {
        classify(type) {
            this.selected = type;
            this.$get('dc/sns/search', {
                owner_id: this.$route.params.id,
                doc_type: 'tp',
                topic_type: type,
                limit: 10
            }).then((data) => {
                this.items = data.entries;
            });
        }
    }
}
</script>
