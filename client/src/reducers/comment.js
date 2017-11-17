var CommentsReducer = (state = {
	addAnnotationActive: false,
	activeAnnotationId: null,
	comments: initialComments(),
	lectureCode: null,
	canvasJSON: null
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
			return {
				...state,
				addAnnotationActive: false,
				activeAnnotationId: null,
				comments: [
					...state.comments,
					Object.assign({}, action.comment)
				]
			};
		case 'STORE_JOIN_CODE':
			return {
				...state,
				lectureCode: action.joinCode
			}
		case 'LOAD_CANVAS_FROM_JSON':
			// Only update the stored canvasJSON if the lecture code is for this lecture
			let joinCode = action.canvasJSON["joinCode"];
			if (state.lectureCode !== joinCode) {
				return state;
			}

			let canvasJSON = action.canvasJSON["data"];			
			return {
				...state,
				joinCode: joinCode,
				canvasJSON: canvasJSON
			}
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