$(function(){
    /*--------------拖曳效果----------------
    *原理：标记拖曳状态dragging ,坐标位置iX, iY
    *         mousedown:fn(){dragging = true, 记录起始坐标位置，设置鼠标捕获}
    *         mouseover:fn(){判断如果dragging = true, 则当前坐标位置 - 记录起始坐标位置，绝对定位的元素获得差值}
    *         mouseup:fn(){dragging = false, 释放鼠标捕获，防止冒泡}
    */
    var dragging = false;
    var iX, iY;
    $(".draggable .drag").mousedown(function(e) {
        dragging = true;
        iX = e.clientX - this.offsetLeft;
        iY = e.clientY - this.offsetTop;
        this.setCapture && this.setCapture();
        return false;
    });
    $(document).mousemove(function(e) {
        if (dragging) {
        var e = e || window.event;
        var oX = e.clientX - iX;
        var oY = e.clientY - iY;
        $(".draggable").css({"left":oX + "px", "top":oY + "px"});
        return false;
        }
    });
    $(document).mouseup(function(e) {
    dragging = false;
    $(".draggable .drag")[0].releaseCapture();
                e.cancelBubble = true;
    })
 
})
