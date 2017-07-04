const mongoose = require('mongoose');
const assert = require('assert');
const {blogSchema,categorySchema} = require('./schema');
let BlogModel =mongoose.model('Blog',blogSchema);
let CategoryModel =mongoose.model('Category',categorySchema);

exports.db_findCategory = (query)=>{
  return CategoryModel.find(query).exec().then(_categoryList=>{
    return{
      status:1,
      data:_categoryList||[]
    }
  })
}
exports.db_saveCategory  = (category)=>{
  return CategoryModel.findOneAndUpdate({category:category.name},category,{upsert:true,new:true}).then((_category)=>{
     return{
      status:1,
      data:_category//如果是塞入新数据insert，默认data为null,必须设置new为true;如果是update，则有data
     }
  })
};
//或者
//   exports.db_saveCategory = (category)=>{
//   return new CategoryModel(category).save().then((_category)=>{
//     return{
//       status:1,
//       data:_category
//     }
//   })
// }
exports.db_saveBlog=(blog)=>{
  return BlogModel.findOneAndUpdate({title:blog.title},blog,{upsert:true,new:true}).then((_blog)=>{
    return{
      status:1,
      data:_blog//如果是塞入新数据，默认data为null,必须设置new为true
     }
  })
}
exports.db_getBlogDetail=(query)=>{
  debugger
  let {id} =query;
  id=mongoose.Types.ObjectId(id);//id由String转换成objectId
  return BlogModel.findOne({_id:id}).then((_blog)=>{
    return{
      status:1,
      data:_blog//如果是塞入新数据，默认data为null,必须设置new为true
     }
  })
}
  exports.db_getBlogList=(query)=>{
  //{'category.name':'about'} ==>nested query
  return BlogModel.find(query).exec().then((_blogList)=>{
    return{
      status:1,
      data:_blogList
     }
  })
}
exports.db_deleteBlog=(query)=>{
  let {id} =query;
  id=mongoose.Types.ObjectId(id);
  return BlogModel.remove({_id:id}).exec().then((_blog)=>{
    return{
      status:1,
      data:_blog
     }
  })
}
