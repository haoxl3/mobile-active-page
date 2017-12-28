/**
 * Created by user on 2017/12/28.
 */
/**
 * Created by user on 2017/12/28.
 */
var H5ComponentPie = function(name, cfg){
    var component = new H5ComponentBase(name, cfg)

    // 绘制网格线-背景
    var w = cfg.width;
    var h = cfg.height;

    // 加入一个画布（网格线背景）
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    $(cns).css('zIndex',1);
    var r = w/2;

    //加入一个底图层
    ctx.beginPath();
    ctx.fillStyle="#eee";
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    ctx.arc(r, r, r, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();

    //绘制一个数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex',2);
    component.append(cns);

    var colors = ['red','green','blue','drakred','orange'];
    var sAngel = 1.5 * Math.PI;//设置开始角度在12点位置
    var eAngel = 0;//结束角度
    var aAngel = Math.PI*2;//100%的圆的结束角度

    var step = cfg.data.length;
    for(var i=0;i<step;i++){
        var item = cfg.data[i];
        var color = item[2] || (item[2] = colors.pop());
        eAngel = sAngel + aAngel * item[1];

        ctx.beginPath();
        ctx.fillStyle=color;
        ctx.strokeStyle = color;
        ctx.lineWidth = .1;
        ctx.moveTo(r,r);
        ctx.arc(r, r, r, sAngel, eAngel);
        ctx.fill();
        ctx.stroke();
        // 然后让起始角度变为结束角度
        sAngel = eAngel;
    }

    // 加入一个蒙板层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    $(cns).css('zIndex',3);

    ctx.fillStyle="#eee";
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;

    /*
     * */
    var draw = function(per) {
        ctx.clearRect(0,0,w,h);
        ctx.beginPath();
        ctx.moveTo(r,r);
        // true为逆向画圆
        if(per <=0){
            ctx.arc(r, r, r, 0, 2*Math.PI);
        }else{
            ctx.arc(r, r, r, sAngel, sAngel+2*Math.PI*per, true);
        }

        ctx.fill();
        ctx.stroke();
    }

    //雷达图生长动画
    component.on('onLoad', function(){
        var s = 0;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10 + 500);//时间递增,500为网格线入场时间
        }
    });
    //雷达图退场动画
    component.on('onLeave', function(){
        var s = 1;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s -=.01;
                draw(s);
            },i*10);//时间递增
        }
    });

    return component;
}