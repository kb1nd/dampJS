const dep = {
  ws: import("ws"),
  fs: import("fs"),
  http: import("http"),
  ejs: import("ejs"),
  cache: import("cache-manager"),
  mysql: import("easy-mysql-js"),
<<<<<<< HEAD
};
=======
}
>>>>>>> 2ec0064d5e350fd4a7e9cd406de4097a5acbb864
const cache = dep.cache.createCache({
  ttl: 10000,
  refreshThreshold: 0,
});
const port = process.env.PORT || 3001;
async function evaluate(db, body) {
  switch (body.method) {
    case "PAYLOAD": {
<<<<<<< HEAD
      await cache.set(
        db.find((license) => license.id === body.sec).key,
        body.payload,
      );
=======
      let key = "test";
      await cache.set(key, body.payload);
>>>>>>> 2ec0064d5e350fd4a7e9cd406de4097a5acbb864
    }
    case "COLLECT":
      return await cache.get(body.sec);
  }
}
async function handle(req, res) {
<<<<<<< HEAD
  let header;
  const db = await mysql.Select("select * from license");
  const body = JSON.parse(req.body);
  switch (req.method.includes("POST") && db.find((key, id) => body.sec)) {
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
=======
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
>>>>>>> 2ec0064d5e350fd4a7e9cd406de4097a5acbb864
  res.writeHeader(200, { "Content-Type": header.type });
  res.write(header.body);
  res.end();
}
const server = dep.http.createServer((req, res) => handle(req, res));
<<<<<<< HEAD
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
=======
server.listen(port);
>>>>>>> 2ec0064d5e350fd4a7e9cd406de4097a5acbb864
