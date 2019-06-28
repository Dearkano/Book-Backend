const Controller = require('egg').Controller;

class UserController extends Controller {
    async register() {
        const { ctx } = this
        const isSuccess = await ctx.service.user.register(ctx.request.body)
        if(isSuccess) {
            ctx.status = 200
        } else{
            ctx.status = 403
        }
    }
    async login(){
        const { ctx } = this
        const successBody = await ctx.service.user.login(ctx.request.body)
        if(successBody.success){
            console.log(successBody.user.username)
            ctx.session.username = successBody.user.username
            ctx.body = 'login success'
            ctx.status = 200
        }else{
            ctx.body = successBody.errMessage
            ctx.status = 401
        }
    }
    async getUser(){
        const { ctx } = this
        const userBody = await ctx.service.user.getUser(ctx.query['username'])
        if(userBody.success){
            ctx.body = userBody.user
            ctx.status = 200
        } else {
            ctx.body = 'wrong username'
            ctx.status = 400
        }
    }

    async getMe(){
        const username = this.ctx.session.username
        console.log(this.ctx.session)
        const userBody = await this.ctx.service.user.getUser(username)
        if(userBody.success){
            this.ctx.body = userBody.user
            this.ctx.status = 200
        } else{
            this.ctx.body = 'no login'
            this.ctx.status = 400
        }
    }

    async logout(){
        this.ctx.session.username = null
        this.ctx.status = 200
        this.ctx.body = 'logout'
    }
}
module.exports = UserController;