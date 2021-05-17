var inverse = false;

$(document).ready(function(){
    $('#exchange-input1 + .currency > div').text(currency1);
    $('#exchange-input1 + .currency > img').attr('src', curImage1);
    $('#exchange-input2 + .currency > div').text(currency2);
    $('#exchange-input2 + .currency > img').attr('src', curImage2);
    inverse = false;
    $('#exchange-input1').val(1.0);
    $('#exchange-input2').val(price);

    $('#BDMperBNB').text(price);
    $('#BNBperBDM').text((1.0 / price).toFixed(9));

    value = $.cookie('perc');
    if(value == undefined){
        $.cookie('perc', 0.5);
    } else{
        $('#exchange-settings-input').val(value);
    }
    $('.exchange-settings-buttons button.active').removeClass('active');
    switch(value){
        case 0.1: $($('.exchange-settings-buttons button')[0]).addClass('active'); break;
        case 0.5: $($('.exchange-settings-buttons button')[1]).addClass('active'); break;
        case 1.0: $($('.exchange-settings-buttons button')[2]).addClass('active'); break;
    }
})

$('.exchange-swap-btn').click(function(){
    inverse = !inverse;
    if(inverse){
        $('#exchange-input1 + .currency > div').text(currency2);
        $('#exchange-input1 + .currency > img').attr('src', curImage2);
        $('#exchange-input2 + .currency > div').text(currency1);
        $('#exchange-input2 + .currency > img').attr('src', curImage1);
        tmp = $('#exchange-input1').val();
        $('#exchange-input1').val($('#exchange-input2').val())
        $('#exchange-input2').val(tmp)
    } else{
        $('#exchange-input1 + .currency > div').text(currency1);
        $('#exchange-input1 + .currency > img').attr('src', curImage1);
        $('#exchange-input2 + .currency > div').text(currency2);
        $('#exchange-input2 + .currency > img').attr('src', curImage2);
        tmp = $('#exchange-input1').val();
        $('#exchange-input1').val($('#exchange-input2').val())
        $('#exchange-input2').val(tmp)
    }
});

$('#exchange-input1').keyup(function(){
    calculated = price;
    if(inverse) calculated = 1.0 / calculated;
    calculated *= $(this).val();
    $('#exchange-input2').val(calculated.toFixed(9));
})

$('#exchange-input2').keyup(function(){
    calculated = price;
    if(!inverse) calculated = 1.0 / calculated;
    calculated *= $(this).val();
    $('#exchange-input1').val(calculated.toFixed(9));
})

$('.exchange-settings-buttons button').click(function(){
    $('.exchange-settings-buttons button.active').removeClass('active');
    $(this).addClass('active');
    value = $(this).text().slice(0, -1);
    $('#exchange-settings-input').val(value);
    $.cookie('perc', value);
})

$('#exchange-settings-input').keyup(function(){
    $('.exchange-settings-buttons button.active').removeClass('active');
    value = parseFloat($(this).val());
    switch(value){
        case 0.1: $($('.exchange-settings-buttons button')[0]).addClass('active'); break;
        case 0.5: $($('.exchange-settings-buttons button')[1]).addClass('active'); break;
        case 1.0: $($('.exchange-settings-buttons button')[2]).addClass('active'); break;
    }
    $.cookie('perc', value);
})