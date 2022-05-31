//http://localhost:3000/index.html use this to see ui once u r done node server.js

const express = require('express')
const app = express()
const cors = require('cors')
const low = require('lowdb')
const fs = require('lowdb/adapters/FileSync')
const adapter = new fs('db.json')
const db = low(adapter)

db.defaults({posts: []}).write()

app.use(cors())

// data parser - used to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'))

app.post('/posts', function(req, res){
    let pos ={
        id: req.body.id,
        title: req.body.title,
        published: req.body.published
    }
    db.get('posts').push(pos).write()
    res.send(db.get('posts').value());

})

app.get('/data', function(req, res){
    res.send(db.get('posts').value());
})

app.get("/deleteAll", function (req, res) {
    db.get("posts").remove().write();
    // db.unset(`posts`).write()
    // delete low.db.posts
    // low.save()
    res.send("all recordes removed");
    res.status(204).send();
})

app.listen(3000, function(){
    console.log('Running on port 3000!')
})