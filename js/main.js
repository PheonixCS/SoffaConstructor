
$(document).ready(function(){
    
    $('#board').css({
        'height':document.documentElement.clientHeight-50
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
    

    // глобальные переменные для вычситывания индекса добавляемого модуля
    numberIdObjecy = 0;
    idObject = "appended-modul" + numberIdObjecy;

    // это используется чтобы мы не выходили за границы рабочей области
    // получаем глобальные координаты верхнего левого угла области рисования
    let objContainer = document.getElementById('container');
    $containerTX = objContainer.getBoundingClientRect().left;
    $containerTY = objContainer.getBoundingClientRect().top;
    // высчитываем глобальные координаты нижнего правого угла области рисования
    $containerDX = $containerTX + 1200;
    $containerDY = $containerTY + 700;

    //// вспомогательные функции /////
    /// создаем html код модуля
    $creatModul = function(id,$number){
        console.log(id);
        if ($number == 1){
            modul  = '<div id = "'+id+'" class = "appended-modul modul B"><div class="modul-nameAppendB B-name">Б</div></div>';
            return modul;
        }
        if ($number == 2){
            modul = '<div id = "'+id+'" class = "appended-modul modul BM"><div class="modul-nameAppendBM BM-name">БМ</div></div>';
            return modul;
        }
        if ($number == 3){
            modul  = '<div id = "'+id+'" class = "appended-modul modul C"><div class="modul-nameAppendC C-name">С</div></div>';
            return modul;
        }
        if ($number == 4){
            modul = '<div id = "'+id+'" class = "appended-modul modul CM"><div class="modul-nameAppendCM CM-name">СM</div></div>';
            return modul;
        }
        if ($number == 5){
            modul = '<div id = "'+id+'" class = "appended-modul modul CB"><div class="modul-nameAppendCB CB-name">СБ</div></div>';
            return modul;
        }
        return -1;
    }
    /// добавляем модуль на холст
    $append = function(tar,elem)
    {
        tar.append(elem);
    }
    /// Основная функция
    $moovFunc = function($numberObj,id,e){
        if (e.which == 1){

            // считываем координаты мыши
            $mouseD_x = e.pageX;
            $mouseD_y = e.pageY;
            // считываем координаты блока на который нажали
            $elemCordX = e.currentTarget.getBoundingClientRect().left;
            $elemCordY = e.currentTarget.getBoundingClientRect().top;
            // вычиляем смещение от позиции мыши для генерации нового объекта
            $deltaX = $mouseD_x-$elemCordX;
            $deltaY = $mouseD_y-$elemCordY;
            
            // получаем html код модуля
            $moovObj = $creatModul(id,$numberObj);
            // добавляем на страницу(он скрыт)
            $append($('body'),$moovObj)

            // получаем добавленный модуль
            $moovblModul = $('#'+id);
            $moovblModul.css({
                'cursor': 'grabbing'
            });
            // смещаем его так, чтобы он был ровно поверх модуля но который нажали
            $moovblModul.offset({top: e.pageY-$deltaY, left: e.pageX-$deltaX});
            // отображаем модуль
            $moovblModul.show();
            
            $('body').css({
                'pointer-events':'none'
            });
            $('#container').css({
                'pointer-events':'auto'
            });

            // запускаем логику если мышь начала движение
            $(document).mousemove(function (e) {
                // пока клавиша зажата и мышь движется меняем динамично смещение модуля
                $moovblModul.offset({top: e.pageY-$deltaY, left: e.pageX-$deltaX});
                /*так же здесь мы будем реализовывать вычисление ближайшего модуля*/


            }).click(function (e) {
                // запускаем логику если кнопка отжата
                if(e.pageY < $containerDY-$deltaY && e.pageY > $containerTY+$deltaY && e.pageX < $containerDX-$deltaX && e.pageX > $containerTX+$deltaX){//   && e.pageX < $containerTX){
                    console.log(true);
                    
                    // условие создание объекта если на доске ничего нет.
                    if(true){
                        // генерируем новый id для следующего модуля
                        numberIdObjecy = numberIdObjecy + 1;
                        idObject = "appended-modul" + numberIdObjecy;
                        // открипляем событие на клик от текущего модуля
                        $(this).unbind("click");
                    }
                    // если на доске что-то есть.
                    else{

                    }
                }
                else{
                    $moovblModul.remove();
                }
                // условия создания объекта если на доске что-то есть.
                $(this).unbind("mousemove");
            });
        };
    };





    $(".B").mousedown(function(e){
        $moovFunc(1,idObject,e);
    });
    $(".BM").mousedown(function(e){
        $moovFunc(2,idObject,e);
    });
    $(".C").mousedown(function(e){
        $moovFunc(3,idObject,e);
    });
    $(".CM").mousedown(function(e){
        $moovFunc(4,idObject,e);
    });
    $(".CB").mousedown(function(e){
        $moovFunc(5,idObject,e);
    });
});