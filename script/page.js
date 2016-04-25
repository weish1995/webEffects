/**
 * Created by weishuangjian on 2016/4/25.
 */

/**
 * 创建一个分页的对象
 * @param wrap 包裹层
 * @param pageNum 一页显示的页码
 * @constructor
 */
function Page(wrap, pageNum){
    this.wrap = wrap;
    this.pageNum = pageNum;
}

/**
 * 进行分页
 */
Page.prototype.paging = function (){
    var pos = 1,
        pages = 100,//总页数
        lis,
        prev = this.wrap.querySelector('.prev'),
        next = this.wrap.querySelector('.next'),
        //pageCounts = this.wrap.querySelector('.pageInfo').querySelector('.pageCounts'),
        txtPage = this.wrap.querySelector('.pageInfo').querySelector('.txtPage'),
        btnOk = this.wrap.querySelector('.pageInfo').querySelector('.btnOk');

    //初始化数据
    this.wrap.querySelector('.pageInfo').querySelector('.pageCounts').innerHTML = pages;
    txtPage.max = pages;

    //默认显示8个页码
    var pageNum = this.pageNum;
    if (pages < pageNum){
        pageNum = pages;
    }

    //插入页码
    for (var i = 1; i <= pageNum; i++){
        var li = document.createElement('li');
        li.className = 'default num';
        if (i == 1){
            li.className += ' active';
        }
        var a = document.createElement('a');
        a.href = 'javascript:void(0);';
        a.title = i;
        a.innerHTML = i;
        li.appendChild(a);
        next.parentNode.insertBefore(li, next);
    }

    //获取到页码列表
    lis = this.wrap.querySelectorAll('ul .num');

    //给按钮绑定事件
    prev.onclick = function (){
        clickRedi('prev');
    };

    next.onclick = function (){
        clickRedi('next')
    };

    for (var k = 0; k < lis.length; k++){
        (function (k){
            lis[k].onclick = function (){
                clickRedi('num', lis[k].querySelector('a').title);
            };
        })(k);
    }

    btnOk.onclick = function (){
        clickRedi('num', txtPage.value * 1);
    };

    /**
     * 点击事件
     * @param type 点击按钮
     * @param posRedic 当类型为num时，点击的数字
     */
    function clickRedi (type, posRedic){
        if (type == 'prev'){
            if (pos > 1){
                pos--;
            }
        } else if (type == 'next'){
            if (pos < pages){
                pos++;
            }
        } else if (type == 'num'){
            if (posRedic <= pages && posRedic >= 1){
                pos = posRedic;
            }
        }

        testFirstLast(pos);
        pageRedirect(pos);
    }

    /**
     * 检测现在是否处于最后一页或者第一页
     */
    function testFirstLast(){
        if (pos == 1){
            prev.className = 'default prev disabled';
            next.className = 'default next';
        } else if (pos == pages){
            prev.className = 'default prev';
            next.className = 'default next disabled';
        } else {
            prev.className = 'default prev';
            next.className = 'default next';
        }
    }

    /**
     * 页码点击跳转
     * @param posRedi 将跳转的页面
     */
    function pageRedirect(posRedi){

        //对页码的值重置
        var start = posRedi - (posRedi % pageNum == 0 ? pageNum : posRedi % pageNum) + 1,
            end = start + pageNum - 1;

        if (end >= pages){
            end = pages;
            start = end - pageNum + 1;
        }

        for (var i = start, j = 0; i <= end; i++, j++){
            lis[j].querySelector('a').title = i;
            lis[j].querySelector('a').innerHTML = i;

            //清除所有页码样式
            lis[j].className = 'default num';

            //设置选中样式
            if (i == posRedi){
                lis[j].className = 'default num active';
            }
        }

        //设置当前页
        pos = posRedi;
        txtPage.value = pos * 1 + 1 < pages ? pos * 1  + 1 : pages ;
    }
};

//对页面的分页进行绑定
var pageWrap = document.querySelectorAll('.page');
for (var i = 0; i < pageWrap.length; i++){
    var pages = new Page(pageWrap[i], i+8);
    pages.paging();
}