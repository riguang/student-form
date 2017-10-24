const Router = require('koa-router');
const path = require('path');
const sql = require('./sql');
var mssql=require("mssql");
const api = new Router();
const { uploadFile } = require('./uploadHelper');


api.post('/api/upload', async(ctx) => {
  console.log(ctx);
  const serverPath = path.join(__dirname, 'assests/image');
  const result = await uploadFile(ctx, {
    fileType: 'album',
    path: serverPath,
  })
  ctx.body = result;
});

api.post('/api/formsubmit', async(ctx) => {
  let photoUrl=ctx.request.body.
  myPhoto[0].response.data.pictureUrl.split('/')[5];
  await sql.queryWithParams("select * from app_Users where userName=@username",
  {username:{sqlType:mssql.VarChar(255),inputValue:'riguang'}},(a,b,c)=>{
    console.log(a,b,c);
  });
  // const serverPath = path.join(__dirname, 'assests/image');
  // const result = await uploadFile(ctx, {
  //   fileType: 'album',
  //   path: serverPath,
  // })
  ctx.body =JSON.stringify({status:'success'});
});

module.exports = api;