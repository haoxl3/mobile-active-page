var H5ComponentPolyline = function(name, cfg){
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

    // 水平网格线 100份－> 10份
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#AAA';
    window.ctx = ctx;
    for(var i = 0;i<step+1; i++) {
        var y = (h/step) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }

    //垂直网格线（根据项目的个数去分）
    step = cfg.data.length + 1;
    for(var i = 0;i<step+1;i++){
        var x = (w/step) * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }
    ctx.stroke();

    // 绘制折线数据
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    // 绘制折线数据
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ff8878';

    var x = 0;
    var y = 0;
    var row_w = (w / (cfg.data.length + 1));
    // 画点
    for( i in cfg.data) {
        var item = cfg.data[i];
        x = row_w * i + row_w;
        y = h * (1 - item[1]);
        ctx.moveTo(x, y);
        // 参数三：半径，参数四：起始弧度，参数五：结束弧底
        ctx.arc(x, y, 5, 0, 2*Math.PI);
    }
    ctx.stroke();

    return component;
}