const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const bcrypt = require('bcrypt')// New to add

//*********** To Change *********** (use hashPassword fn in userData)//
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const seed = async () => {
  const userData = [
    {
      f_name: 'Jack',
      l_name: 'Song',
      username: 'jacksong',
      email: 'jack@email.co',
      password: await hashPassword('123password')
    },
    {
      f_name: 'Emmanuel',
      l_name: 'Cross',
      username: 'aligator',
      email: 'ali@email.co',
      password: await hashPassword('234password')
    },
    {
      f_name: 'Jill',
      l_name: 'Saunders',
      username: 'jackandjill',
      email: 'jj@email.co',
      password: await hashPassword('345password')
    }
  ];

  const blogData = [
    {
      title: 'Blog1',
      description: 'Blog 1 content',
      user_id: 1
    },
    {
      title: 'Blog2',
      description: 'Blog 2 content',
      user_id: 2
    },
    {
      title: 'Blog3',
      description: 'Blog 3 content',
      user_id: 1
    },
    {
        title: 'Blog4',
        description: 'Blog 4 content',
        user_id: 1
      },

  ];

  await sequelize.sync({ force: true });
  await User.bulkCreate(userData);
  await Blog.bulkCreate(blogData);

  process.exit(0);
};

seed();