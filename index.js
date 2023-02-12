'use strict';
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const blogroutes = require('./routes/blog-routes');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use('/api', blogroutes.routes);



app.listen(3000, () => console.log('App is listening on url http://localhost:' + 3000));
