/**
 * Created by weishuangjian on 2016/4/23.
 */
/**
 * ������һ������Careousel�ķ���
 * @param wrap
 * @constructor
 */
function Careousel(wrap){
    this.wrap = wrap;
}

/**
 * ��ӱ�ǩ��Ϊ��ǩ����¼�
 */
Careousel.prototype.insertSpans = function (){
    var lis = this.wrap.querySelectorAll('ul>li'),
        spans = this.wrap.querySelector('.spans');
    for (var i = 0 ; i < lis.length; i++){
        var span = document.createElement('span');
        spans.appendChild(span);
    }

    var spanAlls = spans.querySelectorAll('span');

    //��ʼ����ʾ��һ��ͼƬ
    this.showImg(0, lis, spanAlls);

    for (var k = 0; k < lis.length; k++){
        (function (k){
            spanAlls[k].onclick = function (){
                Careousel.prototype.showImg(k, lis, spanAlls);
            };
        })(k);
    }
};

/**
 * �л�ͼƬ
 * @param pos Ҫ��ʾ��ͼƬ��λ�ã��ڼ�����
 */
Careousel.prototype.showImg = function (pos, lis, spanAlls){
    for (var j = 0; j < lis.length; j++){
        lis[j].className = 'hide';
        spanAlls[j].className = '';
    }
    lis[pos].className = 'show';
    spanAlls[pos].className = 'active';
};
var cares = document.querySelectorAll('.carousel');
for (var l = 0; l < cares.length; l++){
    var aaa = new Careousel(cares[l]);
    aaa.insertSpans();
}