// app/service/topics.js
const Service = require('egg').Service;

class BuyService extends Service {
  async getBuyList(){
      const {app} = this
      let r = await app.mysql.select('wish')
      r = JSON.parse(JSON.stringify(r))
      console.log(r)
      return r
  }
  async issueWish(params){
    const {app} = this
    let result = await app.mysql.insert('wish', params)
    const insertSuccess = result.affectedRows === 1;
    if(insertSuccess)return true
    else return false
  }
}

module.exports = BuyService;