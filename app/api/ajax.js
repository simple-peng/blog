/*
将ajax数据接入mongodb
 */
let Router= require('./router');
let {db_saveBlog,db_saveCategory,
     db_findCategory,db_getBlogDetail,
     db_getBlogList,db_deleteBlog} = require('./mongo');
//分类查询
Router.get('/categoryList.action',(ctx)=>{
  let {query} =ctx.reqCtx;
  return db_findCategory()
});
//添加分类
Router.post('/category.action',ctx=>{
  let {body} = ctx.reqCtx;
  return db_saveCategory(body)
});
//添加博客
Router.post('/blog.action',ctx=>{
  let {body} = ctx.reqCtx;
  return db_saveBlog(body)
});
//博客详情页
Router.get('/blogDetail.action',ctx=>{
  let {query} =ctx.reqCtx;
  return db_getBlogDetail(query)
});
//获取博客列表
Router.get('/blogList.action',ctx=>{
  let {query} =ctx.reqCtx;
  return db_getBlogList(query)
});
//删除博客
Router.post('/deleteBlog.action',ctx=>{
  let {body} =ctx.reqCtx;
  return db_deleteBlog(body)
});

module.exports=Router;