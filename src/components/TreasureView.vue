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
}
</style>
<template>
    <div class="treasure bg-default">
        <div class="content">
            <template v-for="x in 10">
                <div class="outside">
                    <div class="cell bg-white">
                        <div class="image">
                        </div>
                        <div class="txt">
                            <p class="font-30">蝶恋花</p>
                            <p class="font-22 gray" style="margin-top: 16px;">#国艺会金奖</p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
  name: 'TreasureView',
  data() {
    return {};
  },
  route: {
  }
}
</script>
