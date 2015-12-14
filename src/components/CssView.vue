<style lang="sass">
.css_view{
    background-color: #fff3ad;
    padding: 40px 40px;
    .font-size {
        margin-bottom: 50px;
        .display {
            display: flex;
            align-items: center;
            height: 50px;
            margin-left: 30px;
            .class_name {
                width: 170px;
                margin-right: 50px;
            }
        }
    }
    .icons {
        margin-bottom: 50px;
        display: flex;
        flex-wrap: wrap;
        .display {
            display: table;
            margin-top: 30px;
            height: 50px;
            .class_name {
                width: 220px;
                margin-top: 30px;
            }
            .class_display {
                height: 50px;
                width: 50px;
            }
        }
    }
    .margins {
        margin-bottom: 50px;
        .display {
            display: flex;
            align-items: center;
            height: auto;
            margin-left: 30px;
            .class_name {
                width: 170px;
                margin-right: 50px;
            }
            .class_display {
                width: 300px;
                height: 100px;
                > div {
                    float: left;
                }
            }
        }
    }
    .paddings {
        margin-bottom: 50px;
        .display {
            display: flex;
            align-items: center;
            height: auto;
            margin-left: 30px;
            margin-top: 10px;
            .class_name {
                width: 170px;
                margin-right: 50px;
            }
            .class_display {
                width: 300px;
                height: 100px;
                > div {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .components {
        margin-bottom: 50px;
        .display {
            display: flex;
            align-items: center;
            height: auto;
            margin-left: 30px;
            margin-top: 10px;
            .class_name {
                width: 170px;
                margin-right: 50px;
            }
            .class_display {
                width: 300px;
                height: 100px;
                position: relative;
                > button {
                    width:230px;
                    height: 26px;
                    position: absolute;
                    background-color: inherit;
                    border-style: none;
                    top: 50%;
                    margin-top: -13px;
                }
            }
        }
    }
    .positions {
        margin-bottom: 50px;
        .display {
            display: flex;
            align-items: center;
            height: auto;
            margin-left: 30px;
            margin-top: 10px;
            .class_name {
                width: 170px;
                margin-right: 50px;
            }
            .class_display {
                width: 300px;
                height: 100px;
                position: relative;
                > div {
                    width: 150px;
                    height: 30px;
                    left: 30px;
                    top: 30px;
                }
                > button {
                    position: absolute;
                    left: 30px;
                    bottom: 0;
                    width: 210px;
                    height: 26px;
                    background-color: inherit;
                    border-style: none;
                }
            }
        }
    }
    .avatars {
        margin-bottom: 50px;
        .display {
            display: flex;
            align-items: center;
            height: auto;
            margin-left: 30px;
            margin-top: 30px;
            .class_name {
                width: 170px;
                margin-right: 50px;
            }
            .class_display {
                display: flex;
                align-items: center;
            }
        }
    }
    .title {
        color: #86be79;
        background-image: linear-gradient(0deg, transparent 50%, #86be79 50%);
        background-position: center bottom;
        background-repeat: no-repeat;
        background-size: 100% 7px;
        padding-bottom: 15px;
        font-size: 25px;
        font-weight: bold;
        width: 200px;
        margin-bottom: 30px;
    }
}
</style>
<template>
    <div class="css_view">
        <div class="font-size">
            <div class="title">
                <p align="center">Font Size</p>
            </div>
            <template v-for="size in fontSize">
                <div class="display">
                    <div class="class_name">
                        <p class="font-26 gray" align="right">{{size}}</p>
                    </div>
                    <div class="class_display">
                        <p :class="size" class="font-34">DISPLAY</p>
                    </div>
                </div>
            </template>
        </div>
        <div class="title">
            <p align="center">Icons</p>
        </div>
        <div class="icons">
            <template v-for="icon in icons">
                <div class="display">
                    <div class="class_display center-horizontal">
                        <p :class="icon" class="font-26 center-vertical"></p>
                    </div>
                    <div class="class_name">
                        <p class="font-26 gray" align="center">{{icon}}</p>
                    </div>
                </div>
            </template>
            <template v-for="path in paths">
                <div class="display">
                    <div class="class_display center-horizontal" :class="path[0]">
                        <p :class="path[1]" class="font-26 center-vertical"></p>
                    </div>
                    <div class="class_name" >
                        <p class="font-26 gray" align="center">{{path[0]}}<br>{{path[1]}}</p>
                    </div>
                </div>
            </template>
        </div>
        <div class="font-size">
            <div class="title">
                <p align="center">Colors</p>
            </div>
            <template v-for="color in colors">
                <div class="display" >
                    <div class="class_name">
                        <p class="font-26 gray" align="right">{{color[0]? color[0]:'默认'}}</p>
                    </div>
                    <div class="class_display" style="width:100px;">
                        <p :class="color" class="font-26">{{color[1]}}</p>
                    </div>
                </div>
            </template>
        </div>
        <div class="avatars">
            <div class="title">
                <p align="center">Avatars</p>
            </div>
            <template v-for="size in avatarSize">
                <div class="display">
                    <div class="class_name">
                        <p class="font-26 gray" align="right">{{size}}</p>
                    </div>
                    <div class="class_display">
                        <img :class="size" src="/static/images/artist/work-one.jpg">
                    </div>
                </div>
            </template>
        </div>
        <div class="font-size">
            <div class="title">
                <p align="center">Borders</p>
            </div>
            <template v-for="border in borders">
                <div class="display" >
                    <div class="class_name">
                        <p class="font-26 gray" align="right">{{border}}</p>
                    </div>
                    <div class="class_display">
                        <p :class="border" class="font-26">DISPLAY</p>
                    </div>
                </div>
            </template>
        </div>
        <div class="margins">
            <div class="title">
                <p align="center">Margins</p>
            </div>
            <template v-for="margin in margins">
                <div class="display">
                    <div class="class_name">
                        <p class="font-26 gray" align="right">{{margin}}</p>
                    </div>
                    <div class="class_display border-default" >
                        <div :class="margin" class="border-default"><p class="font-26">DISPLAY</p></div>
                        <div><p class="font-26 border-default">我是参照物</p></div>
                    </div>
                </div>
            </template>
        </div>
        <div class="paddings">
            <div class="title">
                <p align="center">Paddings</p>
            </div>
            <template v-for="padding in paddings">
                <div class="display">
                    <div class="class_name">
                        <p class="font-26 gray" align="right">{{padding}}</p>
                    </div>
                    <div class="class_display border-default" :class="padding">
                        <div class="border-default"><p class="font-26">DISPLAY</p></div>
                    </div>
                </div>
            </template>
        </div>
        <div class="positions">
            <div class="title">
                <p align="center">Positions</p>
            </div>
            <div class="display">
                <div class="class_name">
                    <p class="font-26 gray" align="right">DISPLAY:</p>
                </div>
                <div class="class_display border-default" >
                    <div class="border-default"><p class="font-26">我是参照物</p></div>
                    <div class="border-default relative"><p class="font-26">relative</p></div>
                    <div class="border-default fixed" hidden="{{isHide}}"><p class="font-26">fixed</p></div>
                    <div class="border-default absolute"><p class="font-26">absolute</p></div>
                </div>
            </div>
            <div class="display">
                <div class="class_name">
                    <p class="font-26 gray" align="right">TIPS:</p>
                </div>
                <div class="class_display border-horizontal">
                    <p class="font-22">上例中四个div属性均为<br>{ left: 30px;top: 30px;}</p>
                    <button @click="toggleFixed" class="border-bottom">Click here to {{isHide? 'show':'hide'}} "fixed"</button>
                </div>
            </div>
        </div>
        <div class="components">
            <div class="title">
                <p align="center">Components</p>
            </div>
            <div class="display">
                <div class="class_name">
                    <p class="font-26 gray" align="right">toast</p>
                </div>
                <div class="class_display">
                    <button @click="viewToast" class="border-bottom">Click here to view "toast"</button>
                </div>
            </div>
            <div class="display">
                <div class="class_name">
                    <p class="font-26 gray" align="right">loading</p>
                </div>
                <div class="class_display">
                    <div class="loading">123</div>
                </div>
            </div>
            <div class="display">
                <div class="class_name">
                    <p class="font-26 gray" align="right">video</p>
                </div>
                <div class="class_display video">
                </div>
            </div>
            <div class="display">
                <div class="class_name">
                    <p class="font-26 gray" align="right">row</p>
                </div>
                <div class="class_display font-26 border-default">
                    <div class="row"><span class="text">DISPLAY</span><span class="icon-enter"></span></div>
                </div>
            </div>
        </div>
        <div class="font-size">
            <div class="title">
                <p align="center">Others</p>
            </div>
            <template v-for="other in others">
                <div class="display">
                    <div class="class_name">
                        <p class="font-26 gray" align="right">{{other[0]}}</p>
                    </div>
                    <div class="class_display">
                        <p  class="font-26">{{other[1]}}</p>
                    </div>
                </div>
            </template>
    </div>
</template>
<script>
export default {
  name: 'CssView',
  data() {
    return {
        fontSize: [
            'font-34',
            'font-30',
            'font-26',
            'font-22',
            'bold',
            'italic',
            'center'
        ],
        icons: [
            'icon-alarm',
            'icon-auto-change-1',
            'icon-auto-change-2',
            'icon-comment',
            'icon-enter',
            'icon-edit',
            'icon-favor',
            'icon-favor-active',
            'icon-favor-master',
            'icon-menu',
            'icon-item',
            'icon-my-favor',
            'icon-review',
            'icon-my-shop',
            'icon-my-site',
            'icon-phone',
            'icon-resume-big',
            'icon-resume-mid',
            'icon-resume-small',
            'icon-search-master',
            'icon-settings',
            'icon-shop',
            'icon-thumb',
            'icon-thumb-active',
            'icon-view'
        ],
        paths: [
            ['icon-location', 'path1'],
            ['icon-location', 'path2'],
            ['icon-location', 'path3'],
            ['icon-play', 'path1'],
            ['icon-play', 'path2'],
            ['icon-record', 'path1'],
            ['icon-record', 'path2']
        ],
        colors: [
            ['', '#393939'],
            ['light', '#c6c6c6'],
            ['gray', '#888888'],
            ['blue', '#33a1c9'],
            ['red', '#cc3f4f'],
            ['white', '#ffffff'],
            ['bg-default', '#efefef'],
            ['bg-light', '#f9f9f9'],
            ['bg-red', '#cc3f4f'],
            ['bg-yellow', '#f3ac1c'],
            ['bg-blue', '#469de7'],
            ['bg-white', '#ffffff'],
            ['bg-disable', '#b2b2b2'],
            ['border-default', '#d9d9d9'],
            ['border-red', '#cc3f4f'],
            ['border-gray', '#888888']
        ],
        avatarSize: [
            'avatar-240',
            'avatar-180',
            'avatar-120',
            'avatar-68',
            'avatar-50',
            'avatar-36',
            'avatar'
        ],
        borders: [
            'border-all',
            'border-top',
            'border-right',
            'border-bottom',
            'border-left',
            'border-vertical',
            'border-horizontal'
        ],
        margins: [
            'margin-top',
            'margin-left',
            'margin-right'
        ],
        paddings: [
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'padding-vertical',
            'padding-horizontal'
        ],
        isHide: true,
        components: [
            'toast',
            'video',
            'row'
        ],
        others: [
            ['center-horizontal','水平居中'],
            ['center-vertical','垂直居中'],
            ['show','显示'],
            ['hide','隐藏'],
            ['visible','可见'],
            ['invisible','不可见'],
            ['clearfix','12'],
            ['row-block','自己看代码'],
            ['separator','宽度为20px的分割div']
        ]
    };
   },
   methods: {
       viewToast() {
           this.toast('toast');
       },
       toggleFixed() {
           this.isHide = !this.isHide;
       }
   }

}
</script>
