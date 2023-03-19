# call

```js
function readomStr() {
    return Math.random().toString(36).slice(2, 6) + new Date().getTime();
}

Function.prototype._call = function (context) {
    if (
        (typeof context !== "object" && typeof context !== "function") ||
        context == null
    )
        return;
    var prop = readomStr();
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    context[prop] = this;
    var res = eval("context[prop](" + args + ")");
    delete context[prop];
    return res;
};

function test(a, b) {
    return a + b;
}

const cases = [
    test.call({}, 1, 2),
    test.call(function () {}, 1, 2),
    test._call({}, 1, 2),
    test._call(function () {}, 1, 2),
];
```

# apply

```js
function readomStr() {
    return Math.random().toString(36).slice(2, 6) + new Date().getTime();
}

Function.prototype._apply = function (context) {
    if (
        (typeof context !== "object" && typeof context !== "function") ||
        context == null
    )
        return;
    var prop = readomStr();
    var args = [];
    if (arguments[1]) {
        for (var i = 0; i < arguments[1].length; i++) {
            args.push(arguments[1][i]);
        }
    }
    context[prop] = this;
    var res = eval("context[prop](" + args + ")");
    delete context[prop];
    return res;
};

function test(a, b) {
    return a + b;
}

const cases = [
    test.apply({}, [1, 2]),
    test.apply(function () {}, [1, 2]),
    test._apply({}, [1, 2]),
    test._apply(function () {}, [1, 2]),
];
```

# bind

### `bind`的用法

```js
// bind用法的一种
function test(a, b) {
    return a + b;
}

const bindCases = [
    test.bind({}, 1, 2),
    test.bind({}, 1)(2),
    test.bind({})(1, 2),
];
console.log(bindCases);

// bind用法的另一种
function Book(name, author) {
    this.name = name;
    this.author = author;
}
Book.prototype.getAuthor = function () {
    return this.author;
};
const Book1 = Book.bind({});
const book = new Book1("js从入门到精通", "小明");
console.log(Book1.prototype === Book.prototype, book.getAuthor());
```

### 实现

```js
Function.prototype._bind = function (context) {
    var fn = this;
    var args = Array.prototype.slice.call(arguments, 1);

    function target() {
        console.log("target.this", this);
        var innerArgs = Array.prototype.slice.call(arguments);
        return fn.apply(context, args.concat(innerArgs));
    }

    // 这一段待修改
    function Buffer() {}
    Buffer.prototype = fn.prototype;
    target.prototype = new Buffer();

    return target;
};

function test(a, b) {
    return a + b;
}

const cases = [
    test._bind({}, 1, 2)(),
    test._bind({})(1, 2),
    test._bind({}, 1)(2),
];

function Book(name, author) {
    this.name = name;
    this.author = author;
}
Book.prototype.getAuthor = function () {
    return this.author;
};
const Book1 = Book._bind({});
const book = new Book1("js从入门到精通", "小明");
console.log(Book1.prototype === Book.prototype, book.getAuthor());
```
