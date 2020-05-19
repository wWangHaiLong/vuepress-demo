# 菜鸟的技术文档

# VUE
---
## 首先用引用官方的话来介绍vuejs：
> Vue 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与[现代化的工具链](https://cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

> 其实对vue基本的学习都可以在[vue官网](https://cn.vuejs.org/v2/guide/)学到，这篇文章主要写的是我在学习vue时一些经历感想。

---
#### 框架和库(插件)的区别
+ 框架: 是一套完整的解决方案；对项目的入侵性较大，项目如果想更换框架，则需要重构整个项目；
+ 库(插件): 提供某一个小功能，对项目入侵性小，如果某个库无法满足项目需求，可以很容易到其他库实现；

---
#### 后端MVC和前端MVVM
+ MVC是后端的分层概念：
 M-----Modle层，主要处理数据的CRUD；
 V-----视图层，主要为前端页面；
 C-----逻辑层，主要为逻辑处理;
![MVC](https://upload-images.jianshu.io/upload_images/17912672-00c72986bae4adda.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
+ MVVM是前端图层的概念，主要关注于视图分层：
M-----Modle层，主要保存每个页面中单独的数据；
V-----View层，主要为每个页面HTML结构；
VM-----VM(ViewModel)层，主要为M和V之间的调度者，分隔M和V；
![MVVM](https://upload-images.jianshu.io/upload_images/17912672-5fce47d442d2a942.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---
#### Vue基本代码
1. 项目中需要创建一个lib类库,存放vue文件;
2. html中引入vue文件；
```
<script src="vue.js"></script>
<body>
  <!--MVVM中的V-->
  <div id="app">
    <!--渲染今天天气真好-->
    <p>{{ msg }}</p>
    <button @click="show"></button>
  </div>

  <script>
    var vm = new Vue({  //MVVM中的VM
      el: "#app",  //控制哪块的内容
      data: {  //MVVM中的M
        msg: "今天天气真好"
      }，
      methods: {  //定义了当前vue实例中所有可用的方法
        show(){  //点击按钮显示msg的方法
          alert(this.msg);  //在vm中获取data里的数据需 this. 出来
        }
      }
    });
  </script>
</body>
```
+ [Vue的基本指令](https://cn.vuejs.org/v2/api/#%E6%8C%87%E4%BB%A4)

---
#### 过滤器
+ Vue.js允许你自定义过滤器，可被用作一些常见的文本格式化。过滤器只能用在两个地方: **mustache**(插值表达式)和**v-bind**表达式。过滤器应该被添加到JavaScript表达式的尾部，由 “管道” 符指示；过滤器采用就近调用原则；

+ 过滤器调用格式
```
<div id="app">
  <!--可以接多个过滤器-->
  <p>{{ data | 过滤器名称(...) | ... }}</p>
</div>
```

+ 过滤器定义语法(全局)
```
<script>
  Vue.filter('过滤器名称',function (data, ...) {  //可以传多个参数
    // 第一个参数为调用格式中的data
    // 其他参数为  过滤器名称(...)  中的参数
  });
</script>
```

+ 过滤器定义语法(局部/私有)
```
<script>
  new Vue({
    filters: { 
      过滤器名称:  function (data, ...) {
        ...
      }
    }
  });
</script>
```
---
#### 修饰符
+ [v-model修饰符、按键修饰符、事件修饰符、系统修饰符](https://www.cnblogs.com/aaronthon/p/9225943.html);
+ 自定义全局按键修饰符: 
> Vue.config.keyCodes.自定义键名称 = [按键键码](https://www.cnblogs.com/yiven/p/7118056.html);

---
#### 自定义指令
+ 创建: 
>  Vue.directive('指令名称'， { 
    ...[钩子函数](https://cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0) 
})
+ 使用: 
> <p v-指令名称></p>

+ 局部:
```
<script>
  new Vue({
    directives: { 
      '指令名称': {
        ...钩子函数
      }
    }
  });
</script>
```

+ 常用的钩子函数: 
```
{
  bind: function (el, ...) {  //el为引用的这个自定义指令的标签
    //常用于处理样式(css)
  },
  inserted: function () {
    //常用于处理逻辑问题(js)
  },
  update: function () {
    //
  }
}
```

---
#### 生命周期函数(钩子/事件)
**所有生命周期函数与el、data、methods同级**
###### 实例创建阶段: 
![实例创建阶段](https://upload-images.jianshu.io/upload_images/17912672-e40c4f68e1579f76.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
+ beforeCreate () {}
 > 它在执行时，data和methods中的数据还未初始化；
+ created () {}
 > 它在执行时，data和methods中的数据已经初始化；
+ beforeMount() {}
 > 它在执行时，模板已经在内存中编辑完成了，但尚未将其渲染到页面当中；
+ mounted() {}
 > 它在执行时，模板已经渲染到页面当中了；

###### 实例运行阶段: 
![运行阶段](https://upload-images.jianshu.io/upload_images/17912672-c5da092457dc84f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
+ beforeUpdata () {}
> 它在执行时，数据已经发生了改变，但没有被更新渲染到页面当中(VM未同步)；
+ updata () {}
> 它在执行时，新数据已经被更新渲染到页面当中了(VM已同步)；

###### 实例销毁阶段: 
![销毁阶段](https://upload-images.jianshu.io/upload_images/17912672-194c8697d6f89725.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
+ beforeDestroy () {}
> 它在执行时，Vue实例已经从运行阶段进入销毁阶段，但methods、data、过滤器、指令...，都处于可用状态；
+ destroyed () {}
> 它在执行时，Vue实例已经被完全销毁；

---
#### [vue-resource](https://github.com/pagekit/vue-resource)实现get、post、jsonp请求
+ config、body和errorCallback都是可选属性，但config、body不可省略，如果没有需创建空对象{ }；

+ 全局配置数据接口根域名：
> Vue.http.options.root = '根域名';

或
```
http: {
    root: '/root'
}
```
> 注意: 如配置过根域名后，get、post、jsonp请求方法的url应该为除根域名的相对路径；

+ GET
> get(url, [config])
```
// url为请求地址，config为配置对象，successCallback为成功回调
this.$http.get('/someUrl', [config]).then(successCallback, errorCallback); 
```

+ POST
> post(url, [body], [config])
```
// url为请求地址，body是传送的数据，config为配置对象
// successCallback为成功回调
this.$http.post('/someUrl', [body], [config]).then(successCallback, errorCallback); 
```
> 注意: 手动发起的post请求默认没有表单格式，所以有的服务器处理不了，这时就需要进入配置对象配置相应的对象，如，开启表单格式请求的对象为{ emulateJSON: true; }

+ JSONP
> jsonp(url, [config])
```
// url为请求地址，config为配置对象，successCallback为成功回调
this.$http.jsonp('/someUrl', [config]).then(successCallback, errorCallback); 
```
>JSONP实现原理
>1.由于浏览器的安全性限制，不允许AJAX跨域请求(协议不同、域名不同、端口号不同 的数据接口)，浏览器认为这种访问不安全；
>2.可以通过动态创建script标签的形式，把script标签的src属性，指向数据接口的地址，因为script标签不存在跨域限制，这种数据获取方式，称作JSONP；

---
#### [过渡&动画](https://cn.vuejs.org/v2/guide/transitions.html)
+ 过渡类名
![过渡类名](https://upload-images.jianshu.io/upload_images/17912672-6d992130ea2164fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
> v-enter：表示进入过渡的初始阶段；
> v-enter-to：表示进入过渡的完成阶段；
> v-leave：表示离开过渡的初始阶段；
> v-leave-to：表示离开过渡的完成阶段；
> v-enter-active和v-leave-active：分别表示进入和离开过渡的生效时间段；

+ 第三方插件辅助transition的过渡&动画

1. [animate.css](http://www.animate.net.cn/)
animate.css提供了一套完整的过渡动画，我们只需要写入相应的类名就可以看到相应的过渡动画，但类名中需要写入基本类名animated ;
```
<transition enter-active-class="animated ..." leave-active-class="animated ...">
  <p>...</p>
</transition>
```
或者将基本类animated加到子元素身上
```
<transition enter-active-class="..." leave-active-class="...">
  <p class="animated">...</p>
</transition>
```
2. [bootrap.css](https://www.bootcss.com/)
使用:duration="ms"控制进入和离开过渡的时间
```
<transition enter-active-class="..." leave-active-class="..." :duration="300">
  <p class="animated">...</p>
</transition>
```
或者使用:duration="{ enter: ms, leave: ms }"可以分开控制进入和离开过渡的时间
```
<transition enter-active-class="..." leave-active-class="..." :duration="{ enter: 200, leave: 500 }">
  <p class="animated">...</p>
</transition>
```

+ [半场过渡动画生命周期事件](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-%E9%92%A9%E5%AD%90)

vue把一整场过渡动画分为两个半场，分别为**入场过渡动画**和**离场过渡动画**，而每个半场都有自己相对应的生命周期事件，并且这些生命周期事件会作为普通事件一样用 v-on: 被绑定在 transition 标签上，事件函数也写在 methods 中；
>**入场过渡动画** & **离场过渡动画**
如何绑定：
```
<transition
  v-on:before-enter="beforeEnter"  <!--入场过渡动画开始之前-->
  v-on:enter="enter"  <!--入场过渡动画进行时-->
  v-on:after-enter="afterEnter"  <!--入场过渡动画结束后-->
  v-on:enter-cancelled="enterCancelled"  <!--入场过渡动画取消(不常用)-->

  v-on:before-leave="beforeLeave" <!--离场过渡动画开始前-->
  v-on:leave="leave"  <!--离场过渡动画进行时-->
  v-on:after-leave="afterLeave"  <!--离场过渡动画结束后-->
  v-on:leave-cancelled="leaveCancelled"  <!--离场过渡动画取消(不常用)-->
>

  ...

</transition>
```
>**入场过渡动画** & **离场过渡动画**
事件函数：
```
methods: {  //el的用法与自定义指令相同，el就是引用它那个标签
  beforeEnter (el) { ... },
  enter (el, done) { 

    el.offsetWidth;  //这句代码本身没有什么意义，但它会让过渡动画进行强制刷新，使动画减少不必要的bug;
 
    done();   //done() 相当于在enter()结束前调用了一下afterEnter()，使afterEnter()执行的更快；

  },
  afterEnter (el) { ... }
  
  ...
}
```

+ transition-group列表过渡动画
>与 transition 标签类似的标签，它将有 v-for 和 :key 的标签包裹，所以相当于是包裹了很多个标签，而 transition 只能包裹一个标签

>配合过渡类名v-enter、v-enter-to、v-enter-active、v-leave-active和v-move使用
```
/* 这是一个关于离场过渡的固定写法，此外 v-leave-active这样写还不够，
还需将列表元素的width设置一个值(一般设置100%)，不然就会出现一些bug*/

.v-move{
  transition: all xx ease;
}

.v-leave-active{
  position: absolute;
}
```
>给 transition-group 添加 appear 属性可以实现列表在网页刚渲染时的过渡动画；
>添加 tag="xxx" 可以使 transition-group 标签在渲染时，渲染成自己设置的标签；

---
#### Vue组件
什么是组件：组件的出现是为了拆分Vue实例的代码量的，能够让我们以不同的组件，来划分不同的功能模块；将来，我们需要什么样的功能，就可以去调用相应的组件；

###### 组件化与模块化的不同：
  + 模块化：是从代码逻辑的角度进行划分的；方便代码分层开发，保证每个功能模块的职能单一；
  + 组件化：是从 UI 界面的角度进行划分的；前端的组件化，方便 UI 组件的重用；

###### 创建组件的方法：
+  方法一(Vue.extend)：
```
// html引用
// <my-com1></my-com1>

var com1 = Vue.extend({  // 创建了一个模板对象的组件
  template: '<h1>这是使用Vue.extend创建的组件</h1>'
});
Vue.component('myCom1', com1);

// 或者

Vue.component('myCom1', Vue.extend({  // 创建了一个模板对象的组件
  template: '<h1>这是使用Vue.extend创建的组件</h1>'
}));
```
> 注意: Vue.component创建组件名称时，如果使用的是驼峰命名，那么html引用该组件时，需将其单词与单词之间以 - 隔开，并为小写；如创建组件名称本就为小写创建则不需注意，直接以名称引用；

+  方法二(字面量)：
```
Vue.component('myCom1', {  // 创建了一个模板对象的组件
  template: '<div><p>...</p><h1>这是使用Vue.extend创建的组件</h1></div>'
});
```
>注意: 不论是哪种方式创建组件，template属性指向的模板内容，必须只有唯一的根元素才能显示更多内容；

+  方法二改(template)：
```
// 在被Vue控制的html内容外，创建tmplate的内容，并且遵循tmplate内容注意事项，
之后还需要在Vue控制的内容元素内引用才能显示内容；
<template id="tmp1">
  <div>
    <p>...</p>
    <span>...</span>
    ...
  </div>
</template>

Vue.component('myCom1', {  // 创建了一个模板对象的组件
  template: '#tmp1'
});
```

+  方法三(局部)：
```
// 只能在当前Vue中使用
new Vue({
  components: {
    myCom1: {  // 引用时注意驼峰事项
       template: '#tmp1'
    }
  }
});
```

###### 组件中的data：
组件中的data与Vue实例中的data使用和引用方法一样，但创建方法不同；组件中data属性需要是一个函数，函数返回一个对象，对象中就是data中的数据；
```
Vue.component('myCom1', {  // 创建了一个模板对象的组件
  template: '<div>{{ msg }}</div>'，
  data: function () {
    return {
      msg: '我是组件中的data属性'
    };
  }
});
```

###### 多个组件的切换&过渡动画
Vue提供了 component 标签帮助我们进行多个组件之间的切换；

+ component 标签使用方法：
```
<div id="app">

  <input type="button" value="mycom1" @click="comName='mycom1'">
  <input type="button" value="mycom2" @click="comName='mycom2'">
  <input type="button" value="mycom3" @click="comName='mycom3'">
  <!--这里组件的名称使用了 ' ' 单引号包起来,
  因为 :is 会将没有用单引号包裹起来的组件名称当做一个变量，
  当然 :is 当中可以传入一个变量，这样就可以实现组件的切换-->
  <!--<component :is="'mycom1'"></component>-->
  <component :is="comName"></component>

</div>


Vue.component('mycom1',{
  template: '<p>组件1</p>'
 });

Vue.component('mycom2',{
  template: '<p>组件2</p>'
 });

Vue.component('mycom3',{
  template: '<p>组件3</p>'
 });

new Vue({
  el: "#app",
  data: {
    comName: ''
  }
 });
```

+ 多个组件的过渡动画
多个组件的过渡简单很多，我们不需要使用 key 属性。相反，我们只需要使用 transition 标签；没有其他注意事项；
```
<transition>
  <component :is="comName"></component>
</transition>
```
###### 父亲组件向子组件传值
>1.传递data数据(green)：
![父组件向子组件传递data数据](https://upload-images.jianshu.io/upload_images/17912672-3ab682b81a2748ab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果Vue实例中 components(局部创建) 的组件(子组件)想获取Vue实例中 data 的数据(父组件)，那么直接输入 data 中的数据是获取不到的；我们只能通过在子组件标签上 v-bind: 绑定一个自定义属性名，然后将 data 中需要的数据传入到其中，并且需要在子组件中创建一个props数组，将自定义属性名定义一下，才能在组件中靠这个自定义属性名获取数据；
```
<!--其中datamsg为自定义属性名，msg为data中的数据-->
<mycom v-bind:datamsg="msg"></mycom>

new Vue({
  el: "",
  data: {
    msg: "111111"
  },
  components: {
    mycom: {
      template: '<div>{{ datamsg }}</div>',  //这样这个div中输出的就会是data中的msg内容
      props: [ 'datamsg' ]  //这一步在mycom中定义了datamsg，所以在template中才可以使用datamsg
    }
  }
});
```
+ components(局部创建) 中 data 与 props 的区别
**data 中的数据是可读写的，而 props 中的数据不能赋值，只读；**

>2.传递函数数据(green)&子组件向父组件传递data数据(skyblue)：
![父组件给子组件传递函数数据](https://upload-images.jianshu.io/upload_images/17912672-603173a182b5e7a2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

---
#### Vue内置组件
1.template标签：
模板组件，可以写一些html内容，然后引用到html中；
2.transition标签：
动画组件，可以实现内容的过渡动画；
3.transition-groud标签：
列表动画组件，可以实现列表的过渡动画；
4.comonent标签：
辅助切换组件，帮助自定义的组件进行切换&过渡；
---
#### 使用ref获取DOM元素和组件引用
引用( reference )
+ Vue提供了 $ref 这个属性，它可以在标签元素上定义一下，然后就可以在实例中获取此标签元素，当然在组件上定义也行;
定义方法：
>ref="自定义名称"
```
<h1 ref="apph1">我是app中的h1标签</h1>

<mycom ref="mycom"></mycom>
```
获取方法：
>this.$refs.自定义名称.获取属性
```
this.$refs.apph1.innerText  // 这是获取标签元素里的内容

this.$refs.mycom.func()  // 这是获取组件上的方法
```

---
## ue-router
>[我在github官网下载的vue-router](https://github.com/vuejs/vue-router)，然后将vue-router.js文件用script的方式引入到html中练习；
如果是模块开发，就需要使用到npm进行安装；

###### 在vue中使用vue-router
1. 导入 vue-router.js 文件；
```
<script src="./lib/vue-router.js"></script>
```
2. 使用 router-link(vue-router提供) 标签来导航或者 a 标签；
```
<router-link to="/login" tag="span">登陆</router-link>
<router-link to="/register" tag="span">注册</router-link>

<a href="#/login">登陆</a>
<a href="#/register">注册</a>
```
3. 使用 router-view 来显示在 routes 中匹配到的对应的 component 组件；
```
<router-view></router-view>
```
4. 创建对应组件；
```
var login = {
  template: '<h1>登陆组件</h1>'
}

var register= {
  template: '<h1>注册组件</h1>'
}
```
4.1 通过 $route.query 获取 url 中的一些简单数据；
```
// 假如url中有一些数据
<router-link to="/login?id=250">登陆</router-link>

var login = {
  //  id---250
  template: '<div>id---this.$route.query.id</div>'
}
```
5. 创建一个 router 实例，通过 routes 属性来定义路由器匹配规则；
```
var routerObj = new VueRouter({
  routes: [
    { path: '/login', component: login },
    { path: '/register', component: register}
  ]
});
```
5.1 使用 redirect 属性强制让用户进入页面时跳转到某个页面(设置默认显示页面)；
```
{ path: '/', redirect : '/login'}
```
5.2 通过配置与 routes 同级的 linkActiveClass 配置项，来给导航元素设置高亮( 被选中时的样式 )；注意: 类名在激活 router 实例时就已经被赋予到导航上去了，即在页面中，被选中的导航元素上会被赋予该类名；
```
linkActiveClass: 'myactive'  // 默认类名为 router-link-active 
```
5.3 通过配置与 path 同级的 children 属性，来给某一个根目录添加数个子目录；
```
{  
  path: '/account',
  component: account,
  children: [
    { path: 'login', component: login },
    { path: 'register', component: register }
  ]
}
```
5.4 给 router-view 标签命名，并给一个路由匹配规则添加 components 属性，实现一个路径下多个组件；
```
<router-view name="header"></router-view>
<router-view name="left"></router-view>
<router-view name="main"></router-view>

{
  path: '/',
  components: {
      'header': header,
      'left': left,
      'main': main
    }
  }
```
6. 使用 router 属性来使用路由规则(注册到vue实例中)；
```
var vm = new Vue({
  el: "#app",
  router: routerObj
});
```

---
#### vue实例中的配置项
1. el: ''
用于规定一个vue实例管理的区域，如我需要**管理**一个id为app的div，el: '#app'

2. data: {}
用于**存放**区域中的所有数据；

3. methods: {}
用于**存放**区域内的所有函数方法，侧重于业务逻辑；

4. watch: {}
用于**监听**区域内某些**特定数据**的变化，从而进行某些具体的业务逻辑操作，一般与路由结合使用；

5. compnents: {}
用于**挂载**多个局部组件；

6. router: obj
用于**挂载**一个路由实例；

7. computed: {}
用于**定义**多个**计算属性**，计算属性的本质为一个 function ，但在其使用时，只作为一个属性使用；

8. render(createElements){}
createElements 是一个方法，调用该方法可以将el管理的区域替换成指定的组件模板；该属性的特性与 v-text 相似，都会将旧内容覆盖，而且不容易被修改，操作性小；

#### VUEX
Vuex，是一个全局的共享数据存储区域，相当于一个数据仓库；
+ NPM 安装；
>npm i vuex -S

+ 导入 + 手动安装；
```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
```

+ 创建 vuex 实例；
vuex 创建实例的方法与 VueRouter 一致；
与 Vue 实例也相似；
```
var store = new Vuex.Store({
  state: {  // state 属性相当于 Vue 实例中的 data 属性
     num: 0
  },
  mutations: {   // mutations属性相当于 Vue 实例中的 methods 属性
   方法名 (state) {    // state 表示可以操作 state 中的数据
       state.num
      //  (state) 中只能传递两个参数，第一个为 state 第二个可以是一个对象，一个方法，一个任意参数
    }
  }
})
```
>注意：state 中的数据如果需要被操作，推荐使用 mutations 来操作，不推荐直接在组件中操作；

+ 挂载 vuex 到 vue 实例中；
挂载方法也跟 vue-router 挂载方法一样：
```
new Vue({
  data: {},
  methods: {},
  router,
  store  // 挂载 vuex 实例
})
```
> 当挂载了 vuex 实例后，就可以调用其中的数据了: 
```
// 挂载前
this.$store.state.数据名
this.$store.commit('方法名')
// 挂载后
$store.state.数据名
$store.commit('方法名')
```

+ getters 属性；
与 state 同级；作用是对外提供数据；
使用方法为：
```
getters: {  // 类似于计算属性 computed

  自定义名称: function (state) {  // 与过滤器Vue.filter相似
    return ...
  }

  // 简化写法
  自定义名称(state){ 
    return ...
  }

}
```
调用方法：
```
$store.getters.自定义名
```
