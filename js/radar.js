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
    }
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();

    /*
     * */
    var draw = function(per) {

    }
    //draw(1);
    //�״�ͼ��������
    component.on('onLoad', function(){
        var s = 0;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                //draw(s);
            },i*10 + 500);//ʱ�����,500Ϊ�������볡ʱ��
        }
    });
    //�״�ͼ�˳�����
    component.on('onLeave', function(){
        var s = 1;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s -=.01;
                //draw(s);
            },i*10);//ʱ�����
        }
    });

    return component;
}