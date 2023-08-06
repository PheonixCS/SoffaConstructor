$(document).ready(function(){
    $('#board').css({
        'height':document.documentElement.clientHeight
    });
    window.addEventListener('resize', function(event) {
        $('#board').css({
            'height':document.documentElement.clientHeight
        });
    });

    $('.RotAndDel').css({
        'display':'none'
    });

    $(".modul").mouseover(function(e){ 
        $(this).css({
            'border-color':'red',
        });
    });
    $(".modul").mouseout(function(e){ 
        $(this).css({
            'border-color':'black',
        });
    });
});