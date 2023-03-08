# extend

**继承是什么？**

-   继承是为了子类可以使用父类上的属性和方法并能对其进行扩展，实现属性或方法共享

js 中基本所有的数据都可以看成对象，但并不代表就是在使用面向对象编程了。

js 的面向对象编程和其他语言不太一样。在其他语言（java/c#......）中，类和实例是大多数面向对象编程语言的基本概念：

-   类：指对象的模板类型，类本身就是一种类型，例如定义一个 Book 类来表示书，但指任何具体的什么书，哪本书，哪类书
-   实例：根据类所创建的对象，例如根据 Book 类可以创建出《javascript 高级程序设计》/《javascript 框架设计》/《javascript 设计模式与开发实践》等多个实例，每个实例表示一本具体的书籍，他们都属于 Book 类

这在 js 中稍微有些区别，js 不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程。

> -   每个函数都有一个`prototype`属性，它默认指向一个对象，这个对象称为原型对象，原型对象中有一个 constructor 属性，constructor 指向函数对象
> -   每个实例对象都有一个 \_\_proto\_\_
> -   实例对象的\_\_proto\_\_和它所对应的构造函数的原型相等（同一个引用，地址相同，指向同个对象）

    function Fn () {}

    // 每个函数都有prototype属性，指向函数的原型对象
    console.log(Fn.prototype)

    // 原型对象上会有一个constructor属性
    console.log(Fn.prototype.constructor)

    // 原型对象的constructor属性指向函数对象
    console.log(Fn.prototype.constructor === Fn)
    console.log(Date.prototype.constructor === Date)

    // F为实例对象，创建一个实例对象
    const F = new Fn() // 内部做了一件事：this.__proto__ = Fn.prototype

    // 每个实例对象都有一个__proto__属性
    console.log(F.__proto__)

    // 实例对象的__proto__和它所对应的构造函数的原型相等
    console.log(F.__proto__ === Fn.prototype)

**有什么用？**

**怎么继承？**
