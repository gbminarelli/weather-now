const mime = require("./mime-lookup.js");
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const axios = require("axios");

const hostname = "127.0.0.1";
const port = 3000;

let API_KEY = "";

/* NOTE: The application is small and simple enough in my oppinion to justify
using vanilla Node (i.e. without Express or similar frameworks). */

const getKey = () => {
  fs.readFile(
    /* NOTE: Before running the app, make sure to create the "api-key.txt" file,
    place it inside of the "server" folder (where this "server.js" file is)
    and copy and paste your own API Key (https://openweathermap.org/appid)
    inside of said text file. It should be a small string, no spaces or line breaks. */
    path.join(__dirname, "api-key.txt"),
    "utf8",
    (error, data) => {
      if (error) {
        console.error(error);
      } else {
        API_KEY = data;
        console.log(`API Key: ${data}`);
      }
    }
  );
};

const readFile = (req, res, filename = req.url) => {
  fs.readFile(path.join(__dirname, "..", filename), (error, data) => {
    if (error) {
      // TODO: I might want to handle the error a little better.
      res.writeHead(404);
      res.end(JSON.stringify(error));
    } else {
      res.setHeader("Content-Type", mime.lookup(path.extname(filename)));
      res.writeHead(200);
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  if (req.url === "/") {
    readFile(req, res, "index.html");
  } else if (url.parse(req.url).pathname === "/v1/weather") {
    /* NOTE: I'm not parsing query parameters (using the querystring module) because
    the app is expecting one (and only one) parameter (the name of the city).
    I understand this does make the app, in a way, less scalable but it also
    simplifies a lot its current (first release) version (e.g. we don't have to
    sanitize the query as much, checking for example if the user changed the
    URL manually and used the wrong key or added additional properties not expected
    or properly processed by the app). */
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${url
          .parse(req.url)
          .query.toLowerCase()}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        res.writeHead(response.status, {
          "Content-Type": "text/plain; charset=utf8",
        });
        res.end(JSON.stringify(response.data));
      })
      .catch((error) => {
        /* NOTE: I want to delegate the API error handling to the front and not
        limit the application's ability to react to those errors by blocking them
        here. One good example is the 404 error, that should be known and dealt
        with by the application's front-end. */
        res.writeHead(error.response.status, {
          "Content-Type": "text/plain; charset=utf8",
        });
        res.end();
      });
  } else {
    // Other resources:
    readFile(req, res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  getKey();
});
