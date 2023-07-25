
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

                        $resPos1 = true; // ������ ����� ������� ����
                        $resPos2 = true; // ������� ����� ������ ����
                        $resPos3 = true; //  ������� ����� ����� ����
                        $resPos4 = true; //  ����� ����� ������� ����
                        $resPos5 = true; //   ����� ����� ������ ����
                        $resPos6 = true; //   ������ ����� ����� ����
                        $resPos7 = true; //  ������ ����� ������ ����
                        $resPos8 = true; //  ������ ����� ������ ����

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
                            /////////////// ���������� ������� ��� ���������� � ��� �����������/////////////
                            //                                                                             /
                            //  $lCordX = appendedObj.get(key)[0]; // ���������� ����� ����� �����������   /
                            //  $rCordX = appendedObj.get(key)[2]; // ���������� ������ ����� �����������  /
                            //  $tCordY = appendedObj.get(key)[1]; // ���������� ������� ����� ����������� /
                            //  $bCordY = appendedObj.get(key)[3]; // ���������� ������ ����� �����������  /
                            //                                                                             /
                            ////////////////////////////////////////////////////////////////////////////////
                            // ���� ��� ����������� ������� ��������� ��������.
                            for (let id of appendedObj.keys()) {
                                /////////// ���� ���� ��� ������ ����� ������ �������//////////////////////////////
                                $lX = appendedObj.get(id)[0];
                                $rX = appendedObj.get(id)[2];
                                $tY = appendedObj.get(id)[1];
                                $bY = appendedObj.get(id)[3];

                                $d1 = $tY - $tCordY; // �� ������� �� �������
                                $d2 = $bY - $tCordY; // �� ������ �� �������
                                $d3 = $lX - $rCordX; // �� ����� �� ������
                                $d4 = $rX - $rCordX; // �� ������ �� ������ �����
                                if($d2 > 0 && $d4 > 0){
                                    if(id!=key && $d1 < $('#'+idObject).height() && $d3 < $('#'+idObject).width()){
                                        $pos1 = false;
                                    }
                                }
                                /////////////////////////////////////////////////////////////////////////////////////
                                /////////// ���� ���� ��� ������� ����� ������ �������//////////////////////////////
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
                                /////////// ���� ���� ��� ������� ����� ����� �������//////////////////////////////
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
                                /////////// ���� ���� ��� ����� ����� ������� �������//////////////////////////////
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
                                /////////// ���� ���� ��� ����� ����� ������ �������//////////////////////////////
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
                                /////////// ���� ���� ��� ������ ����� ����� �������//////////////////////////////
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
                                /////////// ���� ���� ��� ������ ����� ������ �������//////////////////////////////
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
                                /////////// ���� ���� ��� ������ ����� ������ �������//////////////////////////////
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
                            // ���� �������� ������� ������ ��� ������� ������, �� ������� �������� ����������� ��� ��������.
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
                            // ��������� �� ������ ������������ �� ������ ������ ����� ���������������� ������������
                            // pos6 ��� pos7 ������ ���� true.
                            $dist1 = 99999999;
                            $dist2 = 99999999;
                            $dist3 = 99999999;
                            $dist4 = 99999999;

                            if($pos1 || $pos2 || $pos3 || $pos4 || $pos5 || $pos6 || $pos7 || $pos8){
                                if($pos6 || $pos7){
                                    $dist1 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterDovnGrX,$cordCenterDovnGrY);
                                }
                                // ��������� �� ������ ������������ �� ������ ������� ����� ���������������� ������������
                                // pos2 ��� pos3 ������ ���� true.
                                if($pos2 || $pos3){
                                    $dist2 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterTopGrX,$cordCenterTopGrY);
                                }
                                // ��������� �� ������ ������������ �� ������ ����� ����� ���������������� ������������
                                // pos4 ��� pos5 ������ ���� true.
                                if($pos4 || $pos5){
                                    $dist3 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterLeftGrX ,$cordCenterLeftGrY);
                                }
                                // ��������� �� ������ ������������ �� ������ ������ ����� ���������������� ������������
                                // pos1 ��� pos8 ������ ���� true.
                                if($pos1 || $pos8){
                                    $dist4 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterRightGrX ,$cordCenterRightGrY);
                                }
                            }
                            else{
                                continue;
                            }

                            

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
                                // ����� ��� �� ����� ������������ ���������� ���������� ����������� ������� ������ ��� �������
                                if(appendedObj.size == 1){
                                    $idFinedObjOLD = key;
                                    $idFinedObjNew = key;
                                }
                                else{
                                    $idFinedObjOLD = $idFinedObjNew;
                                    $idFinedObjNew = key;
                                    $resPos1 = $pos1; // ������ ����� ������� ����
                                    $resPos2 = $pos2; // ������� ����� ������ ����
                                    $resPos3 = $pos3; //  ������� ����� ����� ����
                                    $resPos4 = $pos4; //  ����� ����� ������� ����
                                    $resPos5 = $pos5; //   ����� ����� ������ ����
                                    $resPos6 = $pos6; //   ������ ����� ����� ����
                                    $resPos7 = $pos7; //  ������ ����� ������ ����
                                    $resPos8 = $pos8; //  ������ ����� ������ ����
                                }
                            }
                        }

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
                            
                            // $resPos1 = $pos1; // ������ ����� ������� ����
                            // $resPos2 = $pos2; // ������� ����� ������ ����
                            // $resPos3 = $pos3; //  ������� ����� ����� ����
                            // $resPos4 = $pos4; //  ����� ����� ������� ����
                            // $resPos5 = $pos5; //   ����� ����� ������ ����
                            // $resPos6 = $pos6; //   ������ ����� ����� ����
                            // $resPos7 = $pos7; //  ������ ����� ������ ����
                            // $resPos8 = $pos8; //  ������ ����� ������ ����

                            // �� ����� ���������� � ����������� �������� ��� ������
                            console.log($resPos1,$resPos2,$resPos3,$resPos4,$resPos5,$resPos6,$resPos7,$resPos8);
                            $updateCord = function(){
                                objAdd = document.getElementById(idObject);
                                topY = objAdd.getBoundingClientRect().top;
                                topX = objAdd.getBoundingClientRect().left;
                                dovnY = topY + $('#'+idObject).height();
                                dovnX = topX + $('#'+idObject).width();
                                groupMain.set(idObject,[topX,topY,dovnX,dovnY]);
                                // ��������� � ������ ����������� �������� id ������������ ������
                                appendedObj.set(idObject,[topX,topY,dovnX,dovnY]);
                            }


                            element1 = document.getElementById($idFinedObjNew);  
                            var rect1 = element1.getBoundingClientRect(); // ������ � �������� �����

                            element2 = element1 = document.getElementById(idObject); 
                            var rect2 = element2.getBoundingClientRect(); // ������ ������� �����
                            
                            // $distans1Vert  - ���������� �� ������ ������� ���1 �� ������   ������� ���2
                            // $distans2Vert  - ���������� �� ������ ������� ���1 �� �������  ������� ���2
                            // $distans3Vert  - ���������� �� ������� ������� ���1 �� ������  ������� ���2
                            // $distans4Vert  - ���������� �� ������� ������� ���1 �� ������� ������� ���2
                            // $attachPosVert - ������� ������������ �� ���������
                            // ���� ���������� ���������� ���������� ���������� �� ���� ������� �����
                            // � ����� ������� ���������� ���������� ������ �� ����������� ������� �����
                            // 
                            // 
                            //
                            //
                            /////////////////////////////////////////////////////////////////////////////
                            $distans1Vert = rect1.bottom - rect2.bottom; // pos5 ��� pos8
                            $distans2Vert = rect1.bottom -    rect2.top; // pos6 ��� pos7
                            $distans3Vert = rect1.top    - rect2.bottom; // pos2 ��� pos3
                            $distans4Vert = rect1.top    -    rect2.top; // pos1 ��� pos4
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
                            // ����� ������
                            // � �������� ����
                            // ��� ����� ����� ������ �������� � ������� ��������.
                            if(($attachPosHoris == 3 && $attachPosVert == 4)||($attachPosHoris == 4 && $attachPosVert == 4)||($attachPosHoris == 3 && $attachPosVert == 3 && $distans3Vert < 0)){
                                $('#'+idObject).offset({top: rect2.top+(rect1.top - rect2.top), left: rect2.left - (rect2.left-rect1.right)+1});
                                $updateCord();
                            }
                            // � ������� ����
                            if(($attachPosHoris == 3 && $attachPosVert == 1) || ($attachPosHoris == 4 && $attachPosVert == 1) || ($attachPosHoris == 3 && $attachPosVert == 2 && $distans2Vert > 0)){
                                $('#'+idObject).offset({top: rect2.top+(rect1.bottom - rect2.bottom), left: rect2.left - (rect2.left-rect1.right)+1});
                                $updateCord();
                            }
                            // ����� ����� � �������� ����
                            if($attachPosHoris == 2 && $attachPosVert == 4 && rect1.top - rect2.bottom > rect1.top - rect2.top ){
                                $('#'+idObject).offset({top: rect2.top-(rect1.top - rect2.bottom), left: rect2.left+(rect1.left - rect2.right)-1});
                                $updateCord();
                            }
                            if(($attachPosHoris == 2 && $attachPosVert == 4)||($attachPosHoris == 1 && $attachPosVert == 4) && rect1.top - rect2.bottom <= rect1.top - rect2.top || (($attachPosHoris == 2 && $attachPosVert == 3 && $distans3Vert < 0))){
                                $('#'+idObject).offset({top: rect2.top+(rect1.top - rect2.top), left: rect2.left+(rect1.left - rect2.right)-1});
                                $updateCord();
                            }
                            // ����� ����� � ������� ����
                            if(($attachPosHoris == 2 && $attachPosVert == 1)||($attachPosHoris == 1 && $attachPosVert == 1) && rect1.bottom - rect2.top > rect1.bottom - rect2.bottom || (($attachPosHoris == 2 && $attachPosVert == 2) && $distans2Vert >=0)){
                                $('#'+idObject).offset({top: rect2.top-(rect2.bottom-rect1.bottom), left: rect2.left+(rect1.left - rect2.right)-1});
                                $updateCord();
                            }

                            // ����� ������ � ������ ����
                            if(($attachPosHoris == 1 && $attachPosVert == 3) || ($attachPosHoris == 2 && $attachPosVert == 3 && $distans3Vert >= 0)){
                                $('#'+idObject).offset({top: rect2.top-(rect2.bottom-rect1.top)-1, left: rect1.left});
                                $updateCord();
                            }

                            // ����� ������ � ������� ����
                            if(($attachPosHoris == 3 && $attachPosVert == 3 && $distans3Vert >= 0) || ($attachPosHoris == 4 && $attachPosVert == 3)){
                                $('#'+idObject).offset({top: rect2.top-(rect2.bottom-rect1.top)-1, left: rect1.right-(rect2.right-rect2.left)});
                                $updateCord();
                            }

                            // ����� ����� � ������ ����
                            if(($attachPosHoris == 1 && $attachPosVert == 2) || ($attachPosHoris == 2 && $attachPosVert == 2 && $distans2Vert <= 0 )){
                                $('#'+idObject).offset({top: rect1.bottom+1, left: rect1.left});
                                $updateCord();
                            }
                            // ����� ����� � ������� ����
                            if(($attachPosHoris == 4 && $attachPosVert == 2) || ($attachPosHoris == 3 && $attachPosVert == 2 && $distans2Vert <= 0 )){
                                $('#'+idObject).offset({top: rect1.bottom+1, left: rect1.right-(rect2.right-rect2.left)});
                                $updateCord();
                            }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            $('#'+$idFinedObjOLD).css({
                                'background-color': '#B9B9BA'
                            });
                            $('#'+$idFinedObjNew).css({
                                'background-color': '#FFF'
                            });

                            

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