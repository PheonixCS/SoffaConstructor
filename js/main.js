
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
    
    
    /* ���� ����������*/
    // ���������� ���������� ��� ������������ ������� ������������ ������
    numberIdObjecy = 0;
    idObject = "appended-modul" + numberIdObjecy;

    // ��� ������������ ����� �� �� �������� �� ������� ������� �������
    // �������� ���������� ���������� �������� ������ ���� ������� ���������
    let objContainer = document.getElementById('container');
    $containerTX = objContainer.getBoundingClientRect().left;
    $containerTY = objContainer.getBoundingClientRect().top;
    // ����������� ���������� ���������� ������� ������� ���� ������� ���������
    $containerDX = $containerTX + 1050;
    $containerDY = $containerTY + 700;

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

            // �������� �������� �� ������� ���� ��� ��������� ������ �������
            $deltaX = $mouseD_x-$elemCordX;
            $deltaY = $mouseD_y-$elemCordY;
            // �������� html ��� ������
            $moovObj = $creatModul(id,$numberObj);
            // ��������� �� ��������(�� �����)
            $append($('body'),$moovObj)

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
                /*��� �� ����� �� ����� ������������� ���������� ���������� ������*/
                


            }).click(function (e) {
                // ��������� ������ ���� ������ ������
                // ��������� ��� ����������� ������ ��������� � ������� �������
                if(e.pageY < $containerDY-$deltaY && e.pageY > $containerTY+$deltaY && e.pageX < $containerDX-$deltaX && e.pageX > $containerTX+$deltaX){                    
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
                        /*��� ����� ���������� �� ������� � id*/

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

                            // ���� ����������� ������ ����
                            if(topY < ($tCordY + ($bCordY -$tCordY)/2)){
                                $distanseY = Math.min($tCordY - topY,$bCordY-dovnY);
                                $topPositions = true;
                                //console.log($distanseY);
                            }
                            // ���� ����������� ������ ����
                            else{
                                $distanseY = Math.min(topY - $bCordY,dovnY - $tCordY);
                                $topPositions = false;
                                //console.log($distanseY);
                            }
                            // ���� ����������� ������ ������
                            if(topX > ($lCordX + ($rCordX -$lCordX)/2)){
                                $rightPositions = true;
                                $distanseX = Math.min(topX-$rCordX,dovnX-$lCordX);
                                //console.log($distanseX);
                            }
                            // ���� �����
                            else{
                                $distanseX = Math.min(topX-$lCordX,dovnX-$rCordX);
    
                                //console.log($distanseX);
                            }
                            // ����������� ���������
                            $distanse = Math.sqrt($distanseX*$distanseX+$distanseY*$distanseY);
                            if($distanse < $resultDistanse){
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


                        // "�����"
                        //element = this;
                        //var rect = element.getBoundingClientRect();
                        //console.log(rect.top, rect.right, rect.bottom, rect.left);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        
                        // ����� ����� ���������, ����� �� ������ ��������
                        // ��� ������ ���� ������ ?
                        // ����.��� ������ ��������� id ���������� ������ � ������ ������� � ������� l r b t ��� ������� ������� ��������
                        // ����� ���������� �������
                        // ���� �������� �� �������� ���� ���������.

                        element1 = document.getElementById($idFinedObjNew);  
                        var rect1 = element1.getBoundingClientRect();

                        element2 = element1 = document.getElementById(idObject); 
                        var rect2 = element2.getBoundingClientRect();
                        
                        // $distans1Vert - ���������� �� ������ ������� ���1 �� ������ ������� ���2
                        // $distans2Vert - ���������� �� ������ ������� ���1 �� ������� ������� ���2
                        // $distans3Vert - ���������� �� ������� ������� ���1 �� ������ ������� ���2
                        // $distans4Vert - ���������� �� ������� ������� ���1 �� ������� ������� ���2
                        $distans1Vert = rect1.bottom - rect2.bottom;
                        $distans2Vert = rect1.bottom -    rect2.top;
                        $distans3Vert = rect1.top    - rect2.bottom;
                        $distans4Vert = rect1.top    -    rect2.top;
                        $attachPosVert = 0;
                        // ������� ����������� �������� �� ������ �� ���������
                        $minDistans = Math.min(Math.abs($distans1Vert),Math.abs($distans2Vert),Math.abs($distans3Vert),Math.abs($distans4Vert));
                        // ��������� ������� �����.
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
                        // $distans1 - ���������� �� ������ ������� ���1 �� ������ ������� ���2
                        // $distans2 - ���������� �� ������ ������� ���1 �� ������� ������� ���2
                        // $distans3 - ���������� �� ������� ������� ���1 �� ������ ������� ���2
                        // $distans4 - ���������� �� ������� ������� ���1 �� ������� ������� ���2
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