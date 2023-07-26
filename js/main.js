
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
            modul  = '<div id = "'+id+'" class = "appended-modul modul B"><div class="name modul-nameAppendB B-name">�</div></div>';
            return modul;
        }
        if ($number == 2){
            modul = '<div id = "'+id+'" class = "appended-modul modul BM"><div class="name modul-nameAppendBM BM-name">��</div></div>';
            return modul;
        }
        if ($number == 3){
            modul  = '<div id = "'+id+'" class = "appended-modul modul C"><div class="name modul-nameAppendC C-name">�</div></div>';
            return modul;
        }
        if ($number == 4){
            modul = '<div id = "'+id+'" class = "appended-modul modul CM"><div class="name modul-nameAppendCM CM-name">�M</div></div>';
            return modul;
        }
        if ($number == 5){
            modul = '<div id = "'+id+'" class = "appended-modul modul CB"><div class="name modul-nameAppendCB CB-name">��</div></div>';
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
                        $resultDistanse2 = 9999;
                        $idFinedObj ="appended-modul0"; // ������ id ���������� ������.

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
                            $dist = function(x1,y1,x2,y2){
                                return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
                            };

                            
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
                            ///////////////////////////////////////////////////////////
                            ////////////////////// end block //////////////////////////
                            ///////////////////////////////////////////////////////////



                            
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

                                $dist1 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterDovnGrX,$cordCenterDovnGrY);
                                $dist2 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterTopGrX,$cordCenterTopGrY);
                                $dist3 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterLeftGrX ,$cordCenterLeftGrY);
                                $dist4 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterRightGrX ,$cordCenterRightGrY);
                                $distanse2 = Math.min($dist1,$dist2,$dist3,$dist4);
                                if($distanse2 < $resultDistanse2){
                                    $resultDistanse2 = $distanse2; // ��� ��� �������� ��������� � ������ ��� ���������� �������� ��� �������� ���.
                                    $idFinedObj = key;
                                }
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
                            ///console.log($dist1,$dist2,$dist3,$dist4,$distanse2,$idFinedObj);
                            
                            if($distanse < $resultDistanse && $distanse < $minDistanse){
                                $resultDistanse = $distanse;
                                // ������������� ����������
                                // ����� ��� �� ����� ������������ ���������� ���������� ����������� ������� ������ ��� �������
                                if(appendedObj.size < 1){
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
                            //console.log($resPos1,$resPos2,$resPos3,$resPos4,$resPos5,$resPos6,$resPos7,$resPos8,$idFinedObjNew);
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



                            

                            

                            // ����������� ������
                            numberIdObjecy = numberIdObjecy + 1;
                            idObject = "appended-modul" + numberIdObjecy;
                            // ���������� ������� �� ���� �� �������� ������
                            $(this).unbind("click");
                            
                        }
                        else {
                            element3 = document.getElementById(idObject);  
                            var rect3 = element3.getBoundingClientRect(); // ������ � �������� �����
                            element4 = document.getElementById($idFinedObj);  
                            var rect4 = element4.getBoundingClientRect(); // ������ � �������� �����
                            if((rect3.right < rect4.right && rect4.left < rect3.right) || (rect4.top < rect3.top && rect4.bottom > rect3.top )){
                                $moovblModul.remove();
                                $(this).unbind("click");
                            }
                            else{
                                if((rect4.left < rect3.left && rect4.right > rect3.left) || (rect4.top < rect3.bottom && rect4.bottom > rect3.bottom )){
                                    $moovblModul.remove();
                                    $(this).unbind("click");
                                }
                                else {
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


    $( '.canvas-UI' ).on( 'mousedown', function( event1 ) {
        obj = event1.target;
        idObj = $(obj).attr('id');
        if(!idObj){
            // ���� ���� ���� �������� �� ����� �����
            // ����� �������� ��� ������
            idObj = $(obj).parent().attr('id');
            obj = document.getElementById(idObj);
        }
        // if($(obj).hasClass('name')){
        //     obj = $(event1.Target).parent();
        //     console.log(obj);
        //     idObj = $(event1.Target).parent().attr('id');
        //     console.log(idObj);
        // }
        if (event1.which == 1 ){
            // ��������� ���������� ����
            $mouseD_x = event1.pageX;
            $mouseD_y = event1.pageY;
            // ��������� ���������� ����� �� ������� ������
            $elemCordX = obj.getBoundingClientRect().left;
            $elemCordY = obj.getBoundingClientRect().top;
            $elemCordXR = obj.getBoundingClientRect().right;
            // �������� �������� �� ������� ���� ��� ��������� ������ �������
            $deltaX = $mouseD_x-$elemCordX;
            $deltaY = $mouseD_y-$elemCordY;
            $deltaXR = $elemCordXR-$mouseD_x;
            $moovblModul = $('#'+idObj);
            $(document).mousemove(function (e) {
                $moovblModul.offset({top: e.pageY-$deltaY, left: e.pageX-$deltaX});
                topY = obj.getBoundingClientRect().top;
                topX = obj.getBoundingClientRect().left;
                dovnY = topY + $('#'+idObj).height();
                dovnX = topX + $('#'+idObj).width();
                groupMain.set(idObj,[topX,topY,dovnX,dovnY]);
                // ��������� � ������ ����������� �������� id ������������ ������
                appendedObj.set(idObj,[topX,topY,dovnX,dovnY]);
            }).click(function (e) {
                topY = obj.getBoundingClientRect().top;
                topX = obj.getBoundingClientRect().left;
                dovnY = topY + $('#'+idObj).height();
                dovnX = topX + $('#'+idObj).width();
                if(appendedObj.size == 1){
                    $(this).unbind("click");
                    $(this).unbind("mousemove");
                }
                else{
                    $idFinedObjNew = "appended-modul0";
                    $resultDistanse = 9999;
                    $resultDistanse2 = 9999;
                    $idFinedObj ="appended-modul0"; // ������ id ���������� ������.

                    $resPos1 = true; // ������ ����� ������� ����
                    $resPos2 = true; // ������� ����� ������ ����
                    $resPos3 = true; //  ������� ����� ����� ����
                    $resPos4 = true; //  ����� ����� ������� ����
                    $resPos5 = true; //   ����� ����� ������ ����
                    $resPos6 = true; //   ������ ����� ����� ����
                    $resPos7 = true; //  ������ ����� ������ ����
                    $resPos8 = true; //  ������ ����� ������ ����

                    for (let key of appendedObj.keys()) {
                        if(key == idObj) {
                            continue;
                        }
                        $dist = function(x1,y1,x2,y2){
                            return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
                        };
                        $lCordX = appendedObj.get(key)[0]; // ���������� ����� ����� �����������
                        $rCordX = appendedObj.get(key)[2]; // ���������� ������ ����� �����������
                        $tCordY = appendedObj.get(key)[1]; // ���������� ������� ����� �����������
                        $bCordY = appendedObj.get(key)[3];

                        // ���������� ������ ������ �����
                        $cordCenterMoovObjX = (topX+dovnX)/2;
                        $cordCenterMoovObjY = (topY+dovnY)/2;
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

                        $pos1 = true; // ������ ����� ������� ����
                        $pos2 = true; // ������� ����� ������ ����
                        $pos3 = true; //  ������� ����� ����� ����
                        $pos4 = true; //  ����� ����� ������� ����
                        $pos5 = true; //   ����� ����� ������ ����
                        $pos6 = true; //   ������ ����� ����� ����
                        $pos7 = true; //  ������ ����� ������ ����
                        $pos8 = true; //  ������ ����� ������ ����
                        for (let id of appendedObj.keys()) {
                            if(idObj == id) {
                                continue;
                            }
                            /////////// ���� ���� ��� ������ ����� ������ �������//////////////////////////////
                            $lX = appendedObj.get(id)[0];
                            $rX = appendedObj.get(id)[2];
                            $tY = appendedObj.get(id)[1];
                            $bY = appendedObj.get(id)[3];

                            $d1 = $tY - $tCordY; // �� ������� �� �������
                            $d2 = $bY - $tCordY; // �� ������ �� �������
                            $d3 = $lX - $rCordX; // �� ����� �� ������
                            $d4 = $rX - $rCordX;
                            if($d2 > 0 && $d4 > 0){
                                if(id!=key && $d1 < $('#'+idObj).height() && $d3 < $('#'+idObj).width()){
                                    $pos1 = false;
                                }
                            }
                            $lX = appendedObj.get(id)[0];
                            $rX = appendedObj.get(id)[2];
                            $tY = appendedObj.get(id)[1];
                            $bY = appendedObj.get(id)[3];

                            $d1 = $tCordY-$bY;
                            $d2 = $rCordX-$rX;
                            $d3 = $rCordX-$lX;
                            $d4 = $tCordY-$tY;
                            if($d3 > 0 && $d4 > 0){
                                if(id!=key && $d2 < $('#'+idObj).width() && $d1 < $('#'+idObj).height()){
                                    $pos2 = false;
                                }
                            }
                            $lX = appendedObj.get(id)[0];
                            $rX = appendedObj.get(id)[2];
                            $tY = appendedObj.get(id)[1];
                            $bY = appendedObj.get(id)[3];

                            $d1 = $tCordY-$bY;
                            $d2 = $lX-$lCordX;
                            $d3 = $lCordX-$rX;
                            $d4 = $tCordY-$tY;
                            if($d3 < 0 && $d4 > 0){
                                if(id!=key && $d2 < $('#'+idObj).width() && $d1 < $('#'+idObj).height()){
                                    $pos3 = false;
                                }
                            }

                            $lX = appendedObj.get(id)[0];
                            $rX = appendedObj.get(id)[2];
                            $tY = appendedObj.get(id)[1];
                            $bY = appendedObj.get(id)[3];

                            $d1 = $tY - $tCordY; 
                            $d2 = $bY - $tCordY; 
                            $d3 = $lCordX - $rX; 
                            $d4 = $lCordX-$lX;
                            if($d2 > 0 && $d4 > 0){
                                if(id!=key && $d1 < $('#'+idObj).height() && $d3 < $('#'+idObj).width()){
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
                                if(id!=key && $d1 < $('#'+idObj).height() && $d3 < $('#'+idObj).width()){
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
                                if(id!=key && $d2 < $('#'+idObj).width() && $d1 < $('#'+idObj).height()){
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
                                if(id!=key && $d2 < $('#'+idObj).width() && $d1 < $('#'+idObj).height()){
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
                                if(id!=key && $d1 < $('#'+idObj).height() && $d3 < $('#'+idObj).width()){
                                    $pos8 = false;
                                }
                            }
                        }
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
                            $dist1 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterDovnGrX,$cordCenterDovnGrY);
                            $dist2 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterTopGrX,$cordCenterTopGrY);
                            $dist3 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterLeftGrX ,$cordCenterLeftGrY);
                            $dist4 = $dist($cordCenterMoovObjX,$cordCenterMoovObjY,$cordCenterRightGrX ,$cordCenterRightGrY);
                            $distanse2 = Math.min($dist1,$dist2,$dist3,$dist4);
                            if($distanse2 < $resultDistanse2){
                                $resultDistanse2 = $distanse2; // ��� ��� �������� ��������� � ������ ��� ���������� �������� ��� �������� ���.
                                $idFinedObj = key;
                            }
                            continue;
                        }
                        $distanse = Math.min($dist1,$dist2,$dist3,$dist4);
                        $minDistanse = 30+$dist(topX,topY,$cordCenterMoovObjX,$cordCenterMoovObjY);
                        //console.log($minDistanse,$distanse,key);
                        if($('#'+idObj).hasClass('B')){
                            $minDistanse = 130;
                        }
                        if($('#'+idObj).hasClass('BM')){
                            $minDistanse = 130;
                        }
                        if($('#'+idObj).hasClass('CM')){
                            $minDistanse = 130;
                        }
                        if($('#'+idObj).hasClass('C')){
                            $minDistanse = 130;
                        }
                        if($('#'+idObj).hasClass('CB')){
                            $minDistanse = 130;
                        }
                        if($distanse < $resultDistanse && $distanse < $minDistanse){
                            $resultDistanse = $distanse;
                            // ������������� ����������
                            // ����� ��� �� ����� ������������ ���������� ���������� ����������� ������� ������ ��� �������
                            if(appendedObj.size < 1){
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
                    console.log($idFinedObjNew);
                    console.log(appendedObj);
                    if($resultDistanse < 9999){
                        console.log($idFinedObjNew);
                        console.log(appendedObj);
                        $updateCord = function(){
                            objAdd = document.getElementById(idObj);
                            topY = objAdd.getBoundingClientRect().top;
                            topX = objAdd.getBoundingClientRect().left;
                            dovnY = topY + $('#'+idObj).height();
                            dovnX = topX + $('#'+idObj).width();
                            groupMain.set(idObj,[topX,topY,dovnX,dovnY]);
                            // ��������� � ������ ����������� �������� id ������������ ������
                            appendedObj.set(idObj,[topX,topY,dovnX,dovnY]);
                        }
                        element1 = document.getElementById($idFinedObjNew);  
                        var rect1 = element1.getBoundingClientRect(); // ������ � �������� �����

                        element2 = element1 = document.getElementById(idObj); 
                        var rect2 = element2.getBoundingClientRect(); // ������ ������� �����
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
                        if($resultPos == 1){
                            $('#'+idObj).offset({top: rect1.top, left: rect2.left - (rect2.left-rect1.right)+1});
                            $updateCord();
                        }
                        
                        if($resultPos == 2){
                            $('#'+idObj).offset({top: rect2.top-(rect2.bottom-rect1.top)-1, left: rect1.right-(rect2.right-rect2.left)});
                            $updateCord();
                        }
                        if($resultPos == 3){
                            $('#'+idObj).offset({top: rect2.top-(rect2.bottom-rect1.top)-1, left: rect1.left});
                            $updateCord();
                        }
                        if($resultPos == 4){
                            $('#'+idObj).offset({top: rect2.top+(rect1.top - rect2.top), left: rect2.left+(rect1.left - rect2.right)-1});
                            $updateCord();
                        }
                        if($resultPos == 5){
                            $('#'+idObj).offset({top: rect2.top-(rect2.bottom-rect1.bottom), left: rect2.left+(rect1.left - rect2.right)-1});
                            $updateCord();
                        }
                        if($resultPos == 6){
                            $('#'+idObj).offset({top: rect1.bottom+1, left: rect1.left});
                            $updateCord();
                        }
                        if($resultPos == 7){
                            $('#'+idObj).offset({top: rect1.bottom+1, left: rect1.right-(rect2.right-rect2.left)});
                            $updateCord();
                        }
                        if($resultPos == 8){
                            $('#'+idObj).offset({top: rect2.top+(rect1.bottom - rect2.bottom), left: rect2.left - (rect2.left-rect1.right)+1});
                            $updateCord();
                        }
                        $(this).unbind("click");
                        $(this).unbind("mousemove");
                    }
                    else{
                        var rect3 = obj.getBoundingClientRect(); // ������ � �������� �����
                        element4 = document.getElementById($idFinedObj);  
                        var rect4 = element4.getBoundingClientRect(); // ������ � �������� �����
                        console.log(rect3,rect4);
                        // if((rect3.right < rect4.right && rect4.left < rect3.right) || (rect4.top < rect3.top && rect4.bottom > rect3.top )){
                        //     appendedObj.delete(idObj);
                        //     console.log(3);
                        //     $(obj).remove();
                        //     $(this).unbind("click");
                        //     $(this).unbind("mousemove");
                        // }
                        // else{
                            // if((rect4.left < rect3.left && rect4.right > rect3.left) || (rect4.top < rect3.bottom && rect4.bottom > rect3.bottom )){
                            //     appendedObj.delete(idObj);
                            //     console.log(2);
                            //     $(this).unbind("mousemove");
                            //     $(this).unbind("click");

                            //     $(obj).remove();
                            // }
                            // else {
                            console.log(1);
                            // ���������� ������� �� ���� �� �������� ������
                            $(this).unbind("mousemove");
                            $(this).unbind("click");
                            //}
                        //}
                    }
                    $(this).unbind("mousemove");
                    $(this).unbind("click");
                }// end block add
                $(this).unbind("mousemove");
                $(this).unbind("click");
            });
        }
    });
});