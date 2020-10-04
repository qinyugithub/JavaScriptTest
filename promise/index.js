const MyPromise = require('./promise');

var promise = new MyPromise((resolve, reject) => {
    // setTimeout(function(){
    //     resolve("ok");
    // },2000)
    // throw Error("error");
    // reject('shibai');
    resolve('qinyu');
});

promise.then((res) => {
    console.log("成功的结果1" + res);
    return new MyPromise((resolve, reject) => {
        setTimeout(function () {
            resolve("HH");
        }, 1000)
    });
}, (reason) => {
    console.log("失败的结果1" + reason);
}).then((res) => {
    console.log("成功的结果2" + res);
}, (reason) => {
    console.log("失败的结果2" + reason);
});