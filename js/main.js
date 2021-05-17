$('.submenu > .menu__element').click(function() {
    if($('#sidebar').hasClass('show')){
        if($(this).hasClass('show')){
            $(this).removeClass('show');
        }else{
            $(this).addClass('show');
        }
    } else{
        showSidebar();
        $(this).addClass('show');
    }
    
});

function showSidebar(){
    if($('#sidebar').hasClass('show')){
        $('#sidebar').removeClass('show');
        $('.submenu__elements').addClass('hide')
        
    }else{
        $('#sidebar').addClass('show');
        $('.submenu__elements').removeClass('hide')
    }
}

var link = document.getElementById("themeLink");

$(document).ready(function(){
    theme = $.cookie('theme');
    if(theme == undefined){
        $.cookie('theme', "css/light.css");
    }else{
        link.setAttribute("href", theme);
    }
    $('.settings-price h4').text('$' + settingsPrice)
})

function changeTheme(theme){
    let lightTheme = "css/light.css";
    let darkTheme = "css/dark.css";

    var currTheme = link.getAttribute("href");

    if(currTheme == lightTheme){
        currTheme = darkTheme;
        theme = "dark";
        $('#day').removeClass('active');
        $('#night').addClass('active');   
    }
    else{    
        currTheme = lightTheme;
        theme = "light";
        $('#night').removeClass('active');
        $('#day').addClass('active');   
    }

    link.setAttribute("href", currTheme);
    $.cookie('theme', theme);
}

$('.popup-call').click(function(){
    $('#'+$(this).attr('data-window')).removeClass('d-none');
});

$('.popup-exit').click(function(){
    $('#'+$(this).attr('data-window')).addClass('d-none');
});