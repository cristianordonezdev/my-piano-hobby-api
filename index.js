"use strict";

const app = require("./app");
const port = 3500;

app.listen(port, () => {
  console.log(`Servidor corriendo en mi http://localhost:${port}`);
});
