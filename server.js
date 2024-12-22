// TODO: download text data from gist source and convert it to html file, implement logic to find the license key appended to the license id
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
      let key = "logic to find the license key associated with the license id";
=======
      let key = "test";
>>>>>>> 2ec0064d5e350fd4a7e9cd406de4097a5acbb864
      await cache.set(key, body.payload);
    }
    case "COLLECT":
      return await cache.get(body.sec);
  }
}
async function handle(req, res) {
  let header = {};
<<<<<<< HEAD
  const db = await mysql.Select("select * from licenses");
  const body = JSON.parse(req.body);
  dep.fs.readFileSync("index.ejs", { encoding: "utf8" }, (data) => {
    header = {
      type: "text/html",
      body: dep.ejs.render(data, { test: "hello world" }, { async: true }),
=======
  const db = await mysql.Select("select * from license");
  const body = JSON.parse(req.body);
  dep.fs.readFileSync("index.ejs", { encoding: "utf8" }, (data) => {
    header = {
      "type": "text/html",
      "body": dep.ejs.render(data, { test: "hello world" }, { async: true }),
>>>>>>> 2ec0064d5e350fd4a7e9cd406de4097a5acbb864
    };
  });
  switch (req.method.includes("POST") && db.find((key, id) => body.sec)) {
    case true:
      header = {
        type: "application/json",
        body: evaluate(db, body),
      };
<<<<<<< HEAD
  }
=======
>>>>>>> 2ec0064d5e350fd4a7e9cd406de4097a5acbb864
  res.writeHeader(200, { "Content-Type": header.type });
  res.write(header.body);
  res.end();
}
const server = dep.http.createServer((req, res) => handle(req, res));
server.listen(port);
