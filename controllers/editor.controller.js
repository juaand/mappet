// controllers/editor.controllers.js
const Blog = require('../models/blog.model')
const User = require('../models/user.model')

module.exports.getBlog = (req, res, next) => {
  const user = req.session.currentUser
  console.log(`EL EDITOR ES: ${user.name}`)
  if (req.session.currentUser) {
    return Blog.find({ authorId: user._id })
      .populate('authorId')
      .then((posts) => {
        //res.json(posts)
        res.render('editor/', {
          posts,
          editor: true,
          title: 'Mappet editor'
        })
      })
      .catch((error) => next(error))
  } else {
    res.render('auth/login', {
      category: 'login'
    })
  }
}

module.exports.postBlog = (req, res, next) => {
  const id = req.params.id
  req.body.picPath = req.file ? req.file.filename
    : 'image/upload/v1599250707/mappet/nofile_eabd8z.jpg'

  Blog.create({
    title: req.body.title,
    content: req.body.content,
    authorId: id,
    picPath: `${process.env.CLOUDINARY_SECURE}/${req.body.picPath}`
  })
    .then(() => {
      res.redirect('/editor')
    })
    .catch((error) => next(error))
}

module.exports.getSingle = (req, res, next) => {
  const user = req.session.currentUser
  const id = req.params.id

  if (user) {
    if (user.role === 'EDITOR') {
      Blog.findById(id)
        .populate('authorId')
        .then((post) => {
          Blog.find()
            .populate('authorId')
            .limit(3)
            .then((lastest) => {
              res.render('blog/single', {
                lastest,
                post,
                editor: true
              })
            })
            .catch((error) => next(error))
        })
        .catch((error) => next(error))
    } else {
      Blog.findById(id)
        .populate('authorId')
        .then((post) => {
          Blog.find()
            .populate('authorId')
            .limit(3)
            .then((lastest) => {
              res.render('blog/single', {
                lastest,
                post
              })
            })
            .catch((error) => next(error))
        })
        .catch((error) => next(error))
    }
  } else {
    Blog.findById(id)
      .populate('authorId')
      .then((post) => {
        Blog.find()
          .populate('authorId')
          .limit(3)
          .then((lastest) => {
            res.render('blog/single', {
              lastest,
              post
            })
          })
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  }
}
