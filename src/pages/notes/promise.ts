function typeOf(type, value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
}

function isFunction(value: any): boolean {
    return typeOf("Function", value);
}

function isObject(value: any): boolean {
    return typeOf("Object", value);
}

function resolvePromise(promise, x, resolve, reject) {
    // 可能promise和x是同一个对象，可能会死循环
    if (x === promise)
        return reject(new TypeError("该promise和返回值是一样的"));

    if (x instanceof MyPromise) {
        queueMicrotask(() => {
            x.then((y) => {
                resolvePromise(promise, y, resolve, reject);
            }, reject);
        });
    } else if (isObject(x) || isFunction(x)) {
        // 对象和函数上才可能会有then属性
        let called = false;

        try {
            const then = x.then;

            // 防止resolve里面还是promise
            if (isFunction(then)) {
                then.call(
                    x,
                    (value) => {
                        if (called) return;
                        called = true;

                        resolvePromise(promise, value, resolve, reject);
                    },
                    (reason) => {
                        if (called) return;
                        called = true;
                        reject(reason);
                    }
                );
            } else {
                // resolve的参数是个简单类型
                resolve(x);
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error);
        }
    } else {
        // 简单类型直接返回结果
        resolve(x);
    }
}

// 一开始的promise里面有个定时器2s后执行resolve，
// 假设有个需求1s后停止执行让promise的状态变成失败，不执行2s后的resolve
/**
 * let p = new Promise(resolve => {
 *      setTimeout(() => resolve('success'), 2000);
 * })
 * // p = useAbort(p)  // 包裹一层后有reject
 * setTimeout(() => p.abort('fail'), 1000);
 * p.then((res) => {}, (err) => {})
 */
function useAbort(promise: Promise<any>) {
    let reject;
    const _promise = new MyPromise((resolve, reject) => {
        reject = reject;
    });

    const racePromise: any = MyPromise.race([promise, _promise]);
    racePromise.abort = reject;

    return racePromise;
}

class MyPromise {
    static PENDING = "pending";
    static REJECTED = "rejected";
    static FULFILLED = "fulfilled";

    status = MyPromise.PENDING; // 默认状态pending
    value = null;

    // promise调用then时状态可能为pending，需要将成功和失败的函数放置对应的数组中
    // 当调用resolve时则触发onResolvedCallbacks
    // 调用reject时则触发onRejectedCallbacks
    onResolvedCallbacks: Function[] = [];
    onRejectedCallbacks: Function[] = [];

    constructor(executor: Function) {
        this.status = MyPromise.PENDING;

        // 状态改变之前如果代码有问题则直接reject
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    public resolve(value) {
        if (this.status === MyPromise.PENDING) {
            this.status = MyPromise.FULFILLED;
            this.value = value;
            this.onResolvedCallbacks.forEach((cb) => cb());
        }
    }

    public reject(reason) {
        if (this.status === MyPromise.PENDING) {
            this.status = MyPromise.REJECTED;
            this.value = reason;
            this.onRejectedCallbacks.forEach((cb) => cb());
        }
    }

    static resolve(value) {
        if (value instanceof MyPromise) return value;

        return new MyPromise((resolve) => {
            resolve(value);
        });
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        });
    }

    // all全部成功才成功，有一个失败直接失败
    static all(promises: any[] = []) {
        let times: number = 0;
        const arr: any[] = [];
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                const current = promises[i];
                MyPromise.resolve(current).then((res) => {
                    arr[i] = res;
                    ++times;
                    if (times === promises.length) {
                        resolve(arr);
                    }
                }, reject);
            }
        });
    }

    // 有一个成功就成功，有一个失败就失败
    static race(promises: any[] = []) {
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                MyPromise.resolve(promises[i]).then(resolve, reject);
            }
        });
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    then(onFufilled?, onRejected?) {
        // then中的两个函数可以传null或者可以不传onRejected，包装成函数
        if (!isFunction(onFufilled)) {
            onFufilled = (value) => value;
        }
        if (!isFunction(onRejected)) {
            onRejected = (reason) => {
                throw reason;
            };
        }

        // queueMicrotask 微任务
        const promise = new MyPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        // 获取上一次的成功的值可能还是promise
                        const x = onFufilled(this.value);
                        resolvePromise(promise, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            };

            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.value);
                        resolvePromise(promise, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            };

            if (this.status === MyPromise.FULFILLED) {
                fulfilledMicrotask();
            } else if (this.status === MyPromise.REJECTED) {
                rejectedMicrotask();
            } else {
                this.onResolvedCallbacks.push(fulfilledMicrotask);
                this.onRejectedCallbacks.push(rejectedMicrotask);
            }
        });

        return promise;
    }
}
