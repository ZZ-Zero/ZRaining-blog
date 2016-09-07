title: 'Javascript Madness: Introduction'
tags:
  - javascript
  - 浏览器兼容
id: 236
categories:
  - 技术类
  - html+css+js
date: 2014-04-24 09:08:05
---

<center style="color: #000000;"><center style="color: #000000;">**<span style="font-size: xx-small;">[Jan Wolter](http://unixpapa.com/)</span>**
**<span style="font-size: xx-small;">May 6, 2008</span>**</center></center>
<!-- more -->
### Introduction

In the course of the development of the [Web Paint-by-Number](http://webpbn.com/) site and various other heavy-duty Javascript applications, I've found it necessary to do a lot of experimentation with different browsers to figure out how they handle different things. The results have generally been nightmarish, with truly impressive ranges of bizarre and strange behavior.

These pages summarize my results in a few areas, mainly having to do with event handling. I wrote them up largely for my own future reference. I have found very little of this information available elsewhere on the web.

Ideally, we would be able to write single Javascript programs that would work on all browsers. In practice, this is only possible if you are willing give up a lot of functionality. Many of the features used in the Web Paint-by-Number site would have been impossible in implement without first sensing the browser type and then selecting different code to run for different browsers, or different versions of the same browser. Sad, but true.

Worse, due to bad design and shear bugginess, there are perfectly simple things that cannot be reliably done on some browsers, like identifying with certainty which key was pressed to trigger a **keydown** event or recognizing when the second click of a double-click occurs.

If you are a programmer trying to sort these things out, you might consider adopting one of the freely available Javascript toolkits on the web. Some of them can help insulate you from this kind of low-level headaches described in this page. Surveying such toolkits is beyond the scope of these pages, however. I recommend that you google "Javascript toolkit" and see what you find.

All the programs and code fragments that I have written for these pages can be treated as being in the public domain, free of copyright, OK to use in any way without any legal restrictions. You are encouraged to apply the information and techniques described here anywhere you find them useful without restriction. The text of the articles themselves are all copyrighted by Jan Wolter, however.

You can also take it as given that I offer all the code and information on these pages without warranty or guarantee of it's correctness or suitability for use. So don't sue me.

### Contents

<dl style="color: #000000;"><dt>[Mouse Events](http://unixpapa.com/js/mouse.html)</dt><dd>Madness in the handling of mouse events. Which events are fired when you click or double-click with the left, right or middle mouse button on various browsers. </dd></dl>

[Key Events](http://unixpapa.com/js/key.html)Madness in the handling of keyboard events. Which events are fired when you hit or release a key or allow it to auto-repeat in various browsers. The demented strangeness of key codes which may or may not identify which key was hit.

[Dynamic Script Loading](http://unixpapa.com/js/dyna.html)A study of a method of loading additional Javascript functions on demand after the rest of the page has already been loaded. As usual, many browser incompatibilities are discovered.

[The Javascript Sleep Deficiency](http://unixpapa.com/js/sleep.html)Does Javascript have some equivalent to the <tt>sleep()</tt> function that other languages use to pause execution for a bit? Yes, it can be done, but only horribly. [Treacherous Type Conversions](http://unixpapa.com/js/convert.html)A (hopefully informative) rant about string/number type conversions in Javascript. [Layout Engines and Gecko Versions](http://unixpapa.com/js/gecko.html)Why I talk about "Gecko" instead of "Firefox" in the above notes. Which versions of Gecko are used by various browsers and a few notes on other layout engines. [KISS Javascript Compression](http://unixpapa.com/js/compress.html)Some thoughts on compressing Javascript code. [Parsing Query Strings](http://unixpapa.com/js/querystring.html)How to read arguments from the URL in Javascript, with a long digression into the many problems with Javascript's built-in URI encoding and decoding functions.

### Ill-Informed Grousing About Browsers

For years I have used this section to vent my annoyance at all these crummy browsers. While other people touted their favorite browsers, I'd grown to dislike them all for various reasons and in various degrees.

But things have changed. Browsers have actually gotten pretty good at supporting the basic needs of Javascript programmers. It's kind of astonishing.

<dl style="color: #000000;"><dt>**Internet Explorer**</dt><dd>For a very long time, Internet Explorer has been the leading source of headaches for web developers. IE started out buggy and incompatible, and then development pretty much stopped between 2000 and 2006\. While other browsers got better, the one most people used just kept stinking. Virtually all web developers got to hate it, because everything had to be carefully programmed to work around all it's bugs. But then a miracle happened. As far as I can tell, Internet Explorer 9 is a fully capable modern browser, that supports the core standards as competently as any of it's competitors. It's actually OK. It really is. IE OK? IE OK. IE OK! My brain can't quite grasp it, but it seems to be true. </dd></dl>**Firefox**

Long ago the Netscape browser introduced many of the key innovations that made browsers cool, but Netscape went bust and the Mozilla foundation picked up the pieces to rebuild that musty old code into the leading open source browser. The Mozilla developers generally proceed at a rather plodding pace. They are hardly ever the first, but they keep up. Minor bugs often seem to take years to get fixed, but new releases rarely introduce new bugs. The Mozilla developers never seem to participate in the races to be the first and the fastest that periodically break out between the Safari and Opera teams. When Mozilla releases a new browser, I don't expect to see as many exciting changes as in a new Opera or Safari, but I don't expect to see major new bugs introduced either. Once Firefox was just one of many browsers using Mozilla's Gecko rendering engine, but while others still exist, the have increasingly fallen by the wayside. New browsers these days are more likely to be based on Webkit than Gecko.

**Safari**

This used to be the browser that causes me the least headaches. If you wrote code to work on IE and Firefox, then it pretty much always worked on Safari. Up through version 3.0 there were lots of signs of very careful thought going into their design choices, clear attempts to balance compatibility with sanity. In terms of compatibility and correctness, Safari seemed to have overtaken everything else. Then it seemed like their competitive exuberance began getting the best of them. For example, they greatly hyped their new faster regular expressions, but they [weren't](http://blog.mozilla.com/dmandelin/2008/10/06/squirrelfishing-in-regexp-dnajs/) always as fast as the hype suggested and they were sufficiently buggy that I had to entirely rewrite my most complex regex application not to use regular expressions anymore. This hasty, benchmark-driven development style, this race to be first and fastest, risks undermining an otherwise terrific browser.

 **Chrome**

Chrome uses the same open source rendering engine as Safari, so for my purposes it is mostly the same. It's most notable for a very fast release cycle.

 **Opera**

This is the browser that has caused me the most headaches over the years. When Mozilla's developers seem mired in bureaucracy, and Microsoft's developers are only just finding their desks again after a seven year vacation, Opera's developers was always speedy and nimble. Every release was different from the last. Old bugs turn into different bugs, new bugs are introduced, and sometimes a bug is even fixed. Every bug I ever reported to them was changed in a subsequent release, though generally they were not actually fixed for a long time. I sometimes wished they would slow down and figure out how things are supposed to work instead of patching patches. Tracking what did and did not work in Opera was a constant headache. But, as with IE, recent versions have pretty much settled down to a fairly good approximation of correctness.

**Konqueror**

This browser is a lot better than one would reasonably expect from something with so little visibility. Safari and Chrome were derived from it, but the relationship doesn't always show. In mouse and key event handling, they are very different. It doesn't always seem like the fixes Apple makes get back to the Konqueror people.

 **Netscape 4**

Obviously nobody uses this anymore. It is sometimes included in these reports because it was the source of many defacto standards that newer browser more or less emulate, so it gives a little historical context to all this that can help make more sense of it all.

**Mosaic**

Ah, the simple pioneer days. I remember them well. No Javascript. No style sheets. No frames. No tables. I should go back to Mosaic, and stop worrying. This page renders great in Mosaic.

（暂存 日后翻译