//dependencies
const db = require('../models')

const session = require('express-session');

//------------------view routes-----------------//

module.exports = app => {

  //landing page
  app.get('/', (req, res) => {
    res.render('index')
  })

  //signup
  app.get('/signup', (req, res) => {
    res.render('signup')
  })

  //login-- check session -- userRoutes
  app.get('/login', (req, res) => {
    res.render('login')
  })

  //homepage
  app.get('/home', (req, res) => {
    db.post.findAll({}).then(posts => {
      res.render('home', {
        posts: posts,
        name: req.session.username
      })
      console.log(req.session);
    })
  })

  //new post
  app.get('/new', (req, res) => {
    db.post.findAll({}).then( posts => {
      res.render('new', {
        posts: posts,
        name: req.session.username
      })
    })
  })

  //liked posts
  app.get('/likes', (req, res) => {
    db.like.findAll({
      include: [{
        model: db.user,
        as: 'user'
      }]
    }).then( likes => {
      res.render('likes', {
        likes: likes
      })
    })
  })

  //logout
  app.get('/logout', (req, res) => {
    req.session.destroy( err => {})
    res.render('logout')
    console.log("session closed ", req.session);
  })

}
