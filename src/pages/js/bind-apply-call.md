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
