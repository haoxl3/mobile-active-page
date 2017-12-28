/**
 * Created by user on 2017/12/28.
 */
var H5ComponentRadar = function(name, cfg){
    var component = new H5ComponentBase(name, cfg)

    // ����������-����
    var w = cfg.width;
    var h = cfg.height;
    var step = cfg.data.length;

    // ����һ�������������߱�����
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var r = w/2;

    /*
    * �������εĶ�������
    * ��֪��Բ�����꣨a,b�����뾶r���Ƕ�deg������step
    * ����rad = (2*Math.PI / 360)*(360 / step) * i
    * x = a + Math.sin(rad)*r;
    * y = b + Math.cos(rad)*r;
    * */
    //�������񱳾���������ƣ���Ϊ10�ݣ�
    var isBlue = false;//����ɫ��������ɫ�л�
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
    //����ɡ��
    for(var i=0;i<step;i++){
        var rad = (2*Math.PI / 360)*(360 / step) * i
        var x = r + Math.sin(rad)*r;
        var y = r + Math.cos(rad)*r;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);
        // �����Ŀ����
        var text = $('<div class="text"></div>');
        text.text(cfg.data[i][0]);
        //���ְ����ӳ�
        text.css('transition','all .5s ' + i *.1 + 's');

        //����λ��
        if(x > w/2){
            text.css('left',x/2+5);
        }else{
            text.css('right',(w-x)/2+5);
        }
        if(y>h/2){
            text.css('top',y/2+5);
        }else{
            text.css('bottom',(h-y)/2+5);
        }
        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2]);
        }
        text.css('opacity',0);//����������
        component.append(text);
    }
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();



    //���ݲ㿪��������һ������
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    /*
     * */
    cns.strokeStyle = "#f00000";
    var draw = function(per) {
        //��ͼ�����������ʾ����
        if(per >= 1){
            component.find('.text').css('opacity',1);
        }
        if(per <1) {
            component.find('.text').css('opacity',0);
        }
        ctx.clearRect(0,0,w,h);
        //������ݵ�����
        for(var i=0;i<step;i++){
            var rad = (2*Math.PI / 360)*(360 / step) * i
            var rate = cfg.data[i][1]*per;
            var x = r + Math.sin(rad)*r*rate;
            var y = r + Math.cos(rad)*r*rate;
            ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.stroke();

        //������ݵĵ�
        ctx.fillStyle = '#ff7676';
        for(var i=0;i<step;i++){
            var rad = (2*Math.PI / 360)*(360 / step) * i
            var rate = cfg.data[i][1]*per;
            var x = r + Math.sin(rad)*r*rate;
            var y = r + Math.cos(rad)*r*rate;
            ctx.beginPath();
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
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