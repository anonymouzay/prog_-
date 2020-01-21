var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("<h1>Hello world</h1>");
});
app.get("/name/:name", function(req, res){
   var name = req.params.name;
   res.send("<h1>Hello " + name +"</h1>");
});
app.get('/google',function(req,res){
    res.redirect('http://google.com')
});
app.get('/search/:query',function(req,res){
    var query=req.params.query;
    res.redirect('http://google.com/search?q='+query)
});
app.get('/*',function(req,res){
    res.send("<h1>Error 404 couldnt find " + req.url + "</h1>" )
});
app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
