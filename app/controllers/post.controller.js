const db = require('../models')
const Post = db.posts
const Op = db.sequelize.Op

// create
exports.create = (req, res) => {
    // Validate require
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not empty"
        })
        return
    }

    //  Create post
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Post.create(post)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while createing the Post"
            })
        })
}

// Retrieve all
exports.findAll = (req, res) => {

}

// Find a single
exports.findOne = (req, res) => {

}

// Update a Post with ID
exports.update = (req, res) => {

}

// Delete a post
exports.delete = (req, res) => {

}

// Delete All posts
exports.deleteAll = (req, res) => {

}

// Find all Published
exports.findAllPublished = (req, res) => {

}