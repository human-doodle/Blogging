# Blogging_api

This project is made in the process of learning Node.js and express framework. This is my attempt to build the api of the real world blogging project : https://github.com/gothinkster/node-express-realworld-example-app

## Endpoints:

### Authentication:
POST /api/users/login

Example request body:
<pre>
{
  "user":{
    "email": "jake@jake.jake",  
    "password": "jakejake"  
  }  
}
</pre>

No authentication required, returns a User

Required fields: email, password

### Registration:

POST /api/users

Example request body:
<pre>
{
  "user":{
    "username": "Jacob",
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
</pre>
No authentication required, returns a User

Required fields: email, username, password

### Get Current User
GET /api/user

Authentication required, returns a User that's the current user

Update User
PUT /api/user

Example request body:
<pre>
{
  "user":{
    "email": "jake@jake.jake",
    "bio": "I like to skateboard",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
</pre>
Authentication required, returns the User

Accepted fields: email, username, password, image, bio

### Get Profile
GET /api/profiles/:username

Authentication optional, returns a Profile

### Follow user
POST /api/profiles/:username/follow

Authentication required, returns a Profile

No additional parameters required

### Unfollow user
DELETE /api/profiles/:username/follow

Authentication required, returns a Profile

No additional parameters required

### List Articles
GET /api/articles

Returns most recent articles globally by default, provide tag, author or favorited query parameter to filter results

Query Parameters:

Filter by tag:

?tag=AngularJS

Filter by author:

?author=jake

Favorited by user:

?favorited=jake

Limit number of articles (default is 20):

?limit=20

Offset/skip number of articles (default is 0):

?offset=0

Authentication optional, will return multiple articles, ordered by most recent first

### Feed Articles
GET /api/articles/feed

Can also take limit and offset query parameters like List Articles

Authentication required, will return multiple articles created by followed users, ordered by most recent first.

### Get Article
GET /api/articles/:slug

No authentication required, will return single article

### Create Article
POST /api/articles

Example request body:

{
  "article": {
    "title": "anand",
    "description": "wonderful movie",
    "body": "Rakesh Khanna's wonderfull acting.",
    "tagList": ["Rajesh", "Anand", "movie"]
  }
}
Authentication required, will return an Article

Required fields: title, description, body

Optional fields: tagList as an array of Strings

### Update Article

PUT /api/articles/:slug

Example request body:

{
  "article": {
    "title": "anand"
  }
}
Authentication required, returns the updated Article

Optional fields: title, description, body

The slug also gets updated when the title is changed

### Delete Article

DELETE /api/articles/:slug

Authentication required
