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

var count = 1;

window.addEventListener("load", function(){
    var canvasId = document.getElementById("canvas_demo");
    // 获取2D环境
    var context = canvasId.getContext("2d");
    console.log(context);
    var item = new Item(10, 20);
    // 执行绘画
    if(checkCanvas()){
        gameLoop();
    }

    // 绘画
    function drawScreen(context, item){
        // 清除显示
        context.clearRect(0,0,800,800);
        context.globalAlpha = 1;
        context.fillStyle = "#ffffaa";
        context.fillRect(0,0,800,800);

        // 更新运动状态
        if(item.x > canvasId.width || item.x <0){
            item.angle = 180 - item.angle;
        }else if(item.y > canvasId.height || item.y <0){
            item.angle = 360 - item.angle;
        }
        item.x += Math.cos(item.angle* Math.PI/ 180)*item.speed;
        item.y += Math.sin(item.angle* Math.PI/ 180)*item.speed;

        // 绘制点
        context.beginPath();
        context.arc(item.x, item.y, 4, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false); // 绘制圆形
        context.stroke();
        context.fillStyle = "blue";
        context.closePath();
        context.fill();


    }

    // 检测浏览器是否支持 canvas
    function checkCanvas() {
        var state = !!document.createElement("canvas").getContext;
        return state;
    }


    // 定义动画循环
    function gameLoop(){
        count ++;
        if(count == 800){
           // return;
        }
        requestAnimationFrame(gameLoop);
        drawScreen(context, item);

    }

    // 游戏元素类
    function Item(x, y){
        this.x = x || 0;
        this.y = y || 0;
        this.angle = 25;
        this.speed = 2;
    }

}, false);