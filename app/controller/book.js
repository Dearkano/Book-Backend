const Controller = require('egg').Controller;
const md5 = require('md5')

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

  
  async buy(){
      const { ctx} = this
      const username = ctx.session.username
      const userBody = await ctx.service.user.getUser(username)
      const user = userBody.user
      const body = ctx.request.body
      console.log(body)
      const identification = '4UON0APK6S5Y4LK6'
      const token = 'M5462S1V2B3QZIJXK7JXX6XCSYIE7FCE'
      let {price, bookName} = body
      price = price * 100
      const orderid = md5(`${bookName}${price}${user.username}${Date.now()}`).substr(0, 10)
      const notify_url = 'http://111.231.75.113:7001/receivePay'
      const return_url = 'http://localhost:9898'
      const type = 2
      const key = md5(`${bookName}${identification}${notify_url}${orderid}${user.username}${price}${return_url}${token}${type}`)

      ctx.body = {
          identification,
          notify_url,
          return_url,
          key,
          price,
          orderuid:user.username,
          goodsname: bookName,
          orderid,
          type
      }
      ctx.status = 200
  }

  async receivePay() {
      const { ctx } = this
      const body = ctx.request.body
      console.log(body)
      const params = {
          orderId: body.orderid,
          amount: body.actual_price
      }
      const res = await ctx.service.book.receivePay(params)
  }

  async verifyPay() {
      const { ctx } = this
      const result = await ctx.service.book.verifyPay(ctx.body.query['orderid'])
      if(result) {
          ctx.status = 200
      }else{
          ctx.status = 400
      }

  }
}
module.exports = BookController;