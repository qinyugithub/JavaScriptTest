const PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED';
const resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) {
        reject(new TypeError("类型错误"));
    }

    try {
        if (typeof (x) === 'object' && x !== "null") {
            if (typeof (x.then) === 'function') {  //返回的promise对象
                x.then((res) => {
                    resolvePromise(promise2, res, resolve, reject);
                })
            } else {
                resolve(x);
            }
        } else {
            resolve(x);
        }
    } catch (e) {
        reject(e);
    }


}
class MyPromise {

    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        this.onResolveCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (val) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = val;
                this.onResolveCallbacks.forEach((item) => {
                    item();
                });
            }
        }

        const reject = (val) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = val;
                this.onRejectedCallbacks.forEach((item) => {
                    item();
                });
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        const promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                })
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                })
            }
            if (this.status === PENDING) {
                //订阅
                this.onResolveCallbacks.push(() => {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                })
                this.onRejectedCallbacks.push(() => {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                })
            }
        });
        return promise2;
    }
}
module.exports = MyPromise;