title: js实现移动端暂时禁止页面滚动
tags:
  - js
id: 252
categories:
  - 技术类
  - html+css+js
date: 2014-05-20 18:41:47
---

感谢飞豹哥提供的思路：

body.bind('touchstart', function() {ispop=true or false; }
<div>body.bind('touchmove', function() { if(ispop){event.preventDefalut()}}</div>
<div></div>
<div></div>