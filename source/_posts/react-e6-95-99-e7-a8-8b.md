title: React教程
tags:
  - javascript
  - React
  - web
  - 中文翻译
  - 前端
  - 前端框架
id: 353
categories:
  - 技术类
  - React+Flux
date: 2015-02-02 00:34:43
---

<pre>[ZZZero](http://www.zz-zero.com/)自翻，转载请注明出处。
原文：http://facebook.github.io/react/docs/tutorial.html</pre>
<!-- more -->
# 教程

我们会建立一个简单但真实的评论框，你可以放到一个blog中，其中实时评论的基础版本来源于Disqus,LiveFyre和Facebook的评论。

我们将提供以下内容：

*   一个包含所有评论的视图框
*   一个表单用于提交所有评论
*   为你提供一个自定义后台链接
它也将包含一些简洁的功能：

*   优化评论：评论保存在服务器之前就添加到评论列表中，因此用户体验如此迅速。
*   实时更新：实时弹出其他用户的最新评论。
*   支持Markdown编辑：用户可以使用Markdown去编辑文字。
源代码地址：[https://github.com/reactjs/react-tutorial](https://github.com/reactjs/react-tutorial)

## 运行一个服务器

虽然它不是入门教程的必需品，但稍后我们将添加向服务器发送_POST_ing请求的功能。如果你对这些东西十分熟悉并且想创建你自己的服务器的话更好。为了让你尽可能的安心学习React不用去担心服务器方面的错误，我们使用了大量的JavaScript（node.js），Python，Ruby去编写一个简单地服务器。这些程序全在GitHub上，你可以直接[查看](https://github.com/reactjs/react-tutorial/)或者[下载](http://www.microsofttranslator.com/bv.aspx?from=&amp;to=zh-CHS&amp;a=https%3A%2F%2Fgithub.com%2Freactjs%2Freact-tutorial%2Farchive%2Fmaster.zip)。

若要开始使用教程中的文件，只需要开始编辑_public/index.html_

## 入门教程

对于本教程，我们将使用CDN中的JavaScript文件（需翻墙_(:з」∠)_……）。打开你喜欢的编辑器，并创建一个新的HTML文档：

[html]
&lt;!-- index.html --&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Hello React&lt;/title&gt;
    &lt;script src=&quot;http://fb.me/react-0.12.2.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;http://fb.me/JSXTransformer-0.12.2.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;http://code.jquery.com/jquery-1.10.0.min.js&quot;&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id=&quot;content&quot;&gt;&lt;/div&gt;
    &lt;script type=&quot;text/jsx&quot;&gt;
      // Your code here
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
[/html]

本教程的其余部分，我们将在此脚本标签中编写我们的JavaScript代码。
> 注：我们在head中引入了jQuery，是因为我们想要简化将要使用的ajax调用代码量，但是它对于React来说并不是必须的。

## 你的第一个组件

React全都是关于模块化，部件化的组件。以我们的评论框为例，我们将要构建以下组件结构：

[code]
- CommentBox
  - CommentList
    - Comment
- CommentForm
[/code]

让我们来构建Comment组件，它只是一个简单地&lt;div&gt;而已：

[javascript]
// tutorial1.js
var CommentBox = React.createClass({
  render: function() {
    return (
      &lt;div className=&quot;commentBox&quot;&gt;
        Hello, world! I am a CommentBox.
      &lt;/div&gt;
    );
  }
});
React.render(
  &lt;CommentBox /&gt;,
  document.getElementById('content')
);
[/javascript]

###  JSX语法

相信您注意到的第一件事就是在你的JavaScript中的XML-ish语法。我们有一个简单地预编译程序去翻译这个语法糖到原生的JavaScript：

[javascript]
// tutorial1-raw.js
var CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
      React.createElement('div', {className: &quot;commentBox&quot;},
        &quot;Hello, world! I am a CommentBox.&quot;
      )
    );
  }
});
React.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);
[/javascript]

是否使用JSX完全由你自己选择，但是我们发现JSX语法比纯粹的JavaScript更易于使用。阅读更多有关[JSX语法条例](http://facebook.github.io/react/docs/jsx-in-depth.html)

### 发生了什么？

我们通过一些方法在一个JavaScript对象中通过_React.createClass()_创建了一个新的React组件。其中最重要的方法为_render_，它将返回一个由React组件渲染出HTML树。

这个&lt;div&gt;标签并不是实际的DOM节点；而是React中div组件的实例化。你可以认为React只是知道如何去处理这些标签或数据块而已。React是安全的。因为React默认带有XSS防御所以我们不能直接生成HTML字符串。

你不需要返回基本的HTML。你可以返回你自己（或他人）构建的组件树。这就是使React模块化的原因：一切为了前端的可维护性。

_React.render()_方法实例化基础组件，开始构建框架并注入标记到原始DOM元素中，作为第二个参数。

## 构成成分

让我们再来构建_CommentList_和_CommentForm_的构架，做一堆简单地_&lt;div&gt;_：

[javascript]
// tutorial2.js
var CommentList = React.createClass({
  render: function() {
    return (
      &lt;div className=&quot;commentList&quot;&gt;
        Hello, world! I am a CommentList.
      &lt;/div&gt;
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      &lt;div className=&quot;commentForm&quot;&gt;
        Hello, world! I am a CommentForm.
      &lt;/div&gt;
    );
  }
});
[/javascript]

然后更新_CommentBox_组件来使用这些新组件：

[javascript]
// tutorial3.js
var CommentBox = React.createClass({
  render: function() {
    return (
      &lt;div className=&quot;commentBox&quot;&gt;
        &lt;h1&gt;Comments&lt;/h1&gt;
        &lt;CommentList /&gt;
        &lt;CommentForm /&gt;
      &lt;/div&gt;
    );
  }
});
[/javascript]

请注意我们如何混合HTML标签和我们已经构建好的组件。HTML组件是常规的React组件，就像一个你定义的组件，只有一个区别。JSX编译器会自动重写HTML标签为_React.creatElement(tagName)_的表达式并独自结束关闭。这是为了防止污染全局命名空间。

## 组件属性

让我们创造我们的三个_Comment_组件。我们将希望通过它记录用户名称和评论文本，因此我们可以重用相同的代码，实现每个不同的评论。首先让我们将一些评论添加到_CommentList_中：

[javascript]
// tutorial4.js
var CommentList = React.createClass({
  render: function() {
    return (
      &lt;div className=&quot;commentList&quot;&gt;
        &lt;Comment author=&quot;Pete Hunt&quot;&gt;This is one comment&lt;/Comment&gt;
        &lt;Comment author=&quot;Jordan Walke&quot;&gt;This is *another* comment&lt;/Comment&gt;
      &lt;/div&gt;
    );
  }
});
[/javascript]

注意我们已经从父组件_CommentList_传递一些数据到子组件_Comment_中。例如，我们传递_Pete Hunt_（通过属性），这是给第一个_Comment_的评论。从父组件传递到子组件的数据被称为**props(道具)**，是由单词properties简写而得。

## 使用**道具（props）**

让我们创建的评论部分，使用**道具**我们将能够从_CommentList_中读取数据传递给它并且渲染出一些标记：

[javascript]
// tutorial5.js
var Comment = React.createClass({
  render: function() {
    return (
      &lt;div className=&quot;comment&quot;&gt;
        &lt;h2 className=&quot;commentAuthor&quot;&gt;
          {this.props.author}
        &lt;/h2&gt;
        {this.props.children}
      &lt;/div&gt;
    );
  }
});
[/javascript]

JSX语法里面通过（任何一个子节点或者属性中）包围在括号里表达JavaScript表达式，你可以放入文本或React组件到树中。我们通过组件中关键的this.props和嵌套元素中的this.props.children访问命名属性。

## 添加Markdown

Markdown是设置你的文本内联格式的一个简单地方法。举个栗子，被星号包围的文本会被设为强调样式。

首先，添加第三方库**Showdown**到你的应用中。这是一个JavaScript库，它能采用Markdown文本并将它编译成原生HTML。它需要载入在你的head中：

[html]
&lt;!-- index.html --&gt;
&lt;head&gt;
  &lt;title&gt;Hello React&lt;/title&gt;
  &lt;script src=&quot;http://fb.me/react-0.12.2.js&quot;&gt;&lt;/script&gt;
  &lt;script src=&quot;http://fb.me/JSXTransformer-0.12.2.js&quot;&gt;&lt;/script&gt;
  &lt;script src=&quot;http://code.jquery.com/jquery-1.10.0.min.js&quot;&gt;&lt;/script&gt;
  &lt;script src=&quot;http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;
[/html]

接下来我们将评论文本转换为Markdown并且输出它：

[javascript]
// tutorial6.js
var converter = new Showdown.converter();
var Comment = React.createClass({
  render: function() {
    return (
      &lt;div className=&quot;comment&quot;&gt;
        &lt;h2 className=&quot;commentAuthor&quot;&gt;
          {this.props.author}
        &lt;/h2&gt;
        {converter.makeHtml(this.props.children.toString())}
      &lt;/div&gt;
    );
  }
});
[/javascript]

这里我们需要调用一下Showdown库。我们需要将React里括号文本中的_this.props.children_转换成Showdown可以明白的原始字符串，于是我们就直接使用_toString()_。

但是有一个问题！我们在浏览器中看到的评论渲染出这个样子：“&lt;p&gt;This is &lt;em&gt;another&lt;/em&gt;comment&lt;/p&gt;”。我们希望这些标签可以直接渲染为HTML。

这是由于React在保护你不受XSS攻击，有个方法可以帮你绕过它，但是架构会告诫你不要使用：

[javascript]
// tutorial7.js
var converter = new Showdown.converter();
var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      &lt;div className=&quot;comment&quot;&gt;
        &lt;h2 className=&quot;commentAuthor&quot;&gt;
          {this.props.author}
        &lt;/h2&gt;
        &lt;span dangerouslySetInnerHTML={“hexo有这句代码会出错特此分割”{__html: rawMarkup}“hexo有这句代码会出错特此分割”} /&gt;
      &lt;/div&gt;
    );
  }
});
[/javascript]

这是一个特殊的API，它故意设计的如此复杂以至于难以插入HTML，但是为了Showdown我们将会利用这个后门。

**记住：** 使用这一特征需要你完全信赖Showdown没有安全问题。

##  挂接外部的数据模型

现在为止我们已经直接在源代码中插入了评论。那么，让我们将一些JSON数据渲染到评论列表中，最终这些数据将来自于服务器，但就目前而言，将它写到你的源代码中：

[javascript]
// tutorial8.js
var data = [
  {author: &quot;Pete Hunt&quot;, text: &quot;This is one comment&quot;},
  {author: &quot;Jordan Walke&quot;, text: &quot;This is *another* comment&quot;}
];
[/javascript]

我们需要让这些数据进入到_CommentList_模块路径中。修改_CommentBox_和_React.render()_以便通过道具将这些数据传递到_CommentList_中：

[javascript]
// tutorial9.js
var CommentBox = React.createClass({
  render: function() {
    return (
      &lt;div className=&quot;commentBox&quot;&gt;
        &lt;h1&gt;Comments&lt;/h1&gt;
        &lt;CommentList data={this.props.data} /&gt;
        &lt;CommentForm /&gt;
      &lt;/div&gt;
    );
  }
});

React.render(
  &lt;CommentBox data={data} /&gt;,
  document.getElementById('content')
);
[/javascript]

现在这些数据已经在_CommentList_中生效，让我们开始动态渲染这些评论：

[javascript]
// tutorial10.js
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        &lt;Comment author={comment.author}&gt;
          {comment.text}
        &lt;/Comment&gt;
      );
    });
    return (
      &lt;div className=&quot;commentList&quot;&gt;
        {commentNodes}
      &lt;/div&gt;
    );
  }
});
[/javascript]

就是这么简单\(≧▽≦)/

## 从服务器获取数据

让我们用来自服务器的数据来替换一下现在的硬代码。我们将删除这个数据道具并且替换成一个URL去获取：

[javascript]
// tutorial11.js
React.render(
  &lt;CommentBox url=&quot;comments.json&quot; /&gt;,
  document.getElementById('content')
);
[/javascript]

该组件不同于先前的组件，因为它需要去再次渲染自身。这个组件不会拥有任何数据，直到服务器返回请求，这时组件也许需要渲染自己的一些新的评论。

## React的状态（state）

目前为止，每个组件已经基于道具实现渲染，_props_是不可变的：他们都是来自父组件并且由父组件所“拥有“。若要实现交互，我们采用可变的_state（状态）_到组件中去。_this.state_是专用于组件并且通过调用_this.setState()_来更改。状态更新时，该组件会对自己进行重新渲染。

_将render()_方法写入_this.props_和_this.props_中的函数声明中。这样的架构可以保障输入与UI的一致性。

当服务器获取数据，我们将会改变我们的评论数据。让我们添加一个评论数据的数组到_CommentBox_组件的状态中：

[javascript]
// tutorial12.js
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      &lt;div className=&quot;commentBox&quot;&gt;
        &lt;h1&gt;Comments&lt;/h1&gt;
        &lt;CommentList data={this.state.data} /&gt;
        &lt;CommentForm /&gt;
      &lt;/div&gt;
    );
  }
});
[/javascript]

_getInitialState()_在组件的其整个生命周期中只执行一次，以设定组件中状态的初始值。

### 更新状态

当首次创建组件时，我们想从服务器通过GET获取一些JSON文件去更新状态以反映最新的数据。在实际应用中这应该是一个动态的端点，但是在这个例子中，我们将使用一个静态的JSON文件以达到尽可能的简单：

[javascript]
// tutorial13.json
[
  {&quot;author&quot;: &quot;Pete Hunt&quot;, &quot;text&quot;: &quot;This is one comment&quot;},
  {&quot;author&quot;: &quot;Jordan Walke&quot;, &quot;text&quot;: &quot;This is *another* comment&quot;}
]
[/javascript]

我们通过JQuery来发出一个异步请求到服务器。

注意：因为它变成了一个AJAX应用，你需要在web服务器开发一个你的web应用，而不是将文件放到你的文件系统中。如上文所述，在Github上我们提供了几个服务器供你使用。他们提供了接下来本教程中你所需的功能。

[javascript]
// tutorial13.js
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      &lt;div className=&quot;commentBox&quot;&gt;
        &lt;h1&gt;Comments&lt;/h1&gt;
        &lt;CommentList data={this.state.data} /&gt;
        &lt;CommentForm /&gt;
      &lt;/div&gt;
    );
  }
});
[/javascript]

在这里，当React渲染完成时会自动调用的方法_componentDidMount_。动态更新的关键就是对_this.setState()_的调用。我们用来自服务器中新的数据去替换旧的评论数组，UI便会自动更新。由于它是反应式的，这里只需要一点小小的改变去添加实时更新功能。我们将使用简单地轮询，当然你也可以在React中用WebSockets或者其他技术去轻松的实现。

[javascript]
// tutorial14.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      &lt;div className=&quot;commentBox&quot;&gt;
        &lt;h1&gt;Comments&lt;/h1&gt;
        &lt;CommentList data={this.state.data} /&gt;
        &lt;CommentForm /&gt;
      &lt;/div&gt;
    );
  }
});

React.render(
  &lt;CommentBox url=&quot;comments.json&quot; pollInterval={2000} /&gt;,
  document.getElementById('content')
);
[/javascript]

我们在这里所做的一切就是将AJAX调用移动到一个独立的方法中，当组件首次加载时以及之后每间隔2秒调用该方法。尝试在浏览器运行并更改comment.json文件后；2秒钟之内，更改就会被呈现出来！

## 添加新评论

现在是时间去建立表单了。我们的_CommentForm_组件应该要求用户去提供名称和评论文本，并发送请求到服务器去保存评论。

[javascript]
// tutorial15.js
var CommentForm = React.createClass({
  render: function() {
    return (
      &lt;form className=&quot;commentForm&quot;&gt;
        &lt;input type=&quot;text&quot; placeholder=&quot;Your name&quot; /&gt;
        &lt;input type=&quot;text&quot; placeholder=&quot;Say something...&quot; /&gt;
        &lt;input type=&quot;submit&quot; value=&quot;Post&quot; /&gt;
      &lt;/form&gt;
    );
  }
});
[/javascript]

接下来制作表单交互。当用户提交表单时，我们需要清空表单，提交一个请求到服务器，以及刷新评论列表。首先，来监听表单提交事件并且清空它。

[javascript]
// tutorial16.js
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      &lt;form className=&quot;commentForm&quot; onSubmit={this.handleSubmit}&gt;
        &lt;input type=&quot;text&quot; placeholder=&quot;Your name&quot; ref=&quot;author&quot; /&gt;
        &lt;input type=&quot;text&quot; placeholder=&quot;Say something...&quot; ref=&quot;text&quot; /&gt;
        &lt;input type=&quot;submit&quot; value=&quot;Post&quot; /&gt;
      &lt;/form&gt;
    );
  }
});
[/javascript]

####  事件

React专用事件操作在组件中使用驼峰命名法。我们将_onSubmit_处理程序附加到表单上，当表单提交有效数据时便清空表单域。

在事件中调用_preventDefault()_防止浏览器的默认提交表单动作。

#### 参考（Refs)

我们使用_ref_属性为子组件分配一个名称，并且使用_this.refs_去引用组件。我们可以通过调用_getDOMNode()_直接在组件中去获取本地浏览器的DOM元素。

#### 在道具中回调

当用户提交评论时，我们将需要刷新包含最新评论的评论列表。_CommentBox_从使用它自己的状态表示评论列表以来，这些所有的逻辑都是合理的。

由于我们需要通过数据从子组件中备份到它的父组件。我们从父组件的_render_方法通过一个新的回调（_handlecommentSubmit_）到子组件，去构建子节点的_onCommentSubmit_事件。每当该事件发生时，这个回调都将被调用：

[javascript]
// tutorial17.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    // TODO: submit to the server and refresh the list
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      &lt;div className=&quot;commentBox&quot;&gt;
        &lt;h1&gt;Comments&lt;/h1&gt;
        &lt;CommentList data={this.state.data} /&gt;
        &lt;CommentForm onCommentSubmit={this.handleCommentSubmit} /&gt;
      &lt;/div&gt;
    );
  }
});
[/javascript]

当用户提交表单时，我们从_CommentForm_调用这个回调。

[javascript]
// tutorial18.js
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      &lt;form className=&quot;commentForm&quot; onSubmit={this.handleSubmit}&gt;
        &lt;input type=&quot;text&quot; placeholder=&quot;Your name&quot; ref=&quot;author&quot; /&gt;
        &lt;input type=&quot;text&quot; placeholder=&quot;Say something...&quot; ref=&quot;text&quot; /&gt;
        &lt;input type=&quot;submit&quot; value=&quot;Post&quot; /&gt;
      &lt;/form&gt;
    );
  }
});
[/javascript]

现在这个回调已经就绪，我们要做就是提交到服务器并且刷新列表：

[javascript]
// tutorial19.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      &lt;div className=&quot;commentBox&quot;&gt;
        &lt;h1&gt;Comments&lt;/h1&gt;
        &lt;CommentList data={this.state.data} /&gt;
        &lt;CommentForm onCommentSubmit={this.handleCommentSubmit} /&gt;
      &lt;/div&gt;
    );
  }
});
[/javascript]

##  优化：更好的更新方法

我们的应用现在功能已经很齐全了，但是速度却感觉很慢，因为必须要等到请求完成前我们才能将所有评论显示在列表中。为了使得它感觉更快，我们可以用更好的方法添加一段评论到列表中。

[javascript]
// tutorial20.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      &lt;div className=&quot;commentBox&quot;&gt;
        &lt;h1&gt;Comments&lt;/h1&gt;
        &lt;CommentList data={this.state.data} /&gt;
        &lt;CommentForm onCommentSubmit={this.handleCommentSubmit} /&gt;
      &lt;/div&gt;
    );
  }
});
[/javascript]

## 我翻译的这么烂，你居然还真的看完了_(:з」∠)_……

总之恭喜=w=，你通过简单地几步建好了一个评论框，这里可以了解关于[为什么要使用React](http://www.zz-zero.com/?p=322)（本人已翻译，将直接转跳到已翻译的文章中），或者深入了解[API参考](http://facebook.github.io/react/docs/top-level-api.html)并开始编写使用！Good luck！~

