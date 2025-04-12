//setup basic a index ejs 
const express =require("express");
const app =express() ;
const path = require("path")
const port =8080;
const { v4:uuidv4 } =require('uuid');
const methodOverride =require("method-override");


app.use(express.urlencoded({extends:true}));  // They converted into ejs data into primary data to use a json data to read and what a perform
app.use(methodOverride('_method'));
app.set("view engine","ejs");  // set a ejs path in js file
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public"))); // set a public path in js file
//To create a array of Quora data
let posts =[
    {
        id:uuidv4(),
        username:"apnacollege",
        content : "i love coding"
    },
    {
        id:uuidv4(),
        username:"diksha",
        content : "coding means work wih logic and harwork"  
    },
    {
        id:uuidv4(),
         username: "ketan nayak",
         content:"i love testing"
    }
    ];

//set a index view in page 
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
// create a new post  
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");// responce data send to in the form of template
});
//create a add path for  new post adding into actual post
app.post("/posts",(req,res)=>{
    let  {username,content} =req.body; //
    let id= uuidv4();
     posts.push({id,username,content});// adding a data in actual push data using push method
    // console.log(req.body); //req.body =>  get method data actaully getting paramter of data but post method are getting bdy of data
    // res.send("working your data"); //responce data to send  in the form of html, text ,obejct
    res.redirect("/posts");
    
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post =posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let post =posts.find((p)=>id===p.id);
    // console.log(post);
    res.render("show.ejs",{post});  
    res.send("request working");
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts =posts.filter((p)=>id!=p.id);
    res.redirect("/posts");
    res.send("delete suceess");

});

app.patch('/posts/:id', (req, res) => {
    const { id } = req.params;
    const newContent = req.body.content;
    const post = posts.find(p => p.id === id);
console.log(post);
    if (post) {
        post.content = newContent;
        res.redirect('/posts'); // or any page you want to redirect to
    } else {
        res.status(404).send("Post not found");
    }
});

// set a server port activated
app.listen(port,()=>{
    console.log("hey, your server has been activated")
});



