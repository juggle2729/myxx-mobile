<style lang="sass">
@mixin common-master($bgcolor, $height, $width, $border-radius) {
    background-color: $bgcolor;
    height: $height;
    width: $width;
    border-radius: $border-radius;
}
.master-list {
    .search {
        input {
            @include common-master(#d9d9d9, 60px, 686px, 8px);
            margin: 13px 32px;
            padding: 0 64px;
            border: 0;
        }
        .icon-favor {
            position: absolute;
            top: 33px;
            left: 52px;
        }
        .icon-shop {
            display: none;
            position: absolute;
            top: 33px;
            right: 52px;
        }
    }
    .filter {
        @include common-master(black, 100%, 100%, '');
        display: none;
        position: absolute;
        top: 87px;
        left: 0;
        z-index: 1001;
        opacity: .5;
    }
    .master {
        padding: 0 32px;
        img {
            @include common-master('', 120px, 120px, 50%);
            margin: 45px 30px 0 0;
        }
    }
    .master-profile {
        margin: 18px 0;
        > div {
            display: -webkit-box;
            font-size: 22px;
            &:nth-child(2n+1) {
                margin-bottom: 18px;
            }
            .honor {
                margin: 0 32px 12px 0;
            }
            span {
                display: inherit;
                padding-top: 3px;
            }
        }
        [type='button'] {
            @include common-master(yellow, '', '', 5px);
            line-height: 32px;
            padding: 0 5px;
            border: 0;
            margin-left: 12px;
        }
        .identify-number {
            margin-right: 50px;
            &::before {
                content: '鉴宝数 ';
            }
        }
        .fans::before {
            content: '粉丝 ';
        }
    }
    .hiding {
        background-color: rgba(0, 0, 0, .5);
    }
    ::-webkit-input-placeholder {
        font-size: 22px;
    }
}
</style>
<template>
    <div class="master-list">
      <div class="search">
          <input type="text" class="font-22 txt-primary" placeholder="请输入您想查找的姓名、头衔等关键字" v-on:keyup.enter="searchEnter" v-model="searchText" />
          <span class="icon-favor font-22 txt-gray"></span>
          <span class="icon-shop font-22 txt-gray"></span>
      </div>
      <div class="filter"></div>
      <div v-for="master in masters" class="master horizontal  border-bottom">
          <img :src="master.avatar | img" />
          <div class="master-profile">
              <div>
                   <span class="font-30">{{master.name}}</span>
                   <input v-if="master.homepage" class="font-22 txt-white bg-yellow" type="button" value="大师官网">
              </div>
              <div><p class="honor">{{master.honor[0]}}</p><p>{{master.honor[1]}}</p></div>
              <div><p>{{master.honor[2]}}</p></div>
              <div><span class="identify-number txt-gray">{{master.identifyNumber}}</span><span class="fans txt-gray">{{master.fans}}</span></div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    name: 'DiscoverMasterList',
    data() {
        return {
            masters: [
            {
                name: '芦苇',
                homepage: 'home',
                honor: [
                    '中国近代海派玉雕设计师', '近代和田玉收藏专家', '浙江省工美艺术大师'
                ],
                identifyNumber: 5,
                fans: 10
            }, {
                name: '沥青烟',
                homepage: '',
                honor: [
                    '中国近代海派玉雕设计师', '近代和田玉收藏专家', '浙江省工美艺术大师'
                ],
                identifyNumber: 5,
                fans: 10
            }, {
                name: '芦苇',
                homepage: 'home',
                honor: [
                    '中国近代海派玉雕设计师', '近代和田玉收藏专家', '浙江省工美艺术大师'
                ],
                identifyNumber: 5,
                fans: 10
            }, {
                name: '沥青烟',
                homepage: '',
                honor: [
                    '中国近代海派玉雕设计师', '近代和田玉收藏专家', '浙江省工美艺术大师'
                ],
                identifyNumber: 5,
                fans: 10
            }
        ],
        results: [
            {
                phone: '111111',
                nickname: '二卵子'
            }, {
                phone: '10000',
                nickname: 'xxx'
            }
        ],
        comments: {
            total: 0,
            list: [],
            loading: false,
            hasMore: true
        },
        searchText: ''
        };
    },
    route: {
        data(transition) {
        }
    },
    methods: {
        searchEnter: function() {
            let text;
            text = this.searchText.replace(/\s/g, '');
            if (text && text !== ' ') {
                this.toast(text);
            }
        }
    }
}
</script>
