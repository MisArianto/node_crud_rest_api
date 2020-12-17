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
    const title = req.query.title
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null

    Post.findAll({ where: condition })
        .then((data) => {
            res.send(data)
        }).catch((error) => {
            res.status(500).send({
                message: error.message || 'Some error occured find post'
            })
        })
}

// Find a single
exports.findOne = (req, res) => {
    const id = req.params.id

    Post.findByPk(id)
        .then((data) => {
            res.send(data)
        }).catch((error) => {
            res.status(500).send({
                message: `Error retreieving post with id=${id}`
            })
        })
}

// Update a Post with ID
exports.update = (req, res) => {
    const id = req.params.id

    Post.update(req.body, {
        where: { id: id }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: 'Post was update successfully'
            })
        } else {
            res.send({
                message: `Connot update Post with id=${id}`
            })
        }
    }).catch((error) => {
        res.status(500).send({
            message: `Error updating post with id=${id}`
        })
    })
}

// Delete a post
exports.delete = (req, res) => {
    const id = req.params.id

    Post.destroy({
        where: { id: id }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: 'Post was deleted successfullt'
            })
        } else {
            res.send({
                message: `Cannot delete post with id=${id}`
            })
        }
    }).catch((error) => {
        res.status(500).send({
            message: `Could not delete post with id=${id}`
        })
    })
}

// Delete All posts
exports.deleteAll = (req, res) => {
    Post.destroy({
        where: {},
        truncate: false
    }).then((result) => {
        res.send({
            message: `${result} Posts were deleted successfully!`
        })
    }).catch((error) => {
        res.send({
            message: error.message || `Some error occurred removing all post`
        })
    })
}

// Find all Published
exports.findAllPublished = (req, res) => {
    Post.findAll({
        where: { published: true }
    }).then((result) => {
        res.send(result)
    }).catch((error) => {
        res.send(500).send({
            message: error.message || `Some error occured retrieving post`
        })
    })
}