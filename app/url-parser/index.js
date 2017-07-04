/*
*处理post数据
 */
const Url = require('url');

module.exports = (ctx)=>{
  let {method,url}=ctx.req;
  let {reqCtx}=ctx;
  method=method.toLowerCase();
  reqCtx = Object.assign(reqCtx,Url.parse(url,true),{method});
  return Promise.resolve({
    then: (resolve, reject) => {
      let data = [];
      if (method == 'post') {
        ctx.req.on('data', (chunk) => {
          data.push(chunk);
        }).on('end', () => {
          let endData = Buffer.concat(data).toString();
          reqCtx.body=JSON.parse(endData);
          resolve();
        })
      }else{
        resolve();
      }
    }
  })
}