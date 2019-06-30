'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/register', controller.user.register)
  router.post('/login', controller.user.login)
  router.get('/getUserByName', controller.user.getUser)
  router.get('/me', controller.user.getMe)
  router.get('/logout', controller.user.logout)
  router.post('/upload', controller.book.uploadBook)
  router.get('/all', controller.book.getAllBooks)
  router.get('/getBooksByClass', controller.book.getBooksByClass)
  router.get('/getBookByName', controller.book.getBookByName)
  router.get('/getRecentMessage', controller.message.getRecentMessage)
  router.get('/getMessage', controller.message.getMessage)
  router.get('/getUserById', controller.user.getUserById)
  router.post('/sendMessage', controller.message.sendMessage)
  router.get('/getUserByBookName', controller.user.getUserByBookName)
  router.get('/getBuyList', controller.buy.getBuyList)
  router.post('/issueWish', controller.buy.issueWish)
  router.post('/buy', controller.book.buy)
  router.get('/receivePay',controller.book.receivePay)
  router.get('/verifyPay', controller.book.verifyPay)
};
