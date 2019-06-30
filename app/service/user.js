// app/service/topics.js
const Service = require('egg').Service;

class UserService extends Service {
  async register(params) {
      const { app } = this
      const result = await app.mysql.insert('user', params)
      const insertSuccess = result.affectedRows === 1;
      return insertSuccess
  }
  async login(params) {
      const { app } = this
      const row = await app.mysql.get('user', {username: params.username})
      if(!row){
          return {success: false, errMessage: 'wrong username'}
      }
      const user = JSON.parse(JSON.stringify(row))
      if(user.password === params.password){
          return {user, success:true}
      }else {
          return {success:false, errMessage: 'wrong password'}
      }
  }
  async getUser(username) {
    const { app } = this
    const row = await app.mysql.get('user', {username:username})
    if(row){
        const user = JSON.parse(JSON.stringify(row))
        return {user, success: true}
    }
    else {
        return {success:false, errMessage: 'wrong password'}
    }
  }
  async getUserById(id){
    const { app } = this
    const row = await app.mysql.get('user', {id:id})
    if(row){
        const user = JSON.parse(JSON.stringify(row))
        return {user, success: true}
    }
    else {
        return {success:false, errMessage: 'wrong password'}
    }
  }
  async getUserByBookName(name){
    const { app } = this
    let r = await app.mysql.get('books', {name:name})
    r = JSON.parse(JSON.stringify(r))
    const bookId = r.id
    let s = await app.mysql.get('user_book', {book_id:bookId})
    s = JSON.parse(JSON.stringify(s))
    const userId = s.user_id
    let k = await app.mysql.get('user', {id:userId})
    k = JSON.parse(JSON.stringify(k))
    return k
  }
}

module.exports = UserService;