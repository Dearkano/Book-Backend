const Controller = require('egg').Controller;

class BuyController extends Controller {
  async getBuyList(){
      const {ctx} = this
      const data = await ctx.service.buy.getBuyList()
      ctx.body = data
      ctx.status = 200
  }
  async issueWish(){
      const {ctx} = this
      const username = ctx.session.username
      const userBody = await ctx.service.user.getUser(username)
      const user = userBody.user
      const params = {
        ...ctx.request.body,
        username: user.username,
        userId:user.id
      }
      const isSuccess = await ctx.service.buy.issueWish(params)
      if(isSuccess) {
          ctx.body="success"
          ctx.status = 200
      }else{
          ctx.body = "failed"
          ctx.status = 400
      }
  }
}
module.exports = BuyController;