/*
*模板引擎动态渲染
 */
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const urlrewriteMap = require('./urlrewrite');
module.exports = (ctx)=>{
  return Promise.resolve({
    then:(resolve,reject)=>{
      let {pathname} = ctx.reqCtx;
      let {resCtx} = ctx;
      if (!pathname.match(/\./) && !pathname.match('action')) {
        let ejsname = urlrewriteMap[pathname];
        let staticPath = path.resolve(__dirname, 'ejs');
        if (ejsname) {
          let layoutPath = path.resolve(staticPath, 'layout.ejs');
          let layoutHtml = fs.readFileSync(layoutPath, 'utf8');
          // let templateStr = fs.readFileSync(path.resolve(staticPath, ejsname + '.ejs'), 'utf8');
          let render = ejs.compile(layoutHtml, {
            filename:layoutPath,
            debugger: true
          })
          resCtx.body = render({
            template: ejsname,
            hasUser:resCtx.hasUser
          });
          // resCtx.headers=Object.assign(resCtx.headers,{'Content-Type':mime.lookup(ejsname)});
          resolve();
        } else {
          //重定向
          resCtx.headers=Object.assign(resCtx.headers,{
            Location:'/'
          })
          resCtx.statusCode=302;
          resCtx.statusMessage='redirect';
          resCtx.body='';
          resolve();
        }
      } else {
        resolve()
      }
    }
  })
}