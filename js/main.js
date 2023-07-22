
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
    
    
    /* БЛОК ПЕРЕМЕННЫЕ*/
    // глобальные переменные для вычситывания индекса добавляемого модуля
    numberIdObjecy = 0;
    idObject = "appended-modul" + numberIdObjecy;

    // это используется чтобы мы не выходили за границы рабочей области
    // получаем глобальные координаты верхнего левого угла области рисования
    let objContainer = document.getElementById('container');
    $containerTX = objContainer.getBoundingClientRect().left;
    $containerTY = objContainer.getBoundingClientRect().top;
    // высчитываем глобальные координаты нижнего правого угла области рисования
    $containerDX = $containerTX + 1050;
    $containerDY = $containerTY + 700;

    $idFinedObjOLD = "appended-modul0";
    // коллекции объектов

    // коллекция скомпонованных объектов (главная ветка)
    const groupMain = new Map();
    // коллекция скомпонованных объектов (побочная ветка)
    const subMain = new Map();
    // массив размещенных объектов
    var appendedObj = new Map();

    //arr.set('key5','value5');
    //console.log(arr);


    /* БЛОК ПЕРЕМЕННЫЕ*/

    //// вспомогательные функции /////
    /// создаем html код модуля
    $creatModul = function(id,$number){
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
                // проверяем что размещаемый объект находится в рабочей области
                if(e.pageY < $containerDY-$deltaY && e.pageY > $containerTY+$deltaY && e.pageX < $containerDX-$deltaX && e.pageX > $containerTX+$deltaX){                    
                    // вычисляем координаты
                    objAdd = document.getElementById(idObject);
                    topY = objAdd.getBoundingClientRect().top;
                    topX = objAdd.getBoundingClientRect().left;
                    dovnY = topY + $('#'+idObject).height();
                    dovnX = topX + $('#'+idObject).width();

                    // условие создание объекта если на доске ничего нет.
                    if(groupMain.size == 0){
                        // основная логика
                        // добавляем объект высчитывем координаты его углов
                        
                        // добавляем id объекта в коллекцию в качестве ключа и добавляем по ключу координаты вершин объекта
                        groupMain.set(idObject,[topX,topY,dovnX,dovnY]);
                        // добавляем в массив размещенных обхектов id размещенного модуля
                        appendedObj.set(idObject,[topX,topY,dovnX,dovnY]);
                        // генерируем новый id для следующего модуля
                        numberIdObjecy = numberIdObjecy + 1;
                        idObject = "appended-modul" + numberIdObjecy;
                        // открепляем событие на клик от текущего модуля
                        $(this).unbind("click");
                    }
                    // если на доске что-то есть.
                    else{
                        /*ну а теперь самое сложно... наверное :D*/
                        // вычисление расстояний и поиск минимального
                        // основная логика
                        /*как найти расстояние до объекта с id*/

                        // var x = -25;
                        // x = Math.abs(x);
                        // 
                        //
                        //
                        
                        $idFinedObjNew = "appended-modul0";
                        $resultDistanse = 9999;

                        //console.log($resultDistanse);
                        for (let key of appendedObj.keys()) {
                            //console.log(key);
                            $lCordX = appendedObj.get(key)[0];
                            $rCordX = appendedObj.get(key)[2];

                            $tCordY = appendedObj.get(key)[1];
                            $bCordY = appendedObj.get(key)[3];

                            // если размещаемый объект ниже
                            if(topY < ($tCordY + ($bCordY -$tCordY)/2)){
                                $distanseY = Math.min($tCordY - topY,$bCordY-dovnY);
                                $topPositions = true;
                                //console.log($distanseY);
                            }
                            // если размещаемый объект ниже
                            else{
                                $distanseY = Math.min(topY - $bCordY,dovnY - $tCordY);
                                $topPositions = false;
                                //console.log($distanseY);
                            }
                            // если размещаемый объект правее
                            if(topX > ($lCordX + ($rCordX -$lCordX)/2)){
                                $rightPositions = true;
                                $distanseX = Math.min(topX-$rCordX,dovnX-$lCordX);
                                //console.log($distanseX);
                            }
                            // если левее
                            else{
                                $distanseX = Math.min(topX-$lCordX,dovnX-$rCordX);
    
                                //console.log($distanseX);
                            }
                            // высчитываем дистанцию
                            $distanse = Math.sqrt($distanseX*$distanseX+$distanseY*$distanseY);
                            if($distanse < $resultDistanse){
                                $resultDistanse = $distanse;
                                // перезависывем переменные
                                if(appendedObj.size == 1){
                                    $idFinedObjOLD = key;
                                    $idFinedObjNew = key;
                                }
                                else{
                                    $idFinedObjOLD = $idFinedObjNew;
                                    $idFinedObjNew = key;
                                }
                            }
                        }


                        // "клеим"
                        //element = this;
                        //var rect = element.getBoundingClientRect();
                        //console.log(rect.top, rect.right, rect.bottom, rect.left);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        
                        // здесь нужно проверить, можно ли клеить элементы
                        // что делать если нельзя ?
                        // идея.при клейке добавлять id приклееных блоков в список списков с позицей l r b t это поможет сделать смещение
                        // болле правильным образом
                        // пока работаем на склейкой двух элементов.

                        element1 = document.getElementById($idFinedObjNew);  
                        var rect1 = element1.getBoundingClientRect();

                        element2 = element1 = document.getElementById(idObject); 
                        var rect2 = element2.getBoundingClientRect();
                        
                        // $distans1Vert - расстояние от нижней границы обж1 до нижней границы обж2
                        // $distans2Vert - расстояние от нижней границы обж1 до верхней границы обж2
                        // $distans3Vert - расстояние от верхней границы обж1 до нижней границы обж2
                        // $distans4Vert - расстояние от верхней границы обж1 до верхней границы обж2
                        $distans1Vert = rect1.bottom - rect2.bottom;
                        $distans2Vert = rect1.bottom -    rect2.top;
                        $distans3Vert = rect1.top    - rect2.bottom;
                        $distans4Vert = rect1.top    -    rect2.top;
                        $attachPosVert = 0;
                        // находим минимальное смещение по модулю по вертикали
                        $minDistans = Math.min(Math.abs($distans1Vert),Math.abs($distans2Vert),Math.abs($distans3Vert),Math.abs($distans4Vert));
                        // вычисляем позицию атача.
                        if($minDistans == Math.abs($distans1Vert)){
                            $attachPosVert = 1;
                        }
                        if($minDistans == Math.abs($distans2Vert)){
                            $attachPosVert = 2;
                        }
                        if($minDistans == Math.abs($distans3Vert)){
                            $attachPosVert = 3;
                        }
                        if($minDistans == Math.abs($distans4Vert)){
                            $attachPosVert = 4;
                        }
                        // $distans1 - расстояние от нижней границы обж1 до нижней границы обж2
                        // $distans2 - расстояние от нижней границы обж1 до верхней границы обж2
                        // $distans3 - расстояние от верхней границы обж1 до нижней границы обж2
                        // $distans4 - расстояние от верхней границы обж1 до верхней границы обж2
                        $distans1Horis = rect1.bottom - rect2.bottom;
                        $distans2Horis = rect1.bottom -    rect2.top;
                        $distans3Horis = rect1.top    - rect2.bottom;
                        $distans4Horis = rect1.top    -    rect2.top;
                        $attachPosHoris = 0;

                        if(rect2.left > (rect1.right-rect1.width/2) && ($attachPosVert == 3 || $attachPosVert == 4)){
                            console.log(element1.offsetHeight/2 , rect1.bottom - rect2.bottom);
                            $('#'+idObject).offset({top: rect2.top+(rect1.top - rect2.top), left: rect2.left - (rect2.left-rect1.right)+1});
                        }
                        if(rect2.left > (rect1.right-rect1.width/2) && ($attachPosVert == 1 || $attachPosVert == 2)){
                            console.log(element1.offsetHeight/2 , rect1.bottom - rect2.bottom);
                            $('#'+idObject).offset({top: rect2.top+(rect1.bottom - rect2.bottom), left: rect2.left - (rect2.left-rect1.right)+1});
                        }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        $('#'+$idFinedObjOLD).css({
                            'background-color': '#B9B9BA'
                        });
                        $('#'+$idFinedObjNew).css({
                            'background-color': '#FFF'
                        });

                        // добавляем id объекта в коллекцию в качестве ключа и добавляем по ключу координаты вершин объекта
                        groupMain.set(idObject,[topX,topY,dovnX,dovnY]);
                        // добавляем в массив размещенных обхектов id размещенного модуля
                        appendedObj.set(idObject,[topX,topY,dovnX,dovnY]);

                        // увеличиваем индекс
                        numberIdObjecy = numberIdObjecy + 1;
                        idObject = "appended-modul" + numberIdObjecy;
                        // открепляем событие на клик от текущего модуля
                        $(this).unbind("click");
                    }
                }
                else{
                    $moovblModul.remove();
                    $(this).unbind("click");
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