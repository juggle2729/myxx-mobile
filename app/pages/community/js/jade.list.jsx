const hot = $('.hot');
const time = $('.time');

_.request('jianbao/applies').then(resp => {
    const data = resp.data;
    $('.jade-list-page').remove();
    const TreasuresTemplate = Handlebars.compile($('#treasures-template').html())(data);
    $('body').append($(TreasuresTemplate));
    data.applies.forEach(apply => {
        if (apply.results.length === 0) {
            $('table').css('padding-bottom', '24px');
        }
    });
});

hot.on(_.clickOrTap, function() {
    time.removeClass('txt-red');
    hot.addClass('txt-red');
    _.request('jianbao/applies?popularity=1').then(resp => {
        const data = resp.data;
        $('.jade-list-page').remove();
        const TreasuresTemplate = Handlebars.compile($('#treasures-template').html())(data);
        $('body').append($(TreasuresTemplate));
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
    });
});
