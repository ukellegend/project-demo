/**
 * Created by uk on 2017/2/10.
 * @name 测试canvas 接口使用
 *
 */

window.addEventListener("load", function(){
    var canvasId = document.getElementById("canvas_demo");
    // 获取2D环境
    var content = canvasId.getContext("2d");
    console.log(content);
    // 执行绘画
    drawScreen();

    // 绘画
    function drawScreen(){
        // 矩形填充
        content.fillStyle = "#ffffaa";
        content.fillRect(0,0,500,300);

        // 加载图片(加载图片时须先定义加载事件，然后才进行赋值src)
        var demoImage = new Image();
        demoImage.onload = function(){
            content.drawImage(demoImage, 10, 10);
        };
        demoImage.src ="/demoProject/resource/image/admin/img-demo.jpg";

        // 文字
        content.fillStyle = "#666666";
        content.textBaseline = "top";
        content.fillText("hello word", 100, 100);

        // 边框
        content.strokeStyle ="blue";
        content.strokeRect(5,5,490, 290);

    }

    // 检测浏览器是否支持canvas
    function checkCanvas(){
        var state = true;
        if(!canvasId || !canvasId.getContext){
            state = false;
        }
        // 另一种方法(创建虚拟的标签进行检查)
        state = !!document.createElement("canvas").getContext;
        return state;
    }

}, false);