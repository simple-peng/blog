/*
*处理ajax请求
 */

let Router= require('./ajax');


let apiServer = (ctx) => {
  let {method} = ctx.req;
  let {pathname} = ctx.reqCtx;
  let {reqCtx,resCtx,res} = ctx;

  method = method.toLowerCase();
  return Promise.resolve({

    then: (resolve,reject) => {
      if (pathname.match('action')) {

      return Router.routers(ctx).then(val=>{
        console.log('val:'+val);
         resCtx.body=JSON.stringify(val);
         resCtx.headers = Object.assign(resCtx.headers, {
          'Content-Type': 'application/json'
        });
         resolve();
      })
    }else{
      resolve();
    }
      // if (pathname.match('action')) {
      //   if (method == 'get') {
      //     resCtx.body = JSON.stringify(apiMap[pathname]);
      //     // return Promise.resolve();
      //   } else {

      //     resCtx.body = JSON.stringify(reqCtx.body);
      //   }
      //   // res.setHeader(
      //   //   'Content-Type', 'application/json'
      //   // );
      //   resCtx.headers = Object.assign(resCtx.headers, {
      //     'Content-Type': 'application/json'
      //   });
      // }
      // resolve();
    }
  })
}
module.exports=apiServer;