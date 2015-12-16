<style lang="sass">
.treasure {
    .content {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        justify-content: space-between;
        .outside {
            float: left;
            width: 50%;
            padding: 10px;
            .cell {
                border-radius: 8px;
                .image {
                    border-radius: 8px 8px 0 0;
                    height: 0;
                    width: 100%;
                    padding-bottom: 77%;
                    background-image: url('/static/images/artist/treasure.jpg');
                    background-size: cover;
                }
                .txt {
                    padding: 24px 0 24px 20px;
                }
            }
        }
    }
    .nomore {
        height: 50px;
    }
}
</style>
<template>
    <div class="treasure bg-default">
        <div class="content">
            <template v-for="promote in promotes" track-by="$index">
                <div class="outside">
                    <div class="cell bg-white" v-link="{name: 'treasure-detail', params:{ id: promote.id}}">
                        <div class="image" v-bg="promote.image">
                        </div>
                        <div class="txt">
                            <p class="font-30">{{promote.name}}</p>
                            <p class="font-22 gray" style="margin-top: 16px;">{{promote.reward}}</p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div v-if="!index" class="nomore center font-22">没有更多了</div>
    </div>
</template>
<script>
import emitter from '../utils/emitter';
export default {
  name: 'TreasureView',
  data() {
    return {
        promotes:[],
        resp: [
            {
                image: '1.jpg',
                name: '蝶恋花1',
                product_rewards: [
                    {
                        "id": 2,
                        "name": "天工奖"
                    }, {
                        "id": 4,
                        "name": "百花奖"
                    }
                ],
                id: 3
            },
            {
                image: '2.jpg',
                name: '蝶恋花2',
                product_rewards: [
                    {
                        "id": 2,
                        "name": "天工奖"
                    }, {
                        "id": 4,
                        "name": "百花奖"
                    }
                ],
                id: 3
            },
            {
                image: '3.jpg',
                name: '蝶恋花3',
                product_rewards: [
                    {
                        "id": 2,
                        "name": "天工奖"
                    }, {
                        "id": 4,
                        "name": "百花奖"
                    }
                ],
                id: 3
            },
            {
                image: '4.jpg',
                name: '蝶恋花4',
                product_rewards: [
                    {
                        "id": 2,
                        "name": "天工奖"
                    }, {
                        "id": 4,
                        "name": "百花奖"
                    }
                ],
                id: 3
            },
            {
                image: '5.jpg',
                name: '蝶恋花5',
                product_rewards: [
                    {
                        "id": 2,
                        "name": "天工奖"
                    }, {
                        "id": 4,
                        "name": "百花奖"
                    }
                ],
                id: 3
            },
            {
                image: '5.jpg',
                name: '蝶恋花6',
                product_rewards: [
                    {
                        "id": 2,
                        "name": "天工奖"
                    }, {
                        "id": 4,
                        "name": "百花奖"
                    }
                ],
                id: 3
            },
            {
                image: '5.jpg',
                name: '蝶恋花6',
                product_rewards: [
                    {
                        "id": 2,
                        "name": "天工奖"
                    }, {
                        "id": 4,
                        "name": "百花奖"
                    }
                ],
                id: 3
            }
        ],
        index: 2
    };
  },
  route: {
      data(){
        //   return this.$http
        //   .get('cms/promotes?section=cy051')
        //   .success((res) => {
        //       console.log(res.data);
        //       res.data.promotes.forEach((promote) => {
        //             promote.name = '蝶恋花';
        //             promote.product_rewards = [{
        //                                     "id": 2,
        //                                     "name": "天工奖"
        //                                 }, {
        //                                     "id": 4,
        //                                     "name": "百花奖"
        //                                 }];
        //             promote.reward = '';
        //             promote.id = 3;
        //             promote.product_rewards.forEach((item) => {
        //                 promote.reward += '#' + item.name;
        //             });
        //             this.promotes.push(promote);
        //       });
        //       console.log(this.promotes);
        //   });
        return (function(){
            this.resp.forEach((promote) => {
                promote.reward = '';
                promote.product_rewards.forEach((item) => {
                    promote.reward += '#' + item.name;
                });
                this.promotes.push(promote);
            });
        }).apply(this);
      }
  },
  created() {
      emitter.on('scroll-to-bottom',(e) => {
          this.fetch();
      });
  },
  methods: {
      fetch() {
          if(this.index){
            //   this.resp.reduce((result, promote) => {
            //       promote.name += this.index;
            //       promote.reward = '';
            //       promote.product_rewards.forEach((item) => {
            //           promote.reward += '#' + item.name;
            //       });
            //       result.push(promote);
            //       return result;
            //   }, this.promotes);
            // this.resp.forEach((promote) => {
            //     promote.reward = '';
            //     promote.product_rewards.forEach((item) => {
            //         promote.reward += '#' + item.name;
            //     });
            //     this.promotes.push(promote);
            // });
              this.promotes = this.promotes.concat(this.resp);
              this.index--;
          }
      }
  }
}
</script>
