/**
 * Created by weishuangjian on 2016/4/23.
 */
/**
 * 创建的一个关于Careousel的方法
 * @param wrap
 * @constructor
 */
function Careousel(wrap){
    this.wrap = wrap;
}

/**
 * 添加标签并为标签添加事件
 */
Careousel.prototype.insertSpans = function (){
    var lis = this.wrap.querySelectorAll('ul>li'),
        spans = this.wrap.querySelector('.spans');
    for (var i = 0 ; i < lis.length; i++){
        var span = document.createElement('span');
        spans.appendChild(span);
    }

    var spanAlls = spans.querySelectorAll('span');

    //初始化显示第一张图片
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
 * 切换图片
 * @param pos 要显示的图片的位置（第几个）
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