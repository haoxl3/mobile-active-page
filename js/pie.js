/**
 * Created by user on 2017/12/28.
 */
/**
 * Created by user on 2017/12/28.
 */
var H5ComponentPie = function(name, cfg){
    var component = new H5ComponentBase(name, cfg)

    // ����������-����
    var w = cfg.width;
    var h = cfg.height;

    // ����һ�������������߱�����
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    $(cns).css('zIndex',1);
    var r = w/2;

    //����һ����ͼ��
    ctx.beginPath();
    ctx.fillStyle="#eee";
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    ctx.arc(r, r, r, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();

    //����һ�����ݲ�
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex',2);
    component.append(cns);

    var colors = ['red','green','blue','#a00','orange'];
    var sAngel = 1.5 * Math.PI;//���ÿ�ʼ�Ƕ���12��λ��
    var eAngel = 0;//�����Ƕ�
    var aAngel = Math.PI*2;//100%��Բ�Ľ����Ƕ�

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
        // Ȼ������ʼ�Ƕȱ�Ϊ�����Ƕ�
        sAngel = eAngel;
        //�������е���Ŀ�ı����ٷֱ�
        var text = $('<div class="text"></div>');
        text.text(cfg.data[i][0]);
        var per = $('<div class="per"></div>');
        per.text(cfg.data[i][1]*100 + '%');
        text.append(per);

        var x = r + Math.sin(1.5*Math.PI - sAngel) * r;
        var y = r + Math.cos(1.5*Math.PI - sAngel) * r;
        //text.css('left',x/2);
        //text.css('top',y/2);
        //Բ�Ҳ�
        if(x > w/2){
            text.css('left',x/2);
        }else{
            text.css('right',(w-x)/2);
        }
        if(y > h/2){
            text.css('top',y/2);
        }else{
            text.css('bottom',(h-y)/2);
        }
        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2]);
        }
        //��ʼʱ���ֲ��ɼ�,�ȶ�����ɺ�����ʾ����
        text.css('opacity',0);
        component.append(text);
    }

    // ����һ���ɰ��
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
        // trueΪ����Բ
        if(per <=0){
            ctx.arc(r, r, r, 0, 2*Math.PI);
            component.find('.text').css('opacity', 0);
        }else{
            ctx.arc(r, r, r, sAngel, sAngel+2*Math.PI*per, true);
        }

        ctx.fill();
        ctx.stroke();

        //������ʾ
        if(per >= 1){
            component.find('.text').css('opacity', 1);
        }
    }

    //�״�ͼ��������
    component.on('onLoad', function(){
        var s = 0;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10 + 500);//ʱ�����,500Ϊ�������볡ʱ��
        }
    });
    //�״�ͼ�˳�����
    component.on('onLeave', function(){
        var s = 1;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s -=.01;
                draw(s);
            },i*10);//ʱ�����
        }
    });

    return component;
}