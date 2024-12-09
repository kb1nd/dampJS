const dep = {
  ws: import("ws"),
  fs: import("fs"),
  http: import("http"),
  ejs: import("ejs"),
  cache: import("cache-manager"),
  redis: import("redis")
}
const cache = dep.cache.createCache({
  ttl: 10000,
  refreshThreshold: 0,
});
const db = await dep.redis.createClient({
  url: process.env.REDIS
})
  .on('error', err => console.log('Redis Client Error', err))
    .connect();
const port = process.env.PORT || 3001;
function handle(req) {
  if(JSON.parse(dep.fs.readFileSync("cache.json")).find((id) => JSON.parse(req.body).id)) return JSON.stringify(JSON.parse(dep.fs.readFileSync("cache.json")).find((id) => event.data).clients);
}
const server = dep.http.createServer((req, res) => {
  dep.fs.readFileSync("index.ejs", {encoding: 'utf8'}, (data) => {
    let header = {
      "type":"text/html",
      "body": dep.ejs.render(data,
      {
        test: "hello world"
      },
      {
        async: true
      })
    };
    if(req.method.includes("POST")) header = {"type":"application/json","body":handle(req)};
    res.writeHeader(200, {"Content-Type": header.type});
    res.write(header.body);
    res.end();
  });
});
const wss = new dep.ws.WebSocketServer({ server: server });
wss.on("connecton", (ws) => {
  ws.on("message", (event) => {
    const data = JSON.parse(dep.fs.readFileSync("cache.json"));
    if(!data[JSON.parse(event.data).id].clients[JSON.parse(event.data).id].find((data) => JSON.parse(event.data).body) && JSON.parse(event.data).method.includes("payload")) data[JSON.parse(event.data).id].clients[JSON.parse(event.data).id].append(JSON.parse(event.data).body);
    dep.fs.writeFileSync("cache.json",JSON.stringify(data));
  });
});
server.listen(port);
