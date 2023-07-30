$(document).ready(function(){
    // $calculateMouseOffset = function($e){
    //     $mouseD_x = $e.pageX;
    //     $mouseD_y = $e.pageY;
    //     // считываем координаты блока на который нажали
    //     $elemCordX = $e.currentTarget.getBoundingClientRect().left;
    //     $elemCordY = $e.currentTarget.getBoundingClientRect().top;
    //     $elemCordXR = $e.currentTarget.getBoundingClientRect().right;
    //     // вычиляем смещение от позиции мыши для генерации нового объекта
    //     $deltaX = $mouseD_x-$elemCordX;
    //     $deltaY = $mouseD_y-$elemCordY;
    //     return [$deltaX,$deltaY];
    // };
    // $(".canvas-UI").mousedown(function(e){
    //     //alert(1);
    //     $offsetClick = $calculateMouseOffset(e);
    //     $deltaX = $offsetClick[0];
    //     $deltaY = $offsetClick[1];
    //     $baseScale = 100;
    //     $(document).mousemove(function (e) {
    //         // пока клавиша зажата и мышь движется меняем динамично смещение модуля
    //         //alert(1);
    //         $(".appended-modul").offset({top: (e.pageY-$deltaY)*100/$baseScale, left: (e.pageX-$deltaX)*100/$baseScale});
    //     }).click(function(){
    //         $(this).unbind("click");
    //         $(this).unbind("mousemove");
    //     });
    // });
});