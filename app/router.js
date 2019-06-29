'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('topics', '/api/v2/topics', app.controller.topics);
  router.get('/topics', app.controller.topics.list)
  router.post('/register', app.controller.user.register)
  router.post('/login', app.controller.user.login)
  router.get('/user', app.controller.user.getUser)
  router.get('/me', app.controller.user.getMe)
  router.get('/logout', app.controller.user.logout)
  router.post('/upload', app.controller.book.uploadBook)
};
