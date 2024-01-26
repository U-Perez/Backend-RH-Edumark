import App from "./config/config.js";
const port = process.env.APP_PORT;

App.http.listen(port, () =>
  console.log("Serve ejecutando en el puerto:", port)
);
