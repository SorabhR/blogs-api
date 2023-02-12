'use strict';
const firebase = require('../db');
const firestore = firebase.firestore(); 
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const addUser = async (req, res, next) => {
    try {
        const { userid, username, password } = req.body

        if (!username || !password) {
            res.send('Please provide email and password')
        }
        const hasPassword = await bcrypt.hash(req.body.password, 10);
        
        const token = jwt.sign({ userid, username }, process.env.JWT_SECRET, {
            expiresIn: '30d',
          })
        
        const credentials = {
            userid : userid,
            username: username,
            password: hasPassword,
            token:token
        };


    const usersDb = firestore.collection('users'); 
    const response = await usersDb.doc(userid).set(credentials);
    res.status(200).json({ msg: 'user created', token })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addblog = async (req, res, next) => {
    try {
        const id = req.body.blogid;
        const content = {
            userid : req.user.userid,
            username: req.user.username,
            content: req.body.content,
        };
        const userBlog = firestore.collection("blogs").doc(id);
        const response = await userBlog.get();
        if (response.exists)
            res.send("Blog with that id already exists");
        else{
            const blogsDb = firestore.collection('blogs'); 
            const response = await blogsDb.doc(id).set(content);
            res.send('Blog uploaded successfuly');
        }    
    
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllblogs = async (req, res, next) => {
    try {
        const userBlog = firestore.collection("blogs");
        const response = await userBlog.get();
        const blogsarray = [];
        if (response.empty)
            res.status(404).send("Blogs not found");
        else{
            response.forEach(doc => {
                blogsarray.push({"id" : doc.id, "userid" : doc.data().userid, "username" : doc.data().username, "content" : doc.data().content})
            });
            res.send(blogsarray)
        }    
      } catch(error) {
        res.send(error.message);
      }
}

const getspecificuseridblog = async (req, res, next) => {
    try {
        const userBlog = firestore.collection("blogs").where("userid", "==", req.params.id);
        const response = await userBlog.get();
        const blogsarray = [];
        if (response.empty)
            res.status(404).send("Blogs not found");
        else{
            response.forEach(doc => {
                blogsarray.push({"id" : doc.id, "userid" : doc.data().userid, "username" : doc.data().username, "content" : doc.data().content})
            });
            res.send(blogsarray)
        }        
      } catch(error) {
        res.send(error.message);
      }
}

const getspecificblogidblog = async (req, res, next) => {
    try {
        const userBlog = firestore.collection("blogs").doc(req.params.id);
        const response = await userBlog.get();
        if(response.exists)
            res.send({"id" : response.id, "userid" : response.data().userid, "username" : response.data().username, "content" : response.data().content});
        else
            res.send("No blogs for that user id")    
      } catch(error) {
        res.send(error.message);
      }
}

const updateBlog = async (req, res, next) => {
    try {
        const userBlog = firestore.collection("blogs").doc(req.params.id);
        const response = await userBlog.get();
        if(response.data().userid == req.user.userid){
            const response_update = await userBlog.update(req.body);
            res.send("Blog updated");
        }
        else{
            res.send("this is not your blog");
        }
      } catch(error) {
        res.send(error.message);
      }
}

const deleteblog = async (req, res, next) => {
    try {
        const userBlog = firestore.collection("blogs").doc(req.params.id);
        const response = await userBlog.get();
        if(response.data().userid == req.user.userid){
            const response_update = await userBlog.delete();
            res.send("Blog deleted");
        }
        else{
            res.send("this is not your blog");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser,
    addblog,
    getAllblogs,
    getspecificuseridblog,
    getspecificblogidblog,
    updateBlog,
    deleteblog
}