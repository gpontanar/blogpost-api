# Blog Application API

## Features
- User Authentication (Register/Login)
- Blog Post Management (CRUD)
- Commenting System
- Admin Controls

## Users:
- Admin:
{
  "username": "graciasgracie",
  "email": "graciasgracie@mail.com",
  "password": "password123"
}

- Regular User:
{
  "username": "gracias_regular",
  "email": "gracias_regular@mail.com",
  "password": "password123"
}

## API:   

### User:
- POST - Register: http://localhost:4000/users/register   

{
"username": "gracias_regular",
"email": "gracias_regular@mail.com",
"password": "password123"
}
- POST - Login: http://localhost:4000/users/login   

{
  "email": "graciasgracie@mail.com",
  "password": "password123"
}

- GET - Retrieve User details: http://localhost:4000/users/details
    - Use Access Token

### BlogPost:   

- POST - Adding Blogs: http://localhost:4000/blogs
    - Use Access Token

{
  "title": "My First Blog Post",
  "content": "Here is the content of my very first blog post."
}  

- PUT - Update Blog Post: http://localhost:4000/blogs/Blog:id (Example:) http://localhost:4000/blogs/6810ccb938ff8e34e13f87ab
    - Use Access Token

{
  "title": "Updating My Blog Post Title",
  "content": "Updated content for the blog post."
}

- DELETE - Delete Blog Post by Id: http://localhost:4000/blogs/6810cde638ff8e34e13f87b2
    - Use Access Token

{
  "content": "This is a comment on a blog post."
}

### Comments: 

- POST - Adding Comment to a Blog Post: http://localhost:4000/comments/6810ccb938ff8e34e13f87ab
    - Use Access Token


### Admin Only:

- DELETE -  Deleting Comment by Comment ID: http://localhost:4000/comments/admin/6810cf5238ff8e34e13f87bd
    - Use Access Token

- DELETE - Delete Blog Post by Post ID: http://localhost:4000/blogs/6810cde638ff8e34e13f87b2

## All User - No Acces Token Recquired  

- GET - Get-All-Blog-Post: http://localhost:4000/blogs/

- GET - Get Comments to a Blog Post: http://localhost:4000/comments/6810ccb938ff8e34e13f87ab



## Setup
1. Install dependencies: `npm install`.
2. 
3. 