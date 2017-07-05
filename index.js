/*
*@author pingtingpeng
*2017.06.25
 */
const http = require('http');
const PORT =7000;
// const PORT =process.env.PORT||5000;
const App = require('./app');
let app = new App();
const staticServer  = require('./app/static-server');
const apiServer = require('./app/api');
const urlparser=require('./app/url-parser');
const viewServer=require('./app/view-server');
const cookieparser=require('./app/cookie-parser');
app.use(cookieparser);
app.use(urlparser);
app.use(apiServer);
app.use(staticServer);
app.use(viewServer);

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogDB');
// mongoose.connect('mongodb://pingtingpeng:pptmlab0107y@ds147902.mlab.com:47902/blog')
mongoose.connection.on('error',(error)=>{
  console.log(`db connection Error`);
})
mongoose.connection.once('open',()=>{
  console.log(`db connection success`);
})
http.createServer(app.initServer()).listen(PORT,()=>{
  console.log(`server listening on port ${PORT}`)
})