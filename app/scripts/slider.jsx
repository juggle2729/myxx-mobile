/*
 * slider
 */
(function($) {
    $.extend($.fn, {
        slider: (obj) => {
            this.each(function() {
                // 当前Zepto对象
                var $self = $(this);
                var dom = {
                    'wrap': $self.find('.slider-list'),
                    'item': $self.find('.slider-item'),
                    'firstItem': $self.find('.slider-item').first(),
                    'lastItem': $self.find('.slider-item').last(),
                    'pagelist': null,
                    'pageItem': null
                };
                var settings = {
                    'len': dom.item.length,
                    'width': dom.wrap.width(),
                    'startX': 0,
                    'startY': 0,
                    'index': 1,
                    'distance': 0,
                    'timer': null,
                    'autoplay': obj ? (obj.autoplay ? true : false) : false
                };
                var funs = {
                    init: () => {
                        if (settings.len > 1) {
                            funs.initUI();
                            funs.bindEvent();
                            if (settings.autoplay) {
                                settings.timer = setInterval(funs.autoAnimate, 3000);
                            }
                        }
                    },
                    initUI: () => {
                        var cloneFisrt = dom.firstItem.clone();
                        var cloneLast = dom.lastItem.clone();
                        dom.wrap.append(cloneFisrt);
                        cloneLast.insertBefore(dom.firstItem);
                        funs.creatPage();
                        dom.item = $self.find('.slider-item');
                        settings.count = dom.item.length;
                        settings.distance = settings.width / 5;
                        dom.wrap.css('-webkit-transform', 'translate3d(' + -settings.width + 'px,0,0)');
                    },
                    creatPage: () => {
                        var pagelist = '<div class="slider-page"><ul>';
                        for (var i = 0; i < settings.len; i++) {
                            if (i == 0) {
                                pagelist += '<li class="active"></li>';
                            } else {
                                pagelist += '<li></li>';
                            }
                        }
                        pagelist += '</ul></div>';
                        $self.append(pagelist);
                        dom.pagelist = $self.find('.slider-page');
                        dom.pageItem = dom.pagelist.find('li');
                    },
                    bindEvent: function() {
                        $self.off().on({
                            'touchstart': function(e) {
                                e.stopPropagation();
                                //e.preventDefault();
                                clearInterval(settings.timer);
                                settings.startX = e.touches[0].pageX;
                                settings.startY = e.touches[0].pageY;
                            },
                            'touchmove': function(e) {
                                e.stopPropagation();
                                e.preventDefault();
                                var curX = e.touches[0].pageX;
                                var curY = e.touches[0].pageY;
                                var moveX = curX - settings.startX;
                                var moveY = curY-settings.startY;
                                var x = 0;
                                //避免禁用了下拉事件
                                if(Math.abs(moveY)>Math.abs(moveX)){
                                    window.event.returnValue = true;
                                }else{
                                    e.preventDefault();
                                }
                                x = -settings.index * settings.width + moveX;
                                dom.wrap.css('-webkit-transform', 'translate3d(' + x + 'px,0,0)');
                            },
                            'touchend': function(e) {
                                e.stopPropagation();
                                // e.preventDefault();
                                var curX = e.changedTouches[0].pageX;
                                var moveX = curX - settings.startX;
                                if (Math.abs(moveX) >= settings.distance) {
                                    settings.index = settings.index - Math.abs(moveX) / moveX; //判断是向左还是向右
                                }
                                if(settings.index>=settings.count - 1){
                                    settings.index = settings.count - 1;
                                }
                                funs.animate();
                                if (settings.autoplay) {
                                    settings.timer = setInterval(funs.autoAnimate, 3000);
                                }
                            },
                            'webkitTransitionEnd': function(e) {
                                e.stopPropagation();
                                e.preventDefault();
                                dom.wrap.removeClass('transitionable');
                                if (settings.index <= 0) {
                                    settings.index = settings.count - 2;
                                }
                                if (settings.index >= settings.count - 1) {
                                    settings.index = 1;
                                }
                                dom.pageItem.removeClass('active');
                                dom.pageItem.eq('' + (settings.index - 1) + '').addClass('active');
                                dom.wrap.css('-webkit-transform', 'translate3d(' + -settings.index * settings.width + 'px,0,0)');
                            }
                        });
                        $(window).on({
                            'resize': function() {
                                funs.adjustPos();
                            },
                            'orientationchange':function(){
                                funs.adjustPos();
                            }
                        });
                        dom.item.on('click', function(){
                            $(this).data;
                        });
                    },
                    adjustPos: function() {
                        settings.width = dom.wrap.width();
                        settings.distance = settings.width / 5;
                        dom.wrap.css('-webkit-transform', 'translate3d(' + -settings.index * settings.width + 'px,0,0)');
                    },
                    animate: function() {
                        var pageIndex = null;
                        if (settings.index == 4) {
                            pageIndex = 0;
                        } else if (settings.index == 0) {
                            pageIndex = 2;
                        } else {
                            pageIndex = settings.index - 1;
                        }
                        dom.wrap.addClass('transitionable');
                        dom.wrap.css('-webkit-transform', 'translate3d(' + -settings.index * settings.width + 'px,0,0)');
                    },
                    autoAnimate: function() {
                        if (settings.width > 0) {
                            settings.index++;
                            funs.animate();
                        }
                    }
                };

                funs.init();
            });
            return this;
        }
    });
})(Zepto);
