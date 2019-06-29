// app/service/topics.js
const Service = require('egg').Service;

class MessageService extends Service {
    async getRecentMessage(userId){
        const { app } = this
        const res = await app.mysql.query(`select * from chat where sender_id=${userId} or receiver_id=${userId}`)
        const data = JSON.parse(JSON.stringify(res))
        const ids = []
        for(const item of data){
            if(item.sender_id==userId){
                ids.push(item.receiver_id)
            }else{
                ids.push(item.sender_id)
            }
        }
        const uids = ids.filter((value, index, self) => self.indexOf(value) === index)
        const result = []
        for(const uid of uids){
            const m = await app.mysql.query(`select * from chat where (sender_id=${userId} and receiver_id=${uid}) or (sender_id=${uid} and receiver_id=${userId}) order by time desc`)
            const l = JSON.parse(JSON.stringify(m))[0]
            const u = await app.mysql.get('user', {id:uid})
            const username = JSON.parse(JSON.stringify(u)).username
            result.push({
                userId: uid,
                username:username,
                lastContent:l.message,
                time:l.time
            })
        }
        return result
    }

    async getMessage(user1Id, user2Id, from){
        const { app } = this
        const m = await app.mysql.query(`select * from chat where (sender_id=${user1Id} and receiver_id=${user2Id}) or (sender_id=${user2Id} and receiver_id=${user1Id}) order by time desc limit 10 offset ${from}`)
        const l = JSON.parse(JSON.stringify(m))
        const result = []
        for(const item of l){
            const u = await app.mysql.get('user', {id:item.sender_id})
            const senderName = JSON.parse(JSON.stringify(u)).username
            const u1 = await app.mysql.get('user', {id:item.receiver_id})
            const receiverName = JSON.parse(JSON.stringify(u1)).username
            result.push({
                id: item.id,
                time: item.time,
                senderName: senderName,
                receiverName:receiverName,
                content:item.message
            })
        }
        return result
    }

    async sendMessage(senderId, receiverId, content){
        const { app } = this
        const params = {
            sender_id: senderId,
            receiver_id: Number(receiverId),
            message: content,
            time: new Date()
        }
        const result = await app.mysql.insert('chat', params)
        const insertSuccess = result.affectedRows === 1;
        if(insertSuccess){
            return true
        }else{
            return false
        }
    }
}

module.exports = MessageService;