
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
    
    
    /* ���� ����������*/
    // ���������� ���������� ��� ������������ ������� ������������ ������
    numberIdObjecy = 0;
    idObject = "appended-modul" + numberIdObjecy;

    // ��� ������������ ����� �� �� �������� �� ������� ������� �������
    // �������� ���������� ���������� �������� ������ ���� ������� ���������
    $updateSize = function(){
        let objContainer = document.getElementById('container');
        rectcont = objContainer.getBoundingClientRect();
        $containerRX = rectcont.right-$('#menu').width();
        return $containerRX;
    };

    $idFinedObjOLD = "appended-modul0";
    // ��������� ��������

    // ��������� �������������� �������� (������� �����)
    const groupMain = new Map();
    // ��������� �������������� �������� (�������� �����)
    const subMain = new Map();
    // ������ ����������� ��������
    var appendedObj = new Map();

    //arr.set('key5','value5');
    //console.log(arr);


    /* ���� ����������*/

    //// ��������������� ������� /////
    /// ������� html ��� ������
    $creatModul = function(id,$number){
        if ($number == 1){
            modul  = '<div id = "'+id+'" class = "appended-modul modul B"><div class="modul-nameAppendB B-name">�</div></div>';
            return modul;
        }
        if ($number == 2){
            modul = '<div id = "'+id+'" class = "appended-modul modul BM"><div class="modul-nameAppendBM BM-name">��</div></div>';
            return modul;
        }
        if ($number == 3){
            modul  = '<div id = "'+id+'" class = "appended-modul modul C"><div class="modul-nameAppendC C-name">�</div></div>';
            return modul;
        }
        if ($number == 4){
            modul = '<div id = "'+id+'" class = "appended-modul modul CM"><div class="modul-nameAppendCM CM-name">�M</div></div>';
            return modul;
        }
        if ($number == 5){
            modul = '<div id = "'+id+'" class = "appended-modul modul CB"><div class="modul-nameAppendCB CB-name">��</div></div>';
            return modul;
        }
        return -1;
    }
    /// ��������� ������ �� �����
    $append = function(tar,elem)
    {
        tar.append(elem);
    }
    /// �������� �������
    $moovFunc = function($numberObj,id,e){
        if (e.which == 1){

            // ��������� ���������� ����
            $mouseD_x = e.pageX;
            $mouseD_y = e.pageY;
            // ��������� ���������� ����� �� ������� ������
            $elemCordX = e.currentTarget.getBoundingClientRect().left;
            $elemCordY = e.currentTarget.getBoundingClientRect().top;
            $elemCordXR = e.currentTarget.getBoundingClientRect().right;
            // �������� �������� �� ������� ���� ��� ��������� ������ �������
            $deltaX = $mouseD_x-$elemCordX;
            $deltaY = $mouseD_y-$elemCordY;
            $deltaXR = $elemCordXR-$mouseD_x;
            // �������� html ��� ������
            $moovObj = $creatModul(id,$numberObj);
            // ��������� �� ��������(�� �����)
            $append($('.canvas-UI'),$moovObj)

            // �������� ����������� ������
            $moovblModul = $('#'+id);
            $moovblModul.css({
                'cursor': 'grabbing'
            });
            // ������� ��� ���, ����� �� ��� ����� ������ ������ �� ������� ������
            $moovblModul.offset({top: e.pageY-$deltaY, left: e.pageX-$deltaX});
            // ���������� ������
            $moovblModul.show();
            
            $('body').css({
                'pointer-events':'none'
            });
            $('#container').css({
                'pointer-events':'auto'
            });

            // ��������� ������ ���� ���� ������ ��������
            $(document).mousemove(function (e) {
                // ���� ������� ������ � ���� �������� ������ ��������� �������� ������
                $moovblModul.offset({top: e.pageY-$deltaY, left: e.pageX-$deltaX});
            }).click(function (e) {
                // ��������� ������ ���� ������ ������
                // ��������� ��� ����������� ������ ��������� � ������� �������
                if(e.pageX + $deltaXR < $updateSize()){                    
                    // ��������� ����������
                    objAdd = document.getElementById(idObject);
                    topY = objAdd.getBoundingClientRect().top;
                    topX = objAdd.getBoundingClientRect().left;
                    dovnY = topY + $('#'+idObject).height();
                    dovnX = topX + $('#'+idObject).width();

                    // ������� �������� ������� ���� �� ����� ������ ���.
                    if(groupMain.size == 0){
                        // �������� ������
                        // ��������� ������ ���������� ���������� ��� �����
                        
                        // ��������� id ������� � ��������� � �������� ����� � ��������� �� ����� ���������� ������ �������
                        groupMain.set(idObject,[topX,topY,dovnX,dovnY]);
                        // ��������� � ������ ����������� �������� id ������������ ������
                        appendedObj.set(idObject,[topX,topY,dovnX,dovnY]);
                        // ���������� ����� id ��� ���������� ������
                        numberIdObjecy = numberIdObjecy + 1;
                        idObject = "appended-modul" + numberIdObjecy;
                        // ���������� ������� �� ���� �� �������� ������
                        $(this).unbind("click");
                    }
                    // ���� �� ����� ���-�� ����.
                    else{
                        /*�� � ������ ����� ������... �������� :D*/
                        // ���������� ���������� � ����� ������������
                        // �������� ������
                        
                        $idFinedObjNew = "appended-modul0";
                        $resultDistanse = 9999;

                        // ����� ������� � ������� ����� �������
                        for (let key of appendedObj.keys()) {
                            // ����� �������� ��������, ��� � ������� ����� ��������� � � ����� ������� ���������.

                            // ���� 
                            // ��������� �� ������ ��������� �� ����� �� � ��������� ��� ������� �������� �� ����������� � ������ ��������
                            // ���� ����� �����������, �� ��������� ������� ��������. - ��� ����. ������ ������, ������ ������������.
                            
                            // ����������� �� ������� ������������� ���������� �� �����.
                            // ����� �������� ��� �� � ����� ������� ������.


                            $lCordX = appendedObj.get(key)[0]; // ���������� ����� ����� �����������
                            $rCordX = appendedObj.get(key)[2]; // ���������� ������ ����� �����������
                            $tCordY = appendedObj.get(key)[1]; // ���������� ������� ����� �����������
                            $bCordY = appendedObj.get(key)[3]; // ���������� ������ ����� �����������

                            //topY - ������� ����� ������ ������������ �������
                            //topX - ����� ����� �������
                            //dovnY - ������ �����,
                            //dovnX  - ������ �����.

                            // ���������� ������ ������������� �������
                            $cordCenterMoovObjX = (topX+dovnX)/2;
                            $cordCenterMoovObjY = (topY+dovnY)/2;
                            /////////////////////////////////////////

                            // ���������� ������ ������ �����
                            $cordCenterDovnGrX = $lCordX+($rCordX-$lCordX)/2;
                            $cordCenterDovnGrY = $bCordY;

                            // ���������� ������ ������� �����
                            $cordCenterTopGrX = $lCordX+($rCordX-$lCordX)/2;
                            $cordCenterTopGrY = $tCordY;

                            // ���������� ������ ����� �����
                            $cordCenterLeftGrX = $lCordX;
                            $cordCenterLeftGrY = $tCordY+($bCordY-$tCordY)/2;

                            // ���������� ������ ������ �����
                            $cordCenterRightGrX = $rCordX;
                            $cordCenterRightGrY = $tCordY+($bCordY-$tCordY)/2;

                            //////////////////////////////////////////

                            ///////////////////////////////////////////////////////////
                            //// ����� ��� �������� ������� �� ���������� �������� ////
                            ///////////////////////////////////////////////////////////

                            $pos1 = true; // ������ ����� ������� ����
                            $pos2 = true; // ������� ����� ������ ����
                            $pos3 = true; //  ������� ����� ����� ����
                            $pos4 = true; //  ����� ����� ������� ����
                            $pos5 = true; //   ����� ����� ������ ����
                            $pos6 = true; //   ������ ����� ����� ����
                            $pos7 = true; //  ������ ����� ������ ����
                            $pos8 = true; //  ������ ����� ������ ����

                            // �������� ���� ������ key(id) � ���� ������ ���� ��������, ��� �������� ����� �� ���������
                            // � �������� ������� ����? ����������� ���������� �� ������ ������� ������� ��
                            // ������� ����� ��������� ��������, � �������� ��� y ������� � ����� �� ��� y ������� key(id) ������ ����
                            // ������ ��� ������ ������� idObject. 
                            
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

                            $maxSpase14 = 999; // ��� �������� ����������� $pos1
                            $maxSpase12 = 999; // ��� �������� ����������� $pos2
                            $maxSpase21 = 999; // ��� �������� ����������� $pos3
                            $maxSpase23 = 999; // ��� �������� ����������� $pos4
                            $maxSpase32 = 999; // ��� �������� ����������� $pos5
                            $maxSpase34 = 999; // ��� �������� ����������� $pos6
                            $maxSpase43 = 999; // ��� �������� ����������� $pos7
                            $maxSpase41 = 999; // ��� �������� ����������� $pos8

                            /////////////// ���������� ������� ��� ���������� � ��� �����������
                            //
                            //  $lCordX = appendedObj.get(key)[0]; // ���������� ����� ����� �����������
                            //  $rCordX = appendedObj.get(key)[2]; // ���������� ������ ����� �����������
                            //  $tCordY = appendedObj.get(key)[1]; // ���������� ������� ����� �����������
                            //  $bCordY = appendedObj.get(key)[3]; // ���������� ������ ����� �����������
                            //
                            //  
                            //
                            //
                            ////////////////////////////////////////////////////////////////////
                            // ���� ��� ������� ������� ������ ����� pos1
                            console.log($maxSpase14,$pos1);
                            for (let id of appendedObj.keys()) {
                                if((appendedObj.get(id)[1]-$tCordY < $maxSpase14) && ($rCordX-appendedObj.get(id)[0] < $('#'+idObject).height()) && id!=key){
                                    $maxSpase14 = appendedObj.get(key)[1]-$tCordY;
                                }
                            }
                            if($maxSpase14 < $('#'+idObject).height()){
                                $pos1 = false;
                            }

                            // ���� ��� ������� ������� ������ ����� pos2 (��������)
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
                            // ��������� �� ������ ������������ �� ������ ������ ����� ���������������� ������������
                            // pos6 ��� pos7 ������ ���� true.
                            $dist1 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterDovnGrX,$cordCenterDovnGrY);
                            // ��������� �� ������ ������������ �� ������ ������� ����� ���������������� ������������
                            // pos2 ��� pos3 ������ ���� true.
                            $dist2 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterTopGrX,$cordCenterTopGrY);
                            // ��������� �� ������ ������������ �� ������ ����� ����� ���������������� ������������
                            // pos4 ��� pos5 ������ ���� true.
                            $dist3 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterLeftGrX ,$cordCenterLeftGrY);
                            // ��������� �� ������ ������������ �� ������ ������ ����� ���������������� ������������
                            // pos1 ��� pos8 ������ ���� true.
                            $dist4 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterRightGrX ,$cordCenterRightGrY);

                            

                            $distanse = Math.min($dist1,$dist2,$dist3,$dist4);
                            // �� ������ ����� � ��� ���� ���������� � �������� �� ������� ���������� � ��� �� � �����������
                            // �������� ������������

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
                            
                            // ��������� ��� ��������� ����������. �� ��������� �� ��������������� ��������� � ��� ��� �� ����������
                            // ������������ ���� ��� ������� ����������� �� �� ������ ������� � ���� ����
                            if($distanse < $resultDistanse && $distanse < $minDistanse){
                                $resultDistanse = $distanse;
                                // ������������� ����������
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


                        //////////////��� ��� �������� ������� �������� ����������� ������� ������ � �.�.///////////////



                        // �� ������ �� ����� ��� ����� ����� ������ � �������� ������ � ����������� ������� ������
                        // ��� ����� ����� ��� ���������� �������� �� � ����� �������� �� ��������
                        // ��� �������� � ������ ���� � ������������ ������� minDistanse ��� �������� � ����������� �������� ������
                        // ����� ����� ��������� ��� �� ���������� ��������� �� �������� ����� ����������
                        // ���� ��������� ��� �������� ������ �� �����
                        // ���� ��������� ���� �� �� ��������� ������.

                        if($resultDistanse < 9999){
                            // "�����"
                            //element = this;
                            //var rect = element.getBoundingClientRect();
                            //console.log(rect.top, rect.right, rect.bottom, rect.left);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            
                            // ����� ����� ���������, ����� �� ������ ��������
                            // ��� ������ ���� ������ ?
                            // ����.��� ������ ��������� id ���������� ������ � ������ ������� � ������� l r b t ��� ������� ������� ��������
                            // ����� ���������� �������
                            // ���� �������� �� �������� ���� ���������.

                            element1 = document.getElementById($idFinedObjNew);  
                            var rect1 = element1.getBoundingClientRect();

                            element2 = element1 = document.getElementById(idObject); 
                            var rect2 = element2.getBoundingClientRect();
                            
                            // $distans1Vert  - ���������� �� ������ ������� ���1 �� ������   ������� ���2
                            // $distans2Vert  - ���������� �� ������ ������� ���1 �� �������  ������� ���2
                            // $distans3Vert  - ���������� �� ������� ������� ���1 �� ������  ������� ���2
                            // $distans4Vert  - ���������� �� ������� ������� ���1 �� ������� ������� ���2
                            // $attachPosVert - ������� ������������ �� ���������
                            $distans1Vert = rect1.bottom - rect2.bottom;
                            $distans2Vert = rect1.bottom -    rect2.top;
                            $distans3Vert = rect1.top    - rect2.bottom;
                            $distans4Vert = rect1.top    -    rect2.top;
                            $attachPosVert = 0;
                            // ������� ����������� �������� �� ������ �� ���������
                            $minDistansVert = Math.min(Math.abs($distans1Vert),Math.abs($distans2Vert),Math.abs($distans3Vert),Math.abs($distans4Vert));
                            // ��������� ������� �����.
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
                            // $distans1Horis  - ���������� �� ����� ������� ���1 �� �����   ������� ���2
                            // $distans2Horis  - ���������� �� ����� ������� ���1 �� ������  ������� ���2
                            // $distans3Horis  - ���������� �� ������ ������� ���1 �� �����  ������� ���2
                            // $distans4Horis  - ���������� �� ������ ������� ���1 �� ������ ������� ���2
                            // $attachPosHoris - ������� ������������ �� �����������
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
                            // ����� ������
                            // � �������� ����
                            if(($attachPosHoris == 3 && $attachPosVert == 4)||($attachPosHoris == 4 && $attachPosVert == 4)||($attachPosHoris == 3 && $attachPosVert == 3 && $distans3Vert < 0)){
                                $('#'+idObject).offset({top: rect2.top+(rect1.top - rect2.top), left: rect2.left - (rect2.left-rect1.right)+1});
                            }
                            // � ������� ����
                            if(($attachPosHoris == 3 && $attachPosVert == 1) || ($attachPosHoris == 4 && $attachPosVert == 1) || ($attachPosHoris == 3 && $attachPosVert == 2 && $distans2Vert > 0)){
                                $('#'+idObject).offset({top: rect2.top+(rect1.bottom - rect2.bottom), left: rect2.left - (rect2.left-rect1.right)+1});
                            }
                            // ����� ����� � �������� ����
                            if($attachPosHoris == 2 && $attachPosVert == 4 && rect1.top - rect2.bottom > rect1.top - rect2.top ){
                                $('#'+idObject).offset({top: rect2.top-(rect1.top - rect2.bottom), left: rect2.left+(rect1.left - rect2.right)-1});
                            }
                            if(($attachPosHoris == 2 && $attachPosVert == 4)||($attachPosHoris == 1 && $attachPosVert == 4) && rect1.top - rect2.bottom <= rect1.top - rect2.top || (($attachPosHoris == 2 && $attachPosVert == 3 && $distans3Vert < 0))){
                                $('#'+idObject).offset({top: rect2.top+(rect1.top - rect2.top), left: rect2.left+(rect1.left - rect2.right)-1});
                            }
                            // ����� ����� � ������� ����
                            if(($attachPosHoris == 2 && $attachPosVert == 1)||($attachPosHoris == 1 && $attachPosVert == 1) && rect1.bottom - rect2.top > rect1.bottom - rect2.bottom || (($attachPosHoris == 2 && $attachPosVert == 2) && $distans2Vert >=0)){
                                $('#'+idObject).offset({top: rect2.top-(rect2.bottom-rect1.bottom), left: rect2.left+(rect1.left - rect2.right)-1});
                            }

                            // ����� ������ � ������ ����
                            if(($attachPosHoris == 1 && $attachPosVert == 3) || ($attachPosHoris == 2 && $attachPosVert == 3 && $distans3Vert >= 0)){
                                $('#'+idObject).offset({top: rect2.top-(rect2.bottom-rect1.top)-1, left: rect1.left});
                            }

                            // ����� ������ � ������� ����
                            if(($attachPosHoris == 3 && $attachPosVert == 3 && $distans3Vert >= 0) || ($attachPosHoris == 4 && $attachPosVert == 3)){
                                $('#'+idObject).offset({top: rect2.top-(rect2.bottom-rect1.top)-1, left: rect1.right-(rect2.right-rect2.left)});
                            }

                            // ����� ����� � ������ ����
                            if(($attachPosHoris == 1 && $attachPosVert == 2) || ($attachPosHoris == 2 && $attachPosVert == 2 && $distans2Vert <= 0 )){
                                $('#'+idObject).offset({top: rect1.bottom+1, left: rect1.left});
                                console.log($distans2Vert);
                            }
                            // ����� ����� � ������� ����
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

                            // ��������� id ������� � ��������� � �������� ����� � ��������� �� ����� ���������� ������ �������
                            groupMain.set(idObject,[topX,topY,dovnX,dovnY]);
                            // ��������� � ������ ����������� �������� id ������������ ������
                            appendedObj.set(idObject,[topX,topY,dovnX,dovnY]);

                            // ����������� ������
                            numberIdObjecy = numberIdObjecy + 1;
                            idObject = "appended-modul" + numberIdObjecy;
                            // ���������� ������� �� ���� �� �������� ������
                            $(this).unbind("click");
                        }
                        else {

                            // ���� ����������� ������ �������� �� ��� ������, ����� �������� ��������, ����� �� ��������� ������
                            // �� ��� ������� �� ������� �� ���������. ��� ����� ����� �������� �� ��������� �� �� � ����������� �
                            // ����� ���� ��� ����������� ��������, ���� ���, �� ������������� ���������, ���� ��, �� �� ���������(���� ���).

                            // ��������� id ������� � ��������� � �������� ����� � ��������� �� ����� ���������� ������ �������
                            groupMain.set(idObject,[topX,topY,dovnX,dovnY]);
                            // ��������� � ������ ����������� �������� id ������������ ������
                            appendedObj.set(idObject,[topX,topY,dovnX,dovnY]);
                            // ���������� ����� id ��� ���������� ������
                            numberIdObjecy = numberIdObjecy + 1;
                            idObject = "appended-modul" + numberIdObjecy;
                            // ���������� ������� �� ���� �� �������� ������
                            $(this).unbind("click");
                        }
                    }
                }
                else{
                    $moovblModul.remove();
                    $(this).unbind("click");
                }
                // ������� �������� ������� ���� �� ����� ���-�� ����.
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