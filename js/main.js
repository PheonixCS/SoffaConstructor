$(document).ready(function(){

    // блок переменные.
    ////////// подсчет объектов
    $countB = 0;
    $countBM = 0;
    $countC = 0;
    $countCM = 0;
    $countCB = 0;
    /////////
    $baseScale = 100;
    $minConstDist = 30;
    $mainObj = 0; 
    // меняем масштаб.
    $baseWidth = 101;
    $baseHeight = 303;
    $basescale = 0.05;
    // глобальные переменные для вычситывания индекса добавляемого модуля
    numberIdObjecy = 0;
    idObject = "appended-modul" + numberIdObjecy;
    $idFinedObjOLD = "appended-modul0";
    // коллекции объектов
    // массив размещенных объектовappend
    var appendedObj = new Map();
    // храним информацию о повороте объетов
    var rotationObj = new Map();
    // храним позиционку объектов.
    var groupsPositionsStr = new Map();
    var groupsPositionsRev = new Map();
    var BaseObjMap = new Map();// список объектов без родителей.
    // структура данных готова и строится гуд образом
    /// переменные для калькулятора ////
    $minTop = 99999999999;
    $maxBottom = 0;
    $minLeft = 9999999999;
    $maxRight = 0;
    $scaleH = 1;
    $scaleW = 1;
    // для начала сделаем разделение. (готов)
    // данная функция работает пока при размещении объектов
    // неободимо чтобы она запускалась при размещении только если коллекция размещения генеральная
    // так же необходимо создать подобную функцию для перетаскивания объектов
    // там три ситуации добавление к генеральному и перенести из генерального к генеральному или из генерального к не генеральному
    // при добавлении к генеральному от не генерального просто запустить функцию ниже
    // при добавлении из генерального к генеральному, сначала нужно запустить функцию "удаления" которая будет пересчитывать размеры генерального
    // объекта, после этого добавить к генеральному и запустить функцию ниже
    // при добавлении из генерального к не генеральному, необходимо просто запустить функцию пересчета генерального
    // и того нам нужно еще две функции. функция пересчета генерального, и функцию объединяющую эти две функции(функция контроллер в которой будут
    // прописаны условия когда какую функцию запускать).
    $realBHeight = 110;
    $realBWidth = 35;
    $realBMHeight = 75;
    $realBMWidth = 35;
    $realCHeight = 75;
    $realCWidth = 110;
    $realCMHeight = 75;
    $realCMWidth = 75;
    $realCBHeight = 110;
    $realCBWidth = 110;

    $currentBHeight = 110;
    $currentBWidth = 35;
    // логика выделения
    selectObj = 0;
    //////// список объектов в группе для подсчета размера блока.
    $findObjects = new Map();
    ////////////////////
    $counterModuls = function($id,$command){
        
        if($command){
            $delta = 1;
        }
        else {
            $delta = -1; 
        }
        if($('#'+$id).hasClass('appendedB')){
            $countB = $countB + $delta;
            $('#countB').text($countB);
        }
        if($('#'+$id).hasClass('appendedBM')){
            $countBM = $countBM + $delta;
            $('#countBM').text($countBM);
        }
        if($('#'+$id).hasClass('appendedC')){
            $countC = $countC + $delta;
            $('#countC').text($countC);
        }
        if($('#'+$id).hasClass('appendedCM')){
            $countCM = $countCM + $delta;
            $('#countCM').text($countCM);
        }
        if($('#'+$id).hasClass('appendedCB')){
            $countCB = $countCB + $delta;
            $('#countCB').text($countCB);
        }
    };
    $currentSize = function(){
        $bOriginWidth = 35;
        $bOriginHeight = 110;
        $currentBWidth = ($updateSize()*$basescale);
        $currentBHeight = ($bOriginHeight*($currentBWidth/$bOriginWidth));
        //console.log($currentBHeight,$currentBWidth);
        
        $scaleH = $currentBHeight/$realBHeight;
        $scaleW = $currentBWidth/$realBWidth;
        //console.log($scaleH,$scaleW);
    }
    $updateObjSize = function($idUpdObj){
        if($('#'+$idUpdObj).hasClass('appendedB')){
            $bOriginWidth = 35;
            $bOriginHeight = 110;
            $bWidth = $updateSize()*$basescale;
            $bHeight = $bOriginHeight*($bWidth/$bOriginWidth);
            $('#'+$idUpdObj).css({
                'width':$bWidth,
                'height':$bHeight
            });
        }
        if($('#'+$idUpdObj).hasClass('appendedBM')){
            $bmOriginWidth = 35;
            $bmOriginHeight = 75;
            $bmWidth = $updateSize()*$basescale;
            $bmHeight = $bmOriginHeight*($bmWidth/$bmOriginWidth);
            $('#'+$idUpdObj).css({
                'width':$bmWidth,
                'height':$bmHeight
            });
        }
        if($('#'+$idUpdObj).hasClass('appendedC')){
            $cOriginWidth = 110;
            $cOriginHeight = 75;
            $cWidth = $updateSize()*$basescale*3.14;
            $cHeight = $cOriginHeight*($cWidth/$cOriginWidth);
            $('#'+$idUpdObj).css({
                'width':$cWidth,
                'height':$cHeight
            });
        }
        if($('#'+$idUpdObj).hasClass('appendedCM')){
            $cmOriginWidth = 75;
            $cmOriginHeight = 75;
            $cmWidth = $updateSize()*$basescale*2.14;
            $cmHeight = $cmOriginHeight*($cmWidth/$cmOriginWidth);
            $('#'+$idUpdObj).css({
                'width':$cmWidth,
                'height':$cmHeight
            });
        }
        if($('#'+$idUpdObj).hasClass('appendedCB')){
            $cbOriginWidth = 110;
            $cbOriginHeight = 110;
            $cbWidth = $updateSize()*$basescale*3.14;
            $cbHeight = $cbOriginHeight*($cbWidth/$cbOriginWidth); 
            $('#'+$idUpdObj).css({
                'width':$cbWidth,
                'height':$cbHeight
            });    
        }
        $currentSize();
    };
    $updateCordRotObj = function($id){
        objAdd = document.getElementById($id);
        topY = objAdd.getBoundingClientRect().top;
        topX = objAdd.getBoundingClientRect().left;
        dovnY = objAdd.getBoundingClientRect().bottom;
        dovnX = objAdd.getBoundingClientRect().right;
        // добавляем в массив размещенных обхектов id размещенного модуля
        appendedObj.set($id,[topX,topY,dovnX,dovnY]);
    }
    $getDistObjects = function($id1,$id2){
        $elem = document.getElementById($id1);
        $elemRect = $elem.getBoundingClientRect();

        $TLx = $elemRect.left;
        $TLy = $elemRect.top;

        $TRx = $elemRect.right;
        $TRy = $elemRect.top;

        $BRx = $elemRect.right;
        $BRy = $elemRect.bottom;

        $BLx = $elemRect.left;
        $BLy = $elemRect.bottom;
        $resultDistanse = 9999;
        $reultIDelem = 0; 

        $prTLx = appendedObj.get($id2)[0];
        $prTLy = appendedObj.get($id2)[1];

        $prTRx = appendedObj.get($id2)[2];
        $prTRy = appendedObj.get($id2)[1];

        $prBRx = appendedObj.get($id2)[2];
        $prBRy = appendedObj.get($id2)[3];

        $prBLx = appendedObj.get($id2)[0];
        $prBLy = appendedObj.get($id2)[3];


        $distX =  $TLx-$prTRx;
        $distY =  $TLy-$prTRy;
        $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
        if($distResPr<$resultDistanse){
            $resultDistanse = $distResPr;
        }
        $distX =  $BRx-$prTRx;
        $distY =  $BRy-$prTRy;
        $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
        if($distResPr<$resultDistanse){
            $resultDistanse = $distResPr;
        }
        $distX =  $BLx-$prTLx;
        $distY =  $BLy-$prTLy;
        $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
        if($distResPr<$resultDistanse){
            $resultDistanse = $distResPr;
        }
        $distX =  $TRx-$prTLx;
        $distY =  $TRy-$prTLy;
        $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
        if($distResPr<$resultDistanse){
            $resultDistanse = $distResPr;
        }
        $distX =  $BRx-$prBLx;
        $distY =  $BRy-$prBLy;
        $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
        if($distResPr<$resultDistanse){
            $resultDistanse = $distResPr;
        }
        $distX =  $TLx-$prBLx;
        $distY =  $TLy-$prBLy;
        $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
        if($distResPr<$resultDistanse){
            $resultDistanse = $distResPr;
        }
        $distX =  $TRx-$prBRx;
        $distY =  $TRy-$prBRy;
        $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
        if($distResPr<$resultDistanse){
            $resultDistanse = $distResPr;
        }
        $distX =  $BLx-$prBRx;
        $distY =  $BLy-$prBRy;
        $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
        if($distResPr<$resultDistanse){
            $resultDistanse = $distResPr;

        }
        return $resultDistanse;
    };
    $constructMainGr = function($targetId){
        if($targetId){
            $findObjects.set($targetId,'1');
            for(let key of appendedObj.keys()){
                if($getDistObjects($targetId,key) < 30 && !$findObjects.has(key)){
                    $findObjects.set(key,'1');
                    $constructMainGr(key);
                }
            }
        }
    }
    $controllerConstruct = function($targetId,$ourId){
        $findObjects.clear();
        //$findObjects.set($ourId,'1');
        $constructMainGr($ourId);
    };
    ////////
    // данную функцию нужно вставлять после переопределения $findObjects списка. так же если target не определен передать нужно 0.
    $recountFun = function($idOur,$TargetParent){
        if($idOur){
            // пересчет
            $minTop = 99999999999;
            $maxBottom = 0;
            $minLeft = 9999999999;
            $maxRight = 0;
            for(let key of $findObjects.keys()){
                if(!rotationObj.get(key)){
                    $top = $('#'+key).offset().top;
                    $left = $('#'+key).offset().left;
                    $right = $left+$('#'+key).width();
                    $bottom =$top+  $('#'+key).height();
                }
                else{
                    $top = $('#'+key).offset().top;
                    $left = $('#'+key).offset().left;
                    $right = $left + $('#'+key).height();
                    $bottom =$top  + $('#'+key).width();
                }
                if($top < $minTop){
                    $minTop = $top;
                }
                if($left < $minLeft){
                    $minLeft = $left;
                }
                if($right > $maxRight){
                    $maxRight = $right;
                }
                if($bottom > $maxBottom){
                    $maxBottom = $bottom;
                }
            }
            $realwidth = ($maxRight-$minLeft);
            $realHeight = ($maxBottom-$minTop);
            $('#realDepth').text((($realHeight*1/$scaleH/35)*35).toFixed());
            $('#realWidth').text((($realwidth*1/$scaleW/35)*35).toFixed());
            $countCost();
        }
        else {
            $minTop = 99999999999;
            $maxBottom = 0;
            $minLeft = 9999999999;
            $maxRight = 0;
            for(let key of $findObjects.keys()){
                if(!rotationObj.get(key)){
                    $top = $('#'+key).offset().top;
                    $left = $('#'+key).offset().left;
                    $right = $left+$('#'+key).width();
                    $bottom =$top+  $('#'+key).height();
                }
                else{
                    $top = $('#'+key).offset().top;
                    $left = $('#'+key).offset().left;
                    $right = $left + $('#'+key).height();
                    $bottom =$top  + $('#'+key).width();
                }
                if($top < $minTop){
                    $minTop = $top;
                }
                if($left < $minLeft){
                    $minLeft = $left;
                }
                if($right > $maxRight){
                    $maxRight = $right;
                }
                if($bottom > $maxBottom){
                    $maxBottom = $bottom;
                }
            }
            $realwidth = ($maxRight-$minLeft);
            $realHeight = ($maxBottom-$minTop);
            if($realwidth < 0){
                $realwidth = 0;
                $realHeight = 0;
            }

            //console.log($minTop,$minLeft,$maxRight,$maxBottom);
            $('#realDepth').text((($realHeight*1/$scaleH/35)*35).toFixed());
            $('#realWidth').text((($realwidth*1/$scaleW/35)*35).toFixed());
            $countCost();
        }
    }
    $countCost = function(){
        $B = 9990;
        $BM = 8990;
        $C = 11990;
        $CM = 10990;
        $CB = 12990;
        $cost = 0;
        for(let key of appendedObj.keys()){
            if($('#'+key).hasClass('appendedB')){
                $cost = $cost + $B;
            }
            if($('#'+key).hasClass('appendedBM')){
                $cost = $cost + $BM;
            }
            if($('#'+key).hasClass('appendedC')){
                $cost = $cost + $C;
            }
            if($('#'+key).hasClass('appendedCM')){
                $cost = $cost + $CM;
            }
            if($('#'+key).hasClass('appendedCB')){
                $cost = $cost + $CB;
            }
        }
        $('.cost').text($cost);

    };
    /////////////////////////////////////////////////
    $saveGropsPositions = function($id1,$id2,$pos){
        // работа с прямой структурой 
        if(BaseObjMap.has($id2)){
            if($mainObj == $id2){
                $mainObj = 0;
            }
            BaseObjMap.delete($id2);
        }
        if(!groupsPositionsStr.has($id1)){
            $childrens = new Map();
            $childrens.set($id2,$pos);
            groupsPositionsStr.set($id1,$childrens);
            // взять всех его дочерние элементы и удалить их из реверсивной структуры. 
            //console.log($childrens);
            if(groupsPositionsStr.has($id2)){
                $childrens = groupsPositionsStr.get($id2);
                //console.log($childrens);
                for(let $key of $childrens.keys()){
                    BaseObjMap.set($key,'1');
                    groupsPositionsRev.delete($key);
                }
            }
            if(groupsPositionsStr.has($id2)){
                groupsPositionsStr.delete($id2);
            }
        }
        else{
            $childrens = groupsPositionsStr.get($id1);
            if($childrens.has($id2)){
                $childrens.set($id2,$pos);
                groupsPositionsStr.set($id1,$childrens);
            }
            else{
                $childrens.set($id2,$pos);
                groupsPositionsStr.set($id1,$childrens);
                // взять всех его дочерние элементы и удалить их из реверсивной структуры. 
                //console.log($childrens);
                if(groupsPositionsStr.has($id2)){
                    $childrens = groupsPositionsStr.get($id2);
                    //console.log($childrens);
                    for(let $key of $childrens.keys()){
                        BaseObjMap.set($key,'1');
                        groupsPositionsRev.delete($key);
                    }
                }
                if(groupsPositionsStr.has($id2)){
                    groupsPositionsStr.delete($id2);
                }
            }
        }
        $parrentId = groupsPositionsRev.get($id2);
        if($parrentId != $id1){
            // работа с обратной структурой
            if(groupsPositionsRev.has($id2)){

                $childrens = groupsPositionsStr.get($parrentId);
                $childrens.delete($id2);
                if($childrens.size != 0){
                    groupsPositionsStr.set($parrentId,$childrens);
                }
                else {
                    groupsPositionsStr.delete($parrentId);
                }
            }
            groupsPositionsRev.set($id2,$id1);
        } 
    };
    $baseObjBind = function($id){
        if(groupsPositionsRev.has($id)){
            // чистка предыдущего родителя
            $parent = groupsPositionsRev.get($id);
            $children = groupsPositionsStr.get($parent);
            $children.delete($id);
            if($children.size != 0){
                groupsPositionsStr.set($parent,$children);
            }
            else {
                groupsPositionsStr.delete($parent);
            }
            // чистка потомков
            if(groupsPositionsStr.has($id)){
                $children = groupsPositionsStr.get($id);
                for(let $key of $children.keys()){
                    groupsPositionsRev.delete($key);
                }
                groupsPositionsStr.delete($id);
            }
            
            // удаляем его родителей
            groupsPositionsRev.delete($id);
            // устанавливаем в качестве базового
            BaseObjMap.set($id,'1');
        }
        else{
            BaseObjMap.set($id,'1');
        }

    }
    $clearMapsWhenDelete = function($id){
        if(BaseObjMap.has($id))
        {
            if($mainObj == $id){
                $mainObj = 0;
            }
            BaseObjMap.delete($id);
        }
        if(groupsPositionsStr.has($id)){
            $childrens = groupsPositionsStr.get($id);
            for(let $key of $childrens.keys()){
                groupsPositionsRev.delete($key);
            }
            groupsPositionsStr.delete($id);
        }
        if(groupsPositionsRev.has($id)){
            $parent = groupsPositionsRev.get($id);
            $childrens = groupsPositionsStr.get($parent);
            $childrens.delete($id);
            if($childrens.size != 0){
                groupsPositionsStr.set($parent,$childrens);
            }
            else {
                groupsPositionsStr.delete($parent);
            }
            groupsPositionsRev.delete($id);
        }
    }
    // рекурсивный конструктор, востанавливающий соединения объектов его нужно запустить для всех элементов без родителей.
    $recursiveConstructor = function($id){
        if(groupsPositionsStr.has($id)){
            $childrens = groupsPositionsStr.get($id);
            for(let $child of $childrens.keys()){
                $setPositionObetcs($child,$id,$childrens.get($child));
                //$recursiveСonstructor($child);
            }
            for(let $child of $childrens.keys()){
                //$setPositionObetcs($child,$id,$childrens.get($child));
                $recursiveConstructor($child);
            }
        }
        //return true;
    };
    $startConnect = function(){
        for(let $key of BaseObjMap.keys()){
            $recursiveConstructor($key);
        }
    };
    
    $updateCord = function($id){
        objAdd = document.getElementById($id);
        topY = objAdd.getBoundingClientRect().top;
        topX = objAdd.getBoundingClientRect().left;
        dovnY = objAdd.getBoundingClientRect().bottom;
        dovnX = objAdd.getBoundingClientRect().right;
        // добавляем в массив размещенных обхектов id размещенного модуля
        appendedObj.set($id,[topX,topY,dovnX,dovnY]);
    }
    /// создаем html код модуля
    $creatModul = function(id,$number){
        if ($number == 1){
            modul = '<svg id = "'+id+'" class = "appended-modul appendedB" width="35" height="111" viewBox="0 0 35 110" fill="none" xmlns="http://www.w3.org/2000/svg">'+
            '<mask id="mask0_78_164" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="35" height="111">'+
            '<path d="M0 103.447L0 7.09339C0 5.28474 0.687775 3.54887 1.90701 2.2679C3.12972 0.986926 4.78662 0.270021 6.513 0.270021H28.487C30.2134 0.270021 31.8703 0.990565 33.093 2.2679C34.3157 3.54887 35 5.28474 35 7.09339L35 103.447C35 105.255 34.3122 106.991 33.093 108.272C31.8703 109.553 30.2134 110.27 28.487 110.27H6.513C4.78662 110.27 3.12972 109.549 1.90701 108.272C0.684301 106.991 0 105.255 0 103.447Z" fill="white"/>'+
            '</mask>'+
            '<g mask="url(#mask0_78_164)">'+
            '<path d="M0 0.31369L0 110.27H34.9062L34.9062 0.31369H0Z" fill="#A6A5A5"/>'+
            '</g>'+
            '<mask id="mask1_78_164" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="35" height="111">'+
            '<path d="M0 103.443L0 7.10068C0 5.29203 0.684303 3.55616 1.90354 2.27519C3.12277 0.994215 4.77273 0.27731 6.49564 0.27731H28.4141C30.137 0.27731 31.7904 0.997854 33.0062 2.27519C34.2254 3.55616 34.9097 5.28839 34.9097 7.10068L34.9097 103.443C34.9097 105.252 34.2254 106.988 33.0062 108.268C31.7869 109.549 30.137 110.266 28.4141 110.266H6.49564C4.77273 110.266 3.1193 109.546 1.90354 108.268C0.684303 106.988 0 105.255 0 103.443Z" fill="white"/>'+
            '</mask>'+
            '<g mask="url(#mask1_78_164)">'+
            '<path class="modul-border" d="M0 103.443L0 7.10068C0 5.29203 0.684303 3.55616 1.90354 2.27519C3.12277 0.994215 4.77273 0.27731 6.49564 0.27731H28.4141C30.137 0.27731 31.7904 0.997854 33.0062 2.27519C34.2254 3.55616 34.9097 5.28839 34.9097 7.10068L34.9097 103.443C34.9097 105.252 34.2254 106.988 33.0062 108.268C31.7869 109.549 30.137 110.266 28.4141 110.266H6.49564C4.77273 110.266 3.1193 109.546 1.90354 108.268C0.684303 106.988 0 105.255 0 103.443Z" stroke="black" stroke-width="5"/>'+
            '</g>'+
            '<path d="M20.6364 56.2617V55.6139C20.6364 54.9625 20.5356 54.4858 20.3376 54.1837C20.1362 53.8817 19.8374 53.7289 19.431 53.7289C19.0246 53.7289 18.7433 53.8817 18.5661 54.1874C18.3889 54.4931 18.3021 55.0207 18.3021 55.7668V56.258H20.6364V56.2617ZM16.7946 56.2617V55.5047C16.7946 54.3184 17.0238 53.405 17.4823 52.7572C17.9408 52.1094 18.5904 51.7892 19.431 51.7892C21.2408 51.7892 22.1439 53.0411 22.1439 55.5448V58.1941H13.4634V52.4515H14.9813V56.269H16.7911L16.7946 56.2617Z" fill="black"/>'+
            '<path d="M31.6859 64.8173V65.425H27.9553C27.6461 65.425 27.3509 65.4141 27.0765 65.3959C27.1251 65.4469 27.1807 65.5087 27.2328 65.5706C27.2884 65.6361 27.5211 65.9345 27.931 66.4622L27.5211 66.7933L26.4478 65.3413V64.8173H31.6825H31.6859Z" fill="black"/>'+
            '<path d="M31.6859 60.4285V61.0362H27.9553C27.6461 61.0362 27.3509 61.0253 27.0765 61.0071C27.1251 61.0581 27.1807 61.1199 27.2328 61.1818C27.2884 61.2473 27.5211 61.5457 27.931 62.0734L27.5211 62.4045L26.4478 60.9525V60.4285H31.6825H31.6859Z" fill="black"/>'+
            '<path d="M29.0636 57.7064C29.8243 57.7064 30.3801 57.6118 30.7275 57.4262C31.0748 57.237 31.2485 56.9386 31.2485 56.531C31.2485 56.1234 31.0714 55.8141 30.7205 55.6285C30.3697 55.4429 29.8174 55.3483 29.0636 55.3483C28.3099 55.3483 27.761 55.4429 27.4102 55.6285C27.0594 55.8141 26.8857 56.1161 26.8857 56.531C26.8857 56.9458 27.0594 57.2406 27.4032 57.4262C27.7471 57.6154 28.2994 57.7064 29.0636 57.7064ZM29.0636 54.7078C29.9668 54.7078 30.6441 54.857 31.0887 55.1554C31.5334 55.4538 31.7591 55.9123 31.7591 56.5273C31.7591 57.1424 31.5299 57.5645 31.0748 57.8738C30.6163 58.1831 29.9494 58.336 29.0636 58.336C28.1779 58.336 27.4762 58.1868 27.035 57.8884C26.5939 57.59 26.3716 57.1387 26.3716 56.5273C26.3716 55.916 26.6008 55.4793 27.0628 55.1699C27.5248 54.8606 28.1917 54.7078 29.0636 54.7078Z" fill="black"/>'+
            '<path d="M31.759 50.0351C31.759 50.6283 31.5853 51.0905 31.2345 51.418C30.8836 51.7455 30.3904 51.9056 29.7513 51.9056C29.1121 51.9056 28.5876 51.7419 28.2298 51.4107C27.872 51.0796 27.6914 50.6065 27.6914 49.9951C27.6914 49.7986 27.7123 49.6021 27.7539 49.4019C27.7956 49.2054 27.8408 49.0489 27.8963 48.9361L28.4 49.129C28.3479 49.2673 28.3028 49.4165 28.268 49.5802C28.2333 49.744 28.2159 49.8859 28.2159 50.0097C28.2159 50.843 28.7231 51.2615 29.7408 51.2615C30.2237 51.2615 30.5919 51.1596 30.8524 50.9558C31.1094 50.752 31.238 50.45 31.238 50.0497C31.238 49.7076 31.1685 49.3546 31.0261 48.998H31.5506C31.686 49.2746 31.7555 49.6203 31.7555 50.0351H31.759Z" fill="black"/>'+
            '<path d="M31.1131 45.8865L30.7797 45.7701L30.3559 45.61L27.7681 44.4964V43.7067H31.6828V44.2562H28.4454L28.6538 44.3326L29.2027 44.551L31.6863 45.6136V46.134L29.1957 47.1966C28.8761 47.3276 28.626 47.4186 28.4489 47.4695H31.6863V48.0227H27.7715V47.2621L30.2586 46.1849C30.5226 46.0758 30.8075 45.9775 31.1131 45.8902V45.8865Z" fill="black"/>'+
            '<path d="M11.522 102.784C11.522 103.134 11.4282 103.421 11.2406 103.643C11.053 103.865 10.789 104.014 10.4452 104.087V104.116C10.8655 104.171 11.1781 104.313 11.3796 104.538C11.581 104.764 11.6852 105.059 11.6852 105.423C11.6852 105.947 11.5115 106.347 11.1677 106.631C10.8203 106.911 10.3305 107.053 9.69138 107.053C9.41349 107.053 9.15992 107.031 8.93066 106.988C8.7014 106.944 8.47562 106.867 8.26025 106.758V106.165C8.48604 106.282 8.72919 106.373 8.98624 106.434C9.24329 106.496 9.48644 106.525 9.71569 106.525C10.6188 106.525 11.0739 106.154 11.0739 105.412C11.0739 104.746 10.5737 104.415 9.57675 104.415H9.06266V103.88H9.58717C9.99706 103.88 10.3201 103.785 10.5563 103.596C10.796 103.407 10.9141 103.145 10.9141 102.81C10.9141 102.544 10.8272 102.333 10.6501 102.18C10.4729 102.027 10.2367 101.951 9.93453 101.951C9.70527 101.951 9.48991 101.984 9.28497 102.049C9.0835 102.115 8.85077 102.235 8.59025 102.41L8.28804 101.991C8.50341 101.813 8.75003 101.674 9.03139 101.573C9.31276 101.471 9.60801 101.42 9.91716 101.42C10.4243 101.42 10.8203 101.54 11.1017 101.784C11.383 102.027 11.5254 102.362 11.5254 102.784H11.522Z" fill="black"/>'+
            '<path d="M14.1063 103.629C14.6586 103.629 15.0928 103.771 15.4089 104.058C15.725 104.346 15.8848 104.735 15.8848 105.233C15.8848 105.801 15.7111 106.245 15.3673 106.569C15.0234 106.893 14.5475 107.053 13.9396 107.053C13.3317 107.053 12.901 106.955 12.5884 106.758V106.158C12.7551 106.271 12.9635 106.358 13.2102 106.423C13.4568 106.489 13.7034 106.518 13.9431 106.518C14.3634 106.518 14.6899 106.413 14.9226 106.205C15.1554 105.998 15.2735 105.696 15.2735 105.306C15.2735 104.542 14.8254 104.16 13.9292 104.16C13.7034 104.16 13.3977 104.196 13.0191 104.269L12.71 104.062L12.9079 101.496H15.5097V102.071H13.4151L13.2831 103.72C13.5575 103.661 13.8319 103.632 14.1029 103.632L14.1063 103.629Z" fill="black"/>'+
            '<path d="M20.4036 107.053C19.8374 107.053 19.3962 106.871 19.0836 106.504C18.771 106.136 18.6182 105.619 18.6182 104.95C18.6182 104.28 18.7745 103.731 19.0906 103.356C19.4067 102.981 19.8582 102.792 20.4418 102.792C20.6294 102.792 20.817 102.813 21.008 102.857C21.1956 102.901 21.3449 102.948 21.4526 103.006L21.2685 103.534C21.1365 103.479 20.9941 103.432 20.8378 103.396C20.6815 103.359 20.546 103.341 20.4279 103.341C19.6325 103.341 19.233 103.872 19.233 104.939C19.233 105.445 19.3303 105.83 19.5248 106.103C19.7193 106.373 20.0076 106.507 20.3897 106.507C20.7162 106.507 21.0532 106.434 21.3936 106.285V106.835C21.1296 106.977 20.7996 107.049 20.4036 107.049V107.053Z" fill="black"/>'+
            '<path d="M24.3603 106.376L24.4714 106.027L24.6243 105.583L25.6872 102.872H26.441V106.973H25.9165V103.581L25.8435 103.8L25.6351 104.375L24.6208 106.977H24.1241L23.1098 104.367C22.9847 104.033 22.8979 103.771 22.8493 103.585V106.977H22.3213V102.875H23.0473L24.0755 105.481C24.1797 105.757 24.2735 106.056 24.3568 106.376H24.3603Z" fill="black"/>'+
            '</svg>';
            return modul;
        }
        if ($number == 2){
            modul = '<svg id = "'+id+'" class = "appended-modul appendedBM" width="35" height="75" viewBox="0 0 35 75" fill="none" xmlns="http://www.w3.org/2000/svg">'+
            '<mask id="mask0_78_186" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="35" height="75">'+
            '<path d="M0 68.0552L0 7.02626C0 5.18543 0.687775 3.41868 1.90701 2.11491C3.12972 0.811147 4.78662 0.0814731 6.513 0.0814731H28.487C30.2134 0.0814731 31.8703 0.81485 33.093 2.11491C34.3157 3.41498 35 5.18543 35 7.02626L35 68.0552C35 69.896 34.3122 71.6628 33.093 72.9666C31.8738 74.2703 30.2134 75 28.487 75H6.513C4.78662 75 3.12972 74.2666 1.90701 72.9666C0.684301 71.6628 0 69.896 0 68.0552Z" fill="white"/>'+
            '</mask>'+
            '<g mask="url(#mask0_78_186)">'+
            '<path d="M0 0.0555573L0 75H34.9062L34.9062 0.0555573H0Z" fill="#A6A5A5"/>'+
            '</g>'+
            '<mask id="mask1_78_186" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="35" height="75">'+
            '<path d="M0 68.0478L0 6.95219C0 5.10765 0.684303 3.3409 1.90354 2.03714C3.12277 0.733368 4.77273 -1.54409e-06 6.49564 -1.54409e-06H28.4141C30.137 -1.54409e-06 31.7904 0.733368 33.0062 2.03714C34.2219 3.3409 34.9097 5.10765 34.9097 6.95219L34.9097 68.0478C34.9097 69.8923 34.2254 71.6591 33.0062 72.9629C31.7869 74.2666 30.137 75 28.4141 75H6.49564C4.77273 75 3.1193 74.2666 1.90354 72.9629C0.684303 71.6591 0 69.8923 0 68.0478Z" fill="white"/>'+
            '</mask>'+
            '<g mask="url(#mask1_78_186)">'+
            '<path class="modul-border" d="M0 68.0478L0 6.95219C0 5.10765 0.684303 3.3409 1.90354 2.03714C3.12277 0.733368 4.77273 -1.54409e-06 6.49564 -1.54409e-06H28.4141C30.137 -1.54409e-06 31.7904 0.733368 33.0062 2.03714C34.2219 3.3409 34.9097 5.10765 34.9097 6.95219L34.9097 68.0478C34.9097 69.8923 34.2254 71.6591 33.0062 72.9629C31.7869 74.2666 30.137 75 28.4141 75H6.49564C4.77273 75 3.1193 74.2666 1.90354 72.9629C0.684303 71.6591 0 69.8923 0 68.0478Z" stroke="black" stroke-width="4"/>'+
            '</g>'+
            '<path d="M20.6364 44.6652V44.0059C20.6364 43.3429 20.5356 42.8577 20.3376 42.5502C20.1362 42.2428 19.8374 42.0873 19.431 42.0873C19.0246 42.0873 18.7433 42.2428 18.5661 42.554C18.3889 42.8651 18.3021 43.4021 18.3021 44.1614V44.6615H20.6364V44.6652ZM16.7946 44.6652V43.8948C16.7946 42.6873 17.0238 41.7576 17.4823 41.0983C17.9408 40.439 18.5904 40.1131 19.431 40.1131C21.2408 40.1131 22.1439 41.3872 22.1439 43.9355V46.6319H13.4634V40.7872H14.9813V44.6726H16.7911L16.7946 44.6652Z" fill="black"/>'+
            '<path d="M22.1439 34.435L15.3356 36.6648V36.7203C16.7216 36.6388 17.6456 36.6018 18.1076 36.6018H22.1439V38.3537H13.4634V35.6832L20.1014 33.4942V33.4572L13.4634 31.1349V28.4644H22.1439V30.2941H18.0346C17.8401 30.2941 17.6178 30.2941 17.3642 30.283C17.1107 30.2756 16.4368 30.2496 15.3461 30.1978V30.2533L22.1439 32.6386V34.435Z" fill="black"/>'+
            '<path d="M31.7663 34.4461C31.7663 35.0499 31.5926 35.5203 31.2418 35.8536C30.891 36.187 30.3977 36.3499 29.7586 36.3499C29.1194 36.3499 28.5949 36.1833 28.2371 35.8462C27.8794 35.5092 27.6987 35.0276 27.6987 34.4054C27.6987 34.2054 27.7196 34.0054 27.7613 33.8017C27.8029 33.6017 27.8481 33.4424 27.9037 33.3276L28.4073 33.5239C28.3552 33.6646 28.3101 33.8165 28.2753 33.9832C28.2406 34.1498 28.2232 34.2943 28.2232 34.4202C28.2232 35.2684 28.7304 35.6943 29.7482 35.6943C30.231 35.6943 30.5992 35.5906 30.8597 35.3832C31.1168 35.1758 31.2453 34.8684 31.2453 34.461C31.2453 34.1128 31.1758 33.7535 31.0334 33.3905H31.5579C31.6934 33.672 31.7628 34.0239 31.7628 34.4461H31.7663Z" fill="black"/>'+
            '<path d="M31.12 30.2274L30.7865 30.1089L30.3627 29.9459L27.7749 28.8125V28.0088H31.6897V28.5681H28.4523L28.6607 28.6459L29.2095 28.8681L31.6931 29.9496V30.4793L29.2026 31.5608C28.883 31.6942 28.6329 31.7868 28.4557 31.8386H31.6931V32.4016H27.7784V31.6275L30.2655 30.5311C30.5295 30.42 30.8143 30.32 31.12 30.2311V30.2274Z" fill="black"/>'+
            '<path d="M11.522 67.3107C11.522 67.6663 11.4282 67.9589 11.2406 68.1849C11.053 68.4108 10.789 68.5626 10.4452 68.6367V68.6664C10.8655 68.7219 11.1781 68.8664 11.3796 69.096C11.581 69.3256 11.6852 69.6257 11.6852 69.9961C11.6852 70.5294 11.5115 70.9368 11.1677 71.2257C10.8203 71.5109 10.3305 71.6554 9.69138 71.6554C9.41349 71.6554 9.15992 71.6332 8.93066 71.5887C8.7014 71.5443 8.47562 71.4665 8.26025 71.3554V70.7516C8.48604 70.8702 8.72919 70.9628 8.98624 71.0257C9.24329 71.0887 9.48644 71.1183 9.71569 71.1183C10.6188 71.1183 11.0739 70.7405 11.0739 69.9849C11.0739 69.3071 10.5737 68.9701 9.57675 68.9701H9.06266V68.4256H9.58717C9.99706 68.4256 10.3201 68.3293 10.5563 68.1367C10.796 67.9441 10.9141 67.6774 10.9141 67.3367C10.9141 67.0663 10.8272 66.8514 10.6501 66.6959C10.4729 66.5403 10.2367 66.4625 9.93453 66.4625C9.70527 66.4625 9.48991 66.4959 9.28497 66.5625C9.0835 66.6292 8.85077 66.7514 8.59025 66.9292L8.28804 66.5033C8.50341 66.3218 8.75003 66.181 9.03139 66.0773C9.31276 65.9736 9.60801 65.9218 9.91716 65.9218C10.4243 65.9218 10.8203 66.044 11.1017 66.2922C11.383 66.5403 11.5254 66.8811 11.5254 67.3107H11.522Z" fill="black"/>'+
            '<path d="M14.1063 68.17C14.6586 68.17 15.0928 68.3145 15.4089 68.6071C15.725 68.8997 15.8848 69.296 15.8848 69.8034C15.8848 70.3813 15.7111 70.8331 15.3673 71.1628C15.0234 71.4924 14.5475 71.6554 13.9396 71.6554C13.3317 71.6554 12.901 71.5554 12.5884 71.3554V70.7442C12.7551 70.8591 12.9635 70.9479 13.2102 71.0146C13.4568 71.0813 13.7034 71.1109 13.9431 71.1109C14.3634 71.1109 14.6899 71.0035 14.9226 70.7924C15.1554 70.5813 15.2735 70.2738 15.2735 69.8775C15.2735 69.0997 14.8254 68.7108 13.9292 68.7108C13.7034 68.7108 13.3977 68.7478 13.0191 68.8219L12.71 68.6108L12.9079 65.9996H15.5097V66.5848H13.4151L13.2831 68.2626C13.5575 68.2034 13.8319 68.1737 14.1029 68.1737L14.1063 68.17Z" fill="black"/>'+
            '<path d="M20.4036 71.6554C19.8374 71.6554 19.3962 71.4702 19.0836 71.0961C18.771 70.722 18.6182 70.1961 18.6182 69.5145C18.6182 68.833 18.7745 68.2737 19.0906 67.8922C19.4067 67.5107 19.8582 67.3181 20.4418 67.3181C20.6294 67.3181 20.817 67.3404 21.008 67.3848C21.1956 67.4293 21.3449 67.4774 21.4526 67.5367L21.2685 68.0737C21.1365 68.0182 20.9941 67.97 20.8378 67.933C20.6815 67.8959 20.546 67.8774 20.4279 67.8774C19.6325 67.8774 19.233 68.4182 19.233 69.5034C19.233 70.0183 19.3303 70.4109 19.5248 70.6887C19.7193 70.9628 20.0076 71.0998 20.3897 71.0998C20.7162 71.0998 21.0532 71.0257 21.3936 70.8739V71.4332C21.1296 71.5776 20.7996 71.6517 20.4036 71.6517V71.6554Z" fill="black"/>'+
            '<path d="M24.3603 70.9665L24.4714 70.6109L24.6243 70.159L25.6872 67.3996H26.441V71.5739H25.9165V68.1219L25.8435 68.3441L25.6351 68.9293L24.6208 71.5776H24.1241L23.1098 68.9219C22.9847 68.5812 22.8979 68.3145 22.8493 68.1256V71.5776H22.3213V67.4033H23.0473L24.0755 70.0553C24.1797 70.3368 24.2735 70.6405 24.3568 70.9665H24.3603Z" fill="black"/>'+
            '<path d="M26.695 43.318L31.329 45.236V46.041L26.8 44.116V46.503H26.107V43.318H26.695ZM26.807 41.2149L28.123 41.2569C28.0623 41.0749 28.032 40.8649 28.032 40.6269C28.032 40.1415 28.172 39.7472 28.452 39.4439C28.7413 39.1359 29.1287 38.9819 29.614 38.9819C30.188 38.9819 30.629 39.1639 30.937 39.5279C31.231 39.8639 31.378 40.3165 31.378 40.8859C31.378 41.3572 31.3103 41.7492 31.175 42.0619H30.433C30.6103 41.6979 30.699 41.2965 30.699 40.8579C30.699 40.5219 30.6173 40.2512 30.454 40.0459C30.2767 39.8265 30.027 39.7169 29.705 39.7169C29.0377 39.7169 28.704 40.0902 28.704 40.8369C28.704 41.2242 28.76 41.6139 28.872 42.0059L26.107 41.9569V39.2409H26.807V41.2149Z" fill="black"/>'+
            '</svg>';
            //modul = '<div id = "'+id+'" class = "appended-modul modul BM"><div class="name modul-nameAppendBM BM-name"></div></div>';
            return modul;
        }
        if ($number == 3){
            modul = '<svg id = "'+id+'" class = "appended-modul appendedC" width="110" height="75" viewBox="0 0 110 75" fill="none" xmlns="http://www.w3.org/2000/svg">'+
            '<mask id="mask0_78_208" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="111" height="76">'+
            '<path d="M7.32405 0.5H103.625C105.434 0.5 107.17 1.23333 108.451 2.53333C109.732 3.83333 110.449 5.6037 110.449 7.44444V68.4704C110.449 70.3111 109.728 72.0778 108.451 73.3815C107.17 74.6852 105.434 75.4148 103.625 75.4148H7.32405C5.51522 75.4148 3.77918 74.6815 2.49808 73.3815C1.21698 72.0778 0.5 70.3111 0.5 68.4704V7.44444C0.5 5.6037 1.22062 3.83704 2.49808 2.53333C3.77918 1.22963 5.51522 0.5 7.32405 0.5Z" fill="white"/>'+
            '</mask>'+
            '<g mask="url(#mask0_78_208)">'+
            '<path d="M110.467 0.5H0.5V75.4407H110.467V0.5Z" fill="#DAD9D9"/>'+
            '</g>'+
            '<mask id="mask1_78_208" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="111" height="76">'+
            '<path d="M7.32746 0.5H103.676C105.488 0.5 107.224 1.23333 108.502 2.53704C109.783 3.84074 110.5 5.60741 110.5 7.45185V68.5481C110.5 70.3926 109.779 72.1593 108.502 73.463C107.221 74.7667 105.485 75.5 103.676 75.5H7.32746C5.515 75.5 3.77896 74.7667 2.5015 73.463C1.2204 72.1593 0.503418 70.3926 0.503418 68.5481V7.45185C0.503418 5.60741 1.22404 3.84074 2.5015 2.53704C3.7826 1.23333 5.51864 0.5 7.32746 0.5Z" fill="white"/>'+
            '</mask>'+
            '<g mask="url(#mask1_78_208)">'+
            '<path class="modul-border" d="M7.32746 0.5H103.676C105.488 0.5 107.224 1.23333 108.502 2.53704C109.783 3.84074 110.5 5.60741 110.5 7.45185V68.5481C110.5 70.3926 109.779 72.1593 108.502 73.463C107.221 74.7667 105.485 75.5 103.676 75.5H7.32746C5.515 75.5 3.77896 74.7667 2.5015 73.463C1.2204 72.1593 0.503418 70.3926 0.503418 68.5481V7.45185C0.503418 5.60741 1.22404 3.84074 2.5015 2.53704C3.7826 1.23333 5.51864 0.5 7.32746 0.5Z" stroke="black" stroke-width="4"/>'+
            '</g>'+
            '<path d="M56.421 35.2482C55.6967 35.2482 55.1362 35.526 54.7359 36.0815C54.3392 36.6371 54.139 37.4112 54.139 38.4001C54.139 40.463 54.8997 41.4963 56.421 41.4963C57.0579 41.4963 57.8331 41.3334 58.7393 41.0075V42.6519C57.9932 42.9667 57.1598 43.126 56.239 43.126C54.9179 43.126 53.9061 42.7186 53.2037 41.9001C52.5049 41.0852 52.1519 39.9112 52.1519 38.3852C52.1519 37.4223 52.3229 36.5815 52.6687 35.8556C53.0144 35.1334 53.5057 34.5778 54.1499 34.1926C54.7941 33.8075 55.5511 33.6149 56.4173 33.6149C57.2835 33.6149 58.1861 33.8334 59.0778 34.2667L58.4555 35.863C58.117 35.7001 57.7749 35.5556 57.4291 35.4334C57.087 35.3112 56.7485 35.2482 56.4173 35.2482H56.421Z" fill="black"/>'+
            '<path d="M45.9245 72.0777H45.3167V68.0999C45.3167 67.7703 45.3276 67.4554 45.3458 67.1628C45.2949 67.2147 45.233 67.274 45.1711 67.3295C45.1056 67.3888 44.8072 67.6369 44.2794 68.074L43.9482 67.6369L45.4004 66.4925H45.9245V72.074V72.0777Z" fill="black"/>'+
            '<path d="M50.3136 72.0777H49.7058V68.0999C49.7058 67.7703 49.7168 67.4554 49.735 67.1628C49.684 67.2147 49.6221 67.274 49.5603 67.3295C49.4948 67.3888 49.1963 67.6369 48.6686 68.074L48.3374 67.6369L49.7896 66.4925H50.3136V72.074V72.0777Z" fill="black"/>'+
            '<path d="M53.0359 69.2815C53.0359 70.0926 53.1305 70.6852 53.3161 71.0556C53.5017 71.4259 53.8038 71.6111 54.2114 71.6111C54.6191 71.6111 54.9284 71.4222 55.114 71.0481C55.2996 70.6741 55.3943 70.0852 55.3943 69.2815C55.3943 68.4778 55.2996 67.8926 55.114 67.5185C54.9284 67.1444 54.6263 66.9593 54.2114 66.9593C53.7965 66.9593 53.5017 67.1444 53.3161 67.5111C53.1269 67.8778 53.0359 68.4667 53.0359 69.2815ZM56.0348 69.2815C56.0348 70.2444 55.8856 70.9667 55.5872 71.4407C55.2887 71.9148 54.8301 72.1556 54.2151 72.1556C53.6 72.1556 53.1778 71.9111 52.8685 71.4259C52.5591 70.937 52.4062 70.2259 52.4062 69.2815C52.4062 68.337 52.5555 67.5889 52.8539 67.1185C53.1523 66.6481 53.6036 66.4111 54.2151 66.4111C54.8265 66.4111 55.2632 66.6556 55.5726 67.1481C55.882 67.6407 56.0348 68.3518 56.0348 69.2815Z" fill="black"/>'+
            '<path d="M60.7081 72.1555C60.1149 72.1555 59.6526 71.9703 59.3251 71.5962C58.9975 71.2221 58.8374 70.6962 58.8374 70.0147C58.8374 69.3332 59.0012 68.774 59.3324 68.3925C59.6636 68.011 60.1367 67.8184 60.7481 67.8184C60.9447 67.8184 61.1412 67.8406 61.3414 67.8851C61.5379 67.9295 61.6944 67.9777 61.8072 68.0369L61.6143 68.574C61.476 68.5184 61.3268 68.4703 61.163 68.4332C60.9993 68.3962 60.8573 68.3777 60.7336 68.3777C59.9001 68.3777 59.4816 68.9184 59.4816 70.0036C59.4816 70.5184 59.5835 70.911 59.7873 71.1888C59.9911 71.4629 60.2932 71.5999 60.6935 71.5999C61.0357 71.5999 61.3887 71.5258 61.7454 71.374V71.9332C61.4688 72.0777 61.123 72.1517 60.7081 72.1517V72.1555Z" fill="black"/>'+
            '<path d="M64.8571 71.4667L64.9735 71.1111L65.1337 70.6592L66.2474 67.9H67.0371V72.0741H66.4876V68.6222L66.4111 68.8444L66.1928 69.4296L65.13 72.0778H64.6096L63.5469 69.4222C63.4158 69.0815 63.3249 68.8148 63.2739 68.6259V72.0778H62.7207V67.9037H63.4814L64.5586 70.5555C64.6678 70.837 64.7661 71.1407 64.8534 71.4667H64.8571Z" fill="black"/>'+
            '<path d="M3.84473 41.0517C3.84473 40.448 4.0267 39.9776 4.39429 39.6443C4.76188 39.311 5.27869 39.148 5.94835 39.148C6.61802 39.148 7.16758 39.3147 7.54245 39.6517C7.91732 39.9888 8.10657 40.4702 8.10657 41.0925C8.10657 41.2925 8.08473 41.4925 8.04106 41.6962C7.99739 41.8962 7.95007 42.0554 7.89184 42.1702L7.36412 41.9739C7.41871 41.8332 7.46602 41.6813 7.50242 41.5147C7.53881 41.348 7.55701 41.2036 7.55701 41.0776C7.55701 40.2295 7.02564 39.8036 5.95927 39.8036C5.45338 39.8036 5.0676 39.9073 4.79463 40.1147C4.52531 40.3221 4.39065 40.6295 4.39065 41.0369C4.39065 41.385 4.46344 41.7443 4.61266 42.1073H4.0631C3.92116 41.8258 3.84837 41.4739 3.84837 41.0517H3.84473Z" fill="black"/>'+
            '<path d="M4.52142 45.2703L4.87081 45.3888L5.31482 45.5518L8.02625 46.6851V47.4888H3.92454V46.9295H7.31655L7.09818 46.8518L6.52314 46.6295L3.9209 45.5481V45.0184L6.53041 43.9369C6.86525 43.8036 7.12729 43.711 7.3129 43.6592H3.9209V43.0962H8.02261V43.8703L5.41673 44.9666C5.14013 45.0777 4.84169 45.1777 4.52142 45.2666V45.2703Z" fill="black"/>'+
            '<path d="M8.305 33.182L3.671 31.264V30.459L8.2 32.384V29.997H8.893V33.182H8.305ZM8.193 35.2851L6.877 35.2431C6.93767 35.4251 6.968 35.6351 6.968 35.8731C6.968 36.3585 6.828 36.7528 6.548 37.0561C6.25867 37.3641 5.87133 37.5181 5.386 37.5181C4.812 37.5181 4.371 37.3361 4.063 36.9721C3.769 36.6361 3.622 36.1835 3.622 35.6141C3.622 35.1428 3.68967 34.7508 3.825 34.4381H4.567C4.38967 34.8021 4.301 35.2035 4.301 35.6421C4.301 35.9781 4.38267 36.2488 4.546 36.4541C4.72333 36.6735 4.973 36.7831 5.295 36.7831C5.96233 36.7831 6.296 36.4098 6.296 35.6631C6.296 35.2758 6.24 34.8861 6.128 34.4941L8.893 34.5431V37.2591H8.193V35.2851Z" fill="black"/>'+
            '</svg>';
            //modul  = '<div id = "'+id+'" class = "appended-modul modul C"><div class="name modul-nameAppendC C-name"></div></div>';
            return modul;
        }
        if ($number == 4){
            modul = '<svg id = "'+id+'" class = "appended-modul appendedCM" width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">'+
            '<mask id="mask0_79_253" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="75" height="75">'+
            '<path d="M6.94444 0H67.9704C69.8111 0 71.5778 0.733333 72.8815 2.03333C74.1852 3.33333 74.9148 5.1037 74.9148 6.94444V67.9704C74.9148 69.8111 74.1815 71.5778 72.8815 72.8815C71.5778 74.1852 69.8111 74.9148 67.9704 74.9148H6.94444C5.1037 74.9148 3.33704 74.1815 2.03333 72.8815C0.729629 71.5778 0 69.8111 0 67.9704V6.94444C0 5.1037 0.733333 3.33704 2.03333 2.03333C3.33333 0.729629 5.1037 0 6.94444 0Z" fill="white"/>'+
            '</mask>'+
            '<g mask="url(#mask0_79_253)">'+
            '<path d="M74.9407 0H0V74.9407H74.9407V0Z" fill="#DAD9D9"/>'+
            '</g>'+
            '<mask id="mask1_79_253" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="75" height="75">'+
            '<path d="M6.95185 0H68.0481C69.8926 0 71.6593 0.733333 72.963 2.03704C74.2667 3.34074 75 5.10741 75 6.95185V68.0481C75 69.8926 74.2667 71.6593 72.963 72.963C71.6593 74.2667 69.8926 75 68.0481 75H6.95185C5.10741 75 3.34074 74.2667 2.03704 72.963C0.733333 71.6593 0 69.8926 0 68.0481V6.95185C0 5.10741 0.733333 3.34074 2.03704 2.03704C3.34074 0.733333 5.10741 0 6.95185 0Z" fill="white"/>'+
            '</mask>'+
            '<g mask="url(#mask1_79_253)">'+
            '<path class="modul-border" d="M6.95185 0H68.0481C69.8926 0 71.6593 0.733333 72.963 2.03704C74.2667 3.34074 75 5.10741 75 6.95185V68.0481C75 69.8926 74.2667 71.6593 72.963 72.963C71.6593 74.2667 69.8926 75 68.0481 75H6.95185C5.10741 75 3.34074 74.2667 2.03704 72.963C0.733333 71.6593 0 69.8926 0 68.0481V6.95185C0 5.10741 0.733333 3.34074 2.03704 2.03704C3.34074 0.733333 5.10741 0 6.95185 0Z" stroke="black" stroke-width="4"/>'+
            '</g>'+
            '<path d="M32.3112 34.7481C31.5742 34.7481 31.0038 35.0259 30.5964 35.5815C30.1927 36.137 29.989 36.9111 29.989 37.9C29.989 39.963 30.7631 40.9963 32.3112 40.9963C32.9594 40.9963 33.7483 40.8333 34.6705 40.5074V42.1518C33.9112 42.4667 33.0631 42.6259 32.1261 42.6259C30.7816 42.6259 29.752 42.2185 29.0372 41.4C28.3261 40.5852 27.9668 39.4111 27.9668 37.8852C27.9668 36.9222 28.1409 36.0815 28.4927 35.3555C28.8446 34.6333 29.3446 34.0778 30.0001 33.6926C30.6557 33.3074 31.4261 33.1148 32.3075 33.1148C33.189 33.1148 34.1075 33.3333 35.0149 33.7667L34.3816 35.363C34.0372 35.2 33.689 35.0555 33.3372 34.9333C32.989 34.8111 32.6446 34.7481 32.3075 34.7481H32.3112Z" fill="black"/>'+
            '<path d="M40.5557 42.5L38.3261 35.2407H38.2705C38.352 36.7185 38.3891 37.7037 38.3891 38.1963V42.5H36.6372V33.2444H39.3076L41.4965 40.3222H41.5335L43.8557 33.2444H46.5261V42.5H44.6965V38.1185C44.6965 37.9111 44.6965 37.6741 44.7076 37.4037C44.715 37.1333 44.7409 36.4148 44.7928 35.2519H44.7372L42.352 42.5H40.5557Z" fill="black"/>'+
            '<path d="M40.5517 71.6518C39.9479 71.6518 39.4776 71.4667 39.1442 71.0926C38.8109 70.7185 38.6479 70.1926 38.6479 69.5111C38.6479 68.8296 38.8146 68.2704 39.1517 67.8889C39.4887 67.5074 39.9702 67.3148 40.5924 67.3148C40.7924 67.3148 40.9924 67.337 41.1961 67.3815C41.3961 67.4259 41.5554 67.4741 41.6702 67.5333L41.4739 68.0704C41.3331 68.0148 41.1813 67.9667 41.0146 67.9296C40.8479 67.8926 40.7035 67.8741 40.5776 67.8741C39.7294 67.8741 39.3035 68.4148 39.3035 69.5C39.3035 70.0148 39.4072 70.4074 39.6146 70.6852C39.822 70.9593 40.1294 71.0963 40.5368 71.0963C40.885 71.0963 41.2442 71.0222 41.6072 70.8704V71.4296C41.3257 71.5741 40.9739 71.6481 40.5517 71.6481V71.6518Z" fill="black"/>'+
            '<path d="M44.7703 70.963L44.8888 70.6074L45.0517 70.1556L46.1851 67.3963H46.9888V71.5704H46.4295V68.1185L46.3517 68.3407L46.1295 68.9259L45.048 71.5741H44.5184L43.4369 68.9185C43.3036 68.5778 43.211 68.3111 43.1592 68.1222V71.5741H42.5962V67.4H43.3703L44.4666 70.0519C44.5777 70.3333 44.6777 70.637 44.7666 70.963H44.7703Z" fill="black"/>'+
            '<path d="M3.20361 40.5519C3.20361 39.9481 3.3888 39.4778 3.76287 39.1444C4.13695 38.8111 4.66287 38.6481 5.34436 38.6481C6.02584 38.6481 6.5851 38.8148 6.96658 39.1519C7.34806 39.4889 7.54065 39.9704 7.54065 40.5926C7.54065 40.7926 7.51843 40.9926 7.47399 41.1963C7.42954 41.3963 7.38139 41.5556 7.32213 41.6704L6.7851 41.4741C6.84065 41.3333 6.8888 41.1815 6.92584 41.0148C6.96287 40.8481 6.98139 40.7037 6.98139 40.5778C6.98139 39.7296 6.44065 39.3037 5.35547 39.3037C4.84065 39.3037 4.44806 39.4074 4.17028 39.6148C3.89621 39.8222 3.75917 40.1296 3.75917 40.537C3.75917 40.8852 3.83324 41.2444 3.98509 41.6074H3.42584C3.28139 41.3259 3.20732 40.9741 3.20732 40.5519H3.20361Z" fill="black"/>'+
            '<path d="M3.89236 44.7704L4.24791 44.8889L4.69977 45.0519L7.45903 46.1852V46.9889H3.28495V46.4296H6.7368L6.51458 46.3519L5.9294 46.1296L3.28125 45.0481V44.5185L5.9368 43.437C6.27755 43.3037 6.54421 43.2111 6.7331 43.1593H3.28125V42.5963H7.45532V43.3704L4.80347 44.4667C4.52199 44.5778 4.21828 44.6778 3.89236 44.7667V44.7704Z" fill="black"/>'+
            '<path d="M31.682 67.195L29.764 71.829H28.959L30.884 67.3H28.497V66.607H31.682V67.195ZM33.7851 67.307L33.7431 68.623C33.9251 68.5623 34.1351 68.532 34.3731 68.532C34.8585 68.532 35.2528 68.672 35.5561 68.952C35.8641 69.2413 36.0181 69.6287 36.0181 70.114C36.0181 70.688 35.8361 71.129 35.4721 71.437C35.1361 71.731 34.6835 71.878 34.1141 71.878C33.6428 71.878 33.2508 71.8103 32.9381 71.675V70.933C33.3021 71.1103 33.7035 71.199 34.1421 71.199C34.4781 71.199 34.7488 71.1173 34.9541 70.954C35.1735 70.7767 35.2831 70.527 35.2831 70.205C35.2831 69.5377 34.9098 69.204 34.1631 69.204C33.7758 69.204 33.3861 69.26 32.9941 69.372L33.0431 66.607H35.7591V67.307H33.7851Z" fill="black"/>'+
            '<path d="M7.305 31.682L2.671 29.764V28.959L7.2 30.884V28.497H7.893V31.682H7.305ZM7.193 33.7851L5.877 33.7431C5.93767 33.9251 5.968 34.1351 5.968 34.3731C5.968 34.8585 5.828 35.2528 5.548 35.5561C5.25867 35.8641 4.87133 36.0181 4.386 36.0181C3.812 36.0181 3.371 35.8361 3.063 35.4721C2.769 35.1361 2.622 34.6835 2.622 34.1141C2.622 33.6428 2.68967 33.2508 2.825 32.9381H3.567C3.38967 33.3021 3.301 33.7035 3.301 34.1421C3.301 34.4781 3.38267 34.7488 3.546 34.9541C3.72333 35.1735 3.973 35.2831 4.295 35.2831C4.96233 35.2831 5.296 34.9098 5.296 34.1631C5.296 33.7758 5.24 33.3861 5.128 32.9941L7.893 33.0431V35.7591H7.193V33.7851Z" fill="black"/>'+
            '</svg>';
            //modul = '<div id = "'+id+'" class = "appended-modul modul CM"><div class="name modul-nameAppendCM CM-name">M</div></div>';
            return modul;
        }
        if ($number == 5){
            modul = '<svg id = "'+id+'" class = "appended-modul appendedCB" width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">'+
            '<mask id="mask0_79_279" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="110" height="110">'+
            '<path d="M6.82382 0H103.063C104.872 0 106.608 0.720547 107.889 1.99788C109.17 3.27886 109.887 5.01472 109.887 6.82337V103.177C109.887 104.985 109.167 106.721 107.889 108.002C106.608 109.283 104.872 110 103.063 110H6.82382C5.01505 110 3.27907 109.279 1.99802 108.002C0.716957 106.721 0 104.985 0 103.177V6.82337C0 5.01472 0.720596 3.27886 1.99802 1.99788C3.27907 0.716908 5.01505 0 6.82382 0Z" fill="white"/>'+
            '</mask>'+
            '<g mask="url(#mask0_79_279)">'+
            '<path d="M109.964 0H0V109.956H109.964V0Z" fill="#DAD9D9"/>'+
            '</g>'+
            '<mask id="mask1_79_279" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="110" height="110">'+
            '<path d="M6.8311 0.00363922H103.169C104.981 0.00363922 106.717 0.724188 107.998 2.00152C109.279 3.2825 110 5.01472 110 6.82701V103.173C110 104.982 109.279 106.717 107.998 107.998C106.717 109.279 104.981 109.996 103.169 109.996H6.8311C5.01869 109.996 3.28271 109.276 2.00165 107.998C0.720596 106.717 0 104.985 0 103.173V6.82701C0 5.01836 0.720596 3.2825 2.00165 2.00152C3.28271 0.720549 5.01869 0.00363922 6.8311 0.00363922Z" fill="white"/>'+
            '</mask>'+
            '<g mask="url(#mask1_79_279)">'+
            '<path  class="modul-border" d="M6.8311 0.00363922H103.169C104.981 0.00363922 106.717 0.724188 107.998 2.00152C109.279 3.27886 110 5.01472 110 6.82701V103.173C110 104.982 109.279 106.717 107.998 107.998C106.717 109.279 104.981 109.996 103.169 109.996H6.8311C5.01869 109.996 3.28271 109.276 2.00165 107.998C0.720596 106.717 0 104.985 0 103.173V6.82701C0 5.01836 0.720596 3.2825 2.00165 2.00152C3.28271 0.720549 5.01869 0.00363922 6.8311 0.00363922Z" stroke="black" stroke-width="4"/>'+
            '</g>'+
            '<path d="M51.8246 52.4327C51.1004 52.4327 50.54 52.7056 50.1396 53.2516C49.7429 53.7975 49.5428 54.5581 49.5428 55.5298C49.5428 57.5569 50.3034 58.5723 51.8246 58.5723C52.4615 58.5723 53.2367 58.4122 54.1429 58.0919V59.7078C53.3969 60.0171 52.5634 60.1736 51.6427 60.1736C50.3216 60.1736 49.3098 59.7733 48.6074 58.969C47.9087 58.1683 47.5557 57.0147 47.5557 55.5152C47.5557 54.569 47.7267 53.7429 48.0725 53.0295C48.4182 52.3199 48.9095 51.774 49.5537 51.3955C50.1978 51.017 50.9548 50.8277 51.821 50.8277C52.6872 50.8277 53.5897 51.0424 54.4814 51.4683L53.8591 53.0368C53.5206 52.8767 53.1785 52.7348 52.8328 52.6147C52.4907 52.4946 52.1522 52.4327 51.821 52.4327H51.8246Z" fill="black"/>'+
            '<path d="M58.0082 58.4668H58.656C59.3074 58.4668 59.7842 58.3612 60.0863 58.1538C60.3883 57.9427 60.5412 57.6297 60.5412 57.2039C60.5412 56.7781 60.3883 56.4833 60.0826 56.2977C59.7769 56.1121 59.2492 56.0211 58.5031 56.0211H58.0118V58.4668H58.0082ZM58.0082 54.4416H58.7652C59.9516 54.4416 60.8651 54.6818 61.5129 55.1622C62.1607 55.6426 62.481 56.3232 62.481 57.2039C62.481 59.1 61.229 60.0463 58.7251 60.0463H56.0757V50.9515H61.8186V52.5419H58.0009V54.438L58.0082 54.4416Z" fill="black"/>'+
            '<path d="M3.38818 45.4529V44.8451H7.29687C7.62077 44.8451 7.93012 44.856 8.21763 44.8742C8.16668 44.8233 8.10845 44.7614 8.05386 44.6995C7.99563 44.634 7.75179 44.3356 7.32234 43.8079L7.75179 43.4767L8.87635 44.9288V45.4529H3.39182H3.38818Z" fill="black"/>'+
            '<path d="M3.38818 49.8417V49.2339H7.29687C7.62077 49.2339 7.93012 49.2448 8.21763 49.263C8.16668 49.212 8.10845 49.1502 8.05386 49.0883C7.99563 49.0228 7.75179 48.7244 7.32234 48.1967L7.75179 47.8655L8.87635 49.3176V49.8417H3.39182H3.38818Z" fill="black"/>'+
            '<path d="M6.13568 52.5636C5.33865 52.5636 4.75635 52.6583 4.39242 52.8439C4.02848 53.0331 3.84651 53.3315 3.84651 53.7392C3.84651 54.1468 4.03212 54.4561 4.39969 54.6417C4.76727 54.8273 5.34593 54.9219 6.13568 54.9219C6.92542 54.9219 7.50044 54.8273 7.86802 54.6417C8.23559 54.4561 8.41756 54.154 8.41756 53.7392C8.41756 53.3243 8.23559 53.0295 7.87529 52.8439C7.515 52.6546 6.93634 52.5636 6.13568 52.5636ZM6.13568 55.5625C5.18944 55.5625 4.47976 55.4133 4.01392 55.1148C3.54808 54.8164 3.31152 54.3578 3.31152 53.7428C3.31152 53.1277 3.55172 52.7056 4.02848 52.3962C4.50888 52.0869 5.20764 51.934 6.13568 51.934C7.06371 51.934 7.79887 52.0832 8.26107 52.3817C8.72327 52.6801 8.95619 53.1314 8.95619 53.7428C8.95619 54.3542 8.71599 54.7909 8.23195 55.1003C7.74792 55.4096 7.04916 55.5625 6.13568 55.5625Z" fill="black"/>'+
            '<path d="M3.31152 60.2387C3.31152 59.6454 3.49349 59.1832 3.86107 58.8557C4.22864 58.5282 4.74544 58.368 5.41508 58.368C6.08472 58.368 6.63427 58.5318 7.00912 58.863C7.38398 59.1942 7.57323 59.6673 7.57323 60.2787C7.57323 60.4752 7.55139 60.6717 7.50772 60.8719C7.46405 61.0684 7.41673 61.2249 7.3585 61.3378L6.83079 61.1449C6.88539 61.0066 6.9327 60.8574 6.96909 60.6936C7.00549 60.5298 7.02368 60.3879 7.02368 60.2641C7.02368 59.4307 6.49233 59.0122 5.426 59.0122C4.92012 59.0122 4.53435 59.1141 4.2614 59.3179C3.99209 59.5217 3.85743 59.8238 3.85743 60.2241C3.85743 60.5662 3.93022 60.9192 4.07943 61.2759H3.52989C3.38795 60.9993 3.31516 60.6535 3.31516 60.2387H3.31152Z" fill="black"/>'+
            '<path d="M3.98868 64.3873L4.33806 64.5037L4.78206 64.6639L7.49339 65.7775V66.5673H3.39182V66.0177H6.78372L6.56535 65.9413L5.99033 65.7229L3.38818 64.6602V64.1398L5.99761 63.0771C6.33243 62.9461 6.59447 62.8551 6.78008 62.8042H3.38818V62.251H7.48975V63.0116L4.88397 64.0889C4.60737 64.198 4.30895 64.2963 3.98868 64.3836V64.3873Z" fill="black"/>'+
            '<path d="M45.3937 106.747H44.7859V102.838C44.7859 102.514 44.7968 102.205 44.815 101.918C44.764 101.968 44.7022 102.027 44.6403 102.081C44.5748 102.14 44.2764 102.383 43.7487 102.813L43.4175 102.383L44.8696 101.259H45.3937V106.743V106.747Z" fill="black"/>'+
            '<path d="M49.7828 106.747H49.175V102.838C49.175 102.514 49.186 102.205 49.2042 101.918C49.1532 101.968 49.0913 102.027 49.0295 102.081C48.964 102.14 48.6655 102.383 48.1378 102.813L47.8066 102.383L49.2588 101.259H49.7828V106.743V106.747Z" fill="black"/>'+
            '<path d="M52.5056 103.999C52.5056 104.796 52.6002 105.379 52.7858 105.743C52.9714 106.106 53.2735 106.288 53.6811 106.288C54.0887 106.288 54.3981 106.103 54.5837 105.735C54.7693 105.368 54.8639 104.789 54.8639 103.999C54.8639 103.21 54.7693 102.635 54.5837 102.267C54.3981 101.899 54.096 101.717 53.6811 101.717C53.2662 101.717 52.9714 101.899 52.7858 102.26C52.5966 102.62 52.5056 103.199 52.5056 103.999ZM55.5044 103.999C55.5044 104.946 55.3552 105.655 55.0568 106.121C54.7584 106.587 54.2998 106.823 53.6847 106.823C53.0697 106.823 52.6475 106.583 52.3382 106.106C52.0288 105.626 51.876 104.927 51.876 103.999C51.876 103.071 52.0252 102.336 52.3236 101.874C52.622 101.412 53.0733 101.179 53.6847 101.179C54.2962 101.179 54.7329 101.419 55.0422 101.903C55.3516 102.387 55.5044 103.086 55.5044 103.999Z" fill="black"/>'+
            '<path d="M60.1768 106.823C59.5836 106.823 59.1214 106.641 58.7938 106.274C58.4663 105.906 58.3062 105.389 58.3062 104.72C58.3062 104.05 58.4699 103.501 58.8011 103.126C59.1323 102.751 59.6054 102.562 60.2168 102.562C60.4133 102.562 60.6099 102.583 60.81 102.627C61.0066 102.671 61.1631 102.718 61.2759 102.776L61.083 103.304C60.9447 103.249 60.7955 103.202 60.6317 103.166C60.4679 103.129 60.326 103.111 60.2023 103.111C59.3688 103.111 58.9503 103.643 58.9503 104.709C58.9503 105.215 59.0522 105.601 59.256 105.873C59.4598 106.143 59.7619 106.277 60.1622 106.277C60.5043 106.277 60.8573 106.205 61.214 106.055V106.605C60.9374 106.747 60.5917 106.82 60.1768 106.82V106.823Z" fill="black"/>'+
            '<path d="M64.3258 106.146L64.4422 105.797L64.6024 105.353L65.716 102.642H66.5057V106.743H65.9562V103.351L65.8798 103.57L65.6614 104.145L64.5987 106.747H64.0783L63.0156 104.137C62.8846 103.803 62.7936 103.541 62.7426 103.355V106.747H62.1895V102.645H62.9501L64.0273 105.251C64.1365 105.528 64.2348 105.826 64.3221 106.146H64.3258Z" fill="black"/>'+
            '</svg>';
            //modul = '<div id = "'+id+'" class = "appended-modul modul CB"><div class="name modul-nameAppendCB CB-name"></div></div>';
            return modul;
        }
        return -1;
    };
    /// добавляем модуль на холст
    $append = function(tar,elem)
    {
        tar.append(elem);
    }
    
    $findMinDistObj = function($id){
        // данная функция запускается 
        // имеем $id - элемент который перетаскиваем
        // appendenObj = ['id':'lx','tx','rx','by'] - массив который содержит id и координаты уже размещенных объектов
        $resulPos = 0; // 1 2 3 4 5 6 7 8
        // запускаем основной цикл обхода в нем мы от каждой вершины до каждой вершины будем смотреть дистанцию
        // и находить минимальную
        // получам координаты вершин нашего объекта
        $elem = document.getElementById($id);
        $elemRect = $elem.getBoundingClientRect();

        $TLx = $elemRect.left;
        $TLy = $elemRect.top;

        $TRx = $elemRect.right;
        $TRy = $elemRect.top;

        $BRx = $elemRect.right;
        $BRy = $elemRect.bottom;

        $BLx = $elemRect.left;
        $BLy = $elemRect.bottom;
        $resultDistanse = 9999;
        $reultIDelem = 0; 
        if(appendedObj.size>0){
            for(let key of appendedObj.keys()){
                $pos1 = true;
                $pos2 = true;
                $pos3 = true;
                $pos4 = true;
                $pos5 = true;
                $pos6 = true;
                $pos7 = true;
                $pos8 = true;
                if(key == $id){
                    continue;
                }
                $dist = function(x1,y1,x2,y2){
                    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
                }
                $tCordY = appendedObj.get(key)[0];
                $rCordX = appendedObj.get(key)[2];
                $lCordX = appendedObj.get(key)[1];
                $bCordY = appendedObj.get(key)[3];
                // сначала нужно выяснить разрешенные позиции
                $allowPos = $AllowedPositions(key,$id);
                //console.log(key,$allowPos);
                $pos1 = $allowPos[0];
                $pos2 = $allowPos[1];
                $pos3 = $allowPos[2];
                $pos4 = $allowPos[3];
                $pos5 = $allowPos[4];
                $pos6 = $allowPos[5];
                $pos7 = $allowPos[6];
                $pos8 = $allowPos[7];

                // после этого нужно вычислить минимальную дистанцию смещения до разрешенных позиций
                // здесь в зависимости от разрешенной позиции будем считать расстояние смещения

                // координаты вершин притендента на клейку
                $prTLx = appendedObj.get(key)[0];
                $prTLy = appendedObj.get(key)[1];

                $prTRx = appendedObj.get(key)[2];
                $prTRy = appendedObj.get(key)[1];

                $prBRx = appendedObj.get(key)[2];
                $prBRy = appendedObj.get(key)[3];

                $prBLx = appendedObj.get(key)[0];
                $prBLy = appendedObj.get(key)[3];
                //////
                if($pos1){ // от левой верхней до правой верхней
                    $distX =  $TLx-$prTRx;
                    $distY =  $TLy-$prTRy;
                    $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
                    //console.log($distResPr);
                    if($distResPr<$resultDistanse){
                        $resultDistanse = $distResPr;
                        $reultIDelem = key;
                        $resulPos = 1;
                    }
                }
                if($pos2){ // от правой нижней до првой верхней
                    $distX =  $BRx-$prTRx;
                    $distY =  $BRy-$prTRy;
                    $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
                    if($distResPr<$resultDistanse){
                        $resultDistanse = $distResPr;
                        $reultIDelem = key;
                        $resulPos = 2;
                    }
                }
                if($pos3){
                    $distX =  $BLx-$prTLx;
                    $distY =  $BLy-$prTLy;
                    $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
                    if($distResPr<$resultDistanse){
                        $resultDistanse = $distResPr;
                        $reultIDelem = key;
                        $resulPos = 3;
                    }
                }
                if($pos4){
                    $distX =  $TRx-$prTLx;
                    $distY =  $TRy-$prTLy;
                    $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
                    if($distResPr<$resultDistanse){
                        $resultDistanse = $distResPr;
                        $reultIDelem = key;
                        $resulPos = 4;
                    }
                }
                if($pos5){
                    $distX =  $BRx-$prBLx;
                    $distY =  $BRy-$prBLy;
                    $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
                    if($distResPr<$resultDistanse){
                        $resultDistanse = $distResPr;
                        $reultIDelem = key;
                        $resulPos = 5;
                    }
                }
                if($pos6){
                    $distX =  $TLx-$prBLx;
                    $distY =  $TLy-$prBLy;
                    $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
                    if($distResPr<$resultDistanse){
                        $resultDistanse = $distResPr;
                        $reultIDelem = key;
                        $resulPos = 6;
                    }
                }
                if($pos7){
                    $distX =  $TRx-$prBRx;
                    $distY =  $TRy-$prBRy;
                    $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
                    if($distResPr<$resultDistanse){
                        $resultDistanse = $distResPr;
                        $reultIDelem = key;
                        $resulPos = 7;
                    }
                }
                if($pos8){
                    $distX =  $BLx-$prBRx;
                    $distY =  $BLy-$prBRy;
                    $distResPr = Math.sqrt($distX*$distX+$distY*$distY);
                    //console.log($distResPr);
                    if($distResPr<$resultDistanse){
                        $resultDistanse = $distResPr;
                        $reultIDelem = key;
                        $resulPos = 8;

                    }
                }
            }
            
            if($resulPos != 0){
                //console.log($reultIDelem,$resultDistanse,$resulPos);
                return([$reultIDelem,$resultDistanse,$resulPos]);
            }
            return(0); // не нашли позицию для размещения, размещаем по месту расположения
        }
        else{
            if(appendedObj.keys() == 0)
            return(1); // добвыленных элементов всего 0, размещаем по месту расположения
        }
        return(appendedObj.keys());
    };
    $AllowedPositions = function($targetId,$ourId){
        $elemRect = document.getElementById($ourId).getBoundingClientRect();
        $ourWidth = $elemRect.right-$elemRect.left;
        $ourHeight = $elemRect.bottom-$elemRect.top;

        $pos1 = true;
        $pos2 = true;
        $pos3 = true;
        $pos4 = true;
        $pos5 = true;
        $pos6 = true;
        $pos7 = true;
        $pos8 = true;

        // $tarElemRect = document.getElementById($targetId).getBoundingClientRect();
        // $lCordX = $tarElemRect.left;  
        // $rCordX = $tarElemRect.right; 
        // $tCordY = $tarElemRect.top;
        // $bCordY = $tarElemRect.bottom;

        // $lCordX = $('#'+$targetId).position().left;
        // $rCordX = $('#'+$targetId).position().left+$('#'+$targetId).width();
        // $tCordY = $('#'+$targetId).position().top;
        // $bCordY = $('#'+$targetId).position().top+$('#'+$targetId).height();
        
        for ($id of appendedObj.keys()) {
            if($id == $targetId || $id == $ourId){
                continue;
            }
            ///pos1
            $lCordX = appendedObj.get($targetId)[0];
            $rCordX = appendedObj.get($targetId)[2];
            $tCordY = appendedObj.get($targetId)[1];
            $bCordY = appendedObj.get($targetId)[3];
            $lX = appendedObj.get($id)[0];
            $rX = appendedObj.get($id)[2];
            $tY = appendedObj.get($id)[1];
            $bY = appendedObj.get($id)[3];

            $d1 = $tY - $tCordY; 
            $d2 = $bY - $tCordY;
            $d3 = $lX - $rCordX; 
            $d4 = $rX - $rCordX;
             
            if($d2 >= 0.5 && $d4 >= 0.5){
                if($id!=$ourId && $d1 <= $ourHeight-5 && $d3 <= $ourWidth-5){
                    //console.log($targetId,'pos1 false',$d2,'-расстояние до ',$id);
                    $pos1 = false;
                }
            }
            $lCordX = appendedObj.get($targetId)[0];
            $rCordX = appendedObj.get($targetId)[2];
            $tCordY = appendedObj.get($targetId)[1];
            $bCordY = appendedObj.get($targetId)[3];
            $lX = appendedObj.get($id)[0];
            $rX = appendedObj.get($id)[2];
            $tY = appendedObj.get($id)[1];
            $bY = appendedObj.get($id)[3];
            $d1 = $tCordY-$bY;
            $d2 = $rCordX-$rX;
            $d3 = $rCordX-$lX;
            $d4 = $tCordY-$tY;
            if($d3 > 0.5 && $d4 > 0.5){
                if($id!=$ourId && $d2 <= $ourWidth-5 && $d1 <= $ourHeight-5){
                    $pos2 = false;
                }
            }
            $lCordX = appendedObj.get($targetId)[0];
            $rCordX = appendedObj.get($targetId)[2];
            $tCordY = appendedObj.get($targetId)[1];
            $bCordY = appendedObj.get($targetId)[3];
            $lX = appendedObj.get($id)[0];
            $rX = appendedObj.get($id)[2];
            $tY = appendedObj.get($id)[1];
            $bY = appendedObj.get($id)[3];
            $d1 = $tCordY-$bY;
            $d2 = $lX-$lCordX;
            $d3 = $lCordX-$rX;
            $d4 = $tCordY-$tY;
            if($d3 < -0.5 && $d4 > 0.5){
                if($id!=$ourId && $d2 <= $ourWidth-5 && $d1 <= $ourHeight-5){
                    $pos3 = false;
                }
            }
            $lCordX = appendedObj.get($targetId)[0];
            $rCordX = appendedObj.get($targetId)[2];
            $tCordY = appendedObj.get($targetId)[1];
            $bCordY = appendedObj.get($targetId)[3];
            $lX = appendedObj.get($id)[0];
            $rX = appendedObj.get($id)[2];
            $tY = appendedObj.get($id)[1];
            $bY = appendedObj.get($id)[3];
            $d1 = $tY - $tCordY; 
            $d2 = $bY - $tCordY; 
            $d3 = $lCordX - $rX; 
            $d4 = $lCordX-$lX;
            if($d2 > 0.5 && $d4 > 0.5){
                if($id!=$ourId && $d1 <= $ourHeight-5 && $d3 <= $ourWidth-5){
                    $pos4 = false;
                }
            }
            $lCordX = appendedObj.get($targetId)[0];
            $rCordX = appendedObj.get($targetId)[2];
            $tCordY = appendedObj.get($targetId)[1];
            $bCordY = appendedObj.get($targetId)[3];
            $lX = appendedObj.get($id)[0];
            $rX = appendedObj.get($id)[2];
            $tY = appendedObj.get($id)[1];
            $bY = appendedObj.get($id)[3];
            $d1 = $bY - $bCordY; 
            $d2 = $bY - $tCordY; 
            $d3 = $lCordX - $rX; 
            $d4 = $lCordX-$lX;
            $d5 = $tY - $bCordY;
            if($d4 > 0.5 && $d2 > 0){
                if($id!=$ourId && ($d1 <= $ourHeight-5 && $d3 <= $ourWidth-5)||($d5 < 0 && $d3 <= $ourWidth-5)){
                    $pos5 = false;
                }
            }
            $lCordX = appendedObj.get($targetId)[0];
            $rCordX = appendedObj.get($targetId)[2];
            $tCordY = appendedObj.get($targetId)[1];
            $bCordY = appendedObj.get($targetId)[3];
            $lX = appendedObj.get($id)[0];
            $rX = appendedObj.get($id)[2];
            $tY = appendedObj.get($id)[1];
            $bY = appendedObj.get($id)[3];
            $d1 = $tY-$bCordY;
            $d2 = $lX-$lCordX;
            $d3 = $lCordX-$rX;
            $d5 = $bCordY-$bY;
            
            if($d3 <= 0.0 && $d5 < -0.5){
                if($id!=$ourId && $d2 >= -0.5 && $d2 <= $ourWidth-3 && $d1 <= $ourHeight-5){
                    $pos6 = false;
                }
                // был фикс бага с клейкой.
                if($id!=$ourId && $d2 < 1 && $rX-$lCordX > 1 && $d1 <= $ourHeight-5){
                    $pos6 = false;
                } 
            }
            
            //console.log($id,$targetId,$d3,$d5)
            $lCordX = appendedObj.get($targetId)[0];
            $rCordX = appendedObj.get($targetId)[2];
            $tCordY = appendedObj.get($targetId)[1];
            $bCordY = appendedObj.get($targetId)[3];
            $lX = appendedObj.get($id)[0];
            $rX = appendedObj.get($id)[2];
            $tY = appendedObj.get($id)[1];
            $bY = appendedObj.get($id)[3];
            $d1 = $tY-$bCordY;
            $d2 = $rCordX-$rX;
            $d3 = $rCordX-$lX;
            $d4 = $tCordY-$tY;
            $d5 = $bCordY-$bY;
            if($d3 > -0.1 && $d4 <= 0.1 && $d5 < -1){
                if($id!=$ourId && $d2 >= -0.5 && $d2 <= $ourWidth-3 && $d1 <= $ourHeight){
                    $pos7 = false;
                }
                if($id!=$ourId && $d2 < -1.5 && $rCordX-$lX > 1.5 && $d1 <= $ourHeight){
                    $pos7 = false;
                }
            }
            $lCordX = appendedObj.get($targetId)[0];
            $rCordX = appendedObj.get($targetId)[2];
            $tCordY = appendedObj.get($targetId)[1];
            $bCordY = appendedObj.get($targetId)[3];
            $lX = appendedObj.get($id)[0];
            $rX = appendedObj.get($id)[2];
            $tY = appendedObj.get($id)[1];
            $bY = appendedObj.get($id)[3];
            $d1 = $bCordY - $bY; 
            $d2 = $bY - $tCordY; 
            $d3 = $lX - $rCordX;
            $d4 = $rX - $rCordX; 
            $d5 = $bCordY - $tY; 
            if($d4 > 0.5){
                if($id!=$ourId && $d5 > 0 && $d1 <= $ourHeight-5 && $d3 <= $ourWidth-5){
                    $pos8 = false;
                }
            }
        }
        //console.log($targetId,[$pos1,$pos2,$pos3,$pos4,$pos5,$pos6,$pos7,$pos8]);
        return([$pos1,$pos2,$pos3,$pos4,$pos5,$pos6,$pos7,$pos8]);
    };
    $setPositionObetcs = function($idOur,$idTar,$posTar){
        //$saveGropsPositions($idTar,$idOur,$resultPos);
        // $idOur - объект который атачим
        // $idTar - объект к которому атачим
        // $posTar - куда собственно атачим
        $resultPos = $posTar;

        element1 = document.getElementById($idTar);  
        var rect1 = element1.getBoundingClientRect(); // объект к которому клеим

        element2 = element1 = document.getElementById($idOur); 
        var rect2 = element2.getBoundingClientRect(); // объект который клеим
        //console.log($idOur,$idTar,$resultPos);
        //console.log($('#'+$idOur).offset());
        if($resultPos == 1){

            $('#'+$idOur).offset({top: rect1.top, left: rect2.left - (rect2.left-rect1.right)});

        }
        
        if($resultPos == 2){

            $('#'+$idOur).offset({top: rect2.top-(rect2.bottom-rect1.top), left: rect1.right-(rect2.right-rect2.left)});

        }
        if($resultPos == 3){

            $('#'+$idOur).offset({top: rect2.top-(rect2.bottom-rect1.top), left: rect1.left});

        }
        if($resultPos == 4){

            $('#'+$idOur).offset({top: rect2.top+(rect1.top - rect2.top), left: rect2.left+(rect1.left - rect2.right)});

        }
        if($resultPos == 5){

            $('#'+$idOur).offset({top: rect2.top-(rect2.bottom-rect1.bottom), left: rect2.left+(rect1.left - rect2.right)});

        }
        if($resultPos == 6){

            $('#'+$idOur).offset({top: rect1.bottom, left: rect1.left});

        }
        if($resultPos == 7){

            $('#'+$idOur).offset({top: rect1.bottom, left: rect1.right-(rect2.right-rect2.left)});

        }
        if($resultPos == 8){

            $('#'+$idOur).offset({top: rect2.top+(rect1.bottom - rect2.bottom), left: rect2.left - (rect2.left-rect1.right)});

        }
        $updateCord($idOur);
        //console.log($('#'+$idOur).offset());
    };
    $updateSize = function(){
        let objContainer = document.getElementById('container');
        rectcont = objContainer.getBoundingClientRect();
        if($('body').width() > $('body').height()){
            $containerRX = rectcont.right-$('#menu').width();
        }
        else {
            $containerRX = rectcont.right;
        }
        return $containerRX;
    };
    $getCenterDistanse = function($id1,$id2){
        //console.log($id1,$id2)
        $elem1 = document.getElementById($id1);
        $elem1Rect = $elem1.getBoundingClientRect();
        $elem2 = document.getElementById($id2);
        $elem2Rect = $elem2.getBoundingClientRect();

        $centerE1X = $elem1Rect.left + ($elem1Rect.right - $elem1Rect.left)/2;
        $centerE1Y = $elem1Rect.top + ($elem1Rect.bottom - $elem1Rect.top)/2;

        $centerE2X = $elem2Rect.left + ($elem2Rect.right - $elem2Rect.left)/2;
        $centerE2Y = $elem2Rect.top + ($elem2Rect.bottom - $elem2Rect.top)/2;

        return Math.sqrt(($centerE1X-$centerE2X)*($centerE1X-$centerE2X) + ($centerE1Y-$centerE2Y)*($centerE1Y-$centerE2Y));

    };
    $minDist = function($id1,$id2){
        $minD1 = $('#'+$id1).width()/2 + $('#'+$id2).width()/2 + $minConstDist;
        $minD2 = $('#'+$id1).height()/2 + $('#'+$id2).height()/2 + $minConstDist;
        return Math.sqrt($minD1*$minD1 + $minD2*$minD2);
    }

    $controllFunc = function(){
        if(window.innerWidth > 1250) { // десктоп версия.
            $('#menu').css({
                'display': 'flex',
                'position': 'absolute',
                'width': '15%',
                'height': '100%',
                'right': '0',
                'bottom': 'auto',
                'background-color': 'rgb(255, 255, 255)',
                'flex-wrap': 'nowrap',
                'align-items': 'center',
                'justify-content': 'center',
                'align-content': 'center',
                'z-index': '999',
            });
            $('.menu-container').css({
                'display': 'flex',
                'flex-direction': 'column',
                'justify-content': 'center',
                'align-items': 'center',
                'flex-wrap': 'nowrap',
                'height': '100%',
                'width': 'auto',
            });
            $('.canvas-UI').css({
                'position': 'absolute',
                'width': '85%',
                'height': '100%',
                'left': '0',
            });
            $('.canvas').css({
                'position': 'relative',
                'float': 'left',
                'width': '85%',
                'height': '100%',
                'left': '0',
            });
            //удаляем все прикрепленные события.
            $('*').unbind();
            // функции завязанные на событие клика.
            $calculateMouseOffset = function($e){
                $mouseD_x = $e.pageX;
                $mouseD_y = $e.pageY;
                // считываем координаты блока на который нажали
                $elemCordX = $e.currentTarget.getBoundingClientRect().left;
                $elemCordY = $e.currentTarget.getBoundingClientRect().top;
                $elemCordXR = $e.currentTarget.getBoundingClientRect().right;
                // вычиляем смещение от позиции мыши для генерации нового объекта
                $deltaX = $mouseD_x-$elemCordX;
                $deltaY = $mouseD_y-$elemCordY;
                return [$deltaX,$deltaY];
            };
            $calculateMouseOffsetMoovbl = function($e,$tarId){
                $mouseD_x = $e.pageX;
                $mouseD_y = $e.pageY;
                $tar = document.getElementById($tarId);
                // считываем координаты блока на который нажали
                $elemCordX = $tar.getBoundingClientRect().left;
                $elemCordY = $tar.getBoundingClientRect().top;
                $elemCordXR = $tar.getBoundingClientRect().right;
                // вычиляем смещение от позиции мыши для генерации нового объекта
                $deltaX = $mouseD_x-$elemCordX;
                $deltaY = $mouseD_y-$elemCordY;
                return [$deltaX,$deltaY];
            };
            $spawnElem = function($numberObj,$id,$e){
                $offsetClick = $calculateMouseOffset($e);
                $deltaX = $offsetClick[0];
                $deltaY = $offsetClick[1]; 
                // получаем html код модуля
                $moovObj = $creatModul($id,$numberObj);
                // добавляем на страницу(он скрыт)
                $append($('.canvas'),$moovObj)
                $updateObjSize($id);
                
                // получаем добавленный модуль
                $moovblModul = $('#'+$id);
                $moovblModul.css({
                    'cursor': 'grabbing'
                });
                // смещаем его так, чтобы он был ровно поверх модуля но который нажали
                $moovblModul.offset({top: ($e.pageY-$deltaY)*100/$baseScale, left: ($e.pageX-$deltaX)*100/$baseScale});
                // отображаем модуль
                
                $moovblModul.show();
                
                $('body').css({
                    'pointer-events':'none'
                });
                $('#container').css({
                    'pointer-events':'auto'
                });
            };
            /// Основная функция размещения объектов
            $appendMainFunc = function($numberObj,id,e){
                if (e.which == 1){
                    $spawnElem($numberObj,id,e);
                    $offsetClick = $calculateMouseOffset(e);
                    $deltaX = $offsetClick[0];
                    $deltaY = $offsetClick[1];
                    // запускаем логику если мышь начала движение
                    $(document).mousemove(function (e) {
                        // пока клавиша зажата и мышь движется меняем динамично смещение модуля
                        $('#'+idObject).css({
                            'z-index':'9999'
                        });
                        $moovblModul.offset({top: (e.pageY-$deltaY)*100/$baseScale, left: (e.pageX-$deltaX)*100/$baseScale});
                    }).click(function (e) {
                        $rightPosModul = $moovblModul.offset().left+$moovblModul.width();
                        $rightPosUI = $('.canvas').width();
                        //if( $rightPosModul < $rightPosUI){
                            // запускаем логику если кнопка отжата
                            objAdd = document.getElementById(idObject);
                            topY = objAdd.getBoundingClientRect().top;
                            topX = objAdd.getBoundingClientRect().left;
                            dovnY = topY + $('#'+idObject).height();
                            dovnX = topX + $('#'+idObject).width();
        
                            
                            // условие создание объекта если на доске ничего нет.
                            if(appendedObj.size == 0){
                                if($rightPosModul > $rightPosUI){
                                    $moovblModul.offset({top: $('.canvas').height()/3, left: $rightPosUI/2});
                                    topY = objAdd.getBoundingClientRect().top;
                                    topX = objAdd.getBoundingClientRect().left;
                                    dovnY = topY + $('#'+idObject).height();
                                    dovnX = topX + $('#'+idObject).width();
                                }
                        
                                // основная логика
                                // добавляем объект высчитывем координаты его углов
                                // добавляем id объекта в коллекцию в качестве ключа и добавляем по ключу координаты вершин объекта
                                rotationObj.set(idObject,false);
                                $('#'+idObject).addClass("mainGr");
                                // добавляем в массив размещенных обхектов id размещенного модуля
                                appendedObj.set(idObject,[topX,topY,dovnX,dovnY]);
                                BaseObjMap.set(idObject,'1');
                                $controllerConstruct(0,idObject);
                                $recountFun(idObject,0);
                                $counterModuls(idObject,1);
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
                                $resPosAndIdF = $findMinDistObj(idObject);
                                //console.log($resPosAndIdF);
                                $resultPos = $resPosAndIdF[2];
                                $findeObj = $resPosAndIdF[0];
                                
                                $resultDistanse = $getCenterDistanse($findeObj,idObject);
                                $resMinDist = $minDist($findeObj,idObject);
                                if($rightPosModul > $rightPosUI){
                                    $saveGropsPositions($findeObj,idObject,$resultPos);
                                    $setPositionObetcs(idObject,$findeObj,$resultPos);
                                    // функция контролирующая принадлежность к группе объекта
                                    rotationObj.set(idObject,false);
                                    $controllerConstruct($findeObj,idObject);/////!!!!!!
                                    $recountFun(idObject,$findeObj);
                                    $counterModuls(idObject,1);
                                    numberIdObjecy = numberIdObjecy + 1;
                                    idObject = "appended-modul" + numberIdObjecy;
                                    $(this).unbind("click");
                                }
                                else{
                                    if($resultDistanse < $resMinDist){
                                        //////////////////////////////
                                        $saveGropsPositions($findeObj,idObject,$resultPos);
                                        //функция работающая c groupsPositions
                                        //////////////////////////////
                                        // далее нужна функция стыковки объектов
                                        $setPositionObetcs(idObject,$findeObj,$resultPos);
                                        $controllerConstruct($findeObj,idObject);////!!!!!!!
                                        $recountFun(idObject,$findeObj);
                                        $counterModuls(idObject,1);
                                        // увеличиваем индекс
                                        numberIdObjecy = numberIdObjecy + 1;
                                        idObject = "appended-modul" + numberIdObjecy;
                                        rotationObj.set(idObject,false);
                                        // открепляем событие на клик от текущего модуля
                                        $(this).unbind("click");
                                
                                        
                                    }
                                    else {
                                        BaseObjMap.set(idObject,'1');
                                        $updateCord(idObject);
                                        $controllerConstruct(0,idObject);
                                        $recountFun(idObject,0);
                                        $counterModuls(idObject,1);
                                        numberIdObjecy = numberIdObjecy + 1;
                                        idObject = "appended-modul" + numberIdObjecy;
                                        rotationObj.set(idObject,false);
                                        // открепляем событие на клик от текущего модуля
                                        $(this).unbind("click");
                                    }
                                }
                                
                            }
        
        
                            // условия создания объекта если на доске что-то есть.
                            $(this).unbind("mousemove");
                            $moovblModul.css({
                                'z-index':'999'
                            });
                            if(selectObj != 0){
                                $('#'+selectObj).children().children('.modul-border').css({
                                    'stroke':'black'
                                });
                            }
                            selectObj = $moovblModul.attr('id');
                            if(selectObj != 0){
                                $('#'+selectObj).children().children('.modul-border').css({
                                    'stroke':'red'
                                });
                            }
                            $('.RotAndDel').css({
                                'display':'block'
                            });
                            
                        //}
                        // else{
                            
                        //     $moovblModul.remove();
                        //     $(this).unbind("click");
                        //     $(this).unbind("mousemove");
                        // }
                        
                    });
                };
            };
            // крепим события на добавление
            $(".B").mousedown(function(e){
                $appendMainFunc(1,idObject,e);
            });
            $(".B").on('mouseout',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'black'
                });
            });
            $(".B").on('mouseover',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'red'
                });
            });

            $(".BM").mousedown(function(e){
                $appendMainFunc(2,idObject,e);
            });
            $(".BM").on('mouseout',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'black'
                });
            });
            $(".BM").on('mouseover',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'red'
                });
            });

            $(".C").mousedown(function(e){
                $appendMainFunc(3,idObject,e);
            });
            $(".C").on('mouseout',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'black'
                });
            });
            $(".C").on('mouseover',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'red'
                });
            });

            $(".CM").mousedown(function(e){
                $appendMainFunc(4,idObject,e);
            });
            $(".CM").on('mouseout',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'black'
                });
            });
            $(".CM").on('mouseover',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'red'
                });
            });

            $(".CB").mousedown(function(e){
                $appendMainFunc(5,idObject,e);
            });
            $(".CB").on('mouseout',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'black'
                });
            });
            $(".CB").on('mouseover',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'red'
                });
            });
            $( '.canvas' ).on( 'click', function( event1 ) {
                obj2 = event1.target;
                $classObj =$(obj2).attr('class')
                if($classObj == "RotAndDel-Rot" || $(obj2).parent().hasClass("RotAndDel-Rot")){

                }
                else if($classObj == "appended-modul") {
                    if(selectObj != 0){
                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'black'
                        });
                    }
                    selectObj = $(obj2).attr('id');
                    if(selectObj != 0){
                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'red'
                        });
                    }
                    $('.RotAndDel').css({
                        'display':'block'
                    });
                }
                else if($(obj2).parent().hasClass("appended-modul")){
                    if(selectObj != 0){

                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'black'
                        });
                    }
                    selectObj = $(obj2).parent().attr('id');
                    if(selectObj != 0){
                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'red'
                        });
                    }
                    $('.RotAndDel').css({
                        'display':'block'
                    });
                }
                else if($(obj2).parent().parent().hasClass("appended-modul")){
                    if(selectObj != 0){

                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'black'
                        });
                    }
                    selectObj = $(obj2).parent().parent().attr('id');
                    if(selectObj != 0){
                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'red'
                        });
                    }
                    $('.RotAndDel').css({
                        'display':'block'
                    });
                }
                else {
                    if(selectObj != 0){

                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'black'
                        });
                    }
                    selectObj = 0
                    $('.RotAndDel').css({
                        'display':'none'
                    });
                }
            });
            // вращение удаление
            $( '.canvas-UI' ).on( 'mousedown', function( event1 ) {
                obj = event1.target;
                classObj =$(obj).attr('class');
                if(classObj == "RotAndDel-Rot" || $(obj).parent().hasClass("RotAndDel-Rot")){
                    if($('#'+selectObj).hasClass('appended-modul') && !$('#'+selectObj).hasClass('appendedCM') && !$('#'+selectObj).hasClass('appendedCB')){
                        if (event1.which == 1 && selectObj!=0){
                            idObj = $('#'+selectObj).attr('id');
                            if(!rotationObj.get($('#'+selectObj).attr('id'))){
                                if($('#'+selectObj).hasClass('appendedC')){
                                    $('#'+selectObj).css({
                                        'transform-origin':'center center',
                                        'transform':'rotate(-90deg)'
            
                                    });
                                }
                                else{
                                    $('#'+selectObj).css({
                                        'transform-origin':'center center',
                                        'transform':'rotate(90deg)'

                                    });
                                }
                                $resPosAndIdF = $findMinDistObj(idObj); // найти ближайший
                                if($resPosAndIdF){
                                    $resultPos = $resPosAndIdF[2];
                                    $findeObj = $resPosAndIdF[0];
                                    $resMinDist = $minDist($findeObj,idObj);
                                    if($resultDistanse < $resMinDist){
                                        rotationObj.set($('#'+selectObj).attr('id'),true);
                                        $saveGropsPositions($findeObj,idObj,$resultPos);
                                        $setPositionObetcs(idObj,$findeObj,$resultPos); // состыковать
                                        $recountFun(idObj,$findeObj);
                                    }
                                    else{
                                        rotationObj.set($('#'+selectObj).attr('id'),true);
                                        $updateCord(idObj);
                                        if(appendedObj.size > 1){
                                            $recountFun(idObj,0);
                                        }
                                    }
                                    //console.log($('#'+idObj).offset(),idObj);
                                    // открепляем событие на клик от текущего модуля
                                }
                                else{
                                    rotationObj.set($('#'+selectObj).attr('id'),true);
                                    $updateCord(idObj);
                                    if(appendedObj.size > 1){
                                        $recountFun(idObj,0);
                                    }
                                }
                                
                            }
                            else{
                                $('#'+selectObj).css({
                                    'transform-origin':'center center',
                                    'transform':'rotate(0deg)'
                                });
                                $resPosAndIdF = $findMinDistObj(idObj); // найти ближайший
                                if($resPosAndIdF){
                                    $resultPos = $resPosAndIdF[2];
                                    $findeObj = $resPosAndIdF[0];
                                    $resMinDist = $minDist($findeObj,idObj);
                                    if($resultDistanse < $resMinDist){
                                        rotationObj.set($('#'+selectObj).attr('id'),false);
                                        $saveGropsPositions($findeObj,idObj,$resultPos);
                                        $setPositionObetcs(idObj,$findeObj,$resultPos); // состыковать
                                        $recountFun(idObj,$findeObj);
                                        //lert(2);
                                    }
                                    else{
                                        rotationObj.set($('#'+selectObj).attr('id'),false);
                                        $updateCord(idObj);
                                        if(appendedObj.size > 1){
                                            $recountFun(idObj,0);
                                        }
                                        
                                    }
                                }
                                else{
                                    rotationObj.set($('#'+selectObj).attr('id'),false);
                                    $updateCord(idObj);
                                    if(appendedObj.size > 1){
                                        $recountFun(idObj,0);
                                    }
                                }
                                
                            }
                        }
                    }
                }
                if(classObj == "RotAndDel-Del" || $(obj).parent().hasClass("RotAndDel-Del")){
                    if($('#'+selectObj).hasClass('appended-modul')){
                        if (event1.which == 1 && selectObj!=0){
                            idObj = $('#'+selectObj).attr('id');
                            appendedObj.delete(idObj);
                            if($('#'+idObj).hasClass('mainGr')){
                                $('#'+idObj).removeClass('mainGr');
                                appendedObj.delete(idObj);
                            }
                            $clearMapsWhenDelete(selectObj);
                            $recountFun(0,0);
                            $counterModuls(selectObj,0);
                            //console.log(selectObj);
                            //console.log(groupsPositionsStr);
                            //console.log(groupsPositionsRev);
                            $('#'+selectObj).remove();
                        }
                    }
                }
            });
            // логика перемещения объектов
            $( '.canvas' ).on( 'mousedown', function( event1 ) {
                obj = event1.target;
                if(!$(obj).hasClass("appended-modul")){
                    $moovObj = $(obj).parent().parent();
                    //console.log($moovObj);
                    idObj = $moovObj.attr('id');
                    obj = document.getElementById(idObj);
                }
                idObj = $(obj).attr('id');
                //console.log(idObj);
                if(!idObj){
                    // блок кода если кликнули по имени блока
                    // нужно получить сам модуль
                    idObj = $(event1.target).parent().attr('id');
                    obj = document.getElementById(idObj);
                }
                if(!idObj){
                    // блок кода если кликнули по имени блока
                    // нужно получить сам модуль
                    idObj = $(event1.target).parent().parent().attr('id');
                    obj = document.getElementById(idObj);
                }
                if (event1.which == 1 && $(obj).hasClass('appended-modul')){
                    //console.log($(obj).offset());
                    $offsetClick = $calculateMouseOffsetMoovbl(event1,idObj);
                    $deltaX = $offsetClick[0];
                    $deltaY = $offsetClick[1];
                    $moovblModul = $('#'+idObj);
                    $(document).mousemove(function (e) {
                        //console.log(2);
                        $('#'+idObj).css({
                            'z-index':'9999'
                        });
                        //top: (e.pageY-$deltaY)*100/$baseScale, left: (e.pageX-$deltaX)*100/$baseScale
                        $moovblModul.offset({top: e.pageY-$deltaY, left: e.pageX-$deltaX});
                    }).click(function (e) {
                        $rightPosModul = $moovblModul.offset().left+$moovblModul.width();
                        $rightPosUI = $('.canvas').width();
                        if( $rightPosModul < $rightPosUI){
                            if(appendedObj.size == 1){
                                $(this).unbind("click");
                                $updateCord(idObj);
                                $controllerConstruct(0,idObj);
                                $recountFun(idObj,0);
                            }
                            else{
                                //console.log(idObj);
                                //alert(1);
                                $resPosAndIdF = $findMinDistObj(idObj); // найти ближайший
                                $resultPos = $resPosAndIdF[2];
                                $findeObj = $resPosAndIdF[0];
                                
                                $resultDistanse = $getCenterDistanse($findeObj,idObj);
                                $resMinDist = $minDist($findeObj,idObj);
                                if($resultDistanse < $resMinDist){
                                    //////////////////////////////
                                    $saveGropsPositions($findeObj,idObj,$resultPos);
                                    //функция работающая c groupsPositions
                                    //////////////////////////////
                                    //console.log(idObj,$findeObj,$resultPos);
                                    $setPositionObetcs(idObj,$findeObj,$resultPos); // состыковать
                                    $controllerConstruct($findeObj,idObj);
                                    $recountFun(idObj,$findeObj);
                                    // открепляем событие на клик от текущего модуля
                                    
                                    $(this).unbind("click");
                                }
                                else{
                                    //alert(2);
                                    $baseObjBind(idObj);
                                    $updateCord(idObj);
                                    if(appendedObj.size > 1){
                                        //$controllerConstruct(0,idObj);
                                        
                                    }
                                    $controllerConstruct(0,idObj);
                                    $recountFun(idObj,0);
                                    $(this).unbind("click"); 
                                }
                            }
                            $(this).unbind("mousemove");
                            $('#'+idObj).css({
                                'z-index':'999'
                            });
                        }
                        else{// здесь нужно переделать код
                            idObj = $('#'+selectObj).attr('id');
                            appendedObj.delete(idObj);
                            $clearMapsWhenDelete(selectObj);
                            $recountFun(0,0);
                            //console.log(selectObj);
                            //console.log(groupsPositionsStr);
                            //console.log(groupsPositionsRev);
                            $('#'+selectObj).remove();
                            $(this).unbind("click");
                            $(this).unbind("mousemove");
                        }              

                    });
                }
                
            });
            // перемещение объектов по рабочей поверхности ////////
            ///////////////////////////////////////////////////////
            $(".canvas").mousedown(function(e1){
                if($(e1.target).hasClass('canvas')){
                    $cordX0 = e1.pageX;
                    $cordY0 = e1.pageY;
                    $(document).mousemove(function (e) {
                        $cordX1 = e.pageX;
                        $cordY1 = e.pageY;
                        $deltaX = $cordX1-$cordX0;
                        $deltaY = $cordY1-$cordY0;
                        for($key of appendedObj.keys()){
                            $currentX = $('#'+$key).offset().left;
                            $currentY = $('#'+$key).offset().top;
                            $('#'+$key).offset({top: appendedObj.get($key)[1]+$deltaY, left: appendedObj.get($key)[0]+$deltaX});
                        }
                    }).click(function(){
                        for($key of appendedObj.keys()){
                            $updateCord($key);
                        }
                        $(this).unbind("click");
                        $(this).unbind("mousemove");
                    });
                }
            });
            // логика масштабирования.
            $('#'+'plusScale').mousedown(function(){
                $basescale = $basescale + 0.0025;
                $mainObj = 0;
                if(appendedObj.size>0){
                    for($key of appendedObj.keys()){
                        if(BaseObjMap.has($key) && $mainObj != 0){
                            $mainObj = $key;
                            $oldH = $('#'+$key).height();
                            $oldW = $('#'+$key).width();
                            $updateObjSize($key);
                            $newH = $('#'+$key).height();
                            $newW = $('#'+$key).width();
                            $minConstDist = $minConstDist*($newH/$oldH);
                            $updateCord($key);
                            break;
                        }
                    }
                    $scale = 0;
                    for($key of appendedObj.keys()){
                        if($key != $mainObj && BaseObjMap.has($key)){
                            // получить старые координаты центра
                            $oldH = $('#'+$key).height();
                            $oldW = $('#'+$key).width();
                            $updateObjSize($key);
                            $newH = $('#'+$key).height();
                            $newW = $('#'+$key).width();
                            $keyNewOffsetTop = $('#'+$key).offset().top;
                            $keyNewOffsetLeft = $('#'+$key).offset().left;
                            $scale = $newH/$oldH;
                            $('#'+$key).offset({top:$keyNewOffsetTop*($newH/$oldH),left:$keyNewOffsetLeft*($newW/$oldW)});
                            // получить новые координаты центра
                            // имеем старые и новые координаты центра main объекта, расстояние между центрами должно быть
                            // какое? такое же как было, чтобы это сделать, можно сместить объекты ниже и правее на величину увеличения
                            $updateCord($key);
                        }
                        else{
                            $updateObjSize($key);
                            //$updateCord($key);
                        }
                    }
                    $startConnect();
                    //$recountFun(0,0);              
                }
            });
            $('#'+'minusScale').mousedown(function(){
                $basescale = $basescale - 0.0025;
                if(appendedObj.size>0){
                    for($key of appendedObj.keys()){
                        if(BaseObjMap.has($key) && $mainObj != 0){
                            $mainObj = $key;
                            $oldH = $('#'+$key).height();
                            $oldW = $('#'+$key).width();
                            $updateObjSize($key);
                            $newH = $('#'+$key).height();
                            $newW = $('#'+$key).width();
                            $minConstDist = $minConstDist*($newH/$oldH);
                            $updateCord($key);
                            break;
                        }
                    }
                    for($key of appendedObj.keys()){
                        if($key != $mainObj && BaseObjMap.has($key)){
                            // получить старые координаты центра
                            $oldH = $('#'+$key).height();
                            $oldW = $('#'+$key).width();
                            $updateObjSize($key);
                            $newH = $('#'+$key).height();
                            $newW = $('#'+$key).width();
                            $keyNewOffsetTop = $('#'+$key).offset().top;
                            $keyNewOffsetLeft = $('#'+$key).offset().left;

                            $('#'+$key).offset({top:$keyNewOffsetTop*($newH/$oldH),left:$keyNewOffsetLeft*($newW/$oldW)});
                            // получить новые координаты центра
                            // имеем старые и новые координаты центра main объекта, расстояние между центрами должно быть
                            // какое? такое же как было, чтобы это сделать, можно сместить объекты ниже и правее на величину увеличения
                            $updateCord($key);
                        }
                        else{
                            $updateObjSize($key);
                        }
                    }
                    $startConnect();
                    //$recountFun(0,0);
                }
                //$('appended-modul').offset({top:$('appended-modul').offset().top*100/$baseScale,left:$('appended-modul').offset().left*100/$baseScale});
            });
        }
        else {
            $calculateMouseOffset = function($e){
                if($e.handleObj.type == "mousedown"){
                    console.log('true');
                    $mouseD_x = $e.pageX;
                    $mouseD_y = $e.pageY;
                    // считываем координаты блока на который нажали
                    $elemCordX = $e.currentTarget.getBoundingClientRect().left;
                    $elemCordY = $e.currentTarget.getBoundingClientRect().top;
                    $elemCordXR = $e.currentTarget.getBoundingClientRect().right;
                    // вычиляем смещение от позиции мыши для генерации нового объекта
                    $deltaX = $mouseD_x-$elemCordX;
                    $deltaY = $mouseD_y-$elemCordY;
                    return [$deltaX,$deltaY];
                }
                else {
                    $mouseD_x = $e.targetTouches[0].pageX;
                    $mouseD_y = $e.targetTouches[0].pageY;
                    if($($e.target).parent().parent().hasClass('modul')){
                    // считываем координаты блока на который нажали
                        $elemCordX = $($e.target).parent().parent().offset().left;
                        $elemCordY = $($e.target).parent().parent().offset().top;
                    }
                    if($($e.target).parent().hasClass('modul')){
                        // считываем координаты блока на который нажали
                        $elemCordX = $($e.target).parent().offset().left;
                        $elemCordY = $($e.target).parent().offset().top;
                    }
                    // вычиляем смещение от позиции мыши для генерации нового объекта
                    $deltaX = $mouseD_x-$elemCordX;
                    $deltaY = $mouseD_y-$elemCordY;
                    return [$deltaX,$deltaY];
                }
            };
            $calculateMouseOffsetMoovbl = function($e,$tarId){
                if($e.handleObj.type == "mousedown"){
                    $mouseD_x = $e.pageX;
                    $mouseD_y = $e.pageY;
                    $tar = document.getElementById($tarId);
                    // считываем координаты блока на который нажали
                    $elemCordX = $tar.getBoundingClientRect().left;
                    $elemCordY = $tar.getBoundingClientRect().top;
                    $elemCordXR = $tar.getBoundingClientRect().right;
                    // вычиляем смещение от позиции мыши для генерации нового объекта
                    $deltaX = $mouseD_x-$elemCordX;
                    $deltaY = $mouseD_y-$elemCordY;
                    return [$deltaX,$deltaY];
                }
                else {
                    $mouseD_x = $e.targetTouches[0].pageX;
                    $mouseD_y = $e.targetTouches[0].pageY;
                    if($($e.target).parent().parent().hasClass('appended-modul')){
                    // считываем координаты блока на который нажали
                        $elemCordX = $($e.target).parent().parent().offset().left;
                        $elemCordY = $($e.target).parent().parent().offset().top;
                    }
                    if($($e.target).parent().hasClass('appended-modul')){
                        // считываем координаты блока на который нажали
                        $elemCordX = $($e.target).parent().offset().left;
                        $elemCordY = $($e.target).parent().offset().top;
                    }
                    // вычиляем смещение от позиции мыши для генерации нового объекта
                    $deltaX = $mouseD_x-$elemCordX;
                    $deltaY = $mouseD_y-$elemCordY;
                    return [$deltaX,$deltaY];
                }
            };
            $spawnElem = function($numberObj,$id,$e){
                $offsetClick = $calculateMouseOffset($e);
                $deltaX = $offsetClick[0];
                $deltaY = $offsetClick[1]; 
                // получаем html код модуля
                $moovObj = $creatModul($id,$numberObj);
                // добавляем на страницу(он скрыт)
                $append($('.canvas'),$moovObj);
                $updateObjSize($id);
                
                // получаем добавленный модуль
                $moovblModul = $('#'+$id);
                $moovblModul.css({
                    'cursor': 'grabbing'
                });
                // смещаем его так, чтобы он был ровно поверх модуля но который нажали
                if($e.handleObj.type == "mousedown"){
                    $moovblModul.offset({top: ($e.pageY-$deltaY)*100/$baseScale, left: ($e.pageX-$deltaX)*100/$baseScale});
                    // отображаем модуль
                }
                else {
                    $touch = $e.originalEvent.touches[0] || $e.originalEvent.changedTouches[0];
                    $('#'+idObject).offset({top: ($touch.pageY-$deltaY)*100/$baseScale, left: ($touch.pageX-$deltaX)*100/$baseScale});
                }
                $moovblModul.show();
                
                $('body').css({
                    'pointer-events':'none'
                });
                $('#container').css({
                    'pointer-events':'auto'
                });
            };
            /// Основная функция размещения объектов
            $appendMainFunc = function($numberObj,id,e){
                if (e.which == 1 && e.handleObj.type == "mousedown"){
                    $spawnElem($numberObj,id,e);
                    $offsetClick = $calculateMouseOffset(e);
                    $deltaX = $offsetClick[0];
                    $deltaY = $offsetClick[1];
                    // запускаем логику если мышь начала движение
                    $(document).mousemove(function (e) {
                        // пока клавиша зажата и мышь движется меняем динамично смещение модуля
                        $('#'+idObject).css({
                            'z-index':'9999'
                        });
                        $moovblModul.offset({top: (e.pageY-$deltaY)*100/$baseScale, left: (e.pageX-$deltaX)*100/$baseScale});
                    }).click(function (e) {
                        $rightPosModul = $moovblModul.offset().left+$moovblModul.width();
                        $rightPosUI = $('.canvas').width();
                        //if( $rightPosModul < $rightPosUI){
                            // запускаем логику если кнопка отжата
                            objAdd = document.getElementById(idObject);
                            topY = objAdd.getBoundingClientRect().top;
                            topX = objAdd.getBoundingClientRect().left;
                            dovnY = topY + $('#'+idObject).height();
                            dovnX = topX + $('#'+idObject).width();
        
                            
                            // условие создание объекта если на доске ничего нет.
                            if(appendedObj.size == 0){
                                if($rightPosModul > $rightPosUI){
                                    $moovblModul.offset({top: $('.canvas').height()/3, left: $rightPosUI/2});
                                    topY = objAdd.getBoundingClientRect().top;
                                    topX = objAdd.getBoundingClientRect().left;
                                    dovnY = topY + $('#'+idObject).height();
                                    dovnX = topX + $('#'+idObject).width();
                                }
                        
                                // основная логика
                                // добавляем объект высчитывем координаты его углов
                                // добавляем id объекта в коллекцию в качестве ключа и добавляем по ключу координаты вершин объекта
                                rotationObj.set(idObject,false);
                                $('#'+idObject).addClass("mainGr");
                                // добавляем в массив размещенных обхектов id размещенного модуля
                                appendedObj.set(idObject,[topX,topY,dovnX,dovnY]);
                                BaseObjMap.set(idObject,'1');
                                $controllerConstruct(0,idObject);
                                $recountFun(idObject,0);
                                $counterModuls(idObject,1);
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
                                $resPosAndIdF = $findMinDistObj(idObject);
                                //console.log($resPosAndIdF);
                                $resultPos = $resPosAndIdF[2];
                                $findeObj = $resPosAndIdF[0];
                                
                                $resultDistanse = $getCenterDistanse($findeObj,idObject);
                                $resMinDist = $minDist($findeObj,idObject);
                                if($rightPosModul > $rightPosUI){
                                    $saveGropsPositions($findeObj,idObject,$resultPos);
                                    $setPositionObetcs(idObject,$findeObj,$resultPos);
                                    // функция контролирующая принадлежность к группе объекта
                                    rotationObj.set(idObject,false);
                                    $controllerConstruct($findeObj,idObject);/////!!!!!!
                                    $recountFun(idObject,$findeObj);
                                    $counterModuls(idObject,1);
                                    numberIdObjecy = numberIdObjecy + 1;
                                    idObject = "appended-modul" + numberIdObjecy;
                                    $(this).unbind("click");
                                }
                                else{
                                    if($resultDistanse < $resMinDist){
                                        //////////////////////////////
                                        $saveGropsPositions($findeObj,idObject,$resultPos);
                                        //функция работающая c groupsPositions
                                        //////////////////////////////
                                        // далее нужна функция стыковки объектов
                                        $setPositionObetcs(idObject,$findeObj,$resultPos);
                                        $controllerConstruct($findeObj,idObject);////!!!!!!!
                                        $recountFun(idObject,$findeObj);
                                        $counterModuls(idObject,1);
                                        // увеличиваем индекс
                                        numberIdObjecy = numberIdObjecy + 1;
                                        idObject = "appended-modul" + numberIdObjecy;
                                        rotationObj.set(idObject,false);
                                        // открепляем событие на клик от текущего модуля
                                        $(this).unbind("click");
                                
                                        
                                    }
                                    else {
                                        BaseObjMap.set(idObject,'1');
                                        $updateCord(idObject);
                                        $controllerConstruct(0,idObject);
                                        $recountFun(idObject,0);
                                        $counterModuls(idObject,1);
                                        numberIdObjecy = numberIdObjecy + 1;
                                        idObject = "appended-modul" + numberIdObjecy;
                                        rotationObj.set(idObject,false);
                                        // открепляем событие на клик от текущего модуля
                                        $(this).unbind("click");
                                    }
                                }
                                
                            }
        
        
                            // условия создания объекта если на доске что-то есть.
                            $(this).unbind("mousemove");
                            $moovblModul.css({
                                'z-index':'999'
                            });
                            if(selectObj != 0){
                                $('#'+selectObj).children().children('.modul-border').css({
                                    'stroke':'black'
                                });
                            }
                            selectObj = $moovblModul.attr('id');
                            if(selectObj != 0){
                                $('#'+selectObj).children().children('.modul-border').css({
                                    'stroke':'red'
                                });
                            }
                            $('.RotAndDel').css({
                                'display':'block'
                            });
                            
                        //}
                        // else{
                            
                        //     $moovblModul.remove();
                        //     $(this).unbind("click");
                        //     $(this).unbind("mousemove");
                        // }
                        
                    });
                }
                if (e.handleObj.type == "touchstart") {
                    
                    $spawnElem($numberObj,id,e);
                    $offsetClick = $calculateMouseOffset(e);
                    $deltaX = $offsetClick[0];
                    $deltaY = $offsetClick[1];
                    // запускаем логику если мышь начала движение
                    $(document).on('touchmove', function (e) {
                        // пока клавиша зажата и мышь движется меняем динамично смещение модуля
                        $('#'+idObject).css({
                            'z-index':'9999'
                        });
                        $touch = e.originalEvent.touches[0] || $e.originalEvent.changedTouches[0];
                        //console.log($deltaY,$deltaX);
                        $('#'+idObject).offset({top: ($touch.pageY-$deltaY)*100/$baseScale, left: ($touch.pageX-$deltaX)*100/$baseScale});
                    
                    }).on('touchend',function (e) {
                        e.preventDefault(); // подавляем стандартную реакцию на события мыши
                        $rightPosModul = $moovblModul.offset().left+$moovblModul.width();
                        $rightPosUI = $('.canvas').width();
                        //if( $rightPosModul < $rightPosUI){
                        // запускаем логику если кнопка отжата
                        objAdd = document.getElementById(idObject);
                        topY = objAdd.getBoundingClientRect().top;
                        topX = objAdd.getBoundingClientRect().left;
                        dovnY = topY + $('#'+idObject).height();
                        dovnX = topX + $('#'+idObject).width();

                        if ($('body').width() < $('body').height()) { 
                            $rightPosModul = $moovblModul.offset().top+$moovblModul.height();
                            $rightPosUI = $('.canvas').height();
                        }
                        if(appendedObj.size == 0){
                            if($rightPosModul > $rightPosUI){
                                $moovblModul.offset({top: $('.canvas').height()/3, left: $rightPosUI/2});
                                topY = objAdd.getBoundingClientRect().top;
                                topX = objAdd.getBoundingClientRect().left;
                                dovnY = topY + $('#'+idObject).height();
                                dovnX = topX + $('#'+idObject).width();
                            }
                            // основная логика
                            // добавляем объект высчитывем координаты его углов
                            // добавляем id объекта в коллекцию в качестве ключа и добавляем по ключу координаты вершин объекта
                            rotationObj.set(idObject,false);
                            $('#'+idObject).addClass("mainGr");
                            // добавляем в массив размещенных обхектов id размещенного модуля
                            appendedObj.set(idObject,[topX,topY,dovnX,dovnY]);
                            BaseObjMap.set(idObject,'1');
                            $controllerConstruct(0,idObject);
                            $recountFun(idObject,0);
                            $counterModuls(idObject,1);
                            // генерируем новый id для следующего модуля
                            numberIdObjecy = numberIdObjecy + 1;
                            idObject = "appended-modul" + numberIdObjecy;
                            // открепляем событие на клик от текущего модуля
                            $(this).unbind("touchend");
                            
                        }
                        // если на доске что-то есть.
                        else{
                            /*ну а теперь самое сложно... наверное :D*/
                            // вычисление расстояний и поиск минимального
                            // основная логика
                            $resPosAndIdF = $findMinDistObj(idObject);
                            //console.log($resPosAndIdF);
                            $resultPos = $resPosAndIdF[2];
                            $findeObj = $resPosAndIdF[0];
                            
                            $resultDistanse = $getCenterDistanse($findeObj,idObject);
                            $resMinDist = $minDist($findeObj,idObject);
                            if($rightPosModul > $rightPosUI){
                                $saveGropsPositions($findeObj,idObject,$resultPos);
                                $setPositionObetcs(idObject,$findeObj,$resultPos);
                                // функция контролирующая принадлежность к группе объекта
                                rotationObj.set(idObject,false);
                                $controllerConstruct($findeObj,idObject);/////!!!!!!
                                $recountFun(idObject,$findeObj);
                                $counterModuls(idObject,1);
                                numberIdObjecy = numberIdObjecy + 1;
                                idObject = "appended-modul" + numberIdObjecy;
                                $(this).unbind("touchend");
                            }
                            else{
                                if($resultDistanse < $resMinDist){
                                    //////////////////////////////
                                    $saveGropsPositions($findeObj,idObject,$resultPos);
                                    //функция работающая c groupsPositions
                                    //////////////////////////////
                                    // далее нужна функция стыковки объектов
                                    $setPositionObetcs(idObject,$findeObj,$resultPos);
                                    $controllerConstruct($findeObj,idObject);////!!!!!!!
                                    $recountFun(idObject,$findeObj);
                                    $counterModuls(idObject,1);
                                    // увеличиваем индекс
                                    numberIdObjecy = numberIdObjecy + 1;
                                    idObject = "appended-modul" + numberIdObjecy;
                                    rotationObj.set(idObject,false);
                                    // открепляем событие на клик от текущего модуля
                                    $(this).unbind("touchend");
                            
                                    
                                }
                                else {
                                    BaseObjMap.set(idObject,'1');
                                    $updateCord(idObject);
                                    $controllerConstruct(0,idObject);
                                    $recountFun(idObject,0);
                                    $counterModuls(idObject,1);
                                    numberIdObjecy = numberIdObjecy + 1;
                                    idObject = "appended-modul" + numberIdObjecy;
                                    rotationObj.set(idObject,false);
                                    // открепляем событие на клик от текущего модуля
                                    $(this).unbind("touchend");
                                }
                            }
                            
                        }
                        // условия создания объекта если на доске что-то есть.
                        $(this).unbind("mousemove");
                        $moovblModul.css({
                            'z-index':'999'
                        });
                        if(selectObj != 0){
                            $('#'+selectObj).children().children('.modul-border').css({
                                'stroke':'black'
                            });
                        }
                        selectObj = $moovblModul.attr('id');
                        if(selectObj != 0){
                            $('#'+selectObj).children().children('.modul-border').css({
                                'stroke':'red'
                            });
                        }
                        $('.RotAndDel').css({
                            'display':'block'
                        });
                    });
                    
                }
            };
            // версия для планшетов и телефонов. здесь нужно учесть и события на клик и события на touch
            // причем вне зависимости от интерфейса пользователя. справа или снизу расположено меню
            // здесь нужно сделать отдельный код для aios и для android.

            // css часть убираем обновление и передвижение страницы на моб устройствах свайпом.
            $('body').css({
                'left': '0px',
                'right': '0px',
                'position': 'fixed',
                'overflow': 'hidden'
            });
            // код перестройки интерфейса. в зависимости от соотношения ширины и высоты
            if($('body').width() > $('body').height()){
                $('#menu').css({
                    'display': 'flex',
                    'position': 'absolute',
                    'width': '15%',
                    'height': '100%',
                    'right': '0',
                    'bottom': 'auto',
                    'background-color': 'rgb(255, 255, 255)',
                    'flex-wrap': 'nowrap',
                    'align-items': 'center',
                    'justify-content': 'center',
                    'align-content': 'center',
                    'z-index': '999',
                });
                $('.menu-container').css({
                    'display': 'flex',
                    'flex-direction': 'column',
                    'justify-content': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'nowrap',
                    'height': '100%',
                    'width': 'auto',
                });
                $('.canvas-UI').css({
                    'position': 'absolute',
                    'width': '85%',
                    'height': '100%',
                    'left': '0',
                });
                $('.canvas').css({
                    'position': 'relative',
                    'float': 'left',
                    'width': '85%',
                    'height': '100%',
                    'left': '0',
                });
            } else {
                $('#menu').css({
                    'display': 'flex',
                    'position': 'absolute',
                    'width': '100%',
                    'height': '20%',
                    'right': '0',
                    'bottom': '0',
                    'background-color': 'rgb(255, 255, 255)',
                    'flex-wrap': 'nowrap',
                    'align-items': 'center',
                    'justify-content': 'center',
                    'align-content': 'center',
                    'z-index': '999',
                });
                $('.menu-container').css({
                    'display': 'flex',
                    'flex-direction': 'row',
                    'justify-content': 'center',
                    'align-items': 'center',
                    'flex-wrap': 'nowrap',
                    'height': '100%',
                    'width': '100%',
                });
                $('.canvas-UI').css({
                    'position': 'absolute',
                    'width': '100%',
                    'height': '80%',
                    'left': '0',
                });
                $('.canvas').css({
                    'position': 'relative',
                    'float': 'left',
                    'width': '100%',
                    'height': '80%',
                    'left': '0',
                });
            }
            /////////////////////////////
            $('*').unbind(); // убираем все прикрепленные события.

            //alert(1);
            $(".B").on('mousedown touchstart',function(e){
                //alert(1);
                $appendMainFunc(1,idObject,e);
            });
            $(".B").on('mouseout',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'black'
                });
            });
            $(".B").on('mouseover',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'red'
                });
            });
        
            $(".BM").on('mousedown touchstart',function(e){
                $appendMainFunc(2,idObject,e);
            });
            $(".BM").on('mouseout',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'black'
                });
            });
            $(".BM").on('mouseover',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'red'
                });
            });
        
            $(".C").on('mousedown touchstart',function(e){
                $appendMainFunc(3,idObject,e);
            });
            $(".C").on('mouseout',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'black'
                });
            });
            $(".C").on('mouseover',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'red'
                });
            });
        
            $(".CM").on('mousedown touchstart',function(e){
                $appendMainFunc(4,idObject,e);
            });
            $(".CM").on('mouseout',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'black'
                });
            });
            $(".CM").on('mouseover',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'red'
                });
            });
        
            $(".CB").on('mousedown touchstart',function(e){
                $appendMainFunc(5,idObject,e);
            });
            $(".CB").on('mouseout',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'black'
                });
            });
            $(".CB").on('mouseover',function(){
                $(this).children().children('.modul-border').css({
                    'stroke':'red'
                });
            });
            // функция перемещения по рабочей поверхности
            $(".canvas").on('mousedown touchstart',function(e1){
                if($(e1.target).hasClass('canvas')){
                    if(e1.handleObj.type == "mousedown"){
                        $cordX0 = e1.pageX;
                        $cordY0 = e1.pageY;
                    }
                    else {
                        $cordX0 = e1.targetTouches[0].pageX;
                        $cordY0 = e1.targetTouches[0].pageY;
                    }
                    $(document).on('mousemove touchmove',function (e) {
                        ////
                        if(e.handleObj.type == "mousemove"){
                            $cordX1 = e.pageX;
                            $cordY1 = e.pageY;
                        }
                        else{
                            $cordX1 = e.targetTouches[0].pageX;
                            $cordY1 = e.targetTouches[0].pageY;
                        }
                        /////
                        $deltaX = $cordX1-$cordX0;
                        $deltaY = $cordY1-$cordY0;
                        for($key of appendedObj.keys()){
                            $currentX = $('#'+$key).offset().left;
                            $currentY = $('#'+$key).offset().top;
                            $('#'+$key).offset({top: appendedObj.get($key)[1]+$deltaY, left: appendedObj.get($key)[0]+$deltaX});
                        }
                    }).on('click touchend', function(){
                        //e.preventDefault();
                        for($key of appendedObj.keys()){
                            $updateCord($key);
                        }
                        $(this).unbind("click");
                        $(this).unbind("touchend");
                        $(this).unbind("touchmove");
                        $(this).unbind("mousemove");
                    });
                }
            });

            // логика перемещения объектов
            $( '.canvas' ).on( 'mousedown touchstart', function( event1 ) {
                obj = event1.target;
                if(!$(obj).hasClass("appended-modul")){
                    $moovObj = $(obj).parent().parent();
                    //console.log($moovObj);
                    idObj = $moovObj.attr('id');
                    obj = document.getElementById(idObj);
                }
                idObj = $(obj).attr('id');
                //console.log(idObj);
                if(!idObj){
                    // блок кода если кликнули по имени блока
                    // нужно получить сам модуль
                    idObj = $(event1.target).parent().attr('id');
                    obj = document.getElementById(idObj);
                }
                if(!idObj){
                    // блок кода если кликнули по имени блока
                    // нужно получить сам модуль
                    idObj = $(event1.target).parent().parent().attr('id');
                    obj = document.getElementById(idObj);
                }

                if (event1.which == 1 && event1.handleObj.type == "mousedown" && $(obj).hasClass('appended-modul')){
                    //console.log($(obj).offset());
                    $offsetClick = $calculateMouseOffsetMoovbl(event1,idObj);
                    $deltaX = $offsetClick[0];
                    $deltaY = $offsetClick[1];
                    $moovblModul = $('#'+idObj);
                    $(document).mousemove(function (e) {
                        //console.log(2);
                        $('#'+idObj).css({
                            'z-index':'9999'
                        });
                        //top: (e.pageY-$deltaY)*100/$baseScale, left: (e.pageX-$deltaX)*100/$baseScale
                        $moovblModul.offset({top: e.pageY-$deltaY, left: e.pageX-$deltaX});
                    }).click(function (e) {
                        $rightPosModul = $moovblModul.offset().left+$moovblModul.width();
                        $rightPosUI = $('.canvas').width();
                        if( $rightPosModul < $rightPosUI){
                            if(appendedObj.size == 1){
                                $(this).unbind("click");
                                $updateCord(idObj);
                                $controllerConstruct(0,idObj);
                                $recountFun(idObj,0);
                            }
                            else{
                                //console.log(idObj);
                                //alert(1);
                                $resPosAndIdF = $findMinDistObj(idObj); // найти ближайший
                                $resultPos = $resPosAndIdF[2];
                                $findeObj = $resPosAndIdF[0];
                                
                                $resultDistanse = $getCenterDistanse($findeObj,idObj);
                                $resMinDist = $minDist($findeObj,idObj);
                                if($resultDistanse < $resMinDist){
                                    //////////////////////////////
                                    $saveGropsPositions($findeObj,idObj,$resultPos);
                                    //функция работающая c groupsPositions
                                    //////////////////////////////
                                    //console.log(idObj,$findeObj,$resultPos);
                                    $setPositionObetcs(idObj,$findeObj,$resultPos); // состыковать
                                    $controllerConstruct($findeObj,idObj);
                                    $recountFun(idObj,$findeObj);
                                    // открепляем событие на клик от текущего модуля
                                    
                                    $(this).unbind("click");
                                }
                                else{
                                    //alert(2);
                                    $baseObjBind(idObj);
                                    $updateCord(idObj);
                                    if(appendedObj.size > 1){
                                        //$controllerConstruct(0,idObj);
                                        
                                    }
                                    $controllerConstruct(0,idObj);
                                    $recountFun(idObj,0);
                                    $(this).unbind("click"); 
                                }
                            }
                            $(this).unbind("mousemove");
                            $('#'+idObj).css({
                                'z-index':'999'
                            });
                        }
                        else{// здесь нужно переделать код
                            idObj = $('#'+selectObj).attr('id');
                            appendedObj.delete(idObj);
                            $clearMapsWhenDelete(selectObj);
                            $recountFun(0,0);
                            //console.log(selectObj);
                            //console.log(groupsPositionsStr);
                            //console.log(groupsPositionsRev);
                            $('#'+selectObj).remove();
                            $(this).unbind("click");
                            $(this).unbind("mousemove");
                        }              

                    });
                }
                if (event1.handleObj.type == "touchstart" && $(obj).hasClass('appended-modul')) {
                    $offsetClick = $calculateMouseOffsetMoovbl(event1,idObj);
                    $deltaX = $offsetClick[0];
                    $deltaY = $offsetClick[1];
                    $moovblModul = $('#'+idObj);
                    $(document).on('touchmove', function (e) {
                        $('#'+idObj).css({
                            'z-index':'9999'
                        });
                        $moovblModul.offset({top: (e.targetTouches[0].pageY-$deltaY)*100/$baseScale, left: (e.targetTouches[0].pageX-$deltaX)*100/$baseScale});
                    }).on('touchend',function (e) {
                        e.preventDefault();

                        $rightPosModul = $moovblModul.offset().left+$moovblModul.width();
                        $rightPosUI = $('.canvas').width();
                        if ($('body').width() < $('body').height()) { 
                            $rightPosModul = $moovblModul.offset().top+$moovblModul.height();
                            $rightPosUI = $('.canvas').height();
                        }
                        if( $rightPosModul < $rightPosUI){
                            if(appendedObj.size == 1){
                                $(this).off("touchend");
                                $updateCord(idObj);
                                $controllerConstruct(0,idObj);
                                $recountFun(idObj,0);
                            }
                            else{
                                $resPosAndIdF = $findMinDistObj(idObj);
                                $resultPos = $resPosAndIdF[2];
                                $findeObj = $resPosAndIdF[0];
                                
                                $resultDistanse = $getCenterDistanse($findeObj,idObj);
                                $resMinDist = $minDist($findeObj,idObj);
                                if($resultDistanse < $resMinDist){
                                    //////////////////////////////
                                    $saveGropsPositions($findeObj,idObj,$resultPos);
                                    //////////////////////////////
                                    $setPositionObetcs(idObj,$findeObj,$resultPos);
                                    $controllerConstruct($findeObj,idObj);
                                    $recountFun(idObj,$findeObj);
                                    $(this).off("touchend");
                                }
                                else{
                                    $baseObjBind(idObj);
                                    $updateCord(idObj);
                                    $controllerConstruct(0,idObj);
                                    $recountFun(idObj,0);
                                    $(this).off("touchend"); 
                                }
                            }
                            $(this).off("touchmove");
                            $('#'+idObj).css({
                                'z-index':'999'
                            });
                        }
                        else{
                            idObj = $('#'+selectObj).attr('id');
                            appendedObj.delete(idObj);
                            $clearMapsWhenDelete(selectObj);
                            $recountFun(0,0);
                            $('#'+selectObj).remove();
                            $(this).off("touchend");
                            $(this).off("touchmove");
                        }
                        $(this).unbind("touchend");
                        $(this).unbind("touchmove");           
                    });
                }
            });

            // логика выделения
            $( '.canvas' ).on( 'click touchstart', function( event1 ) {
                obj2 = event1.target;
                $classObj =$(obj2).attr('class')
                if($classObj == "RotAndDel-Rot" || $(obj2).parent().hasClass("RotAndDel-Rot")){
        
                }
                else if($classObj == "appended-modul") {
                    if(selectObj != 0){
                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'black'
                        });
                    }
                    selectObj = $(obj2).attr('id');
                    if(selectObj != 0){
                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'red'
                        });
                    }
                    $('.RotAndDel').css({
                        'display':'block'
                    });
                }
                else if($(obj2).parent().hasClass("appended-modul")){
                    if(selectObj != 0){
        
                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'black'
                        });
                    }
                    selectObj = $(obj2).parent().attr('id');
                    if(selectObj != 0){
                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'red'
                        });
                    }
                    $('.RotAndDel').css({
                        'display':'block'
                    });
                }
                else if($(obj2).parent().parent().hasClass("appended-modul")){
                    if(selectObj != 0){
        
                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'black'
                        });
                    }
                    selectObj = $(obj2).parent().parent().attr('id');
                    if(selectObj != 0){
                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'red'
                        });
                    }
                    $('.RotAndDel').css({
                        'display':'block'
                    });
                }
                else {
                    if(selectObj != 0){
        
                        $('#'+selectObj).children().children('.modul-border').css({
                            'stroke':'black'
                        });
                    }
                    selectObj = 0
                    $('.RotAndDel').css({
                        'display':'none'
                    });
                }
            });
            // логика удаления вращения
            $( '.canvas-UI' ).on( 'mousedown touchstart', function( event1 ) {
                obj = event1.target;
                classObj =$(obj).attr('class');
                if(classObj == "RotAndDel-Rot" || $(obj).parent().hasClass("RotAndDel-Rot")){
                    if($('#'+selectObj).hasClass('appended-modul') && !$('#'+selectObj).hasClass('appendedCM') && !$('#'+selectObj).hasClass('appendedCB')){
                        if (event1.which == 1 && selectObj!=0){
                            idObj = $('#'+selectObj).attr('id');
                            if(!rotationObj.get($('#'+selectObj).attr('id'))){
                                if($('#'+selectObj).hasClass('appendedC')){
                                    $('#'+selectObj).css({
                                        'transform-origin':'center center',
                                        'transform':'rotate(-90deg)'
            
                                    });
                                }
                                else{
                                    $('#'+selectObj).css({
                                        'transform-origin':'center center',
                                        'transform':'rotate(90deg)'
        
                                    });
                                }
                                $resPosAndIdF = $findMinDistObj(idObj); //  
                                if($resPosAndIdF){
                                    $resultPos = $resPosAndIdF[2];
                                    $findeObj = $resPosAndIdF[0];
                                    $resMinDist = $minDist($findeObj,idObj);
                                    if($resultDistanse < $resMinDist){
                                        rotationObj.set($('#'+selectObj).attr('id'),true);
                                        $saveGropsPositions($findeObj,idObj,$resultPos);
                                        $setPositionObetcs(idObj,$findeObj,$resultPos); // 
                                        $recountFun(idObj,$findeObj);
                                    }
                                    else{
                                        rotationObj.set($('#'+selectObj).attr('id'),true);
                                        $updateCord(idObj);
                                        if(appendedObj.size > 1){
                                            $recountFun(idObj,0);
                                        }
                                    }
                                }
                                else{
                                    rotationObj.set($('#'+selectObj).attr('id'),true);
                                    $updateCord(idObj);
                                    if(appendedObj.size > 1){
                                        $recountFun(idObj,0);
                                    }
                                }
                                
                            }
                            else{
                                $('#'+selectObj).css({
                                    'transform-origin':'center center',
                                    'transform':'rotate(0deg)'
                                });
                                $resPosAndIdF = $findMinDistObj(idObj); 
                                if($resPosAndIdF){
                                    $resultPos = $resPosAndIdF[2];
                                    $findeObj = $resPosAndIdF[0];
                                    $resMinDist = $minDist($findeObj,idObj);
                                    if($resultDistanse < $resMinDist){
                                        rotationObj.set($('#'+selectObj).attr('id'),false);
                                        $saveGropsPositions($findeObj,idObj,$resultPos);
                                        $setPositionObetcs(idObj,$findeObj,$resultPos); 
                                        $recountFun(idObj,$findeObj);
                                    }
                                    else{
                                        rotationObj.set($('#'+selectObj).attr('id'),false);
                                        $updateCord(idObj);
                                        if(appendedObj.size > 1){
                                            $recountFun(idObj,0);
                                        }
                                        
                                    }
                                }
                                else{
                                    rotationObj.set($('#'+selectObj).attr('id'),false);
                                    $updateCord(idObj);
                                    if(appendedObj.size > 1){
                                        $recountFun(idObj,0);
                                    }
                                }
                                
                            }
                        }
                    }
                }
                if(classObj == "RotAndDel-Del" || $(obj).parent().hasClass("RotAndDel-Del")){
                    if($('#'+selectObj).hasClass('appended-modul')){
                        if (event1.which == 1 && selectObj!=0){
                            idObj = $('#'+selectObj).attr('id');
                            appendedObj.delete(idObj);
                            if($('#'+idObj).hasClass('mainGr')){
                                $('#'+idObj).removeClass('mainGr');
                                groupMain.delete(idObj);
                            }
                            $clearMapsWhenDelete(selectObj);
                            $recountFun(0,0);
                            $counterModuls(selectObj,0);
                            //console.log(selectObj);
                            //console.log(groupsPositionsStr);
                            //console.log(groupsPositionsRev);
                            $('#'+selectObj).remove();
                        }
                    }
                }
            });

            $('#'+'plusScale').on('mousedown touchstart',function(e){
                e.preventDefault();
                $basescale = $basescale + 0.0025;
                $mainObj = 0;
                if(appendedObj.size>0){
                    for($key of appendedObj.keys()){
                        if(BaseObjMap.has($key) && $mainObj != 0){
                            $mainObj = $key;
                            $oldH = $('#'+$key).height();
                            $oldW = $('#'+$key).width();
                            $updateObjSize($key);
                            $newH = $('#'+$key).height();
                            $newW = $('#'+$key).width();
                            $minConstDist = $minConstDist*($newH/$oldH);
                            $updateCord($key);
                            break;
                        }
                    }
                    $scale = 0;
                    for($key of appendedObj.keys()){
                        if($key != $mainObj && BaseObjMap.has($key)){
                            $oldH = $('#'+$key).height();
                            $oldW = $('#'+$key).width();
                            $updateObjSize($key);
                            $newH = $('#'+$key).height();
                            $newW = $('#'+$key).width();
                            $keyNewOffsetTop = $('#'+$key).offset().top;
                            $keyNewOffsetLeft = $('#'+$key).offset().left;
                            $scale = $newH/$oldH;
                            $('#'+$key).offset({top:$keyNewOffsetTop*($newH/$oldH),left:$keyNewOffsetLeft*($newW/$oldW)});
                            $updateCord($key);
                        }
                        else{
                            $updateObjSize($key);
                        }
                    }
                    $startConnect();            
                }
            });
            $('#'+'minusScale').on('mousedown touchstart',function(e){
                e.preventDefault();
                $basescale = $basescale - 0.0025;
                if(appendedObj.size>0){
                    for($key of appendedObj.keys()){
                        if(BaseObjMap.has($key) && $mainObj != 0){
                            $mainObj = $key;
                            $oldH = $('#'+$key).height();
                            $oldW = $('#'+$key).width();
                            $updateObjSize($key);
                            $newH = $('#'+$key).height();
                            $newW = $('#'+$key).width();
                            $minConstDist = $minConstDist*($newH/$oldH);
                            $updateCord($key);
                            break;
                        }
                    }
                    for($key of appendedObj.keys()){
                        if($key != $mainObj && BaseObjMap.has($key)){
                            $oldH = $('#'+$key).height();
                            $oldW = $('#'+$key).width();
                            $updateObjSize($key);
                            $newH = $('#'+$key).height();
                            $newW = $('#'+$key).width();
                            $keyNewOffsetTop = $('#'+$key).offset().top;
                            $keyNewOffsetLeft = $('#'+$key).offset().left;
        
                            $('#'+$key).offset({top:$keyNewOffsetTop*($newH/$oldH),left:$keyNewOffsetLeft*($newW/$oldW)});
                            $updateCord($key);
                        }
                        else{
                            $updateObjSize($key);
                        }
                    }
                    $startConnect();
                    //$recountFun(0,0);
                }
                //$('appended-modul').offset({top:$('appended-modul').offset().top*100/$baseScale,left:$('appended-modul').offset().left*100/$baseScale});
            });

        }
        ////////////////////////////////////////////////////////
    };
    // контроль стилей.
    $controllFunc();
    // каждый раз при изменении размера экрана нужно вызывать контрольную функцию, которая перезакрепляет события на всех элементах.
    window.addEventListener('resize', function() {
        $controllFunc();
    });
    $controllFunc2 = function(){
        if($('body').width() > $('body').height()){
            $('.scale').css({
                'top':'50%',
                'right':'42px'
            });
            $('.scale').children('svg').css({
                'height': '53px',
                'width': '50px'
            });
            if($('body').width()<1000){
                $('.scale').css({
                    'top':'50%',
                    'right':'1px'
                });
                $('.scale').children('svg').css({
                    'height': '40px',
                    'width': '39px'
                });
            }
            $('.B').css({
                'width':'50px',
                'height':'120px',
                'margin-left': 'auto',
                'margin-top': 'auto'
            });
    
            $('.BM').css({
                'width':'50px',
                'height':'80px',
                'margin-left': 'auto',
                'margin-top': 'auto'
            });
    
            $('.C').css({
                'width':'120px',
                'height':'81px',
                'margin-left': 'auto',
                'margin-top': 'auto'
            });
    
            $('.CM').css({
                'width':'85px',
                'height':'85px',
                'margin-left': 'auto',
                'margin-top': 'auto'
            });
    
            $('.CB').css({
                'width':'120px',
                'height':'120px',
                'margin-left': 'auto',
                'margin-top': 'auto'
            });
            $('.counter').css({
                'font-weight': 100,
                'font-size': '20px'
            });

            $rectZ = document.getElementsByClassName('CB');
            $rectZ = $rectZ[0].getBoundingClientRect();

            $rect = document.getElementsByClassName('B');
            $rect = $rect[0].getBoundingClientRect();
            $('#countB').offset({top: $rect.top-30,left: 'auto'});
            $('#countB').css({
                'width' : '16px',
                'right':'16px',
                'left':'auto'
            });

            $rect = document.getElementsByClassName('BM');
            $rect = $rect[0].getBoundingClientRect();
            $('#countBM').offset({top: $rect.top-30,left: 'auto'});
            $('#countBM').css({
                'width' : '16px',
                'right':'16px',
                'left':'auto'
            });

            $rect = document.getElementsByClassName('C');
            $rect = $rect[0].getBoundingClientRect();
            $('#countC').offset({top: $rect.top-30,left: 'auto'});
            $('#countC').css({
                'width' : '16px',
                'right':'16px',
                'left':'auto'
            });

            $rect = document.getElementsByClassName('CM');
            $rect = $rect[0].getBoundingClientRect();
            $('#countCM').offset({top: $rect.top-30,left: 'auto'});
            $('#countCM').css({
                'width' : '16px',
                'right':'16px',
                'left':'auto'
            });

            $rect = document.getElementsByClassName('CB');
            $rect = $rect[0].getBoundingClientRect();
            $('#countCB').offset({top: $rect.top-30,left: 'auto'});
            $('#countCB').css({
                'width' : '16px',
                'right':'16px',
                'left':'auto',
                'margin-right': 'auto'
            });
            //alert(1);
            if($('body').height() < 600){
                $('.B').css({
                    'width':'35px',
                    'height':'80px',
                });
        
                $('.BM').css({
                    'width':'35px',
                    'height':'60px',
                });
        
                $('.C').css({
                    'width':'70px',
                    'height':'55px',
                });
        
                $('.CM').css({
                    'width':'60px',
                    'height':'60px',
                });
        
                $('.CB').css({
                    'width':'80px',
                    'height':'80px',
                });
                $('.counter').css({
                    'font-weight': 100,
                    'font-size': '20px'
                });
    
                $rectZ = document.getElementsByClassName('CB');
                $rectZ = $rectZ[0].getBoundingClientRect();

                $rect = document.getElementsByClassName('B');
                $rect = $rect[0].getBoundingClientRect();
                $('#countB').offset({top: $rect.top,left: 'auto'});
                $('#countB').css({
                    'width' : '16px',
                    'right':'16px',
                    'left': $('#menu').width()-12
                });
    
                $rect = document.getElementsByClassName('BM');
                $rect = $rect[0].getBoundingClientRect();
                $('#countBM').offset({top: $rect.top-10,left: 'auto'});
                $('#countBM').css({
                    'width' : '16px',
                    'right':'16px',
                    'left':$('#menu').width()-12
                });
    
                $rect = document.getElementsByClassName('C');
                $rect = $rect[0].getBoundingClientRect();
                $('#countC').offset({top: $rect.top-10,left: 'auto'});
                $('#countC').css({
                    'width' : '16px',
                    'right':'16px',
                    'left':$('#menu').width()-12
                });
    
                $rect = document.getElementsByClassName('CM');
                $rect = $rect[0].getBoundingClientRect();
                $('#countCM').offset({top: $rect.top-10,left: 'auto'});
                $('#countCM').css({
                    'width' : '16px',
                    'right':'16px',
                    'left':$('#menu').width()-12
                });
    
                $rect = document.getElementsByClassName('CB');
                $rect = $rect[0].getBoundingClientRect();
                $('#countCB').offset({top: $rect.top-10,left: $rect.left + $('.CB').width+20});
                $('#countCB').css({
                    'width' : '16px',
                    'right':'16px',
                    'left':$('#menu').width()-12
                });
            }
        }
        else {

            $('.scale').css({
                'top':'83%',
                'right':'1px'
            });
            $('.scale').children('svg').css({
                'height': '40px',
                'width': '39px'
            });

            $('.B').css({
                'width':'35px',
                'height':'80px',
                'margin-left': '13px'

            });
    
            $('.BM').css({
                'width':'35px',
                'height':'60px',
            });
    
            $('.C').css({
                'width':'70px',
                'height':'55px',
            });
    
            $('.CM').css({
                'width':'60px',
                'height':'60px',
            });
    
            $('.CB').css({
                'width':'80px',
                'height':'80px',
                'margin-right': '13px'
            });
            $('.counter').css({
                'font-weight': 100,
                'font-size': '20px'
            });
            $rectZ = document.getElementsByClassName('CB');
            $rectZ = $rectZ[0].getBoundingClientRect();
    
            $rect = document.getElementsByClassName('B');
            $rect = $rect[0].getBoundingClientRect();
            $('#countB').offset({top: $rectZ.top-10, left: $rect.left+35});
    
            $rect = document.getElementsByClassName('BM');
            $rect = $rect[0].getBoundingClientRect();
            $('#countBM').offset({top: $rectZ.top-10, left: $rect.left+30});
    
            $rect = document.getElementsByClassName('C');
            $rect = $rect[0].getBoundingClientRect();
            $('#countC').offset({top: $rectZ.top-10, left: $rect.left+65});
    
            $rect = document.getElementsByClassName('CM');
            $rect = $rect[0].getBoundingClientRect();
            $('#countCM').offset({top: $rectZ.top-10, left: $rect.left+55});
    
            $rect = document.getElementsByClassName('CB');
            $rect = $rect[0].getBoundingClientRect();
            $('#countCB').offset({top: $rectZ.top-10, left: $rect.left+80});
            if($('body').height() < 600){
                $('.B').css({
                    'width':'35px',
                    'height':'80px',
                });
        
                $('.BM').css({
                    'width':'35px',
                    'height':'60px',
                });
        
                $('.C').css({
                    'width':'70px',
                    'height':'55px',
                });
        
                $('.CM').css({
                    'width':'60px',
                    'height':'60px',
                });
        
                $('.CB').css({
                    'width':'80px',
                    'height':'80px',
                });
                $('.counter').css({
                    'font-weight': 100,
                    'font-size': '20px'
                });
    
                $rectZ = document.getElementsByClassName('CB');
                $rectZ = $rectZ[0].getBoundingClientRect();
                $rect = document.getElementsByClassName('B');
                $rect = $rect[0].getBoundingClientRect();
                $('#countB').offset({top: $rect.top,left: 'auto'});
                $('#countB').css({
                    'width' : '16px',
                    'right':'16px',
                    'left': $rectZ.right-$rectZ.left+5
                });
    
                $rect = document.getElementsByClassName('BM');
                $rect = $rect[0].getBoundingClientRect();
                $('#countBM').offset({top: $rect.top-10,left: 'auto'});
                $('#countBM').css({
                    'width' : '16px',
                    'right':'16px',
                    'left':$rectZ.right-$rectZ.left+5
                });
    
                $rect = document.getElementsByClassName('C');
                $rect = $rect[0].getBoundingClientRect();
                $('#countC').offset({top: $rect.top-10,left: 'auto'});
                $('#countC').css({
                    'width' : '16px',
                    'right':'16px',
                    'left':$rectZ.right-$rectZ.left+5
                });
    
                $rect = document.getElementsByClassName('CM');
                $rect = $rect[0].getBoundingClientRect();
                $('#countCM').offset({top: $rect.top-10,left: 'auto'});
                $('#countCM').css({
                    'width' : '16px',
                    'right':'16px',
                    'left':$rectZ.right-$rectZ.left+5
                });
    
                $rect = document.getElementsByClassName('CB');
                $rect = $rect[0].getBoundingClientRect();
                $('#countCB').offset({top: $rect.top-10,left: $rect.left + $('.CB').width+20});
                $('#countCB').css({
                    'width' : '16px',
                    'right':'16px',
                    'left':$rectZ.right-$rectZ.left+5
                });
            }
        }
    };
    $controllFunc2();
    window.addEventListener('resize', function() {
        $controllFunc2();
        $mainObj = 0;
        if(appendedObj.size>0){
            for($key of appendedObj.keys()){
                if(BaseObjMap.has($key) && $mainObj != 0){
                    $mainObj = $key;
                    $oldH = $('#'+$key).height();
                    $oldW = $('#'+$key).width();
                    $updateObjSize($key);
                    $newH = $('#'+$key).height();
                    $newW = $('#'+$key).width();
                    $minConstDist = $minConstDist*($newH/$oldH);
                    $updateCord($key);
                    break;
                }
            }
            $scale = 0;
            for($key of appendedObj.keys()){
                if($key != $mainObj && BaseObjMap.has($key)){
                    //    
                    $oldH = $('#'+$key).height();
                    $oldW = $('#'+$key).width();
                    $updateObjSize($key);
                    $newH = $('#'+$key).height();
                    $newW = $('#'+$key).width();
                    $keyNewOffsetTop = $('#'+$key).offset().top;
                    $keyNewOffsetLeft = $('#'+$key).offset().left;
                    $scale = $newH/$oldH;
                    $('#'+$key).offset({top:$keyNewOffsetTop*($newH/$oldH),left:$keyNewOffsetLeft*($newW/$oldW)});
                    //    
                    //       main ,     
                    // ?    ,   ,         
                    $updateCord($key);
                }
                else{
                    $updateObjSize($key);
                    //$updateCord($key);
                }
            }
            $startConnect();        
        }
    });
});