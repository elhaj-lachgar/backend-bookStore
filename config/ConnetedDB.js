const mongoose = require("mongoose");

function ConnectedDB() {
  mongoose
    .connect(process.env.DATA_BASE_URL)
    .then((conx) => {
      console.log(conx.connection.host, "connected db");
    })
    .catch((err) => console.log(err));
}

module.exports = ConnectedDB;
