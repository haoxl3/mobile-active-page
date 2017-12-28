/**
 * Created by user on 2017/12/28.
 */
var H5ComponentRadar = function(name, cfg){
    var component = new H5ComponentBase(name, cfg)

    // 绘制网格线-背景
    var w = cfg.width;
    var h = cfg.height;
    var step = cfg.data.length;

    // 加入一个画布（网格线背景）
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var r = w/2;

    /*
    * 计算多边形的顶点坐标
    * 已知：圆心坐标（a,b）、半径r、角度deg、个数step
    * 弧度rad = (2*Math.PI / 360)*(360 / step) * i
    * x = a + Math.sin(rad)*r;
    * y = b + Math.cos(rad)*r;
    * */
    //绘制网格背景（分面绘制，分为10份）
    var isBlue = false;//面颜色，两种颜色切换
    for(var s = 10;s>0; s--){
        ctx.beginPath();
        for(var i=0;i<step;i++){
            var rad = (2*Math.PI / 360)*(360 / step) * i
            var x = r + Math.sin(rad)*r*(s/10);
            var y = r + Math.cos(rad)*r*(s/10);
            ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff':'#f1f9ff';
        ctx.fill();
    }
    //绘制伞骨
    for(var i=0;i<step;i++){
        var rad = (2*Math.PI / 360)*(360 / step) * i
        var x = r + Math.sin(rad)*r;
        var y = r + Math.cos(rad)*r;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);
    }
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();

    /*
     * */
    var draw = function(per) {

    }
    //draw(1);
    //雷达图生长动画
    component.on('onLoad', function(){
        var s = 0;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                //draw(s);
            },i*10 + 500);//时间递增,500为网格线入场时间
        }
    });
    //雷达图退场动画
    component.on('onLeave', function(){
        var s = 1;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s -=.01;
                //draw(s);
            },i*10);//时间递增
        }
    });

    return component;
}