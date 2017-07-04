/*
*与数据库交互的路由模块
 */
class Router{
  constructor(){
    this.routeMap={
      'get':{},
      'post':{}
    }
  }
  get(pathname,handle){
     let getRoute = this.routeMap.get;
     getRoute[pathname] = handle;
  }
  post(pathname,handle){
    let postRoute = this.routeMap.post;
    postRoute[pathname]=handle;
  }
  routers(ctx){
    let {method,pathname} = ctx.reqCtx;
    let handle = this.routeMap[method][pathname];

    if (method == 'get' || method == 'post') {
      if (handle) {
        return Promise.resolve(handle(ctx))
      } else {
        Promise.resolve();
      }
    }else{
      Promise.resolve();
    }
  }
}
module.exports=new Router;