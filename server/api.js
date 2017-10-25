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
  const formData=ctx.request.body;
  let photoUrl='images/'+formData.
  myPhoto[0].response.data.pictureUrl.split('/')[5];
  for(let i=0;i<100;i++){
  await sql.queryWithParams(
  "insert into stu (姓名,年级,班级,xuehao,学院,专业,公寓楼,寝室号,班级干部,分院干部,校级干部,"+
    "籍贯,资助与奖励,获奖情况,IP地址,填写时间,photo)"+
    "values (@姓名,@年级,@班级,@xuehao,@学院,@专业,@公寓楼,@寝室号,@班级干部,@分院干部,@校级干部,"+
    "@籍贯,@资助与奖励,@获奖情况,@IP地址,@填写时间,@photo)",
  {
    姓名:{sqlType:mssql.NVarChar(8),inputValue:formData.youname},
    年级:{sqlType:mssql.NVarChar(5),inputValue:formData.grade[0]},
    班级:{sqlType:mssql.NVarChar(20),inputValue:formData.class},
    xuehao:{sqlType:mssql.NVarChar(12),inputValue:formData.studentId},
    学院:{sqlType:mssql.NVarChar(30),inputValue:formData.college[0]},
    专业:{sqlType:mssql.NVarChar(20),inputValue:formData.majors},
    公寓楼:{sqlType:mssql.NVarChar(20),inputValue:formData.gongyu},
    寝室号:{sqlType:mssql.NVarChar(6),inputValue:formData.DormitoryId},
    班级干部:{sqlType:mssql.NVarChar(8),inputValue:formData.position.indexOf('班级干部')!=-1?'班级干部':null},
    分院干部:{sqlType:mssql.NVarChar(8),inputValue:formData.position.indexOf('分院干部')!=-1?'分院干部':null},
    校级干部:{sqlType:mssql.NVarChar(8),inputValue:formData.position.indexOf('校级干部')!=-1?'校级干部':null},
    籍贯:{sqlType:mssql.NVarChar(10),inputValue:formData.NativePlace},
    资助与奖励:{sqlType:mssql.NVarChar(1000),inputValue:formData.Grants},
    获奖情况:{sqlType:mssql.NVarChar(1000),inputValue:formData.awards},
    IP地址:{sqlType:mssql.NVarChar(20),inputValue:ctx.request.header['x-forwarded-for']},
    填写时间:{sqlType:mssql.NVarChar(50),inputValue:getNowFormatDate()},
    photo:{sqlType:mssql.NVarChar(50),inputValue:photoUrl}
  },(a,b,c)=>{
    console.log(a,b,c);
  });
}
  ctx.body =JSON.stringify({status:'success'});
});

function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();
  return currentdate;
}
module.exports = api;