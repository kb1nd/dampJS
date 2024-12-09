const dep = {
  ws: import("ws"),
  fs: import("fs"),
  http: import("http"),
  ejs: import("ejs"),
  cache: import("cache-manager"),
  mysql: import("easy-mysql-js"),
}
const cache = dep.cache.createCache({
  ttl: 10000,
  refreshThreshold: 0,
});
const port = process.env.PORT || 3001;
async function evaluate(db, body) {
  switch (body.method) {
    case "PAYLOAD": {
      let key = "test";
      await cache.set(key, body.payload);
    }
    case "COLLECT":
      return await cache.get(body.sec);
  }
}
async function handle(req, res) {
  let header = {};
  const db = await mysql.Select("select * from license");
  const body = JSON.parse(req.body);
  dep.fs.readFileSync("index.ejs", { encoding: "utf8" }, (data) => {
    header = {
      "type": "text/html",
      "body": dep.ejs.render(data, { test: "hello world" }, { async: true }),
    };
  });
  switch (req.method.includes("POST") && db.find((key, id) => body.sec)) {
    case true:
      header = {
        type: "application/json",
        body: evaluate(db, body),
      };
  res.writeHeader(200, { "Content-Type": header.type });
  res.write(header.body);
  res.end();
}
const server = dep.http.createServer((req, res) => handle(req, res));
server.listen(port);
