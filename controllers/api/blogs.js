const express = require('express');

const router = express.Router();
const {Blog, User, Comment} = require('../../models')

router.get('/',async(req, res)=>{
   // res.send('<h2>Blog Route</h2>')
    const blogData = await Blog.findAll({include:{model:User,attributes:['username']}})
    const blogs =blogData.map((blog) => blog.get({ plain: true }))
   // res.json(blogs)
    res.render('blogs',{blogs, loggedIn:req.session.loggedIn,username:req.session.username})
})

router.get('/:id',async (req, res)=>{
  const blogData = await Blog.findOne({include:{model:User,attributes:['username',"f_name"]},
    where: {id: req.params.id}
  })
  const blog = blogData.get({plain:true})
  //res.json(blog)
  res.render('blog', {blog, loggedIn:req.session.loggedIn, username:req.session.username})
})

router.get('/myblogs/:id',async (req, res)=>{
  const blogData = await Blog.findOne({include:{model:User,attributes:['username',"f_name"]},
    where: {id: req.params.id}
  })
  const blog = blogData.get({plain:true})
  //res.json(blog)
  res.render('myblog', {blog, loggedIn:req.session.loggedIn, username:req.session.username})
})

router.post('/',async(req, res)=>{
  const userData = await User.findOne({
    where:{
      username: req.session.username
    }
 })
 const user_id = userData.id

 const newData = {
  user_id : user_id,
  title : req.body.title,
  description : req.body.description
 }

// res.json(newData)
const newBlog = Blog.create(newData)
res.redirect('/api/users')


})



router.put('/:id',async(req, res)=>{

    const blogData =await Blog.update({
    title: req.body.title,
    description: req.body.description,
  
},{
where:{
  id: req.params.id
}
})


res.redirect('/users/dashboard')

})

router.delete('/del/:id',async(req, res)=>{

  await Blog.destroy({
    where:{
      id: req.params.id
    }
  })

})

module.exports = router