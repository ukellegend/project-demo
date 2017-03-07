/**
 * Created by uk on 2017/2/10.
 * @name 测试canvas 接口使用
 *
 */

// 定时器
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    // 兼容setTimeout
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());


window.addEventListener("load", function(){
    var canvasId = document.getElementById("canvas_demo");
    // 获取2D环境
    var context = canvasId.getContext("2d");
    console.log(context);
    // 执行绘画
    if(checkCanvas()){
        drawScreen(context);
    }


    // 绘画
    function drawScreen(context){
        // 设置透明度
        context.globalAlpha = 0.5;

        // 矩形填充
        context.fillStyle = "#ffffaa";
        context.fillRect(0,0,800,600);


        // 边框
        context.strokeStyle ="#999";
        context.lineWidth = 2;
        context.strokeRect(5,5,790, 590);

        // 绘制线条
        context.strokeStyle = "blue";
        context.lineWidth = 4;
        context.lineCap = "butt"; // 设置线端点的样式 butt/round/square
        context.lineJoin = "miter"; // 设置两条线链接处，拐角处的样式，miter/bevel/round
        context.beginPath(); // 开始一个路劲
        context.moveTo(350, 150); // 移动起始点（跳点）
        var minutePoint = {
            x: (350 + 95*Math.cos(270* Math.PI/180)),
            y: (150 + 95*Math.sin(270* Math.PI/180))
        };
        context.lineTo(minutePoint.x, minutePoint.y);
        context.moveTo(350, 150); // 移动起始点
        var hourPoint = {
            x: (350 + 80*Math.cos(30* Math.PI/180)),
            y: (150 + 80*Math.sin(30* Math.PI/180))
        };
        context.lineTo(hourPoint.x, hourPoint.y);
        context.stroke(); // 绘制线条
        context.closePath(); // 关闭当前路径

        // 绘制路劲的高级方法
        context.beginPath();
        context.arc(350, 150, 100, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false); // 绘制圆形
        context.stroke();
        context.fillStyle = "blue";
        context.fill();
        context.closePath();

        // 文本显示
        context.fillStyle = "#000";
        context.textBaseline = "middle";
        context.textAlign = "center";
        createNumber();

        // 贝塞尔曲线测试
       /* context.beginPath();
        context.strokeStyle = "black";
        context.moveTo(400, 300);
        context.bezierCurveTo( 450, 200, 550, 400, 600, 300);
        //context.moveTo(400, 400);
        context.bezierCurveTo( 450, 300, 550, 500, 600, 400);
        context.fill();
        context.stroke();
        context.closePath();*/

       context.globalAlpha = 1;
        var img = new Image();
        img.onload = function(){
            context.drawImage(img, 0 ,0);
            context.beginPath();
            context.fillStyle = context.createPattern(img, "repeat"); // 创建图案填充，参数：图像实例、填充重复方式
            context.arc(500, 420, 100, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false); // 绘制圆形
            context.fill();
            context.closePath();

        };
        img.src = "../../resource/image/admin/img-demo.jpg";
    }

    // 检测浏览器是否支持 canvas
    function checkCanvas() {
        var state = !!document.createElement("canvas").getContext;
        return state;
    }

    // 循环生成文字
    function createNumber (){
        var textList = ["1", "2", "3", "4","5", "6", "7", "8", "9", "10", "11", "正点"];
        var angle = 270;
        for(var i= 0, max=textList.length; i<max; i++){
            context.fillText(textList[i], (350 + 115*Math.cos((angle + 30 + i*30)* Math.PI/180)), (150 + 115*Math.sin((angle + 30 + i*30)* Math.PI/180)));
        }
    }

}, false);