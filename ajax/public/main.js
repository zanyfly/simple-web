gethtml.onclick = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "my.html");
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            const div = document.createElement('div')
            div.innerHTML = request.response
            document.body.appendChild(div)
        } else {
            console.log(request.response)
        }
    }
    request.send();
};
getjs.onclick = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "/my.js");
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            const script = document.createElement("script");
            script.innerHTML = request.response;
            document.body.appendChild(script);
        }
    };
    request.send();
};

getcss.onclick = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "/app1.css"); // readyState = 1
    request.onreadystatechange = () => {
        console.log(request.readyState);
        // 下载完成，但不知道是成功 2xx 还是失败 4xx 5xx
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                // 创建 style 标签
                const style = document.createElement("style");
                // 填写 style 内容
                style.innerHTML = request.response;
                // 插到头里面
                document.head.appendChild(style);
            } else {
                alert("加载 CSS 失败");
            }
        }
    };
    request.send(); // readyState = 2
};