const http = require('http')
const fs = require('fs')
const url = require('url')
const { parse } = require('querystring')
const port = process.argv[2]

if (!port) {
    process.exit(1)
}

let server = http.createServer((request, response) => {
    let parseUrl = url.parse(request.url, true)
    let path = parseUrl.pathname
    console.log("url path =", path)
    if (path === "/") {
        path = "/index.html"
    }
    let extname = path.split('.').pop();
    console.log("url extname =", extname)
    let map = {
        'html': 'text\html;charset=utf-8',
        'css': 'text\css;charset=utf-8',
        'js': 'text\javascript;charset=utf-8'
    }

    response.statusCode = 200
    response.setHeader('Content-Type', `${map[extname] || "text\html"};charset=utf-8`)
    let content
    try {
        content = fs.readFileSync(`./public${path}`)
    } catch (error) {
        content = "file not exist"
        response.statusCode = 404
    }
    response.write(content)
    response.end()
})

server.listen(port)
console.log('server http://localhost:' + port)