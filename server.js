const dep = {
  ws: import("ws"),
  fs: import("fs"),
  http: import("http"),
  ejs: import("ejs"),
  cache: import("cache-manager"),
  mysql: import("easy-mysql-js"),
};
const cache = dep.cache.createCache({
  ttl: 10000,
  refreshThreshold: 0,
});
const port = process.env.PORT || 3001;
async function evaluate(db, body) {
  switch (body.method) {
    case "PAYLOAD": {
      await cache.set(
        db.find((license) => license.id === body.sec).key,
        body.payload,
      );
      break;
    }
    case "COLLECT":
      return await cache.get(body.sec);
      break;
  }
}
async function handle(req, res) {
  let header;
  const db = await mysql.Select("select * from license");
  const body = JSON.parse(req.body);
  switch (req.method.includes("POST")) {
    case true:
      Object.assign(header, {
        type: "application/json",
        body: evaluate(db, body),
      });
      break;
    case false:
      dep.fs.readFileSync("views/index.ejs", { encoding: "utf8" }, (data) => {
        Object.assign(header, {
          type: "text/html",
          body: dep.ejs.render(data, {}, { async: true }),
        });
      });
      break;
  }
  res.writeHeader(200, { "Content-Type": header.type });
  res.write(header.body);
  res.end();
}
const server = dep.http.createServer((req, res) => handle(req, res));
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
