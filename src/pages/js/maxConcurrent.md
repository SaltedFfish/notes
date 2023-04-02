# 控制请求的最大并发量（处理并发请求）

```js
class Concurrent {
    maxConcurrent = 2;
    list = [];
    current = 0;

    constructor(count = 2) {
        this.maxConcurrent = count;
    }
    async add(fn) {
        this.current += 1;
        if (this.current > this.maxConcurrent) {
            const wait = new Promise((resolve) => {
                this.list.push(resolve);
            });
            await wait;
        }
        await fn();
        this.current -= 1;
        if (this.list.length) {
            const resolveHandler = this.list.shift();
            resolveHandler();
        }
    }
}
```

实例

```js
const timeout = (timeout, value) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, timeout);
    });
};

async function run() {
    const concurrent = new Concurrent();
    concurrent.add(() => timeout(1000, 1));
    concurrent.add(() => timeout(300, 2));
    concurrent.add(() => timeout(400, 3));
    concurrent.add(() => timeout(500, 4));
    concurrent.add(() => timeout(200, 5));
}

run()
```
