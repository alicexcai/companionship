const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

/*
* special settings
*/
// websocket
// const webSocket = require("./socket");

// mongoDB connection
// const mongoose = require("mongoose");
// const {MONGO_ID, MONGO_PASSWORD, MONGO_APPNAME, NODE_ENV} = process.env;
// const MONGO_URL = `mongodb+srv://${MONGO_ID}:${MONGO_PASSWORD}@${MONGO_APPNAME}-gbvll.mongodb.net/test?retryWrites=true&w=majority`;
// const connect = mongoose.connect(MONGO_URL, {
//     useNewUrlParser: true, useUnifiedTopology: true,
//     useCreateIndex: true, useFindAndModify: false
// })
// .then(() => console.log('MongoDB Connected...'))
// .catch(err => console.error(err));

/*
* use
*/

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'webapp/build')));

// routing
// const indexRouter = require("./routes");
// const authRouter = require("./routes/auth");
// app.use('/api', indexRouter)
// app.use('/api', authRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/webapp/build/index.html'));
});


/*
* run server and connect with webSocket
*/
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
// webSocket(server, app);