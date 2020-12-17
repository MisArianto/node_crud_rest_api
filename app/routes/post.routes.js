module.exports = app => {
    const posts = require('../controllers/post.controller')

    let router = require('express').Router()


    // create a new post
    router.post('/', posts.create)

    // Retrieve all post
    router.get('/', posts.findAll)

    // Delete post all
    router.delete('/', posts.deleteAll)

    // find all published Posts
    router.get('/published', posts.findAllPublished)

    // Retrieve single post
    router.get('/:id', posts.findOne)

    // Update post
    router.put('/:id', posts.update)

    // Delete post
    router.delete('/:id', posts.delete)

    // prefix
    app.use('/api/posts', router)
}