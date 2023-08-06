$(document).ready(function(){
    $('#board').css({
        'height':document.documentElement.clientHeight
    });
    window.addEventListener('resize', function(event) {
        $('#board').css({
            'height':document.documentElement.clientHeight
        });
    }, true);

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

    $rect = document.getElementsByClassName('B');
    $rect = $rect[0].getBoundingClientRect();
    $('#countB').offset({top: $rect.top-10,left: 'auto'});
    $('#countB').css({
        'width' : '16px',
        'right':'16px',
        'left':'auto'
    });

    $rect = document.getElementsByClassName('BM');
    $rect = $rect[0].getBoundingClientRect();
    $('#countBM').offset({top: $rect.top-10,left: 'auto'});
    $('#countBM').css({
        'width' : '16px',
        'right':'16px',
        'left':'auto'
    });

    $rect = document.getElementsByClassName('C');
    $rect = $rect[0].getBoundingClientRect();
    $('#countC').offset({top: $rect.top-10,left: 'auto'});
    $('#countC').css({
        'width' : '16px',
        'right':'16px',
        'left':'auto'
    });

    $rect = document.getElementsByClassName('CM');
    $rect = $rect[0].getBoundingClientRect();
    $('#countCM').offset({top: $rect.top-10,left: 'auto'});
    $('#countCM').css({
        'width' : '16px',
        'right':'16px',
        'left':'auto'
    });

    $rect = document.getElementsByClassName('CB');
    $rect = $rect[0].getBoundingClientRect();
    $('#countCB').offset({top: $rect.top-10,left: $rect.left + $('.CB').width+20});
    $('#countCB').css({
        'width' : '16px',
        'right':'16px',
        'left':'auto'
    });

});