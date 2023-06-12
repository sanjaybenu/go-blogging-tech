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
      title: "React",
      description: "React is a popular JavaScript library for building user interfaces. It provides a declarative and component-based approach to building UIs, making it easier to manage complex UI logic and state. With React, developers can create reusable components that encapsulate their functionality and render efficiently. React also efficiently updates and re-renders only the necessary components when the underlying data changes, thanks to its virtual DOM. It promotes a unidirectional data flow, enhancing predictability and making it easier to debug and test applications. React's extensive ecosystem, including libraries like React Router and Redux, further enhances its capabilities, making it a powerful tool for building interactive and scalable web applications.",
      user_id: 1
    },
    {
      title: "nosql",
      description: "NoSQL, which stands for Not Only SQL, is a category of database management systems that differ from traditional relational databases (SQL) in their data storage and retrieval models. NoSQL databases are designed to handle large volumes of unstructured or semi-structured data and offer flexible schemas. They are highly scalable and can distribute data across multiple nodes, allowing for horizontal scalability. NoSQL databases utilize various data models, including key-value, document, columnar, and graph, to cater to different types of data and use cases. They are commonly used in web applications, big data processing, real-time analytics, and other scenarios where high scalability, performance, and flexibility are essential.",
      user_id: 2
    },
    {
      title: "Bootstrap 5",
      description: "Bootstrap 5 is a popular and powerful front-end framework for building responsive and mobile-first websites and web applications. It provides a comprehensive set of pre-built components, CSS styles, and JavaScript plugins that enable developers to create visually appealing and functional user interfaces with ease. Bootstrap 5 incorporates significant improvements and updates compared to its previous versions, including a smaller file size, improved grid system, new utility classes, and a focus on modern web development practices. It offers a wide range of customizable components, such as navigation bars, buttons, forms, cards, modals, and more, making it a go-to choice for developers looking to create professional and responsive designs quickly.",
      user_id: 1
    },
    {
        title: "HTML",
        description: "HTML (HyperText Markup Language) is the standard markup language used for creating and structuring web pages. It provides a set of tags that define the structure, layout, and content of a webpage. HTML tags are used to mark up elements such as headings, paragraphs, images, links, and forms, among others. It allows web browsers to interpret and display the content in a structured manner. HTML also supports the inclusion of CSS (Cascading Style Sheets) for styling and JavaScript for adding interactivity. With HTML, web developers can create visually appealing and interactive websites that are accessible across different devices and platforms.",
        user_id: 3
      },

  ];

  await sequelize.sync({ force: true });
  await User.bulkCreate(userData);
  await Blog.bulkCreate(blogData);

  process.exit(0);
};

seed();