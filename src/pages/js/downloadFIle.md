## `a`标签下载

```js
function download(url, fileName) {
    const a = document.createElement("a");
    a.style.display = "none";
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
```

## `URL.createObjectURL(blob)`下载

```js
function download(blob, fileName) {
    const blob = new Blob([blob]); // 文件转化成二进制文件
    const objectURL = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectURL;
    a.download = fileName || new Date().getTime();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(href);
}
```

## `FileReader.readAsDataURL(blob)`下载

```js
function download(blob, fileName) {
    const reader = new FileReader();
    reader.readAsDataURL(blob); // 将文件读取为Data URL
    reader.onload = (e) => {
        const a = document.createElement("a");
        a.download = fileName;
        a.style.display = "none";
        a.href = e.target.result; // reader.result生成的base64编码
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
}
```

> **重要提示：FileReader 仅用于以安全的方式从用户（远程）系统读取文件内容 它不能用于从文件系统中按路径名简单地读取文件。要在 JavaScript 中按路径名读取文件，应使用标准 Ajax 解决方案进行服务器端文件读取，如果读取跨域，则使用 CORS 权限。具体查看：[web worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)**

## `URL.createObjectURL(blob)` 与 `FileReader.readAsDataURL(file)` 的区别

**执行方式**

-   `URL.createObjectURL(blob)`是`同步`的
-   `FileReader.readAsDataURL(file)`是`异步`的

**返回值**

-   FileReader.readAsDataURL(file)返回 `data:base64` 字符串
-   URL.createObjectURL(blob)返回当前文件的内存 `URL`

**内存**

-   `FileReader.readAsDataURL(file)`依照 `js垃圾回收机制`自动从内存中清理
-   `URL.createObjectURL(blob)`一直存在于当前 document 内存中，直到 document 触发了 unload 事件（例如：`document close`）或通过 `URL.revokeObjectURL(blob)` 来释放
