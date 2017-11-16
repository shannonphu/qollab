var CommentsReducer = (state = {
	addAnnotationActive: false,
	activeAnnotationId: null,
	comments: initialComments()
}, action) => {
	switch (action.type) {
		case 'ADD_ANNOTATION':
			return {
				...state,
				addAnnotationActive: true,
				activeAnnotationId: null
			};
		case 'STORE_ANNOTATION_ID':
			return {
				...state,
				addAnnotationActive: action.annotationId ? true : false,
				activeAnnotationId: action.annotationId
			};
		case 'REMOVE_ANNOTATION':
			return {
				...state,
				addAnnotationActive: false,
				activeAnnotationId: action.annotationId
			};
		case 'ADD_COMMENT':
			let commentAnnotationObj = action.comment;
			commentAnnotationObj["annotationId"] = state.activeAnnotationId;
			return {
				...state,
				addAnnotationActive: false,
				activeAnnotationId: null,
				comments: [
					...state.comments,
					Object.assign({}, commentAnnotationObj)
				]
			};
		case 'UPVOTE_COMMENT':
			return Object.assign({}, state, {
				comments: state.comments.map((comment) => {
					if (comment.id===action.id)
						return Object.assign({}, comment, {votes: comment.votes+1});
					else
						return comment;
				})
			});
		default:
			return state;
	}
}

function initialComments() {
	return [
		{
			id: 0,
			text: "Question",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 0,
			resolved: false,
			annotationId: null
		},
		{
			id: 1,
			text: "Question 2",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 1,
			resolved: false,
			annotationId: null
		},
		{
			id: 2,
			text: "Question 3",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 2,
			resolved: false,
			annotationId: null
		},
		{
			id: 3,
			text: "Question 4",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 3,
			resolved: false,
			annotationId: null
		},
		{
			id: 4,
			text: "Question 5",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 4,
			resolved: false,
			annotationId: null
		},
	]
}

export default CommentsReducer;