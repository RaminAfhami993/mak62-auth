const express =  require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/config');
const apiRouter = require('./routes/api')




mongoose.connect(config.mongoURL)

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use('/api', apiRouter)



app.listen(5005);
console.log("App is running on port 5005 ...");