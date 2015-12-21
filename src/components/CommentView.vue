<template>
<div class="comment-view">
    <div class="bg-red white center font-30">keyboard(id, pisition, placeholder)</div>
    <hr>
    <label @click="c" for="comment-input">回复1</label>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <label @click="c" for="comment-input">回复2</label>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <label @click="c" for="comment-input">回复3</label>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <label @click="c" for="comment-input">回复4</label>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <label @click="c" for="comment-input" class="font-26 bg-red white padding-vertical center">我要评论</label>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <div class="border-bottom center font-26 padding-vertical" v-for="comment in comments">
        <label @click="c" for="comment-input">回复</label>
        {{comment}}
    </div>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
    <p class="font-26">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat minima accusamus dolorem quisquam a dolore, labore, quo repellat tenetur vel mollitia eum nesciunt debitis alias harum hic fuga. Aperiam.</p>
</div>
</template>
<script>
export default {
    name: 'CommentView',
    data() {
        return {
            comments: [1, 2, 3, 4],
        };
    },
    created() {
    },
    methods: {
        c(e) {
            const rect = e.target.getBoundingClientRect();
            this.action('keyboard', {id: 1, placeholder: '回复xxx', position: rect.top + rect.height + window.scrollY}, () => {
                console.debug('return from keyboard');
            });
        }
    }
}
</script>

<style lang='sass'>
.comment-view {
    p {
        padding: 20px;
        color: gray;
    }
}
</style>
