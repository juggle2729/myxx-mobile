<template>
<div class="swiper-slide">
    <div v-link="{name: 'evaluation-detail', params: {id: item.id}}" class="content font-26" :style="{backgroundImage: 'url(http://7xo8aj.com2.z0.glb.qiniucdn.com/' + item.image + ')'}">
        <div class="owner txt-white">
            <div @click.stop="go('../me/profile.html?id=' + item.item.user.id)" class="clickable icon">
              <img :src="item.item.user.photo | img" class="avatar-user" />
            </div>
            <div class="desc">
              <h3>{{item.item.user.name}}</h3>
              <p>{{item.item.desc}}</p>
            </div>
        </div>
        <div class="social-status txt-gray">
                <span>
                  <span class="like"><i class="icon-thumb txt-white"></i>{{item.item.follow}}</span>
                  <span class="comment"><i class="icon-comment txt-white"></i>{{item.item.comments}}</span>
                </span>
                <span class="result">已有{{item.item.reviews}}位大师点评</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Slide',
  props: {
    item: Object
  },
}
</script>
