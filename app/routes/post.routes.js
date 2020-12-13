module.exports = app => {
    const posts = require('../controllers/post.controller')

    let router = require('express').Router()

    // create a new post
    router.post('/', posts.create)

    // prefix
    app.use('/api/posts', router)
}