const id = _.query('id') || 1;
_.request(`jianbao/applies/${id}`)
.then(jianbao => {
    const jadeTemplate = Handlebars.compile($('#jade-template').html())(jianbao.data);
    $(jadeTemplate).prependTo('body');

    const socialTemplate = Handlebars.compile($('#social-template').html())(jianbao.data);
    $(socialTemplate).appendTo('.social-actions');

    _.request(`jianbao/applies/${id}/comments`).then(comments => {
        const commentsTemplate = Handlebars.compile($('#comments-template').html())(comments.data);
        $(commentsTemplate).appendTo('.comments');
    });

    $('[data-thumb]').click(event => {
        const target = event.target;
        const currentTarget = event.currentTarget;
        const resultId = currentTarget.dataset.thumb;
        const thumbActive = currentTarget.classList.contains('txt-red');
        _.request(`jianbao/results/${resultId}/like`, thumbActive ? 'DELETE' : 'POST').then(thumb => {
            if(thumb.status === 200) {
                if(thumbActive) {
                    currentTarget.classList.remove('txt-red');
                    target.classList.remove('icon-thumb-active');
                    target.classList.add('icon-thumb');
                } else {
                    currentTarget.classList.add('txt-red');
                    target.classList.add('icon-thumb-active');
                    target.classList.remove('icon-thumb');
                }
            }
        });
    });

    $('[data-follow]').click(event => {
        const target = event.target;
        const currentTarget = event.currentTarget;
        const followActive = currentTarget.classList.contains('txt-red');
        _.request(`jianbao/applies/${jianbao.data.id}/follows`, followActive ? 'DELETE' : 'POST').then(follow => {
            if(follow.status === 200) {
                if(followActive) {
                    currentTarget.classList.remove('txt-red');
                    target.classList.remove('icon-favor-active');
                    target.classList.add('icon-favor');
                } else {
                    currentTarget.classList.add('txt-red');
                    target.classList.add('icon-favor-active');
                    target.classList.remove('icon-favor');
                }
            }
        });
    });
});
