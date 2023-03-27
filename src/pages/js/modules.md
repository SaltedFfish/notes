# Module

## CommonJS

`CommonJS` 是 `Node.js` 使用的模块化规范

```js
// a.js
function plus(a, b) {
    return a + b;
}
module.exports = { plus };

// b.js
const { plus } = require("./a.js");
plus(1, 2);
```

## ES6

```js
// a.js
export function plus(a, b) {
    return a + b;
}

// b.js
import { plus } from "./a.js";
plus(1, 2);
```

```js
// a.js
const a = {
    desc: "hello world",
    plus(a, b) {
        return a + b;
    },
};
export default a;

// b.js
// 不解构（可以别名）
import a from "./a.js";
// 或 import * as a from "./a.js";
a.plus(1, 2);

// import { plus } from "./a.js";
// plus(1, 2);

// as别名
// import { plus as add, desc } from "./a.js";
// console.log(add(1, 2), desc);
```

## AMD（Asynchronous Module Definition）

`AMD`是一种异步加载模块的规范，主要用于浏览器环境（Browser Environment），它通过 `define` 和 `require` 方法来实现模块的导入和导出

`浏览器环境（Browser Environment）`指的是 JavaScript 代码运行在浏览器中的环境

`define(name?, dependencies?, factory)`

- name: 模块名称，可选。
- dependencies该模块的依赖项，可以是字符串数组或省略。
- factory: 模块函数，可以是一个函数，也可以是任意JavaScript表达式。

```js
// 定义名为'myModule'的模块，该模块依赖'jquery'库
define('myModule', ['jquery'], function($) {
  // 在模块函数中使用$对象
  $('body').html('Hello World!');
});
```

```js
// a.js
define(function() {
  function sayHello(name) {
    console.log(`Hello, ${name}!`);
  }

  return { sayHello };
});

// b.js
require(['hello'], function(hello) {
  hello.sayHello('Tom'); // 输出：Hello, Tom!
});
```

## UMD
