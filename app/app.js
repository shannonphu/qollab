const express = require('express');
const app = express();

// Database Models
const Comment = require('./db/comment.js');
Comment.insert("comment_text", (newComment) => {
	newComment.upvote();
	console.log(newComment);
});


app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('home', {
		title: "Home",
		content: "Hello world"
	});
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});