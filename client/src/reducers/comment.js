var CommentsReducer = (state = {
	addAnnotationActive: false,
	activeAnnotationId: null,
	comments: initialComments()
}, action) => {
	switch (action.type) {
		case 'ADD_ANNOTATION':
			return {
				addAnnotationActive: true,
				activeAnnotationId: null,
				comments: [...state.comments]
			};
		case 'STORE_ANNOTATION_ID':
			return {
				addAnnotationActive: action.annotationId ? true : false,
				activeAnnotationId: action.annotationId,
				comments: [...state.comments]
			};
		case 'REMOVE_ANNOTATION':
			return {
				addAnnotationActive: false,
				activeAnnotationId: action.annotationId,
				comments: [...state.comments]
			};
		case 'ADD_COMMENT':
			return {
				addAnnotationActive: false,
				activeAnnotationId: null,
				comments: [
					...state.comments,
					Object.assign({}, action.comment)
				]
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
			votes: 5,
			resolved: false,
		},
		{
			text: "Question 2",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 5,
			resolved: false,
		},
		{
			text: "Question 3",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 5,
			resolved: false,
		},
		{
			text: "Question 4",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 5,
			resolved: false,
		},
		{
			text: "Question 5",
			replies: ["Reply 1", "Reply 2", "Reply 3"],
			votes: 5,
			resolved: false,
		},
	]
}

export default CommentsReducer;