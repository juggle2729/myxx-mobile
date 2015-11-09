'use strict';
(function ($) {
    $.extend($.fn, {
        tabs: function (opts) {
            this.each(function () {
                var $self = $(this);
                var dom = {
                    "titles": $self.find(".tabs-title li"),
                    "panels": $self.find(".tabs-panel")
                };
                showTab(dom.titles.get(opts));
                dom.titles.on(_.clickOrTap, function () {
                    showTab(this);
                });
                dom.panels.on('swipeLeft', function(){
                    var currPanelIndex = dom.panels.indexOf(this);
                    var nextTabIndex = currPanelIndex + 1;
                    if(nextTabIndex < dom.titles.length){
                        showTab(dom.titles.get(nextTabIndex));
                    }
                });
                dom.panels.on('swipeRight', function(){
                    var currPanelIndex = dom.panels.indexOf(this);
                    var nextTabIndex = currPanelIndex-1;
                    if(nextTabIndex >= 0){
                        showTab(dom.titles.get(nextTabIndex));
                    }
                });
                function showTab(title){
                    var index = dom.titles.indexOf(title);
                    var tabId = $(title).data('tabId') || index;
                    var prevTabIndex = dom.titles.indexOf($self.find('.tabs-title li.active').get(0));
                    var slideClass = (index >= prevTabIndex ? 'slideInRight' : 'slideInLeft');
                    dom.titles.eq(index).addClass('active').siblings().removeClass('active');
                    dom.panels.addClass('hide').eq(index).removeClass('hide slideInRight slideInLeft').addClass(slideClass);
                    _.publish('tab/changed', tabId);
                }
            });
            this.changed = function(fn){
                _.subscribe('tab/changed', fn);
            };
            return this;
        }
    });
})(Zepto);
