const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const PORT = require("./config")
const cors = require('cors')
const bodyParser = require('body-parser')

//Importando rutas // importing routes
const routes = require("./routes");

//configuración //settings
app.set("port", PORT);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(cors())

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//rutas //routes
app.use("/", routes);

//Static files // Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//Starting the server // Empezando el servidor
app.listen(app.get("port"), () => {
  console.log(`Serve on port ${PORT}`);
});
