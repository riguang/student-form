const Koa = require('koa');
const sql = require('mssql');
const koaBody = require('koa-body');
var cors = require('koa-cors');
const config = require('./DBConfig').config;
const app = new Koa();
let pool=undefined;
let request=undefined;

const main = async (ctx,next) =>{
    const body = ctx.request.body;
    console.log(body);
    ctx.body = "ok";
    // try {
    //     const body = ctx.request.body;
    //     if(pool===undefined){
    //         pool = await sql.connect(config);
    //         request = await pool.request();
    //         //console.dir(pool);
    //     }
    //     let result;
    //     if (!body.cmd) ctx.throw(400, '参数错误');
    //     switch(body.cmd){
    //         case "GetHomeData":
    //             result = await request.query(`select portrait,CoverImage,likes,CommentsSum,ReleaseTime,userName,hid,dbo.app_HomeData.uid,autograph from dbo.app_HomeData,dbo.app_Users where dbo.app_HomeData.uid=dbo.app_Users.uid`)
    //             .then((Result)=>{
    //                 return Result.recordset;
    //             }).catch((err)=>{
    //                 ctx.throw(400, '发生错误：'+err);
    //             });
    //             break;
    //         case "GetComments":
    //             if (!body.hid) ctx.throw(400, '参数错误');
    //             result = await request.query(`select content,userName,portrait,hid from dbo.app_Comments,dbo.app_Users where dbo.app_Comments.uid=dbo.app_Users.uid and dbo.app_Comments.hid=${body.hid}`)
    //             .then((Result)=>{
    //                 return Result.recordset;
    //             }).catch((err)=>{
    //                 ctx.throw(400, '发生错误：'+err);
    //             });
    //             break;
    //         case "PublishComment":
    //             if (!body.commentContent || !body.hid || !body.uid) ctx.throw(400, '参数错误');
    //             await request.query(`INSERT INTO Comments (hid,uid,content) values (${body.hid},${body.uid},'${body.commentContent}')`)
    //             .catch((err)=>{
    //                 ctx.throw(400, '发生错误：'+err);
    //             });
    //             await request.query(`update HomeData set CommentsSum=(select count(*) from Comments where hid=${body.hid}) where hid=${body.hid}`);
    //             result="success";
    //             break;
    //         case "ClickLikes":
    //             if(!body.hid) ctx.throw(400, '参数错误');
    //             await request.query(`UPDATE dbo.app_HomeData SET likes+=1 where hid=${body.hid}`)
    //             .then((Result)=>{
    //                 result="success";
    //             }).catch((err)=>{
    //                 ctx.throw(400, '发生错误：'+err);
    //             });
    //             break;
    //     }
    //     //await sql.close();
    //     //pool=undefined;
    //     ctx.body = result;
    //     console.log(result);
        
    // } catch (err) {
    //     console.dir(err)
    // }
}
process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
    sql.close();
});
process.on('SIGINT', function() {
    console.log('Got SIGINT.  Press Control-D/Control-C to exit.');
    sql.close();
});
app.use(koaBody());
app.use(cors());//实现跨域
app.use(main);
app.listen(9999);