class App{
  constructor() {
    this.middlewareArr=[];
    this.middlewareChain=Promise.resolve();
  }
  use(middleware){
    this.middlewareArr.push(middleware);
  }
  composeMiddleware(context){
    let {middlewareArr}=this;
    for(let middleware of middlewareArr){
       this.middlewareChain = this.middlewareChain.then(()=>{
          return middleware(context);
       })

    }
    return this.middlewareChain
  }
  initServer() {
    return(req, res) => {
      let ctx={
        req:req,
        reqCtx:{
          body:'',//post请求的数据
          query:'',//处理客户端get请求
        },
        res:res,
        resCtx:{
          hasUser:false,
          statusCode:200,
          statusMessage:'resolve ok',
          headers:{'X-Powered-By': 'node.js'},
          body:''
        }
      }
      // let Header = {};
      this.composeMiddleware(ctx).then(()=>{
          let {res,resCtx} = ctx;
          let {body,statusCode,statusMessage,hasUser} = ctx.resCtx;
          // let baseHeader ={'X-Powered-By':'node.js'};

           //  if (ctx.resCtx.body instanceof Buffer) {
           //    res.writeHead(200, 'resolve ok', Header)
           //    res.end(ctx.resCtx.body);
           //  }else{
          // resCtx.headers = Object.assign(resCtx.headers, {
          //     'X-Powered-By': 'node.js'
          // });
          res.writeHead(statusCode, statusMessage,resCtx.headers);
          res.end(body);
           //    res.end(ctx.resCtx.body);
           // }
        })
    }
  }
}
module.exports=App;