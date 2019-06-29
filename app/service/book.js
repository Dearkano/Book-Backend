// app/service/topics.js
const Service = require('egg').Service;

class BookService extends Service {
    async uploadBook(userId, params) {
        const {
            app
        } = this
        params = {
            ...params,
            origin_price: Number(params.origin_price),
            price: Number(params.price),
            img_url:params.imgUrl
        }
        delete params.imgUrl
        const result1 = await app.mysql.insert('books', params)
        console.log(result1)
        // await app.mysql.insert('user_book',{user_id:userId, book_id})
        const isSuccess = result1.affectedRows === 1
        return isSuccess
    }

    async getBookByName(bookName) {
        const {
            app
        } = this
        const result = await app.mysql.get('books', {
            name: bookName
        })
        if (result) {
            const book = JSON.parse(JSON.stringify(result))
            return {
                success: true,
                book: book
            }
        } else {
            return {
                success: false,
                errMessage: 'cannot find this book'
            }
        }
    }

    async getBooksByClass(bookClass, page) {
        const {
            app
        } = this
        const start = 10 * (page - 1)
        const result = await app.mysql.select('books', {
            where: {
                class: bookClass
            },
            limit: 10,
            offset: start
        })
        if (result) {
            const book = JSON.parse(JSON.stringify(result))
            return {
                success: true,
                book: book
            }
        } else {
            return {
                success: false,
                errMessage: 'cannot find this book'
            }
        }
    }

    async getBooksByUsername(username) {
        const {
            app
        } = this
        const result1 = await app.mysql.get('user', {
            username: username
        })
        if (result1) {
            const user = JSON.parse(JSON.stringify(result1))
            const userId = user.id
            const result2 = await app.mysql.get('user_book', {
                user_id: userId
            })
            if (result2) {
                const booksId = JSON.parse(JSON.stringify(result2))
                const books = []
                for (const bid of booksId) {
                    const b = await this.getBookById(bid)
                    if (b) {
                        books.push(b)
                    }
                }
                return {
                    success: true,
                    books: books
                }
            } else {
                return {
                    success: true,
                    books: []
                }
            }
        } else {
            return {
                success: false,
                errMessage: 'user not exist'
            }
        }
    }

    async getBookById(id) {
        const {
            app
        } = this
        const result = await app.mysql.get('books', {
            id: id
        })
        if (result) {
            const book = JSON.parse(JSON.stringify(result))
            return book
        } else {
            return null
        }
    }

}

module.exports = BookService;