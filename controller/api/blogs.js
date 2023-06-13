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
  const blogData = await Blog.findOne({
    where: { id: req.params.id },
    include: [{
      model: User
    },{model:Comment}]
  });

  const blog = blogData.get({plain:true})
  //res.json(blog)
  res.render('blog', {blog, loggedIn:req.session.loggedIn, username:req.session.username})
})


router.get('/myblogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      include: { model: User, attributes: ['username', 'f_name'] },
      where: { id: req.params.id }
    });

    if (blogData) {
      const blog = blogData.get({ plain: true });
      res.render('myblog', { blog, loggedIn: req.session.loggedIn, username: req.session.username });
    } else {
    
      res.redirect('/api/users')
    }
  } catch (error) {
    // Handle any potential errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


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
const newBlog = await Blog.create(newData)
res.redirect('/api/users/dashboard')



})

router.post("/comment/:id",async(req, res)=>{
  const blog_id= req.params.id
  const userData = await User.findOne({
    where:{
      username: req.session.username
    } 
  })
  const user_id = userData.id
  const comment ={
    blog_id:blog_id,
    user_id:user_id,
    comment: req.body.comment
  }
  Comment.create(comment)
  res.redirect(`/api/blog/${blog_id}`)
})



router.put('/:id',async(req, res)=>{

    
  const newBlog = await Blog.update({
    title: req.body.title,
    description: req.body.description
},{
where:{
  id: req.params.id
}
})
console.log(newBlog)
res.redirect('/api/users/dashboard')

})

router.delete('/del/:id',async(req, res)=>{
  console.log("YOU ARE HERE")
  await Blog.destroy({
    where:{
      id: req.params.id
    }
  })

  res.redirect('/api/users/dashboard')


})

module.exports = router