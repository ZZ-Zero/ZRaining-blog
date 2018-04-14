title: parcel！启动！
date: 2018-02-09 18:15:37
thumbnailImage: mg-m.png
tags: 
  - parcel
categories:
  - 技术类
---

公司最近好动荡Orz……，折腾了这么久，部门方向貌似又出现了调动。

具体就不多说了，总之来了个新任务，这里的所有活动页以后需要接入公司的发布系统。从结果上来说就是没有用自动化工具的同事则必须接入自动化流程和我统一开发环境。然后我之前一直在使用的mgtv-mobile脚手架则不能直接用下去…… 

<!-- more -->

不能直接用的原因:
1. 由于 mgtv-mobile 一直是我一个人在用，故所有操作都是根据我个人习惯来定制的，对业务层面侵入较深，功能很重。同事上手这套方案估计会花很长时间。
2. 由于之前一直是在开发机上本地编译，我花了大量的精力去做本地文件管理和本地检测调试。但是如果是用发布机编译，这些文件管理都会变成冗余功能毫无用处，反而让人觉得迷惑和不好维护，并且可能会产生不可预测的后果。
3. 我这套方案在长时间使用后其本身也开始变得冗余，由于最初思路上是以开发速度为最优先条件。在性能上并不尽人意。现在既然是要做线上编译，那么其思路也变成了开发速度、可维护性、运行性能之间的平衡。思路上的变化也导致这套方案不再适合之后的场景（kpi）

恩，既然要改…… 那就干脆大改！ (ノಠ益ಠ)ノ彡┻━┻

以前由于部门需求零散，需求变动快速等原因。页面基本都是开发人员各自使用自己的技术栈，然后有时候需要相互协助的时候就直接把代码丢给该需求的开发负责人，负责人根据自己需要把队友的代码改造融入自己的代码中。上线则直接在自己的开发机上编译后 ftp 上传上线。

现在部门为了规范化开发流程，将编译和发布流程放到了线上的发布机。由于部门的特殊性质（需求快且杂），无法完全统一开发模块，故商讨决定将 package.json 留在前端手中。前端通过 git 发布代码，发布机收到后预先执行一遍 install 安装所需模块，再进行之后的编译。

然后具体的方案选型中，则看中了最近的新秀： [Parceljs](https://parceljs.org/)

原因很简单，Parceljs的配置使用及其简便，故保证了在可使用各种 npm 插件的同时保证最大的灵活度。

最初，我曾试过将 mgtv-mobile 这套组织架构直接迁移到 parcel 中，但是很快就遇到了 bug 。
主要是css的@import导致的资源混乱问题。
随后在github上提交了issues：[https://github.com/parcel-bundler/parcel/issues/673](https://github.com/parcel-bundler/parcel/issues/673)

于是转变了一下思路，既然parcel的定位是以html为入口的资源打包器，那么直接拿我之前流处理的架构去套用也是过于繁杂了，随处都是可见的 import 将各个资源传成一个串。js import js， css @import css。这样既导致了整个项目层级复杂，也导致js和css分离，没有做到完善的代码模块化。

换个姿势，重新改变了目录结构，尽量避免了 css 中的 import，改用js import css 的方式，将 css 和 js 绑在一起。

具体如图：

<small>index.html 为入口，加载相对应的 css、js、assets 资源。然后以 script 下的 js 为入口加载 common 中的 js 。</small>

{% image fancybox center mg-m.png %}

至于多页面的需求，如果不需要固定url的话直接通过 a 标签来让 html 加载就好。如果需要固定url的话也不用担心，虽然 parcel 没有 input 配置，但是我们有 npmScript 啊~

{% codeblock lang:js %}
  script: {
    'start': 'parcel build index.html -d dist; parcel build user.html -d dist/user'
  }
{% endcodeblock %}

我个人一直倾向于尽量用 npmScript 去代替一些简单的配置，其原因就在于 npmScript 能够拥有更好的普适性，管你什么 gulp、webpack、grunt。反正都离不开 npm，那么使用npm做配置自然是最具有兼容性的做法~

如果项目很多或者需求比较复杂，直接写在 package 里面看起来过于不雅。还可以自己写个 .node 脚本，一切问题迎刃而解。

{% codeblock lang:js %}
  script: {
    'start': './start_config.node'
  }
{% endcodeblock %}

### 经验 && 总结

1. 尽量避免使用 css 的 @import，css 中的 url 务必加上引号
2. 部分第三方 npm 包会附带有配置文件，会影响 parcel 打包。这时候可以试试找找有没有其他更规范的替代品。又或者自己删去多余的配置文件即可。 （例：vConsole 的 npm 包中带有 .babelrc 文件，会导致打包错误。可用 [eruda](https://github.com/liriliri/eruda) 替代即可。
3. 活用 npmScript，可替代大多数配置项，弥补 parcel 某些配置项缺乏的问题。