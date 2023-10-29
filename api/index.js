const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./models/user');
const post = require('./models/post');
const { port,username_mongo,password_mongo } = require('./config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })
const app = express();
const fs = require('fs');

const secret = "qsxcvnbhfksljvldsnsdcisdncdslcds"
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'))

mongoose.connect(`mongodb+srv://${username_mongo}:${password_mongo}@blog.0nkw04p.mongodb.net/?retryWrites=true&w=majority`)

const setFileName = (req) => {
    const {path , originalname} = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath =  path+'.'+ext;
    fs.renameSync(path , newPath);
    return newPath
}

app.post('/register', async (req,res) => { 
    try{
        const { username,password } = req.body;
        const encryptedPassword = bcrypt.hashSync(password, salt);
        const userDoc = await user.create({
            username,
            password: encryptedPassword
        })
        res.json(userDoc);
    }
    catch (e){
        res.status(400).json(e)
    }    
})

app.post('/login' , async (req,res) => {
    const { username , password } = req.body;
    const userDoc = await user.findOne({username});
    
    if(userDoc){
        const passOk = bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            //login
            jwt.sign({username,id: userDoc._id} , secret , {} , (err,token) => {
                if(err){
                    throw err;
                }
                res.cookie('token',token).json({
                    username,
                    id: userDoc._id
                });
            })
        }
        else{
            res.status(401).json({ message: "Wrong credentials" });
        }
    } 
    else{
        res.status(401).json({ message: "Wrong credentials" });
    }    
})

app.get('/profile', (req,res) => {
    const { token } = req.cookies;
    if(token){
        jwt.verify(token , secret , {} , (err,info) => {
            if(err){
                throw err;
            }
            res.json(info);
        })
    }
    res.status(401).json("No login found");
})

app.post('/logout', (req,res) => {
    res.cookie('token','').json('ok');
})

app.post('/post' , uploadMiddleware.single('file') , async (req,res) => {
    let newPath = null;
    if(req.file){
        newPath = setFileName(req);
    }
    const { token } = req.cookies;
    if(token){
        jwt.verify(token , secret , {} , async (err,info) => {
            if(err){
                throw err;
            }
            const { title,summary,content } = req.body;
            const PostDoc = await post.create({
                title,
                summary,
                content,
                cover: newPath,
                author: info.id
            })
            res.json({PostDoc})
        })
    }
})

app.put('/post' , uploadMiddleware.single('file') , async (req,res) => {
    let newPath = null;
    if(req.file){
        newPath = setFileName(req);
    }
    const { token } = req.cookies;
    if(token){
        jwt.verify(token , secret , {} , async (err,info) => {
            if(err){
                throw err;
            }
            const { title,summary,content,id } = req.body;
            const PostDoc = await post.findById(id);
            const isAuthor = JSON.stringify(PostDoc.author._id) === JSON.stringify(info.id);
            if(!isAuthor){
                return res.status(401).json({
                    message: 'Not Post Owner'
                })
            }
            await PostDoc.updateOne({
                title,
                summary,
                content,
                cover: newPath ? newPath : PostDoc.cover
            })
            res.json({PostDoc})
        })
    }
})

app.get('/posts' , async (req,res) => {
    let posts = await post.find()
                          .populate('author' , ['username'])
                          .sort({createdAt: -1})
                          .limit(20);
    res.json(posts);
})

app.get('/post/:id' , async (req,res) => {
    const {id} = req.params;
    const postDoc  = await post.findById(id)
                                .populate('author', ['username'])
    res.json(postDoc);
})

app.listen(port);