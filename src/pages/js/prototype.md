# prototype

js 中基本所有的数据都可以看成对象，但并不代表就是在使用面向对象编程了。

js 的面向对象编程和其他语言不太一样。在其他语言（java/c#......）中，类和实例是大多数面向对象编程语言的基本概念：

-   类：指对象的模板类型，类本身就是一种类型，例如定义一个 Book 类来表示书，但指任何具体的什么书，哪本书，哪类书
-   实例：根据类所创建的对象，例如根据 Book 类可以创建出《javascript 高级程序设计》/《javascript 框架设计》/《javascript 设计模式与开发实践》等多个实例，每个实例表示一本具体的书籍，他们都属于 Book 类

这在 js 中稍微有些区别，js 不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程。

-   每个函数都有一个`prototype`属性，它默认指向一个对象，这个对象称为原型对象，原型对象中有一个 constructor 属性，constructor 指向构造函数

-   每个实例对象都有一个 `__proto__`

-   实例对象的 `__proto__` 和它所对应的构造函数的原型相等

-   prototype显式原型，\_\_proto\_\_隐式原型

实例对象.\_\_proto\_\_ === 构造函数.prototype
构造函数.prototype.constructor === 构造函数
实例对象.constructor === 构造函数

# prototype chain（原型链）
