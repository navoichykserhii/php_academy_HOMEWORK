$(document).ready(function () {
    showAbout();
    like();
    /*===========filter elements=======*/
    var filtCountry = 'all',
        filtConnection = 'all';
    function filter(country, connection) {
        var countMatch = 0;
        $('p.no-match').remove();
        $('.product').css('display', 'none');
        if( connection == 'all' && country == 'all'){
            $('.product').css('display', 'block');
            ++countMatch;
        }
        $('.product').each(function () {
            if ( country == $(this).data('country') && connection == $(this).data('connection-type') ){
                $(this).css('display', 'block');
                ++countMatch;
            }
            else if (country == $(this).data('country') && connection == 'all'){
                $(this).css('display', 'block');
                ++countMatch;
            }
            else if(connection == $(this).data('connection-type') && country == 'all'){
                $(this).css('display', 'block');
                ++countMatch;
            }
        })
        if (countMatch == 0){
            var alertMessage = $('<p>По Вашему запросу совпадений не найдено!</p>');
            alertMessage.addClass('no-match');
            $('#products').append(alertMessage);
        }
    }
    $('.filter-country').change( function () {
        filtCountry = $(this).val();
        filter(filtCountry, filtConnection);
    })
    $('.filter-connection-type').change( function () {
        filtConnection = $(this).val();
        filter(filtCountry, filtConnection);
    })

});

function showAbout() {
    var btnAbout = $('.about').find('button');
    btnAbout.on('click', function () {
        $(this).parent().find('.description').slideToggle();
        if($(this).text() == "Показать описание"){
            $(this).text('Скрыть описание');
        }
        else {
            $(this).text('Показать описание');
        }
    })
};
function like() {
    var btnLike = $('.like');
    btnLike.on('click', function () {
        var message = $("<p>Товар добавлен в наблюдаемые</p>");
        message.addClass('like_press');
        var product = $(this).closest('.product');
        if($(this).data('like_press') == false){
            $(this).closest('.shadow').css('opacity', '0.5');
            product.append(message);
            $(this).data('like_press',true);
        }
        else{
            $(this).closest('.shadow').css('opacity', '1');
            product.find('.like_press').remove();
            $(this).data('like_press',false);
        }
    })
}

