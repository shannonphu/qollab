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
			return {
				...state,
				comments : state.comments.map((comment, index) => {
					if (index === action.id)
						return {
							...comment,
							votes: comment.votes + 1
						};
					else
						return comment;
				})
			};
		default:
			return state;
	}
}

function initialComments() {
	return [
		{
			text: "Question",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 0,
			resolved: false,
			annotationId: null
		},
		{
			text: "Question 2",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 1,
			resolved: false,
			annotationId: null
		},
		{
			text: "Question 3",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 2,
			resolved: false,
			annotationId: null
		},
		{
			text: "Question 4",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 3,
			resolved: false,
			annotationId: null
		},
		{
			text: "Question 5",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 4,
			resolved: false,
			annotationId: null
		},
	]
}

export default CommentsReducer;