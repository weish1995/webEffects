/**
 * Created by weishuangjian on 2016/4/26.
 */

/**
 * 创建一个图片放大对象
 * @param imgWrap 目标图片包裹层
 * @param wrap 放大图片的包裹层
 * @constructor
 */
function Enlarge(imgWrap, wrap){
    this.imgWrap = imgWrap;
    this.wrap = wrap;
}

/**
 * 图片放大的具体实现
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

        //判断鼠标是否在图片内
        if (e.pageX >= imgEnlLLeft && e.pageX <= imgEnlRLeft && e.pageY >= imgEnlTTop && e.pageY <= imgEnlBTop){
            //console.log(e.pageX, e.pageY, imgEnlLLeft,imgEnlRLeft, imgEnlTTop, imgEnlBTop);
            seleZone.className = 'seleZone show';
            seleZone.style.left = e.pageX -  seleZWidth + 'px';
            seleZone.style.top = e.pageY - seleZHeight + 'px';

            //判断选中框边界是否到底图片边界
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

            //计算出横向和纵向的放大倍数
            var timesW = imgEnlWidth / (seleZWidth * 2),
                timesH = imgEnlHeight / (seleZHeight * 2);

            console.log(timesH, timesW);
            //图片放大
            large.className = 'large show';
            large.style.cssText = 'left:' + (imgEnlRLeft + 5) + 'px;' +
                'top:' + imgEnlTTop + 'px;' +
                'width:' + imgEnlWidth + 'px;' +
                'height:' + imgEnlHeight + 'px;';

            largeImg.src = imgEnl.src;

            //设置放大图片的样式
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