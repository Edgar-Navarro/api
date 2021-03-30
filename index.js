require('./config/db');
const express = require('express');
const engines = require("consolidate");
require('dotenv').config({path: 'variables.env'});
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

const server = app.listen(port,host, () =>{
    console.log(`servidor puerto ${port} host ${host}`);
})
const Sock = require('socket.io');
const io = Sock(server);

const routes = require('./routes/index')(io);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(cors());

app.use('/', routes);
app.use(express.static('public'));


