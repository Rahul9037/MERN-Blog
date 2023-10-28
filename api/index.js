const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./models/user');
const post = require('./models/post');
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

mongoose.connect('mongodb+srv://blog:3PqCjgTIfOaUvKJ9@blog.0nkw04p.mongodb.net/?retryWrites=true&w=majority')

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
        res.status(400).json('wrong credentials');
    }
})

app.get('/profile', (req,res) => {
    const { token } = req.cookies;
    jwt.verify(token , secret , {} , (err,info) => {
        if(err){
            throw err;
        }
        res.json(info);
    })
    res.json(req.cookies);
})

app.post('/logout', (req,res) => {
    res.cookie('token','').json('ok');
})

app.post('/post' , uploadMiddleware.single('file') , async (req,res) => {
    const {path , originalname} = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath =  path+'.'+ext;
    fs.renameSync(path , newPath);
    const { title,summary,content } = req.body;
    const PostDoc = await post.create({
        title,
        summary,
        content,
        cover: newPath
    })
    res.json({PostDoc})
})

app.listen(4000);

//mongodb+srv://blog:<3PqCjgTIfOaUvKJ9>@blog.0nkw04p.mongodb.net/?retryWrites=true&w=majority

//blog
//3PqCjgTIfOaUvKJ9