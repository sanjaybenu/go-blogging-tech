const express = require('express');

const router = express.Router();

const {Blog, User} = require('../../models')


router.get('/',async(req, res)=>{
    const blogData = await Blog.findAll(
        { include:{model:User, attributes:['f_name']},
           
        }
      )
       const blogs = blogData.map((blog)=>blog.get({plain:true}))
      // res.json(blogs)
       res.render('blogs',{blogs, loggedIn:req.session.loggedIn,username:req.session.username})
})

router.get('/dashboard',async(req, res)=>{
    const user = await User.findOne({
        where:{
            username: req.session.username
        }
    }
    )
    const user_id = user.id

    console.log(user_id)
    const blogData = await Blog.findAll(
        { include:{model:User, attributes:['f_name']},
           where:{
            user_id: user_id
           }
        }
      )
      if(blogData.length===0){
        res.render('add-Blog',{loggedIn:req.session.loggedIn,username:req.session.username})
      }else{
       const blogs = blogData.map((blog)=>blog.get({plain:true}))
     //res.json(blogs)
     res.render('myblogs',{blogs, loggedIn:req.session.loggedIn,username:req.session.username})
      }
})


router.get('/addblog', (req, res)=>{
   res.render('addblog', {loggedIn: req.session.loggedIn, username:req.session.username})
  })

router.post('/',(req, res)=>{

})

router.get('/modify/:id',async(req,res)=>{
     const blogData = await Blog.findOne({
        where:{
            id: req.params.id
        }
     })

     const blog = blogData.get({plain:true})
     //res.json(blog)
     res.render('modify',{blog, loggedIn:req.session.loggedIn, username:req.session.username})
  })

  // router.get('/delete',(req,res)=>{

  //   res.send("Delete Me")
  // })

  router.get('/comment/:id',async(req,res)=>{

    const blogId = req.params.id

    console.log(blogId)

    const blogData = await Blog.findOne({
      where: { id: blogId },
      include: {
        model: User,
      },
    });


    const blog = blogData.get({plain:true})

    res.render('comment',{blog,loggedIn:req.session.loggedIn, username:req.session.username})

    //res.send("Comment On the post")
  }) 


router.post('/',(req, res)=>{

})

module.exports = router