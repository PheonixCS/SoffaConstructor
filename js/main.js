
$(document).ready(function(){
    
    $('#board').css({
        'height':document.documentElement.clientHeight
    });
    window.addEventListener('resize', function(event) {
        $('#board').css({
            'height':document.documentElement.clientHeight
        });
    }, true);

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
    $updateSize = function(){
        let objContainer = document.getElementById('container');
        rectcont = objContainer.getBoundingClientRect();
        $containerRX = rectcont.right-$('#menu').width();
        return $containerRX;
    };

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
            $elemCordXR = e.currentTarget.getBoundingClientRect().right;
            // вычиляем смещение от позиции мыши для генерации нового объекта
            $deltaX = $mouseD_x-$elemCordX;
            $deltaY = $mouseD_y-$elemCordY;
            $deltaXR = $elemCordXR-$mouseD_x;
            // получаем html код модуля
            $moovObj = $creatModul(id,$numberObj);
            // добавляем на страницу(он скрыт)
            $append($('.canvas-UI'),$moovObj)

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
            }).click(function (e) {
                // запускаем логику если кнопка отжата
                // проверяем что размещаемый объект находится в рабочей области
                if(e.pageX + $deltaXR < $updateSize()){                    
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
                        
                        $idFinedObjNew = "appended-modul0";
                        $resultDistanse = 9999;

                        // поиск объекта к котором будем клеится
                        for (let key of appendedObj.keys()) {
                            // нужно добавить проверку, что к объекту можно приклеить и с какой стороны приклеить.

                            // идея 
                            // проверять не только дистанцию до грани но и проверять две позиции стыковки на пересечения в случае стыковки
                            // если будут пересечения, то браковать позицию стыковки. - гуд идея. Меньше памяти, меньше трудоемкость.
                            
                            // взависимоси от стороны высчитывается расстояние до грани.
                            // нужно записать так же с какой стороны клеить.


                            $lCordX = appendedObj.get(key)[0]; // координата левой грани притендента
                            $rCordX = appendedObj.get(key)[2]; // координата правой грани притендента
                            $tCordY = appendedObj.get(key)[1]; // координата верхней грани притендента
                            $bCordY = appendedObj.get(key)[3]; // координата нижней грани притендента

                            //topY - верхняя грань нашего размещаемого объекта
                            //topX - левая грань объекта
                            //dovnY - нижняя грань,
                            //dovnX  - правая грань.

                            // координаты центра перемещаемого объекта
                            $cordCenterMoovObjX = (topX+dovnX)/2;
                            $cordCenterMoovObjY = (topY+dovnY)/2;
                            /////////////////////////////////////////

                            // координаты центра нижней грани
                            $cordCenterDovnGrX = $lCordX+($rCordX-$lCordX)/2;
                            $cordCenterDovnGrY = $bCordY;

                            // координаты центра верхней грани
                            $cordCenterTopGrX = $lCordX+($rCordX-$lCordX)/2;
                            $cordCenterTopGrY = $tCordY;

                            // координаты центра левой грани
                            $cordCenterLeftGrX = $lCordX;
                            $cordCenterLeftGrY = $tCordY+($bCordY-$tCordY)/2;

                            // координаты центра правой грани
                            $cordCenterRightGrX = $rCordX;
                            $cordCenterRightGrY = $tCordY+($bCordY-$tCordY)/2;

                            //////////////////////////////////////////

                            ///////////////////////////////////////////////////////////
                            //// здесь код проверки позиций на разрешение стыковки ////
                            ///////////////////////////////////////////////////////////

                            $pos1 = true; // правая грань верхний угол
                            $pos2 = true; // верхняя грань правый угол
                            $pos3 = true; //  верхняя грань левый угол
                            $pos4 = true; //  левая грань верхний угол
                            $pos5 = true; //   левая грань нижний угол
                            $pos6 = true; //   нижняя грань левый угол
                            $pos7 = true; //  нижняя грань правый угол
                            $pos8 = true; //  правая грань нижний угол

                            // допустим есть объект key(id) и есть список всех объектов, как проврить можно ли стыковать
                            // к верхнему правому углу? минимальное расстояние от правой верхней вершины до
                            // верхней грани остальных обеъктов, у которыйх ось y удалена в право от оси y объекта key(id) должно быть
                            // больше чем ширина объекта idObject. 
                            
                            //////////////////////////////////////////
                            //
                            //      2________1
                            //      |        |
                            //      |        |
                            //      |        |
                            //      |________| 
                            //      3        4
                            //
                            ///////////////////////////////////////////

                            $maxSpase14 = 999; // для проверки доступности $pos1
                            $maxSpase12 = 999; // для проверки доступности $pos2
                            $maxSpase21 = 999; // для проверки доступности $pos3
                            $maxSpase23 = 999; // для проверки доступности $pos4
                            $maxSpase32 = 999; // для проверки доступности $pos5
                            $maxSpase34 = 999; // для проверки доступности $pos6
                            $maxSpase43 = 999; // для проверки доступности $pos7
                            $maxSpase41 = 999; // для проверки доступности $pos8

                            /////////////// переменные которые уже обьявленны и нам потребуются
                            //
                            //  $lCordX = appendedObj.get(key)[0]; // координата левой грани притендента
                            //  $rCordX = appendedObj.get(key)[2]; // координата правой грани притендента
                            //  $tCordY = appendedObj.get(key)[1]; // координата верхней грани притендента
                            //  $bCordY = appendedObj.get(key)[3]; // координата нижней грани притендента
                            //
                            //  
                            //
                            //
                            ////////////////////////////////////////////////////////////////////
                            // цикл для верхней вершины правой грани pos1
                            console.log($maxSpase14,$pos1);
                            for (let id of appendedObj.keys()) {
                                if((appendedObj.get(id)[1]-$tCordY < $maxSpase14) && ($rCordX-appendedObj.get(id)[0] < $('#'+idObject).height()) && id!=key){
                                    $maxSpase14 = appendedObj.get(key)[1]-$tCordY;
                                }
                            }
                            if($maxSpase14 < $('#'+idObject).height()){
                                $pos1 = false;
                            }

                            // цикл для верхней вершины правой грани pos2 (отлажено)
                            for (let id of appendedObj.keys()) {
                                if($rCordX-appendedObj.get(id)[2] >= 0 &&($rCordX-appendedObj.get(id)[2] < $maxSpase12) && ($tCordY-appendedObj.get(id)[3] < $('#'+idObject).height()) && id != key ){
                                    $maxSpase12 = $rCordX-appendedObj.get(id)[2];
                                    //console.log(key,id,$maxSpase12);
                                }
                            }
                            if($maxSpase12 < $('#'+idObject).width()){
                                $pos2 = false;
                            }
                            //console.log(key,$maxSpase12,$pos2);
                            //alert(1);



                            ///////////////////////////////////////////////////////////
                            ////////////////////// end block //////////////////////////
                            ///////////////////////////////////////////////////////////



                            $dist = function(x1,y1,x2,y2){
                                return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
                            };
                            // дистанция от центра размещаемого до центра нижней грани рассматриваемого размещенного
                            // pos6 или pos7 должны быть true.
                            $dist1 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterDovnGrX,$cordCenterDovnGrY);
                            // дистанция от центра размещаемого до центра верхней грани рассматриваемого размещенного
                            // pos2 или pos3 должны быть true.
                            $dist2 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterTopGrX,$cordCenterTopGrY);
                            // дистанция от центра размещаемого до центра левой грани рассматриваемого размещенного
                            // pos4 или pos5 должны быть true.
                            $dist3 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterLeftGrX ,$cordCenterLeftGrY);
                            // дистанция от центра размещаемого до центра правой грани рассматриваемого размещенного
                            // pos1 или pos8 должны быть true.
                            $dist4 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterRightGrX ,$cordCenterRightGrY);

                            

                            $distanse = Math.min($dist1,$dist2,$dist3,$dist4);
                            // на данном этапе у нас есть информация о истанции до объекта размещения а так же о разрешенных
                            // позициях прикрепления

                            $minDistanse = 30+$dist(topX,topY,$cordCenterMoovObjX,$cordCenterMoovObjY);
                            //console.log($minDistanse,$distanse,key);
                            if($('#'+idObject).hasClass('B')){
                                $minDistanse = 130;
                            }
                            if($('#'+idObject).hasClass('BM')){
                                $minDistanse = 130;
                            }
                            if($('#'+idObject).hasClass('CM')){
                                $minDistanse = 130;
                            }
                            if($('#'+idObject).hasClass('C')){
                                $minDistanse = 130;
                            }
                            if($('#'+idObject).hasClass('CB')){
                                $minDistanse = 130;
                            }
                            //console.log($distanse,$dist1,$dist2,$dist3,$dist4);
                            
                            // проверяем что дистанция подходящая. По умолчанию до переопределения дистанция у нас они не подходящие
                            // соответвенно если все позиции запрещенные мы не должны попасть в этот блок
                            if($distanse < $resultDistanse && $distanse < $minDistanse){
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


                        //////////////тут код проверки видимых объектов определения позиции клейки и т.д.///////////////



                        // по выходу из цикла нам нужно знать объект к которому клеить и разрешенные позиции клейки
                        // или нужно знать что разрешение стыковки ни с каким объектом не получено
                        // это возможно в случае если в определенном радиусе minDistanse нет объектов с разрешенной позицией клейки
                        // тогда нужно проверить что не происходит наложение по текущему месту разрешения
                        // если наложения нет оставить объект на месте
                        // если наложение есть то не размещать объект.

                        if($resultDistanse < 9999){
                            // "клеим"
                            //element = this;
                            //var rect = element.getBoundingClientRect();
                            //console.log(rect.top, rect.right, rect.bottom, rect.left);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            
                            // здесь нужно проверить, можно ли клеить элементы
                            // что делать если нельзя ?
                            // идея.при клейке добавлять id приклееных блоков в список списков с позицей l r b t это поможет сделать смещение
                            // болле правильным образом
                            // пока работаем на склейкой двух элементов.

                            element1 = document.getElementById($idFinedObjNew);  
                            var rect1 = element1.getBoundingClientRect();

                            element2 = element1 = document.getElementById(idObject); 
                            var rect2 = element2.getBoundingClientRect();
                            
                            // $distans1Vert  - расстояние от нижней границы обж1 до нижней   границы обж2
                            // $distans2Vert  - расстояние от нижней границы обж1 до верхней  границы обж2
                            // $distans3Vert  - расстояние от верхней границы обж1 до нижней  границы обж2
                            // $distans4Vert  - расстояние от верхней границы обж1 до верхней границы обж2
                            // $attachPosVert - позиция приклеивания по вертикали
                            $distans1Vert = rect1.bottom - rect2.bottom;
                            $distans2Vert = rect1.bottom -    rect2.top;
                            $distans3Vert = rect1.top    - rect2.bottom;
                            $distans4Vert = rect1.top    -    rect2.top;
                            $attachPosVert = 0;
                            // находим минимальное смещение по модулю по вертикали
                            $minDistansVert = Math.min(Math.abs($distans1Vert),Math.abs($distans2Vert),Math.abs($distans3Vert),Math.abs($distans4Vert));
                            // вычисляем позицию атача.
                            if($minDistansVert == Math.abs($distans1Vert)){
                                $attachPosVert = 1;
                            }
                            if($minDistansVert == Math.abs($distans2Vert)){
                                $attachPosVert = 2;
                            }
                            if($minDistansVert == Math.abs($distans3Vert)){
                                $attachPosVert = 3;
                            }
                            if($minDistansVert == Math.abs($distans4Vert)){
                                $attachPosVert = 4;
                            }
                            // $distans1Horis  - расстояние от левой границы обж1 до левой   границы обж2
                            // $distans2Horis  - расстояние от левой границы обж1 до правой  границы обж2
                            // $distans3Horis  - расстояние от правой границы обж1 до левой  границы обж2
                            // $distans4Horis  - расстояние от правой границы обж1 до правой границы обж2
                            // $attachPosHoris - позиция приклеивания по горизонтали
                            $distans1Horis = rect1.left  - rect2.left;
                            $distans2Horis = rect1.left  - rect2.right;
                            $distans3Horis = rect1.right  - rect2.left;
                            $distans4Horis = rect1.right - rect2.right;
                            $attachPosHoris = 0;

                            $minDistansHoris = Math.min(Math.abs($distans1Horis),Math.abs($distans2Horis),Math.abs($distans3Horis),Math.abs($distans4Horis));
                            if($minDistansHoris == Math.abs($distans1Horis)){
                                $attachPosHoris = 1;
                            }
                            if($minDistansHoris == Math.abs($distans2Horis)){
                                $attachPosHoris = 2;
                            }
                            if($minDistansHoris == Math.abs($distans3Horis)){
                                $attachPosHoris = 3;
                            }
                            if($minDistansHoris == Math.abs($distans4Horis)){
                                $attachPosHoris = 4;
                            }
                            console.log($attachPosHoris,$attachPosVert);
                            // аттач справа
                            // к верхнему углу
                            if(($attachPosHoris == 3 && $attachPosVert == 4)||($attachPosHoris == 4 && $attachPosVert == 4)||($attachPosHoris == 3 && $attachPosVert == 3 && $distans3Vert < 0)){
                                $('#'+idObject).offset({top: rect2.top+(rect1.top - rect2.top), left: rect2.left - (rect2.left-rect1.right)+1});
                            }
                            // к нижнему углу
                            if(($attachPosHoris == 3 && $attachPosVert == 1) || ($attachPosHoris == 4 && $attachPosVert == 1) || ($attachPosHoris == 3 && $attachPosVert == 2 && $distans2Vert > 0)){
                                $('#'+idObject).offset({top: rect2.top+(rect1.bottom - rect2.bottom), left: rect2.left - (rect2.left-rect1.right)+1});
                            }
                            // аттач слева к верхнему углу
                            if($attachPosHoris == 2 && $attachPosVert == 4 && rect1.top - rect2.bottom > rect1.top - rect2.top ){
                                $('#'+idObject).offset({top: rect2.top-(rect1.top - rect2.bottom), left: rect2.left+(rect1.left - rect2.right)-1});
                            }
                            if(($attachPosHoris == 2 && $attachPosVert == 4)||($attachPosHoris == 1 && $attachPosVert == 4) && rect1.top - rect2.bottom <= rect1.top - rect2.top || (($attachPosHoris == 2 && $attachPosVert == 3 && $distans3Vert < 0))){
                                $('#'+idObject).offset({top: rect2.top+(rect1.top - rect2.top), left: rect2.left+(rect1.left - rect2.right)-1});
                            }
                            // аттач слева к нижнему углу
                            if(($attachPosHoris == 2 && $attachPosVert == 1)||($attachPosHoris == 1 && $attachPosVert == 1) && rect1.bottom - rect2.top > rect1.bottom - rect2.bottom || (($attachPosHoris == 2 && $attachPosVert == 2) && $distans2Vert >=0)){
                                $('#'+idObject).offset({top: rect2.top-(rect2.bottom-rect1.bottom), left: rect2.left+(rect1.left - rect2.right)-1});
                            }

                            // аттач сверху к левому углу
                            if(($attachPosHoris == 1 && $attachPosVert == 3) || ($attachPosHoris == 2 && $attachPosVert == 3 && $distans3Vert >= 0)){
                                $('#'+idObject).offset({top: rect2.top-(rect2.bottom-rect1.top)-1, left: rect1.left});
                            }

                            // аттач сверху к правому углу
                            if(($attachPosHoris == 3 && $attachPosVert == 3 && $distans3Vert >= 0) || ($attachPosHoris == 4 && $attachPosVert == 3)){
                                $('#'+idObject).offset({top: rect2.top-(rect2.bottom-rect1.top)-1, left: rect1.right-(rect2.right-rect2.left)});
                            }

                            // аттач снизу к левому углу
                            if(($attachPosHoris == 1 && $attachPosVert == 2) || ($attachPosHoris == 2 && $attachPosVert == 2 && $distans2Vert <= 0 )){
                                $('#'+idObject).offset({top: rect1.bottom+1, left: rect1.left});
                                console.log($distans2Vert);
                            }
                            // аттач снизу к правому углу
                            if(($attachPosHoris == 4 && $attachPosVert == 2) || ($attachPosHoris == 3 && $attachPosVert == 2 && $distans2Vert <= 0 )){
                                $('#'+idObject).offset({top: rect1.bottom+1, left: rect1.right-(rect2.right-rect2.left)});
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
                        else {

                            // если разрешаемый объект стыковки не был найден, нужно провести проверку, можно ли размещать объект
                            // на той позиции на которой он находится. Для этого нужно проврить не находимся ли мы в пересечении с
                            // каким либо уже добавленным объектом, если нет, то соответсвенно размещаем, если да, то не размещаем(пока что).

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