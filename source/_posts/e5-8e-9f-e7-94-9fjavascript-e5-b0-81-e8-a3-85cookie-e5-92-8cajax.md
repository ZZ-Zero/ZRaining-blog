title: 原生Javascript封装cookie和ajax
tags:
  - 前端
  - ajax
  - cookie
  - javascript
id: 377
categories:
  - 技术类
date: 2015-03-10 16:22:22
---

Orz 最近各种框架大行其道，jQuery一手遮天的时代差不多过去了。不用jq了，某些框架对一些原生的蛋疼玩意又没啥封装，于是自己动手丰衣足食~
<!-- more -->
## Cookie

w3c上就有对cookie的简单封装，不过某些细节没照顾到，于是对w3c设置cookie的函数做了一些简单的补充扩展

[javascript]
function getCookie(c_name) {
    if (document.cookie.length&amp;gt;0) {
        c_start=document.cookie.indexOf(c_name + &quot;=&quot;)
        if (c_start!=-1) {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(&quot;;&quot;,c_start)
            if (c_end==-1) c_end=document.cookie.length
            return decodeURIComponent(document.cookie.substring(c_start,c_end))
        }
    }
    return &quot;&quot;
}

function setCookie(c_name,value,expiredays,path) {
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ &quot;=&quot; +encodeURIComponent(value)+
    ((expiredays==null) ? &quot;&quot; : &quot;;expires=&quot;+exdate.toGMTString())+
    ((path==null) ? &quot;&quot; : &quot;;path=&quot;+path)+
    &quot;domain=&quot;+window.location.host;
}
[/javascript]

调用方法：

**getCookie(name)** ：参数name为你需要返回的cookie的名字；

**setCookie(name,value,expiredays,path)** ：参数name为你需要设置的cookie的名字；value为你需要写入cookie的值；expiredays为cookie需要保存的时间天数，默认关闭浏览器即删除；path为你的cookie所存储的地址，默认为当前地址；其中name和value为必填。

## Ajax

[javascript]
function ajax(conf){
    var xhr,
        type = conf.type,
        url = conf.url,
        header = conf.header,
        data = conf.data,
        dataTypt = conf.dataType,
        success = conf.success,
        error = conf.error;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xhr=new XMLHttpRequest();
    } else {// code for IE6, IE5
        xhr=new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);
    }
    if (type == null){
        type = &quot;GET&quot;;
    } else {
        type = type.toLocaleUpperCase();
    }
    if (dataTypt == null){
        dataTypt = &quot;text&quot;;
    } else {
        dataTypt = dataTypt.toLocaleLowerCase();
    }
    xhr.open(type,url,true);
    if (header != null) {
        xhr.setRequestHeader(header[0], header[1]);
    }
    if (type == &quot;GET&quot;) {
        xhr.send()
    } else if (type == &quot;POST&quot;) {
        xhr.send(data);
    };
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
            if (dataTypt == &quot;text&quot;) {
                if (success != null) {
                    success(xhr.responseText);
                }
            } else if (dataTypt == &quot;xml&quot;) {
                if (success != null) {
                    success(xhr.responseXML);
                }
            } else if (dataTypt == &quot;json&quot;) {
                if (success != null) {
                    success(JSON.parse(xhr.responseText));
                }
            }
        }
    };
}
[/javascript]

调用方法 ：

**Ajax(conf) ：**和jQuery的$.ajax({})方法一致，conf参数为对象，调用时直接使用ajax({type:"GET",url:……})即可。参数url为必填，type默认为GET，header填写时和jQuery略有区别，使用数组作为区分，即header : [name , value]。支持的参数有type，url，header，data，datatype，success，error。

&nbsp;

&nbsp;