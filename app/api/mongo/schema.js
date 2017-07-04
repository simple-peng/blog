const {Schema} = require('mongoose');
const categorySchema=new Schema({
  category:String,
  id:String
})
const blogSchema=new Schema({
  title:String,
  content:String,
  rawContent:String,
  category:categorySchema,
  date:{type:String,default:()=>{
   return new Date().toLocaleString()
 }}
},{
  _id:false,//mongoose不会去自动塞_id,_id就不会变成objectId
  strict:false
})
module.exports={
  categorySchema,
  blogSchema
}