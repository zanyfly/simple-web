const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2]

if (!port) {
    throw 'port is necessary!';
}

let server = http.createServer((request, response) => {
    let parsedUrl = url.parse(request.url, true)
    let path = parsedUrl.pathname
    console.log("request: " + request.url)
    if (path === '/index.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        let string = fs.readFileSync('public/index.html').toString()
        response.write(string)
        response.end()
    } else if (path === '/my.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        let string = fs.readFileSync('public/my.html').toString()
        response.write(string)
        response.end()
    } else if (path === '/main.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/main.js'))
        response.end()
    } else if (path === '/style.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('public/style.css'))
        response.end()
    } else if (path === '/my.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/my.js'))
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`404 Not Found`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)