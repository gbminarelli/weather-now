const path = require("path");

/* NOTE: Update on demand or just add the comprehensive list of supported
mime types if you really don't want to ever open this file again. */

const mime = {
  lookup: (extname) => {
    mimeType = "text/plain";
    if (extname === ".html") {
      mimeType = "text/html";
    } else if (extname === ".css") {
      mimeType = "text/css";
    } else if (extname === ".js" || extname === ".mjs") {
      mimeType = "text/javascript";
    }
    return mimeType;
  },
};

module.exports = mime;
