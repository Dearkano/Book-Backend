const Controller = require('egg').Controller;

class BookController extends Controller {
  async uploadBook(){
    const {ctx} = this
    const username = ctx.session.username
    const user = await ctx.service.user.getUser(username)
    const isSuccess = await ctx.service.book.uploadBook(user.id,ctx.request.body)
    if(isSuccess){
        ctx.body='upload success'
        ctx.status = 200
    }else{
        ctx.body='upload failed'
        ctx.status=400
    }
  }

  async getBookByName(){

  }
}
module.exports = BookController;