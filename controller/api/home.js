const express = require('express');

const router = express.Router();
 const {Blog, User, Comment} = require('../../models')

router.get('/',async(req, res)=>{
    //res.send('<h2>Home Route</h2>')
  const blogData = await Blog.findOne(
    { include:[{model:User, attributes:['f_name']},
  {
    model: Comment
  
  }],
        order: [
            ['id', 'DESC']
        ]
    },
    {
        limit: 1
    }
  )
    if(!blogData){
    res.render('firstuser',{loggedIn:req.session.loggedIn,username:req.session.username})
  }else{
   const blog = blogData.get({plain:true})
    //res.json(blog)
      res.render('home',{blog, loggedIn:req.session.loggedIn,username:req.session.username})
  }

})



router.get('/login',(req, res)=>{

  res.render('login')

})

router.post('/login',async(req, res)=>{
    const dbUserData = await User.findOne({
            where: {
              username: req.body.username,
            },
          });
        
          if (!dbUserData) {
            res.redirect('/');
            return;
          }
          const validPassword = await dbUserData.checkPassword(req.body.password);
        
          if (!validPassword) {
            res.redirect('/');
            return;
          }
        
          req.session.save(() => {
            req.session.loggedIn = true;
            req.session.username = req.body.username;
            res.status(200).redirect("/api/home");

          });
})

router.get('/register',(req, res)=>{
 res.render('register')
})

router.post('/register',async(req, res)=>{
      const existingUser = await User.findAll({
    where: {
      username: req.body.username,
    },
  });

  if (existingUser.length != 0) {
    res.render("existinguser");
  } else if(req.body.password.length<8){
    res.render('existinguser')
  }
  else
  {
    const newUser = {
      f_name: req.body.f_name,
      l_name: req.body.l_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    User.create(newUser);
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;
      res.redirect("/api/home");
    });
  }

})

router.post('/logout',(req, res)=>{
    if (req.session.loggedIn) {
            req.session.destroy(() => {
              res.status(204).end();
            });
          } else {
            res.status(404).end();
          }
})

module.exports = router