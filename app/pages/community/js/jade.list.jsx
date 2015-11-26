const hot = $('.hot');
const time = $('.time');
_.request('jianbao/applies?time=1').then(resp => {
    const data = resp.data;
    $('.jade-list-page').remove();
    const TreasuresTemplate = Handlebars.compile($('#treasures-template').html())(data);
    $('body').append($(TreasuresTemplate));
    const followIcon = $('.follow-icon');
    const followNumber = $('.follow-number');
    $('.follow').on(_.clickOrTap, function() {
        if(followIcon.hasClass('icon-favor-active')) {
            followIcon.removeClass('icon-favor-active dark-red').addClass('icon-favor');
        } else {
            followIcon.removeClass('icon-favor').addClass('icon-favor-active dark-red');
        }
    });
    $('[href],[data-href]').on(_.clickOrTap, _.go);
});
hot.on(_.clickOrTap, function() {
    time.removeClass('txt-red');
    hot.addClass('txt-red');
    _.request('jianbao/applies?popularity=1').then(resp => {
        const data = resp.data;
        $('.jade-list-page').remove();
        const TreasuresTemplate = Handlebars.compile($('#treasures-template').html())(data);
        $('body').append($(TreasuresTemplate));
        $('[href],[data-href]').on(_.clickOrTap, _.go);
    });
});
time.on(_.clickOrTap, function() {
    hot.removeClass('txt-red');
    time.addClass('txt-red');
    _.request('jianbao/applies?time=1').then(resp => {
        const data = resp.data;
        $('.jade-list-page').remove();
        const TreasuresTemplate = Handlebars.compile($('#treasures-template').html())(data);
        $('body').append($(TreasuresTemplate));
        $('[href],[data-href]').on(_.clickOrTap, _.go);
    });
});
