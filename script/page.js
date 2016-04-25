/**
 * Created by weishuangjian on 2016/4/25.
 */

/**
 * ����һ����ҳ�Ķ���
 * @param wrap ������
 * @param pageNum һҳ��ʾ��ҳ��
 * @constructor
 */
function Page(wrap, pageNum){
    this.wrap = wrap;
    this.pageNum = pageNum;
}

/**
 * ���з�ҳ
 */
Page.prototype.paging = function (){
    var pos = 1,
        pages = 100,//��ҳ��
        lis,
        prev = this.wrap.querySelector('.prev'),
        next = this.wrap.querySelector('.next'),
        //pageCounts = this.wrap.querySelector('.pageInfo').querySelector('.pageCounts'),
        txtPage = this.wrap.querySelector('.pageInfo').querySelector('.txtPage'),
        btnOk = this.wrap.querySelector('.pageInfo').querySelector('.btnOk');

    //��ʼ������
    this.wrap.querySelector('.pageInfo').querySelector('.pageCounts').innerHTML = pages;
    txtPage.max = pages;

    //Ĭ����ʾ8��ҳ��
    var pageNum = this.pageNum;
    if (pages < pageNum){
        pageNum = pages;
    }

    //����ҳ��
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

    //��ȡ��ҳ���б�
    lis = this.wrap.querySelectorAll('ul .num');

    //����ť���¼�
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
     * ����¼�
     * @param type �����ť
     * @param posRedic ������Ϊnumʱ�����������
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
     * ��������Ƿ������һҳ���ߵ�һҳ
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
     * ҳ������ת
     * @param posRedi ����ת��ҳ��
     */
    function pageRedirect(posRedi){

        //��ҳ���ֵ����
        var start = posRedi - (posRedi % pageNum == 0 ? pageNum : posRedi % pageNum) + 1,
            end = start + pageNum - 1;

        if (end >= pages){
            end = pages;
            start = end - pageNum + 1;
        }

        for (var i = start, j = 0; i <= end; i++, j++){
            lis[j].querySelector('a').title = i;
            lis[j].querySelector('a').innerHTML = i;

            //�������ҳ����ʽ
            lis[j].className = 'default num';

            //����ѡ����ʽ
            if (i == posRedi){
                lis[j].className = 'default num active';
            }
        }

        //���õ�ǰҳ
        pos = posRedi;
        txtPage.value = pos * 1 + 1 < pages ? pos * 1  + 1 : pages ;
    }
};

//��ҳ��ķ�ҳ���а�
var pageWrap = document.querySelectorAll('.page');
for (var i = 0; i < pageWrap.length; i++){
    var pages = new Page(pageWrap[i], i+8);
    pages.paging();
}