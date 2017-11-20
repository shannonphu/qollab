var AnnotationReducer = (state = {
	addAnnotationActive: false,
	activeAnnotation: null
}, action) => {
	switch (action.type) {
		case 'ADD_ANNOTATION':
			return {
				...state,
				addAnnotationActive: true,
				activeAnnotation: null
			};
		case 'STORE_ANNOTATION':
			return {
				...state,
				addAnnotationActive: action.annotation ? true : false,
				activeAnnotation: action.annotation
			};
		case 'REMOVE_ANNOTATION':
			return {
				...state,
				addAnnotationActive: false,
				activeAnnotation: action.annotation
			};
		default:
			return state;
	}
}

export default AnnotationReducer;