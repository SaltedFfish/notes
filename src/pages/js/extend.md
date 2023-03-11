## es6 中 constructor 和 super 的作用

### es5 构造函数

```js
// 创建一个Circle构造函数
function Circle(centerPoint, radius) {
    this.centerPoint = centerPoint;
    this.radius = radius;
}
// 往原型对象上添加方法
Circle.prototype.getCenterPoint = function () {
    return this.centerPoint;
};
// 创建一个实例
const circle = new Circle([10, 20], 10);
```

### es6 构造函数

```js
class Circle {
    constructor(centerPoint, radius) {
        this.centerPoint = centerPoint;
        this.radius = radius;
    }

    getCenterPoint() {
        // constructor()
        console.log(this.constructor);
        return this.centerPoint;
    }
}

// 创建一个实例
const circle = new Circle([10, 20], 10);
```

### constructor

其中`constructor`方法是类中默认的构造函数，通过 new 创建一个实例对象时自动调用该方法，
一个类中必须有`constructor`方法，即使没定义也会默认添加`constructor`方法，
一般`constructor`方法返回实例对象的 this

### super

**在`constructor`中必须调用`super`方法，因为子类没有自身的`this`对象，而是继承父类的`this`对象并对其进行加工，
而`super`虽然代表了父类的构造函数，但返回的是子类的实例，即内部的`this`指向子类，
因为`super()`相当于`Parent.prototype.constructor.call(this,props)`**

`super`关键字，既可以当作函数使用，也可以当作对象使用

`super`当函数使用

```js
class Parent {
    getX() {
        return 2;
    }
}
class Child extends Parent {
    constructor() {
        // es6要求，子类的构造函数必须执行一次super函数，否则会报错
        super();
    }
}
```

`super`当对象使用
通过`super`调用父类的方法时，super 会绑定子类的`this`

```js
class Graphics {
    constructor() {
        this.centerPoint = [10, 20];
    }
    getCenterPoint() {
        return this.centerPoint;
    }
}
class Rect extends Graphics {
    constructor() {
        super();
        this.centerPoint = [5, 10];
    }
    getCenterPoint() {
        return super.getCenterPoint();
    }
}
const rect = new Rect();
rect.getCenterPoint(); // [5, 10]
```
