 /**
  * Reducer for comments
  * @function
  */
function CommentsReducer() {
	return [
		{
			text: "Question",
			replies: [ "Reply 1", "Reply 2", "Reply 3" ],
			votes: 5,
			resolved: false,
		},
		{
			text: "Question 2",
			replies: [ "Reply 1", "Reply 2", "Reply 3" ],
			votes: 5,
			resolved: false,
		},
		{
			text: "Question 3",
			replies: [ "Reply 1", "Reply 2", "Reply 3" ],
			votes: 5,
			resolved: false,
		},
		{
			text: "Question 4",
			replies: [ "Reply 1", "Reply 2", "Reply 3" ],
			votes: 5,
			resolved: false,
		},
		{
			text: "Question 5",
			replies: [ "Reply 1", "Reply 2", "Reply 3" ],
			votes: 5,
			resolved: false,
		},
	]
}

export default CommentsReducer;