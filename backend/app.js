require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const router = require("./routers");
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
