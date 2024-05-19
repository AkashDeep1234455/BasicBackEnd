///Basic code for acquiring express and making it run
const express = require("express");
const { v4: uuidv4} = require('uuid');
const app = express();
const Swal = require('sweetalert2')
const port = process.env.PORT || 8080;
const methodOverride = require('method-override');
///acquiring path of our view and public so that we can use them
const path = require("path");
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


//express can now understand url encoded that too basically parsing in express understable language

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));  //middleware to serve static files like css used to configure files for serving static files


///it will store all post data and i is variable type as if it was const type deleting data will be not allowed..
let posts = [
    {
        id:uuidv4(),
        username:"Aditya",
        content: "Meri CG sbse jyada",
    },
    {
        id:uuidv4(),
        username:"Himanshu",
        content: "Mera maggie best hai",
    },
    {
        id:uuidv4(),
        username:"Ankit",
        content: "Mai hu Kaala",
    },
    {
        id:uuidv4(),
        username:"Gaurav",
        content: "HEHEHEHEHEHEHEHEHE",
    },
];  

///root route
app.get("/", (req, res) => {
    res.redirect("/posts");
});


///our first Api to post all data to our main page
app.get("/posts",(req,res)=>{
    res.render("index",{posts: posts});
});


//2nd api to post a new post 
app.get("/posts/new",(req,res)=>{
    res.render("form")  
});

app.post("/posts",(req,res)=>{
    ///destructuring to get data for res.body
    let {username, content} = req.body;
    if(username&&username.trim()!==""){
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
    }else res.redirect("/posts?error=missingUsername");
    
    
});

///3rd api to get post by id
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p)=> p.id === id);
    if(post) res.render("newIndex",{post:post});
    else res.status(404).send("Post not found");
});


///4th api to update existing content

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent= req.body.content.trim();
    if (newContent !== "") {
        let post = posts.find((p) => id === p.id);
        if (post) post.content = newContent;
    }
    res.redirect("/posts");
});

///edit krne ka button

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit",{post:post});
});





////final and 5th api for deletion  
///Destroy Route

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});







app.listen(port,()=>{
    console.log(`listening to port : ${port}`);
});

