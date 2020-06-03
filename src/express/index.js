'use strict';

const express = require(`express`);
const offersRoutes = require(`./routes/offers`);
const myRoutes = require(`./routes/my`);
const mainRoutes = require(`./routes/main`);


const app = express();
const port = 8080;


app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);

app.listen(port);
