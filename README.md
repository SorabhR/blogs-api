# blogs-api

Add a .env file and add JWT_SECRET = "YOUR KEY HERE" and save
Add a servicekeyprovok.json file with your firebase credentials

Routes:

/register
Body : 
{
  "userid" : "122",
  "username" : "ANY NAME",
  "password" : "PASSWORD"
 }
 Registers the user and provides the jwt token
 
 /blog (POST)
 Body : 
 {
  "blogid" : "1",
  "content" : "YOUR CONTENT"
 }
 Pass the JWT token in Authorization field to verify user
 
 /blog (GET)
 gets all blogs
 
 /blog/:id(GET)
 gets specific blog with id=blogid
 
 /blog/user/:id(GET)
 gets specific users blog with id = userid
 
 /blog/:id (PUT)
 Body : 
 {
  "content" : "YOUR CONTENT"
 }
 Pass the JWT token in Authorization field to verify user and id=blogid
 
  /blog/:id (DELETE)
 
 Pass the JWT token in Authorization field to verify user and id=blogid
 
