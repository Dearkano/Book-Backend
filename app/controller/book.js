const Controller = require('egg').Controller;

class BookController extends Controller {
  async uploadBook(){
    const {ctx} = this
    const username = ctx.session.username
    const userBody = await ctx.service.user.getUser(username)
    const user = userBody.user
    const isSuccess = await ctx.service.book.uploadBook(user.id,ctx.request.body)
    if(isSuccess){
        ctx.body='upload success'
        ctx.status = 200
    }else{
        ctx.body='upload failed'
        ctx.status=400
    }
  }

  async getAllBooks() {
      this.ctx.body = await this.ctx.service.book.getAllBooks()
      this.ctx.status = 200
  }

  async getBookByName(){
    const data = await this.ctx.service.book.getBookByName(this.ctx.query['name'])
    const book = data.book
    if(book){
        this.ctx.body = book
        this.ctx.status = 200
    }
  }
  async getBooksByClass(){
      const data = await this.ctx.service.book.getBooksByClass(this.ctx.request.query['type'],this.ctx.request.query['page'])
      this.ctx.body = data.book
      this.ctx.status = 200
  }
}
module.exports = BookController;