
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

                        $resPos1 = true; // правая грань верхний угол
                        $resPos2 = true; // верхняя грань правый угол
                        $resPos3 = true; //  верхняя грань левый угол
                        $resPos4 = true; //  левая грань верхний угол
                        $resPos5 = true; //   левая грань нижний угол
                        $resPos6 = true; //   нижняя грань левый угол
                        $resPos7 = true; //  нижняя грань правый угол
                        $resPos8 = true; //  правая грань нижний угол

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
                            /////////////// переменные которые уже обьявленны и нам потребуются/////////////
                            //                                                                             /
                            //  $lCordX = appendedObj.get(key)[0]; // координата левой грани притендента   /
                            //  $rCordX = appendedObj.get(key)[2]; // координата правой грани притендента  /
                            //  $tCordY = appendedObj.get(key)[1]; // координата верхней грани притендента /
                            //  $bCordY = appendedObj.get(key)[3]; // координата нижней грани притендента  /
                            //                                                                             /
                            ////////////////////////////////////////////////////////////////////////////////
                            // цикл для определения позиций возможной стыковки.
                            for (let id of appendedObj.keys()) {
                                /////////// блок кода для правой грани правой вершины//////////////////////////////
                                $lX = appendedObj.get(id)[0];
                                $rX = appendedObj.get(id)[2];
                                $tY = appendedObj.get(id)[1];
                                $bY = appendedObj.get(id)[3];

                                $d1 = $tY - $tCordY; // от верхней до верхней
                                $d2 = $bY - $tCordY; // от нижней до верхней
                                $d3 = $lX - $rCordX; // от левой до правой
                                $d4 = $rX - $rCordX; // от правой до правой грани
                                if($d2 > 0 && $d4 > 0){
                                    if(id!=key && $d1 < $('#'+idObject).height() && $d3 < $('#'+idObject).width()){
                                        $pos1 = false;
                                    }
                                }
                                /////////////////////////////////////////////////////////////////////////////////////
                                /////////// блок кода для верхней грани правой вершины//////////////////////////////
                                $lX = appendedObj.get(id)[0];
                                $rX = appendedObj.get(id)[2];
                                $tY = appendedObj.get(id)[1];
                                $bY = appendedObj.get(id)[3];

                                $d1 = $tCordY-$bY;
                                $d2 = $rCordX-$rX;
                                $d3 = $rCordX-$lX;
                                $d4 = $tCordY-$tY;
                                if($d3 > 0 && $d4 > 0){
                                    if(id!=key && $d2 < $('#'+idObject).width() && $d1 < $('#'+idObject).height()){
                                        $pos2 = false;
                                    }
                                }
                                ////////////////////////////////////////////////////////////////////////////////////
                                /////////// блок кода для верхней грани левой вершины//////////////////////////////
                                $lX = appendedObj.get(id)[0];
                                $rX = appendedObj.get(id)[2];
                                $tY = appendedObj.get(id)[1];
                                $bY = appendedObj.get(id)[3];

                                $d1 = $tCordY-$bY;
                                $d2 = $lX-$lCordX;
                                $d3 = $lCordX-$rX;
                                $d4 = $tCordY-$tY;
                                if($d3 < 0 && $d4 > 0){
                                    if(id!=key && $d2 < $('#'+idObject).width() && $d1 < $('#'+idObject).height()){
                                        $pos3 = false;
                                    }
                                }
                                ////////////////////////////////////////////////////////////////////////////////////
                                /////////// блок кода для левой грани верхней вершины//////////////////////////////
                                $lX = appendedObj.get(id)[0];
                                $rX = appendedObj.get(id)[2];
                                $tY = appendedObj.get(id)[1];
                                $bY = appendedObj.get(id)[3];

                                $d1 = $tY - $tCordY; 
                                $d2 = $bY - $tCordY; 
                                $d3 = $lCordX - $rX; 
                                $d4 = $lCordX-$lX;
                                if($d2 > 0 && $d4 > 0){
                                    if(id!=key && $d1 < $('#'+idObject).height() && $d3 < $('#'+idObject).width()){
                                        $pos4 = false;
                                    }
                                }
                                ////////////////////////////////////////////////////////////////////////////////////
                                /////////// блок кода для левой грани нижней вершины//////////////////////////////
                                $lX = appendedObj.get(id)[0];
                                $rX = appendedObj.get(id)[2];
                                $tY = appendedObj.get(id)[1];
                                $bY = appendedObj.get(id)[3];

                                $d1 = $bY - $bCordY; 
                                $d2 = $bY - $tCordY; 
                                $d3 = $lCordX - $rX; 
                                $d4 = $lCordX-$lX;
                                if($d2 > 0 && $d4 > 0){
                                    if(id!=key && $d1 < $('#'+idObject).height() && $d3 < $('#'+idObject).width()){
                                        $pos5 = false;
                                    }
                                }
                                ////////////////////////////////////////////////////////////////////////////////////
                                /////////// блок кода для нижней грани левой вершины//////////////////////////////
                                $lX = appendedObj.get(id)[0];
                                $rX = appendedObj.get(id)[2];
                                $tY = appendedObj.get(id)[1];
                                $bY = appendedObj.get(id)[3];

                                $d1 = $tY-$bCordY;
                                $d2 = $lX-$lCordX;
                                $d3 = $lCordX-$rX;
                                $d4 = $tCordY-$tY;
                                if($d3 < 0 && $d4 < 0){
                                    if(id!=key && $d2 < $('#'+idObject).width() && $d1 < $('#'+idObject).height()){
                                        $pos6 = false;
                                    }
                                }
                                ////////////////////////////////////////////////////////////////////////////////////
                                /////////// блок кода для нижней грани правой вершины//////////////////////////////
                                $lX = appendedObj.get(id)[0];
                                $rX = appendedObj.get(id)[2];
                                $tY = appendedObj.get(id)[1];
                                $bY = appendedObj.get(id)[3];

                                $d1 = $tY-$bCordY;
                                $d2 = $rCordX-$rX;
                                $d3 = $rCordX-$lX;
                                $d4 = $tCordY-$tY;
                                if($d3 > 0 && $d4 < 0){
                                    if(id!=key && $d2 < $('#'+idObject).width() && $d1 < $('#'+idObject).height()){
                                        $pos7 = false;
                                    }
                                }
                                ////////////////////////////////////////////////////////////////////////////////////
                                /////////// блок кода для правой грани нижней вершины//////////////////////////////
                                $lX = appendedObj.get(id)[0];
                                $rX = appendedObj.get(id)[2];
                                $tY = appendedObj.get(id)[1];
                                $bY = appendedObj.get(id)[3];

                                $d1 = $bCordY - $bY; 
                                $d2 = $bY - $tCordY; 
                                $d3 = $lX - $rCordX;
                                $d4 = $rX - $rCordX; 
                                if($d2 > 0 && $d4 > 0){
                                    if(id!=key && $d1 < $('#'+idObject).height() && $d3 < $('#'+idObject).width()){
                                        $pos8 = false;
                                    }
                                }
                                ////////////////////////////////////////////////////////////////////////////////////
                            }
                            // если свободна площадь меньше чем площадь модуля, то вершину помечаем недоступной для стыковки.
                            //console.log("pos1",key,$pos1);
                            //console.log("pos2",key,$pos2);
                            //console.log("pos3",key,$pos3);
                            //console.log("pos4",key,$pos4);
                            //console.log("pos6",key,$pos6);
                            //console.log("pos7",key,$pos7);
                            //console.log("pos8",key,$pos8);
                            ///////////////////////////////////////////////////////////
                            ////////////////////// end block //////////////////////////
                            ///////////////////////////////////////////////////////////



                            $dist = function(x1,y1,x2,y2){
                                return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
                            };
                            // дистанция от центра размещаемого до центра нижней грани рассматриваемого размещенного
                            // pos6 или pos7 должны быть true.
                            $dist1 = 99999999;
                            $dist2 = 99999999;
                            $dist3 = 99999999;
                            $dist4 = 99999999;

                            if($pos1 || $pos2 || $pos3 || $pos4 || $pos5 || $pos6 || $pos7 || $pos8){
                                if($pos6 || $pos7){
                                    $dist1 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterDovnGrX,$cordCenterDovnGrY);
                                }
                                // дистанция от центра размещаемого до центра верхней грани рассматриваемого размещенного
                                // pos2 или pos3 должны быть true.
                                if($pos2 || $pos3){
                                    $dist2 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterTopGrX,$cordCenterTopGrY);
                                }
                                // дистанция от центра размещаемого до центра левой грани рассматриваемого размещенного
                                // pos4 или pos5 должны быть true.
                                if($pos4 || $pos5){
                                    $dist3 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterLeftGrX ,$cordCenterLeftGrY);
                                }
                                // дистанция от центра размещаемого до центра правой грани рассматриваемого размещенного
                                // pos1 или pos8 должны быть true.
                                if($pos1 || $pos8){
                                    $dist4 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterRightGrX ,$cordCenterRightGrY);
                                }
                            }
                            else{
                                continue;
                            }

                            

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
                                // здесь так же нужно перезаписать глобальные переменные разрешенных позиций клейки для объекта
                                if(appendedObj.size == 1){
                                    $idFinedObjOLD = key;
                                    $idFinedObjNew = key;
                                }
                                else{
                                    //$idFinedObjNew = key;
                                    console.log($idFinedObjNew);
                                    $idFinedObjOLD = $idFinedObjNew;
                                    $idFinedObjNew = key;
                                    $resPos1 = $pos1; // правая грань верхний угол
                                    $resPos2 = $pos2; // верхняя грань правый угол
                                    $resPos3 = $pos3; //  верхняя грань левый угол
                                    $resPos4 = $pos4; //  левая грань верхний угол
                                    $resPos5 = $pos5; //   левая грань нижний угол
                                    $resPos6 = $pos6; //   нижняя грань левый угол
                                    $resPos7 = $pos7; //  нижняя грань правый угол
                                    $resPos8 = $pos8; //  правая грань нижний угол
                                }
                            }
                        }

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
                            
                            // $resPos1 = $pos1; // правая грань верхний угол
                            // $resPos2 = $pos2; // верхняя грань правый угол
                            // $resPos3 = $pos3; //  верхняя грань левый угол
                            // $resPos4 = $pos4; //  левая грань верхний угол
                            // $resPos5 = $pos5; //   левая грань нижний угол
                            // $resPos6 = $pos6; //   нижняя грань левый угол
                            // $resPos7 = $pos7; //  нижняя грань правый угол
                            // $resPos8 = $pos8; //  правая грань нижний угол

                            // мы имеем информацию о разрешенных позициях для клейки
                            console.log($resPos1,$resPos2,$resPos3,$resPos4,$resPos5,$resPos6,$resPos7,$resPos8,$idFinedObjNew);
                            $updateCord = function(){
                                objAdd = document.getElementById(idObject);
                                topY = objAdd.getBoundingClientRect().top;
                                topX = objAdd.getBoundingClientRect().left;
                                dovnY = topY + $('#'+idObject).height();
                                dovnX = topX + $('#'+idObject).width();
                                groupMain.set(idObject,[topX,topY,dovnX,dovnY]);
                                // добавляем в массив размещенных обхектов id размещенного модуля
                                appendedObj.set(idObject,[topX,topY,dovnX,dovnY]);
                            }


                            element1 = document.getElementById($idFinedObjNew);  
                            var rect1 = element1.getBoundingClientRect(); // объект к которому клеим

                            element2 = element1 = document.getElementById(idObject); 
                            var rect2 = element2.getBoundingClientRect(); // объект который клеим
                            
                            // $distans1Vert  - расстояние от нижней границы обж1 до нижней   границы обж2
                            // $distans2Vert  - расстояние от нижней границы обж1 до верхней  границы обж2
                            // $distans3Vert  - расстояние от верхней границы обж1 до нижней  границы обж2
                            // $distans4Vert  - расстояние от верхней границы обж1 до верхней границы обж2
                            // $attachPosVert - позиция приклеивания по вертикали
                            // ниже происходит вычисление минимально расстояние до всех позиций атача
                            // а нужно считать минимально расстояние только до разрешенной позиции атача
                            // 
                            // 
                            //
                            //
                            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                            $resultDist1 = 9999;
                            $resultDist2 = 9999;
                            $resultDist3 = 9999;
                            $resultDist4 = 9999;
                            $resultDist5 = 9999;
                            $resultDist6 = 9999;
                            $resultDist7 = 9999;
                            $resultDist8 = 9999;
                            $distanse1Vert = 9999;
                            $distanse1Horisont = 9999;
                            $distanse2Vert = 9999;
                            $distanse2Horisont = 9999;
                            $distanse3Vert = 9999;
                            $distanse3Horisont = 9999;
                            $distanse4Vert = 9999;
                            $distanse4Horisont = 9999;
                            $distanse5Vert = 9999;
                            $distanse5Horisont = 9999;
                            $distanse6Vert = 9999;
                            $distanse6Horisont = 9999;
                            $distanse7Vert = 9999;
                            $distanse7Horisont = 9999;
                            $distanse8Vert = 9999;
                            $distanse8Horisont = 9999;
                            if($resPos1){
                                $distanse1Vert = rect1.top - rect2.top;
                                $distanse1Horisont = rect1.right - rect2.left;
                                $resultDist1 = Math.sqrt($distanse1Vert*$distanse1Vert+$distanse1Horisont*$distanse1Horisont);
                            }
                            if($resPos2){
                                $distanse2Vert = rect1.top - rect2.bottom;
                                $distanse2Horisont = rect1.right - rect2.right;
                                $resultDist2 = Math.sqrt($distanse2Vert*$distanse2Vert+$distanse2Horisont*$distanse2Horisont);
                            }
                            if($resPos3){
                                $distanse3Vert = rect1.top - rect2.bottom;
                                $distanse3Horisont = rect1.left - rect2.left;
                                $resultDist3 = Math.sqrt($distanse3Vert*$distanse3Vert+$distanse3Horisont*$distanse3Horisont);
                            }
                            if($resPos4){
                                $distanse4Vert = rect1.top - rect2.top;
                                $distanse4Horisont = rect1.left - rect2.right;
                                $resultDist4 = Math.sqrt($distanse4Vert*$distanse4Vert+$distanse4Horisont*$distanse4Horisont);
                            }
                            if($resPos5){
                                $distanse5Vert = rect1.bottom - rect2.bottom;
                                $distanse5Horisont = rect1.left  - rect2.right;
                                $resultDist5 = Math.sqrt($distanse5Vert*$distanse5Vert+$distanse5Horisont*$distanse5Horisont);
                            }
                            if($resPos6){
                                $distanse6Vert = rect1.bottom -  rect2.top;
                                $distanse6Horisont =  rect1.left - rect2.left;
                                $resultDist6 = Math.sqrt($distanse6Vert*$distanse6Vert+$distanse6Horisont*$distanse6Horisont);
                            }
                            if($resPos7){
                                $distanse7Vert = rect1.bottom - rect2.top;
                                $distanse7Horisont = rect1.right - rect2.right;
                                $resultDist7 = Math.sqrt($distanse7Vert*$distanse7Vert+$distanse7Horisont*$distanse7Horisont);
                            }
                            if($resPos8){
                                $distanse8Vert = rect1.bottom - rect2.bottom;
                                $distanse8Horisont = rect1.right - rect2.left;
                                $resultDist8 = Math.sqrt($distanse8Vert*$distanse8Vert+$distanse8Horisont*$distanse8Horisont);
                            }
                            $resultDistanse = Math.min($resultDist1,$resultDist2,$resultDist3,$resultDist4,$resultDist5,$resultDist6,$resultDist7,$resultDist8);
                            $resultPos = 0;
                            if($resultDistanse == $resultDist1){
                                $resultPos = 1
                            }
                            if($resultDistanse == $resultDist2){
                                $resultPos = 2
                            }
                            if($resultDistanse == $resultDist3){
                                $resultPos = 3
                            }
                            if($resultDistanse == $resultDist4){
                                $resultPos = 4
                            }
                            if($resultDistanse == $resultDist5){
                                $resultPos = 5
                            }
                            if($resultDistanse == $resultDist6){
                                $resultPos = 6
                            }
                            if($resultDistanse == $resultDist7){
                                $resultPos = 7
                            }
                            if($resultDistanse == $resultDist8){
                                $resultPos = 8
                            }
                            console.log($resultPos);
                            if($resultPos == 1){
                                $('#'+idObject).offset({top: rect1.top, left: rect2.left - (rect2.left-rect1.right)+1});
                                $updateCord();
                            }
                            
                            if($resultPos == 2){
                                $('#'+idObject).offset({top: rect2.top-(rect2.bottom-rect1.top)-1, left: rect1.right-(rect2.right-rect2.left)});
                                $updateCord();
                            }
                            if($resultPos == 3){
                                $('#'+idObject).offset({top: rect2.top-(rect2.bottom-rect1.top)-1, left: rect1.left});
                                $updateCord();
                            }
                            if($resultPos == 4){
                                $('#'+idObject).offset({top: rect2.top+(rect1.top - rect2.top), left: rect2.left+(rect1.left - rect2.right)-1});
                                $updateCord();
                            }
                            if($resultPos == 5){
                                $('#'+idObject).offset({top: rect2.top-(rect2.bottom-rect1.bottom), left: rect2.left+(rect1.left - rect2.right)-1});
                                $updateCord();
                            }
                            if($resultPos == 6){
                                $('#'+idObject).offset({top: rect1.bottom+1, left: rect1.left});
                                $updateCord();
                            }
                            if($resultPos == 7){
                                $('#'+idObject).offset({top: rect1.bottom+1, left: rect1.right-(rect2.right-rect2.left)});
                                $updateCord();
                            }
                            if($resultPos == 8){
                                $('#'+idObject).offset({top: rect2.top+(rect1.bottom - rect2.bottom), left: rect2.left - (rect2.left-rect1.right)+1});
                                $updateCord();
                            }
                            else{
                                $('#'+$idFinedObjOLD).css({
                                    'background-color': '#B9B9BA'
                                });
                                $('#'+$idFinedObjNew).css({
                                    'background-color': '#FFF'
                                });

                                

                                // увеличиваем индекс
                                numberIdObjecy = numberIdObjecy + 1;
                                idObject = "appended-modul" + numberIdObjecy;
                                // открепляем событие на клик от текущего модуля
                                $(this).unbind("click");
                            }
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