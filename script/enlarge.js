/**
 * Created by weishuangjian on 2016/4/26.
 */

/**
 * ����һ��ͼƬ�Ŵ����
 * @param imgWrap Ŀ��ͼƬ������
 * @param wrap �Ŵ�ͼƬ�İ�����
 * @constructor
 */
function Enlarge(imgWrap, wrap){
    this.imgWrap = imgWrap;
    this.wrap = wrap;
}

/**
 * ͼƬ�Ŵ�ľ���ʵ��
 */
Enlarge.prototype.large = function (){

    var seleZone = this.wrap.querySelector('.seleZone'),
        large = this.wrap.querySelector('.large'),
        largeImg = large.querySelector('img'),
        imgEnl = this.imgWrap.querySelector('img');

    seleZone.onmousemove = document.onmousemove = function (event){

        var e = event || window.event,
            imgEnlLLeft = imgEnl.offsetLeft,
            imgEnlTTop = imgEnl.offsetTop,
            imgEnlWidth = imgEnl.offsetWidth,
            imgEnlHeight = imgEnl.offsetHeight,
            imgEnlRLeft = imgEnlWidth + imgEnlLLeft,
            imgEnlBTop = imgEnlHeight + imgEnlTTop,
            seleZWidth = seleZone.offsetWidth / 2,
            seleZHeight = seleZone.offsetHeight / 2;

        //�ж�����Ƿ���ͼƬ��
        if (e.pageX >= imgEnlLLeft && e.pageX <= imgEnlRLeft && e.pageY >= imgEnlTTop && e.pageY <= imgEnlBTop){
            //console.log(e.pageX, e.pageY, imgEnlLLeft,imgEnlRLeft, imgEnlTTop, imgEnlBTop);
            seleZone.className = 'seleZone show';
            seleZone.style.left = e.pageX -  seleZWidth + 'px';
            seleZone.style.top = e.pageY - seleZHeight + 'px';

            //�ж�ѡ�п�߽��Ƿ񵽵�ͼƬ�߽�
            if (e.pageY - seleZHeight <= imgEnlTTop){
                seleZone.style.top = imgEnlTTop + 'px';
            }
            if (e.pageY + seleZHeight >= imgEnlBTop){
                seleZone.style.top = imgEnlBTop - seleZHeight * 2 + 'px';
            }
            if (e.pageX - seleZWidth <= imgEnlLLeft){
                seleZone.style.left = imgEnlLLeft + 'px';
            }
            if (e.pageX + seleZHeight >= imgEnlRLeft){
                seleZone.style.left = imgEnlRLeft - seleZWidth * 2 + 'px';
            }

            //��������������ķŴ���
            var timesW = imgEnlWidth / (seleZWidth * 2),
                timesH = imgEnlHeight / (seleZHeight * 2);

            console.log(timesH, timesW);
            //ͼƬ�Ŵ�
            large.className = 'large show';
            large.style.cssText = 'left:' + (imgEnlRLeft + 5) + 'px;' +
                'top:' + imgEnlTTop + 'px;' +
                'width:' + imgEnlWidth + 'px;' +
                'height:' + imgEnlHeight + 'px;';

            largeImg.src = imgEnl.src;

            //���÷Ŵ�ͼƬ����ʽ
             var lImgStyle= 'width:'+imgEnlWidth * timesW + 'px;'
                 + 'height:'+imgEnlHeight * timesH + 'px;'
                 + 'margin-left:'+(-1 * (seleZone.offsetLeft - imgEnlLLeft) * timesW) + 'px;'
                 + 'margin-top:' + (-1 * (seleZone.offsetTop - imgEnlTTop) * timesH) + 'px;';

            largeImg.style.cssText = lImgStyle;
        } else{
            seleZone.className = 'seleZone hide';
            large.className = 'large hide';
        }
    };
};

var enLarges = new Enlarge(document.querySelector('.imgWrap'), document.querySelector('#enlarge'));
enLarges.large();