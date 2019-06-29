const Controller = require('egg').Controller;

class BookController extends Controller {
    async getRecentMessage(){
        const {ctx} = this
        const username = ctx.session.username
        const userBody = await ctx.service.user.getUser(username)
        const user = userBody.user
        const data = await ctx.service.message.getRecentMessage(user.id)
        ctx.body = data
        ctx.status = 200
    }

    async getMessage(){
        const {ctx} = this
        const username = ctx.session.username
        const userBody = await ctx.service.user.getUser(username)
        const user = userBody.user
        const data = await ctx.service.message.getMessage(user.id, ctx.request.query['id'],ctx.request.query['from'])
        ctx.body = data
        ctx.status = 200
    }

    async sendMessage(){
        const {ctx} = this
        const username = ctx.session.username
        const userBody = await ctx.service.user.getUser(username)
        const user = userBody.user
        const isSuccess = await ctx.service.message.sendMessage(user.id, ctx.request.body.id, ctx.request.body.content)
        if(isSuccess){
            ctx.body = 'success'
            ctx.status = 200
        }else{
            ctx.body = 'failed'
            ctx.status = 400
        }

    }
}
module.exports = BookController;