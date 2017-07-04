/*
*静态资源
 */
const path = require('path');
const fs = require('fs');
const mime = require('mime');
let staticServer = (ctx) => {
  let {pathname}= ctx.reqCtx;
  let {resCtx} =ctx;
  let getPath=(pathname)=>{
    return path.resolve(process.cwd(),`public`,`.${pathname}`);
  }

  return Promise.resolve({
    then: (resolve, reject) => {
      if (!pathname.match('action')&&pathname.match(/\./)) {

        let _path = getPath(pathname);

        fs.readFile(_path, (err, data) => {
          if (err) {
            data = `NOT FOUND ${err.stack}`;
          }
          resCtx.body = data;
          resCtx.headers=Object.assign(resCtx.headers,{'Content-Type':mime.lookup(pathname)});
          resolve();

        })
      }else{

      resolve();
      }
    }
  })
}
module.exports=staticServer;