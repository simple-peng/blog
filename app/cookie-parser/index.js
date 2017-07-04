/*
*设置登入登出
 */
const cookie_parser = require('cookie');
const whiteNameList = ['pingtingpeng'];
module.exports=(ctx)=>{
   return Promise.resolve({
     then:(resolve,reject)=>{
      let {url}=ctx.req;
      let {res,resCtx} = ctx;
      let {cookie} = ctx.req.headers;
      let cookieObj = cookie_parser.parse(cookie||'');
      let setExp=(time)=>{return `user=true;Max-Age=${time}`}
      if(cookieObj['user']){
        resCtx.hasUser = true;
        res.setHeader('Set-Cookie',setExp(3600));
      }
      if (url.indexOf(whiteNameList) > -1) {
        res.setHeader('Set-Cookie',setExp(3600));
      }

      if(url=='/logout'){
        res.setHeader('Set-Cookie',setExp(0));
      }
      resolve();
     }
   })
}